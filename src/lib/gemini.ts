// Fallback riddle for when the API fails
const FALLBACK_RIDDLE = {
  riddle: "What gets wet while drying?",
  hints: ["You use it after a shower", "It's made of fabric", "It's usually hanging in your bathroom"],
  answer: "A towel"
};

export async function generateRiddle(topic: string) {
  console.log('generateRiddle called with topic:', topic);
  
  try {
    console.log('Calling backend API at http://localhost:3000/api/generate-riddle');
    
    const response = await fetch('http://localhost:3000/api/generate-riddle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    
    if (!response.ok) {
      console.error('Backend API returned error status:', response.status);
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully received response from backend:', data);
    
    // Validate the structure
    if (!data.riddle || !data.answer || !Array.isArray(data.hints)) {
      console.error('Invalid riddle structure from backend:', data);
      throw new Error('Invalid riddle structure');
    }
    
    return data;
  } catch (error) {
    console.error('Error calling backend API:', error);
    // Return a fallback riddle instead of throwing an error
    console.log('Returning fallback riddle due to API error');
    return FALLBACK_RIDDLE;
  }
}