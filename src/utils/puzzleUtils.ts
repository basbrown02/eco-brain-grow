
import { dailyPuzzles, customPuzzles } from '@/data/puzzles';
import { 
  generateDailyPuzzle, 
  generateCustomPuzzle, 
  hasValidApiKey 
} from '@/utils/geminiApi';

// Get today's daily puzzle
export const getTodaysDailyPuzzle = async () => {
  // Try to generate a daily puzzle using Gemini if API key exists
  if (hasValidApiKey()) {
    const generatedPuzzle = await generateDailyPuzzle();
    if (generatedPuzzle) {
      return {
        type: 'daily',
        ...generatedPuzzle
      };
    }
  }
  
  // Fallback to static puzzles if Gemini API fails or no API key
  const today = new Date();
  const index = (today.getFullYear() + today.getDate() + today.getMonth()) % dailyPuzzles.length;
  return dailyPuzzles[index];
};

// Get a custom puzzle for user based on IQ level
export const getCustomPuzzleForUser = async (userIQ: number) => {
  // Try to generate a custom puzzle using Gemini if API key exists
  if (hasValidApiKey()) {
    const generatedPuzzle = await generateCustomPuzzle(userIQ);
    if (generatedPuzzle) {
      return {
        type: 'custom',
        ...generatedPuzzle
      };
    }
  }
  
  // Fallback to static puzzles if Gemini API fails or no API key
  let difficultyLevel = 1; // Default easy
  
  if (userIQ >= 140) difficultyLevel = 4; // Very hard
  else if (userIQ >= 120) difficultyLevel = 3; // Hard
  else if (userIQ >= 100) difficultyLevel = 2; // Medium
  
  // Get puzzles that match this difficulty
  const matchingPuzzles = customPuzzles.filter(p => p.difficultyLevel === difficultyLevel);
  // Select a random puzzle from the matching difficulty
  return matchingPuzzles[Math.floor(Math.random() * matchingPuzzles.length)];
};
