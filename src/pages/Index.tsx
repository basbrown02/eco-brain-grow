
import React, { useState, useEffect } from 'react';
import AppBar from '@/components/AppBar';
import PuzzleCard from '@/components/PuzzleCard';
import HintSystem from '@/components/HintSystem';
import AnswerInput from '@/components/AnswerInput';
import ImpactStats from '@/components/ImpactStats';
import AdRail from '@/components/AdRail';
import Confetti from '@/components/Confetti';
import BrainIcon from '@/components/BrainIcon';
import { useToast } from '@/hooks/use-toast';

// Sample puzzles
const puzzles = [
  {
    type: 'text' as const,
    content: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "candle",
    hints: [
      "You might find me on a birthday cake.",
      "I provide light.",
      "I melt as I'm used."
    ]
  },
  {
    type: 'visual' as const,
    content: "Identify the pattern and select the next shape.",
    image: "/placeholder.svg",
    answer: "circle",
    hints: [
      "Look at the number of sides.",
      "The pattern decreases by one side each time.",
      "After a triangle comes a..."
    ]
  }
];

const Index = () => {
  const { toast } = useToast();
  const [availableHints, setAvailableHints] = useState(3);
  const [currentHint, setCurrentHint] = useState<string | undefined>(undefined);
  const [treesToday, setTreesToday] = useState(12453);
  const [treesTotal, setTreesTotal] = useState(5287401);
  const [activeUsers, setActiveUsers] = useState(32859);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const currentPuzzle = puzzles[puzzleIndex];
  
  const handleUseHint = () => {
    if (availableHints <= 0) return;
    
    const hintIndex = 3 - availableHints;
    if (currentPuzzle.hints[hintIndex]) {
      setCurrentHint(currentPuzzle.hints[hintIndex]);
      setAvailableHints(prev => prev - 1);
      
      // Lower tree multiplier
      toast({
        title: "Hint Used",
        description: "Your tree multiplier has decreased by 10%.",
        variant: "default"
      });
    }
  };
  
  const handleSubmitAnswer = (answer: string) => {
    const normalizedUserAnswer = answer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentPuzzle.answer.toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsAnswerCorrect(correct);
    setIsDisabled(true);
    
    if (correct) {
      // Increase tree count on correct answer
      const treeIncrement = Math.floor(5 + Math.random() * 10);
      setTimeout(() => {
        setTreesToday(prev => prev + treeIncrement);
        setTreesTotal(prev => prev + treeIncrement);
        setShowConfetti(true);
        
        toast({
          title: "Correct Answer!",
          description: `You planted ${treeIncrement} trees! 🌱`,
          variant: "default"
        });
      }, 500);
      
      // Reset after celebration
      setTimeout(() => {
        setIsDisabled(false);
        setIsAnswerCorrect(null);
        setShowConfetti(false);
        
        // Change to next puzzle
        setPuzzleIndex(prev => (prev + 1) % puzzles.length);
        setAvailableHints(3);
        setCurrentHint(undefined);
      }, 3000);
    } else {
      // Reset after wrong answer
      setTimeout(() => {
        setIsDisabled(false);
        setIsAnswerCorrect(null);
      }, 2000);
      
      toast({
        title: "Not quite right",
        description: "Try again or use a hint!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-[90px] relative">
      <AppBar />
      
      <div className="flex justify-center my-2">
        <BrainIcon className="opacity-80" />
      </div>
      
      <PuzzleCard 
        puzzleType={currentPuzzle.type} 
        puzzleContent={currentPuzzle.content}
        puzzleImage={currentPuzzle.type === 'visual' ? currentPuzzle.image : undefined}
      />
      
      <HintSystem 
        totalHints={3}
        availableHints={availableHints}
        onUseHint={handleUseHint}
        currentHint={currentHint}
      />
      
      <AnswerInput 
        puzzleType={currentPuzzle.type}
        onSubmit={handleSubmitAnswer}
        isCorrect={isAnswerCorrect}
        isDisabled={isDisabled}
      />
      
      <ImpactStats 
        treesToday={treesToday}
        treesTotal={treesTotal}
        activeUsers={activeUsers}
        animateIncrease={true}
      />
      
      <AdRail />
      <Confetti active={showConfetti} />
    </div>
  );
};

export default Index;
