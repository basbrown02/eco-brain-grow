import React, { useState, useEffect } from 'react';
import AppBar from '@/components/AppBar';
import AdRail from '@/components/AdRail';
import Confetti from '@/components/Confetti';
import EntryScreen from '@/components/EntryScreen';
import AnswerRevealScreen from '@/components/AnswerRevealScreen';
import TreePlantingAnimation from '@/components/TreePlantingAnimation';
import CongratulationsScreen from '@/components/CongratulationsScreen';
import CompletionScreen from '@/components/CompletionScreen';
import PuzzleContent from '@/components/PuzzleContent';
import { useToast } from '@/hooks/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getTodaysDailyPuzzle } from '@/utils/puzzleUtils';
import { Puzzle } from '@/data/puzzles';

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
  
  // Tree planting animation states
  const [plantingStage, setPlantingStage] = useState<'seed' | 'watering' | 'growing' | null>(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  
  // User stats 
  const [userIQ, setUserIQ] = useState(100); // Starting IQ score
  const [userTreesTotal, setUserTreesTotal] = useState(5);
  const [streakDays, setStreakDays] = useState(3);
  const [co2Reduced, setCo2Reduced] = useState(20); // kg
  const [iqIncrease, setIqIncrease] = useState(3); // points
  
  // Track user puzzle progress
  const [puzzleStage, setPuzzleStage] = useState<'daily' | 'complete'>('daily');
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [showAnswerScreen, setShowAnswerScreen] = useState(false);
  const [treesEarned, setTreesEarned] = useState(0);
  const [totalTreesEarned, setTotalTreesEarned] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  
  // Store current puzzle
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(false);
  
  // Load a puzzle when needed
  const loadPuzzle = async () => {
    setIsLoadingPuzzle(true);
    try {
      console.log('Index: Starting to load puzzle');
      const puzzle = await getTodaysDailyPuzzle();
      console.log('Index: Received puzzle from API:', puzzle);
      setCurrentPuzzle(puzzle);
      
      // Reset puzzle state
      setAvailableHints(3);
      setCurrentHint(undefined);
      setIsAnswerCorrect(null);
    } catch (error) {
      console.error('Failed to load puzzle:', error);
      toast({
        title: "Error Loading Puzzle",
        description: "Something went wrong. Using a backup puzzle instead.",
        variant: "destructive"
      });
      
      // Get a fallback hardcoded puzzle
      const today = new Date();
      const index = (today.getFullYear() + today.getDate() + today.getMonth()) % 3;  // Use modulo of current dailyPuzzles length
      const fallbackPuzzle = {
        type: 'daily' as const,
        content: "What has a head, a tail, but no body?",
        answer: "A coin",
        hints: ["It jingles in your pocket", "You use it to pay for things", "It's made of metal"]
      };
      setCurrentPuzzle(fallbackPuzzle);
    } finally {
      setIsLoadingPuzzle(false);
    }
  };
  
  const handleStartPuzzle = async () => {
    setShowEntry(false);
    
    try {
      // Show loading state
      setIsLoadingPuzzle(true);
      setShowPuzzleContent(true); // Show container but it will display loading state
      
      // Load a new puzzle
      console.log('Starting to load puzzle from handleStartPuzzle');
      await loadPuzzle();
      console.log('Puzzle loaded successfully');
      
      // After successfully loading the puzzle, configure the UI
      setAvailableHints(3);
      setCurrentHint(undefined);
      setIsAnswerCorrect(null);
      setPuzzleStage('daily');
      
      // Start typewriter animation
      setTimeout(() => {
        setIsTextAnimating(true);
      }, 500);
    } catch (error) {
      console.error('Error in handleStartPuzzle:', error);
      // If there's an error, we'll still have the fallback puzzle from loadPuzzle
    }
  };
  
  const handleUseHint = () => {
    if (!currentPuzzle || availableHints <= 0) return;
    
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
  };

  const handleContinueFromAnswer = () => {
    // Hide answer screen
    setShowAnswerScreen(false);
    
    // Show thank you screen
    toast({
      title: "Thanks for trying!",
      description: "Come back tomorrow for another chance to plant a tree.",
      variant: "default"
    });
    
    // Return to entry screen
    setShowEntry(true);
  };

  const handlePlantingAnimationComplete = () => {
    setPlantingStage(null);
    
    // After animation completes, show the congratulations screen
    setTimeout(() => {
      setShowCongratulations(true);
      
      // Update user stats
      setUserTreesTotal(prev => prev + 1);
      setCo2Reduced(prev => prev + 7); // Each tree reduces ~7kg of CO2 annually
      setStreakDays(prev => prev + 1);
    }, 500);
  };
  
  const handleShare = () => {
    // In a real app, this would open native share dialog or copy to clipboard
    toast({
      title: "Sharing Impact",
      description: "I've planted a tree with EcoBrain! Join me in helping the planet while boosting your brain.",
      variant: "default"
    });
  };
  
  const transitionToNextStage = (treeIncrement: number) => {
    // Hide the puzzle content
    setShowPuzzleContent(false);
    setIsTextAnimating(false);
    
    // Update total trees earned
    setTotalTreesEarned(prev => prev + treeIncrement);
    
    // Store trees earned for this puzzle
    setTreesEarned(treeIncrement);
    
    // Start tree planting animation - go straight to growing
    setPlantingStage('growing');
    
    // Update total trees
    setTreesToday(prev => prev + treeIncrement);
    setTreesTotal(prev => prev + treeIncrement);
  };

  const handleContinueFromCongratulations = () => {
    // Redirect to home/entry screen
    setShowCongratulations(false);
    setShowEntry(true);
    setPuzzleStage('daily');
    setTotalTreesEarned(0);
  };
  
  const handleSubmitAnswer = (answer: string) => {
    if (!currentPuzzle) return;
    
    const normalizedUserAnswer = answer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentPuzzle.answer.toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsAnswerCorrect(correct);
    setIsDisabled(true);
    
    if (correct) {
      // Calculate trees earned based on:
      // 1. Base amount (5 trees)
      // 2. Remaining hints (each unused hint = +1 tree)
      let treeIncrement = 5; // Base amount
      
      // Add bonus for unused hints
      treeIncrement += availableHints;
      
      // Adjust IQ based on performance (faster answer, fewer hints = higher IQ boost)
      const iqBoost = Math.floor((availableHints + 1) * 2); // +2 to +6 IQ points
      setUserIQ(prev => prev + iqBoost);
      setIqIncrease(iqBoost);
      
      // Show success feedback
      setTimeout(() => {
        setShowConfetti(true);
        
        toast({
          title: "Correct Answer!",
          description: `Great job! Time to plant a tree!`,
          variant: "default"
        });
        
        // After celebration
        setTimeout(() => {
          setIsDisabled(false);
          setIsAnswerCorrect(null);
          setShowConfetti(false);
          
          // Transition to tree growth animation
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
      
      // Small IQ reduction for wrong answers
      setUserIQ(prev => Math.max(80, prev - 1)); // Prevent IQ from going below 80
    }
  };

  // Render appropriate screen based on app state
  if (showEntry) {
    return (
      <TooltipProvider>
        <EntryScreen onStartPuzzle={handleStartPuzzle} />
      </TooltipProvider>
    );
  }

  if (showCongratulations) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col overflow-y-auto">
          <AppBar />
          <div className="flex-grow flex items-center justify-center pb-20">
            <CongratulationsScreen 
              treesEarned={userTreesTotal}
              streakDays={streakDays}
              co2Reduced={co2Reduced}
              iqIncrease={iqIncrease}
              onContinue={handleContinueFromCongratulations}
              onShare={handleShare}
            />
          </div>
          <AdRail />
        </div>
      </TooltipProvider>
    );
  }
  
  if (showCompletionScreen) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col overflow-y-auto">
          <AppBar />
          <div className="flex-grow flex items-center justify-center">
            <CompletionScreen 
              treesEarned={treesEarned}
              puzzleType={puzzleStage}
              onContinue={handleContinueFromCongratulations}
              isComplete={true}
            />
          </div>
          <AdRail />
        </div>
      </TooltipProvider>
    );
  }

  if (showAnswerScreen && currentPuzzle) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col overflow-y-auto">
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
      <div className={`min-h-screen flex flex-col overflow-y-auto relative animate-fade-in ${showPuzzleContent ? 'opacity-100' : 'opacity-0'}`}>
        <AppBar />
        
        {showPuzzleContent && currentPuzzle ? (
          <PuzzleContent
            puzzleContent={currentPuzzle.content}
            isTextAnimating={isTextAnimating}
            puzzleStage={puzzleStage}
            availableHints={availableHints}
            currentHint={currentHint}
            handleUseHint={handleUseHint}
            handleShowAnswer={handleShowAnswer}
            handleSubmitAnswer={handleSubmitAnswer}
            isAnswerCorrect={isAnswerCorrect}
            isDisabled={isDisabled}
            treesToday={treesToday}
            treesTotal={treesTotal}
            activeUsers={activeUsers}
            userIQ={userIQ}
          />
        ) : showPuzzleContent && isLoadingPuzzle ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-lg">Loading your daily riddle...</p>
          </div>
        ) : null}
        
        <AdRail />
        <Confetti active={showConfetti} />
        <TreePlantingAnimation 
          stage={plantingStage} 
          onComplete={handlePlantingAnimationComplete} 
        />
      </div>
    </TooltipProvider>
  );
};

export default Index;
