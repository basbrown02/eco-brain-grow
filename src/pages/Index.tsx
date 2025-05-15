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
import AnswerRevealScreen from '@/components/AnswerRevealScreen';
import { useToast } from '@/hooks/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { dailyPuzzles, customPuzzles } from '@/data/puzzles';

// New component to show completion screen between puzzles
const CompletionScreen: React.FC<{ 
  treesEarned: number,
  puzzleType: string,
  onContinue: () => void,
  isComplete?: boolean
}> = ({ treesEarned, puzzleType, onContinue, isComplete = false }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center animate-fade-in">
      <BrainIcon className="w-16 h-16 opacity-80 mb-6" />
      
      <h2 className="text-2xl font-bold text-ecobrain-charcoal mb-4">
        {isComplete ? "All Done for Today!" : "Great Job!"}
      </h2>
      
      <div className="mb-6 text-center">
        <p className="mb-2">You earned <span className="text-ecobrain-green font-bold">{treesEarned} trees</span>!</p>
        {!isComplete && (
          <p className="text-ecobrain-charcoal/80">
            Now it's time for your {puzzleType === 'daily' ? 'personalized' : 'final'} puzzle
          </p>
        )}
      </div>
      
      {!isComplete ? (
        <button 
          onClick={onContinue}
          className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-6 py-3 rounded-full text-lg hover:scale-105 transition-all"
        >
          Continue
        </button>
      ) : (
        <p className="text-ecobrain-charcoal/80 text-center max-w-xs">
          Come back tomorrow for a new daily puzzle and continue your streak!
        </p>
      )}
    </div>
  );
};

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
  
  // Track user puzzle progress
  const [userIQ, setUserIQ] = useState(100); // Starting IQ score
  const [puzzleStage, setPuzzleStage] = useState<'daily' | 'custom' | 'complete'>('daily');
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [showAnswerScreen, setShowAnswerScreen] = useState(false);
  const [treesEarned, setTreesEarned] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  
  // Get today's puzzles
  const getTodaysDailyPuzzle = () => {
    // In a real app, we would use the date to select a deterministic daily puzzle
    const today = new Date();
    const index = (today.getFullYear() + today.getDate() + today.getMonth()) % dailyPuzzles.length;
    return dailyPuzzles[index];
  };
  
  const getCustomPuzzleForUser = () => {
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
  
  // Get the current puzzle based on stage
  const currentPuzzle = puzzleStage === 'daily' 
    ? getTodaysDailyPuzzle() 
    : getCustomPuzzleForUser();
  
  const handleStartPuzzle = () => {
    setShowEntry(false);
    
    // After entry screen fades out, show the puzzle screen
    setTimeout(() => {
      setShowPuzzleContent(true);
      setPuzzleStage('daily');
      setAvailableHints(3);
      setCurrentHint(undefined);
      setIsAnswerCorrect(null);
      
      // Start typewriter animation
      setTimeout(() => {
        setIsTextAnimating(true);
      }, 500);
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

  const handleShowAnswer = () => {
    setShowPuzzleContent(false);
    setShowAnswerScreen(true);
    // Small IQ reduction for giving up
    if (puzzleStage === 'custom') {
      setUserIQ(prev => Math.max(80, prev - 2));
    }
  };

  const handleContinueFromAnswer = () => {
    // Hide answer screen
    setShowAnswerScreen(false);
    
    // Determine next stage
    if (puzzleStage === 'daily') {
      // Move to custom puzzle
      setPuzzleStage('custom');
      
      // After a brief pause, show the next puzzle
      setTimeout(() => {
        setAvailableHints(3);
        setCurrentHint(undefined);
        setIsAnswerCorrect(null);
        setShowPuzzleContent(true);
        
        // Start typewriter animation
        setTimeout(() => {
          setIsTextAnimating(true);
        }, 500);
      }, 400);
    } else {
      // User has completed both puzzles for the day
      setPuzzleStage('complete');
      setShowCompletionScreen(true);
    }
  };
  
  const transitionToNextStage = (treesEarned: number) => {
    // Hide the puzzle content
    setShowPuzzleContent(false);
    setIsTextAnimating(false);
    
    // Show completion screen with trees earned
    setTreesEarned(treesEarned);
    setShowCompletionScreen(true);
    
    // Update total trees
    setTreesToday(prev => prev + treesEarned);
    setTreesTotal(prev => prev + treesEarned);
  };
  
  const handleContinueFromCompletion = () => {
    // Hide completion screen
    setShowCompletionScreen(false);
    
    // Determine next stage
    if (puzzleStage === 'daily') {
      // Move to custom puzzle
      setPuzzleStage('custom');
      
      // After a brief pause, show the next puzzle
      setTimeout(() => {
        setAvailableHints(3);
        setCurrentHint(undefined);
        setIsAnswerCorrect(null);
        setShowPuzzleContent(true);
        
        // Start typewriter animation
        setTimeout(() => {
          setIsTextAnimating(true);
        }, 500);
      }, 400);
    } else {
      // User has completed both puzzles for the day
      setPuzzleStage('complete');
    }
  };
  
  const handleSubmitAnswer = (answer: string) => {
    const normalizedUserAnswer = answer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentPuzzle.answer.toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsAnswerCorrect(correct);
    setIsDisabled(true);
    
    if (correct) {
      // Calculate trees earned based on:
      // 1. Base amount (5 trees)
      // 2. If it's a custom puzzle, bonus based on difficulty level
      // 3. Remaining hints (each unused hint = +1 tree)
      let treeIncrement = 5; // Base amount
      
      // Add bonus for custom puzzle difficulty
      if (puzzleStage === 'custom' && currentPuzzle.difficultyLevel) {
        treeIncrement += currentPuzzle.difficultyLevel * 2;
      }
      
      // Add bonus for unused hints
      treeIncrement += availableHints;
      
      // Adjust IQ based on performance (faster answer, fewer hints = higher IQ boost)
      if (puzzleStage === 'custom') {
        const iqBoost = Math.floor((availableHints + 1) * 2); // +2 to +6 IQ points
        setUserIQ(prev => prev + iqBoost);
      }
      
      // Show success feedback
      setTimeout(() => {
        setShowConfetti(true);
        
        toast({
          title: "Correct Answer!",
          description: `You earned ${treeIncrement} trees! 🌱`,
          variant: "default"
        });
        
        // After celebration
        setTimeout(() => {
          setIsDisabled(false);
          setIsAnswerCorrect(null);
          setShowConfetti(false);
          
          // Transition to completion screen or next puzzle
          transitionToNextStage(treeIncrement);
        }, 3000);
      }, 500);
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
      
      // Small IQ reduction for wrong answers on custom puzzles
      if (puzzleStage === 'custom') {
        setUserIQ(prev => Math.max(80, prev - 1)); // Prevent IQ from going below 80
      }
    }
  };

  if (showEntry) {
    return (
      <TooltipProvider>
        <EntryScreen onStartPuzzle={handleStartPuzzle} />
      </TooltipProvider>
    );
  }
  
  if (showCompletionScreen) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <AppBar />
          <div className="flex-grow flex items-center justify-center pb-[90px]">
            <CompletionScreen 
              treesEarned={treesEarned}
              puzzleType={puzzleStage}
              onContinue={handleContinueFromCompletion}
              isComplete={puzzleStage === 'custom'}
            />
          </div>
          <AdRail />
        </div>
      </TooltipProvider>
    );
  }

  if (showAnswerScreen) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <AppBar />
          <div className="flex-grow flex items-center justify-center">
            <AnswerRevealScreen
              answer={currentPuzzle.answer}
              puzzleContent={currentPuzzle.content}
              onContinue={handleContinueFromAnswer}
            />
          </div>
          <AdRail />
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className={`min-h-screen flex flex-col relative animate-fade-in ${showPuzzleContent ? 'opacity-100' : 'opacity-0'}`}>
        <AppBar />
        
        <div className="flex justify-center my-2">
          <BrainIcon className="opacity-80" />
        </div>
        
        <div className="flex-grow">
          <PuzzleCard 
            puzzleType="text"
            puzzleContent={currentPuzzle.content}
            isAnimating={isTextAnimating}
            puzzleStage={puzzleStage}
          />
          
          <HintSystem 
            totalHints={3}
            availableHints={availableHints}
            onUseHint={handleUseHint}
            currentHint={currentHint}
            onShowAnswer={handleShowAnswer}
          />
          
          <AnswerInput 
            puzzleType="text"
            onSubmit={handleSubmitAnswer}
            isCorrect={isAnswerCorrect}
            isDisabled={isDisabled}
          />
          
          <ImpactStats 
            treesToday={treesToday}
            treesTotal={treesTotal}
            activeUsers={activeUsers}
            animateIncrease={true}
            userIQ={userIQ}
          />
        </div>
        
        <AdRail />
        <Confetti active={showConfetti} />
      </div>
    </TooltipProvider>
  );
};

export default Index;
