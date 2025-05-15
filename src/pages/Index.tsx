
import React, { useState, useEffect } from 'react';
import AppBar from '@/components/AppBar';
import PuzzleCard from '@/components/PuzzleCard';
import HintSystem from '@/components/HintSystem';
import AnswerInput from '@/components/AnswerInput';
import ImpactStats from '@/components/ImpactStats';
import AdRail from '@/components/AdRail';
import Confetti from '@/components/Confetti';
import BrainIcon from '@/components/BrainIcon';
import EntryScreen from '@/components/EntryScreen';
import { useToast } from '@/hooks/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

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
  const [showEntry, setShowEntry] = useState(true);
  const [showPuzzleContent, setShowPuzzleContent] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
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
  
  const handleStartPuzzle = () => {
    setShowEntry(false);
    
    // After entry screen fades out, show the puzzle screen
    setTimeout(() => {
      setShowPuzzleContent(true);
      
      // Start typewriter animation for text puzzles
      if (currentPuzzle.type === 'text') {
        setTimeout(() => {
          setIsTextAnimating(true);
        }, 500);
      }
    }, 400);
  };
  
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
        
        // Reset to entry screen and change to next puzzle
        setShowPuzzleContent(false);
        setIsTextAnimating(false);
        setTimeout(() => {
          setPuzzleIndex(prev => (prev + 1) % puzzles.length);
          setAvailableHints(3);
          setCurrentHint(undefined);
          setShowEntry(true);
        }, 400);
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

  if (showEntry) {
    return (
      <TooltipProvider>
        <EntryScreen onStartPuzzle={handleStartPuzzle} />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className={`min-h-screen flex flex-col pb-[90px] relative animate-fade-in ${showPuzzleContent ? 'opacity-100' : 'opacity-0'}`}>
        <AppBar />
        
        <div className="flex justify-center my-2">
          <BrainIcon className="opacity-80" />
        </div>
        
        <PuzzleCard 
          puzzleType={currentPuzzle.type} 
          puzzleContent={currentPuzzle.content}
          puzzleImage={currentPuzzle.type === 'visual' ? currentPuzzle.image : undefined}
          isAnimating={isTextAnimating}
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
    </TooltipProvider>
  );
};

export default Index;
