# Python Backend for Riddle Generation

This is a simple Flask backend API that uses the Google Gemini API to generate riddles.

## Setup

1. Create a Python virtual environment:
   ```
   # On macOS/Linux
   python -m venv venv
   source venv/bin/activate
   
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. Run the server:
   ```
   python server.py
   ```

The server will start at http://localhost:5000

## API Endpoints

### Generate Riddle

- **URL**: `/api/generate-riddle`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "topic": "nature"
  }
  ```
- **Response**:
  ```json
  {
    "riddle": "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    "hints": ["I can travel long distances", "I am often associated with valleys", "I repeat what is said"],
    "answer": "An echo"
  }
  ```

### Health Check

- **URL**: `/api/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "OK", 
    "message": "Backend API is running"
  }
  ``` 