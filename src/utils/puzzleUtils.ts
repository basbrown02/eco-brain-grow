import { dailyPuzzles, customPuzzles } from '@/data/puzzles';

// Get today's daily puzzle
export const getTodaysDailyPuzzle = () => {
  // In a real app, we would use the date to select a deterministic daily puzzle
  const today = new Date();
  const index = (today.getFullYear() + today.getDate() + today.getMonth()) % dailyPuzzles.length;
  return dailyPuzzles[index];
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
