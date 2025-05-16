import { dailyPuzzles, customPuzzles, createPuzzleFromGeminiData, Puzzle } from '@/data/puzzles';
import { generateRiddle } from '@/lib/gemini';

// Get today's daily puzzle
export const getTodaysDailyPuzzle = async (): Promise<Puzzle> => {
  console.log('getTodaysDailyPuzzle called');
  try {
    // Generate a random topic for the riddle
    const topics = ['nature', 'animals', 'technology', 'science', 'food', 'space'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    console.log('Using random topic:', randomTopic);
    
    // Call the Gemini API to generate a riddle
    console.log('Calling Gemini API...');
    const riddleData = await generateRiddle(randomTopic);
    console.log('Received riddle data:', riddleData);
    
    // Convert the riddle data to our Puzzle interface
    const puzzle = createPuzzleFromGeminiData(riddleData);
    console.log('Created puzzle:', puzzle);
    return puzzle;
  } catch (error) {
    console.error('Error generating riddle:', error);
    // Fallback to a hardcoded puzzle if the API fails
  const today = new Date();
  const index = (today.getFullYear() + today.getDate() + today.getMonth()) % dailyPuzzles.length;
    console.log('Falling back to hardcoded puzzle at index:', index);
  return dailyPuzzles[index];
  }
};

// Get a custom puzzle for user based on IQ level - keeping this function
// but we won't be using it anymore
export const getCustomPuzzleForUser = (userIQ: number) => {
  // Determine difficulty level based on user's IQ
  let difficultyLevel = 1; // Default easy
  
  if (userIQ >= 140) difficultyLevel = 4; // Very hard
  else if (userIQ >= 120) difficultyLevel = 3; // Hard
  else if (userIQ >= 100) difficultyLevel = 2; // Medium
  
  // Get puzzles that match this difficulty
  const matchingPuzzles = customPuzzles.filter(p => p.difficultyLevel === difficultyLevel);
  // Select a random puzzle from the matching difficulty
  return matchingPuzzles[Math.floor(Math.random() * matchingPuzzles.length)];
};
