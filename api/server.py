import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configure Gemini API
# Try to get from environment variable first
API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyC3FtbGTh2NNr0wj-XER7CCMnsgReg_QP4")  # Fallback to hardcoded key
genai.configure(api_key=API_KEY)

# Fallback riddle for when the API fails
FALLBACK_RIDDLE = {
    "riddle": "What gets wet while drying?",
    "hints": ["You use it after a shower", "It's made of fabric", "It's usually hanging in your bathroom"],
    "answer": "A towel"
}

@app.route('/api/generate-riddle', methods=['POST'])
def generate_riddle():
    try:
        # Get topic from request
        data = request.json
        topic = data.get('topic', 'nature')
        
        # Log the request
        print(f"Generating riddle for topic: {topic}", flush=True)
        
        # Initialize model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create prompt
        prompt = f"""
Generate a clever riddle about "{topic}" and return it in **valid JSON format** like this:

{{
  "riddle": "What has hands but can't clap?",
  "hints": ["It tells time", "It hangs on a wall", "It has numbers"],
  "answer": "A clock"
}}

Only return pure JSON. No commentary or extra formatting.
"""
        
        # Generate content
        response = model.generate_content(prompt)
        raw_text = response.text
        
        try:
            # Try to parse the response as JSON
            parsed = json.loads(raw_text)
            
            # Validate the structure
            if not parsed.get('riddle') or not parsed.get('answer') or not isinstance(parsed.get('hints'), list):
                print("Invalid riddle structure, returning fallback", flush=True)
                return jsonify(FALLBACK_RIDDLE)
            
            return jsonify(parsed)
            
        except json.JSONDecodeError:
            # Try to extract JSON from the response if it's not clean JSON
            print(f"Raw text from API was not clean JSON: {raw_text}", flush=True)
            import re
            json_match = re.search(r'\\{[\\s\\S]*\\}', raw_text)
            
            if json_match:
                extracted_json = json_match.group(0)
                try:
                    parsed = json.loads(extracted_json)
                    if not parsed.get('riddle') or not parsed.get('answer') or not isinstance(parsed.get('hints'), list):
                        print("Invalid riddle structure after extraction, returning fallback", flush=True)
                        return jsonify(FALLBACK_RIDDLE)
                    return jsonify(parsed)
                except Exception as e_extract:
                    print(f"Error parsing extracted JSON, returning fallback: {str(e_extract)}", flush=True)
                    return jsonify(FALLBACK_RIDDLE)
            
            print("Could not extract valid JSON, returning fallback", flush=True)
            return jsonify(FALLBACK_RIDDLE)
            
    except Exception as e:
        # Log the error
        print(f"Error generating riddle: {str(e)}", flush=True)
        return jsonify(FALLBACK_RIDDLE)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "OK", "message": "Backend API is running"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True) 