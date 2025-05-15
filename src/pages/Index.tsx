import React, { useState, useEffect } from 'react';
import AppBar from '@/components/AppBar';
import AdRail from '@/components/AdRail';
import Confetti from '@/components/Confetti';
import EntryScreen from '@/components/EntryScreen';
import AnswerRevealScreen from '@/components/AnswerRevealScreen';
import TreePlantingAnimation from '@/components/TreePlantingAnimation';
import CongratulationsScreen from '@/components/CongratulationsScreen';
import SeedPlantedScreen from '@/components/SeedPlantedScreen';
import CompletionScreen from '@/components/CompletionScreen';
import PuzzleContent from '@/components/PuzzleContent';
import AppBarContent from '@/components/AppBarContent';
import { useToast } from '@/hooks/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getTodaysDailyPuzzle, getCustomPuzzleForUser } from '@/utils/puzzleUtils';
import { hasValidApiKey } from '@/utils/geminiApi';

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
  
  // Current puzzle state
  const [currentPuzzle, setCurrentPuzzle] = useState<any>(null);
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(false);
  
  // Tree planting animation states
  const [plantingStage, setPlantingStage] = useState<'seed' | 'watering' | 'growing' | null>(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showSeedPlanted, setShowSeedPlanted] = useState(false);
  
  // User stats 
  const [userIQ, setUserIQ] = useState(100); // Starting IQ score
  const [userTreesTotal, setUserTreesTotal] = useState(5);
  const [streakDays, setStreakDays] = useState(3);
  const [co2Reduced, setCo2Reduced] = useState(20); // kg
  const [iqIncrease, setIqIncrease] = useState(3); // points
  
  // Track user puzzle progress
  const [puzzleStage, setPuzzleStage] = useState<'daily' | 'custom' | 'complete'>('daily');
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [showAnswerScreen, setShowAnswerScreen] = useState(false);
  const [treesEarned, setTreesEarned] = useState(0);
  const [totalTreesEarned, setTotalTreesEarned] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  
  // Load today's daily puzzle when the app starts
  useEffect(() => {
    const loadInitialPuzzle = async () => {
      if (!currentPuzzle && puzzleStage === 'daily') {
        setCurrentPuzzle(await getTodaysDailyPuzzle());
      }
    };
    
    loadInitialPuzzle();
    
    // Check if API key exists and show toast if not
    if (!hasValidApiKey()) {
      setTimeout(() => {
        toast({
          title: "Gemini API Key Missing",
          description: "Set your Gemini API key in the top bar to get unique puzzles.",
          duration: 6000,
        });
      }, 2000);
    }
  }, []);
  
  // Load the appropriate puzzle when puzzle stage changes
  useEffect(() => {
    const loadPuzzle = async () => {
      setIsLoadingPuzzle(true);
      try {
        if (puzzleStage === 'daily') {
          setCurrentPuzzle(await getTodaysDailyPuzzle());
        } else if (puzzleStage === 'custom') {
          setCurrentPuzzle(await getCustomPuzzleForUser(userIQ));
        }
      } catch (error) {
        console.error("Error loading puzzle:", error);
      } finally {
        setIsLoadingPuzzle(false);
      }
    };
    
    loadPuzzle();
  }, [puzzleStage, userIQ]);
  
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
    if (currentPuzzle && currentPuzzle.hints && currentPuzzle.hints[hintIndex]) {
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
      setShowCongratulations(true);
    }
  };

  const handlePlantingAnimationComplete = () => {
    setPlantingStage(null);
    
    // After animation completes, show the appropriate screen
    setTimeout(() => {
      if (puzzleStage === 'daily') {
        // Show seed planted screen after first puzzle
        setShowSeedPlanted(true);
      } else if (puzzleStage === 'custom') {
        // Show congratulations after second puzzle with full tree
        setShowCongratulations(true);
        
        // Update user stats
        setUserTreesTotal(prev => prev + 1);
        setCo2Reduced(prev => prev + 7); // Each tree reduces ~7kg of CO2 annually
        setStreakDays(prev => prev + 1);
      }
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
    
    // Start tree planting animation based on puzzle stage
    if (puzzleStage === 'daily') {
      setPlantingStage('seed');
    } else {
      setPlantingStage('growing');
    }
    
    // Update total trees
    setTreesToday(prev => prev + treeIncrement);
    setTreesTotal(prev => prev + treeIncrement);
  };
  
  const handleContinueFromSeedPlanted = () => {
    // Hide seed planted screen
    setShowSeedPlanted(false);
    
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
        setIqIncrease(iqBoost);
      }
      
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
          
          // Transition to seed planted or tree growth animation
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
        <div className="min-h-screen flex flex-col">
          <AppBar>
            <AppBarContent />
          </AppBar>
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
  
  if (showSeedPlanted) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <AppBar>
            <AppBarContent />
          </AppBar>
          <div className="flex-grow flex items-center justify-center pb-20">
            <SeedPlantedScreen onContinue={handleContinueFromSeedPlanted} />
          </div>
          <AdRail />
        </div>
      </TooltipProvider>
    );
  }
  
  if (showCompletionScreen) {
    return (
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <AppBar>
            <AppBarContent />
          </AppBar>
          <div className="flex-grow flex items-center justify-center pb-[90px]">
            <CompletionScreen 
              treesEarned={treesEarned}
              puzzleType={puzzleStage}
              onContinue={handleContinueFromSeedPlanted}
              isComplete={puzzleStage === 'custom'}
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
        <div className="min-h-screen flex flex-col">
          <AppBar>
            <AppBarContent />
          </AppBar>
          <div className="flex-grow flex items-center justify-center pb-20">
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
        <AppBar>
          <AppBarContent />
        </AppBar>
        
        {showPuzzleContent && currentPuzzle && (
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
            isDisabled={isDisabled || isLoadingPuzzle}
            treesToday={treesToday}
            treesTotal={treesTotal}
            activeUsers={activeUsers}
            userIQ={userIQ}
          />
        )}
        
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
