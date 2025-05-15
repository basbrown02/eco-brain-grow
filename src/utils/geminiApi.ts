
import { toast } from "@/hooks/use-toast";

// This is a placeholder for your actual Gemini API key
// In a production app, this should be stored in environment variables or secure storage
let geminiApiKey = "";

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export interface PuzzleQuestion {
  content: string;
  answer: string;
  hints: string[];
}

// Function to set API key at runtime (for frontend-only apps)
export const setGeminiApiKey = (key: string) => {
  geminiApiKey = key;
  localStorage.setItem("gemini_api_key", key);
  return true;
};

// Function to get API key (first from memory, then from localStorage)
export const getGeminiApiKey = (): string => {
  if (geminiApiKey) return geminiApiKey;
  
  const storedKey = localStorage.getItem("gemini_api_key");
  if (storedKey) {
    geminiApiKey = storedKey;
    return storedKey;
  }
  
  return "";
};

// Check if API key exists and is valid
export const hasValidApiKey = (): boolean => {
  return !!getGeminiApiKey();
};

// Generate daily puzzle based on recent events/news
export const generateDailyPuzzle = async (): Promise<PuzzleQuestion | null> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please enter your Gemini API key in settings to generate puzzles.",
      variant: "destructive"
    });
    return null;
  }

  try {
    const prompt = `
      Create a brain teaser or puzzle question related to recent news, events, or trending topics from the current month.
      The puzzle should be clever and challenging but solvable with hints.
      Return your response in the following JSON format without any additional text:
      {
        "content": "The puzzle question text",
        "answer": "The single correct answer",
        "hints": ["First hint", "Second hint", "Third hint"]
      }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json() as GeminiResponse;
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const text = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from Gemini API");
    }

    const puzzleData = JSON.parse(jsonMatch[0]) as PuzzleQuestion;
    return puzzleData;
  } catch (error) {
    console.error("Error generating daily puzzle:", error);
    toast({
      title: "Error Generating Puzzle",
      description: "Could not generate a puzzle. Using fallback puzzle instead.",
      variant: "destructive"
    });
    return null;
  }
};

// Generate custom puzzle based on user's IQ level
export const generateCustomPuzzle = async (userIQ: number): Promise<PuzzleQuestion | null> => {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please enter your Gemini API key in settings to generate puzzles.",
      variant: "destructive"
    });
    return null;
  }

  try {
    // Determine difficulty based on IQ
    let difficultyLevel = "easy";
    if (userIQ >= 140) difficultyLevel = "very hard";
    else if (userIQ >= 120) difficultyLevel = "hard";
    else if (userIQ >= 100) difficultyLevel = "medium";

    const prompt = `
      Create a ${difficultyLevel} brain teaser or puzzle question personalized for someone with an IQ of approximately ${userIQ}.
      The puzzle should be clever and challenging but solvable with hints.
      Return your response in the following JSON format without any additional text:
      {
        "content": "The puzzle question text",
        "answer": "The single correct answer",
        "hints": ["First hint", "Second hint", "Third hint"]
      }
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json() as GeminiResponse;
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const text = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from Gemini API");
    }

    const puzzleData = JSON.parse(jsonMatch[0]) as PuzzleQuestion;
    // Add difficulty level for our internal tracking
    return {
      ...puzzleData,
      difficultyLevel: userIQ >= 140 ? 4 : userIQ >= 120 ? 3 : userIQ >= 100 ? 2 : 1
    } as PuzzleQuestion & { difficultyLevel: number };
  } catch (error) {
    console.error("Error generating custom puzzle:", error);
    toast({
      title: "Error Generating Puzzle",
      description: "Could not generate a custom puzzle. Using fallback puzzle instead.",
      variant: "destructive"
    });
    return null;
  }
};
