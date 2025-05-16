
import { toast } from '@/hooks/use-toast';

// Calculate trees earned based on puzzle performance
export const calculateTreesEarned = (
  puzzleStage: 'daily' | 'custom' | 'complete',
  availableHints: number,
  difficultyLevel?: number
) => {
  // Base amount
  let treeIncrement = 5; 
  
  // Add bonus for custom puzzle difficulty
  if (puzzleStage === 'custom' && difficultyLevel) {
    treeIncrement += difficultyLevel * 2;
  }
  
  // Add bonus for unused hints
  treeIncrement += availableHints;
  
  return treeIncrement;
};

// Calculate IQ adjustment based on answer correctness and hints used
export const calculateIQAdjustment = (
  puzzleStage: 'daily' | 'custom' | 'complete',
  isCorrect: boolean,
  availableHints: number
) => {
  // Only adjust IQ for custom puzzles
  if (puzzleStage !== 'custom') return 0;
  
  if (isCorrect) {
    // Boost IQ for correct answers (more for unused hints)
    return Math.floor((availableHints + 1) * 2); // +2 to +6 IQ points
  } else {
    // Small penalty for wrong answers
    return -1;
  }
};

// Handle correct answer feedback
export const showCorrectAnswerFeedback = () => {
  toast({
    title: "Correct Answer!",
    description: `Great job! Time to plant a tree!`,
    variant: "default"
  });
};

// Handle incorrect answer feedback
export const showIncorrectAnswerFeedback = () => {
  toast({
    title: "Not quite right",
    description: "Try again or use a hint!",
    variant: "destructive"
  });
};

// Handle hint usage feedback
export const showHintUsedFeedback = () => {
  toast({
    title: "Hint Used",
    description: "Your tree multiplier has decreased by 10%.",
    variant: "default"
  });
};

// Handle share action
export const handleShareAction = () => {
  toast({
    title: "Sharing Impact",
    description: "I've planted a tree with EcoBrain! Join me in helping the planet while boosting your brain.",
    variant: "default"
  });
};
