
import React from 'react';
import Confetti from '@/components/Confetti';
import EntryScreen from '@/components/EntryScreen';
import AnswerRevealScreen from '@/components/AnswerRevealScreen';
import TreePlantingAnimation from '@/components/TreePlantingAnimation';
import CongratulationsScreen from '@/components/CongratulationsScreen';
import SeedPlantedScreen from '@/components/SeedPlantedScreen';
import CompletionScreen from '@/components/CompletionScreen';
import PuzzleContent from '@/components/PuzzleContent';
import MainGameLayout from '@/components/screens/MainGameLayout';
import { usePuzzleState } from '@/hooks/usePuzzleState';
import { useUserStats } from '@/hooks/useUserStats';
import { useAppStats } from '@/hooks/useAppStats';
import { useScreenNavigation } from '@/hooks/useScreenNavigation';
import { calculateTreesEarned, calculateIQAdjustment, showCorrectAnswerFeedback, 
         showIncorrectAnswerFeedback, showHintUsedFeedback, handleShareAction } from '@/utils/puzzleHandlers';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  // State hooks
  const {
    currentPuzzle, isLoadingPuzzle, isAnswerCorrect, setIsAnswerCorrect,
    showPuzzleContent, setShowPuzzleContent, isTextAnimating, setIsTextAnimating,
    availableHints, setAvailableHints, currentHint, setCurrentHint, 
    isDisabled, setIsDisabled, puzzleStage, setPuzzleStage, resetPuzzleState
  } = usePuzzleState();
  
  const {
    userIQ, setUserIQ, userTreesTotal, setUserTreesTotal, 
    streakDays, setStreakDays, co2Reduced, setCo2Reduced, 
    iqIncrease, setIqIncrease, treesEarned, setTreesEarned,
    totalTreesEarned, setTotalTreesEarned
  } = useUserStats();
  
  const {
    treesToday, setTreesToday, treesTotal, setTreesTotal, activeUsers
  } = useAppStats();
  
  const {
    showEntry, setShowEntry, showCongratulations, setShowCongratulations,
    showSeedPlanted, setShowSeedPlanted, showCompletionScreen, setShowCompletionScreen,
    showAnswerScreen, setShowAnswerScreen, showConfetti, setShowConfetti,
    plantingStage, setPlantingStage
  } = useScreenNavigation();
  
  // Handler functions
  const handleStartPuzzle = () => {
    setShowEntry(false);
    
    // After entry screen fades out, show the puzzle screen
    setTimeout(() => {
      setShowPuzzleContent(true);
      setPuzzleStage('daily');
      resetPuzzleState();
      
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
      showHintUsedFeedback();
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
        resetPuzzleState();
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
    handleShareAction();
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
      resetPuzzleState();
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
      // Calculate trees earned
      const treeIncrement = calculateTreesEarned(
        puzzleStage, 
        availableHints,
        currentPuzzle.difficultyLevel
      );
      
      // Adjust IQ based on performance
      if (puzzleStage === 'custom') {
        const iqBoost = calculateIQAdjustment(puzzleStage, true, availableHints);
        setUserIQ(prev => prev + iqBoost);
        setIqIncrease(iqBoost);
      }
      
      // Show success feedback
      setTimeout(() => {
        setShowConfetti(true);
        
        showCorrectAnswerFeedback();
        
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
      
      showIncorrectAnswerFeedback();
      
      // Small IQ reduction for wrong answers on custom puzzles
      if (puzzleStage === 'custom') {
        setUserIQ(prev => Math.max(80, prev - 1)); // Prevent IQ from going below 80
      }
    }
  };

  // Render appropriate screen based on app state
  if (showEntry) {
    return (
      <EntryScreen onStartPuzzle={handleStartPuzzle} />
    );
  }

  if (showCongratulations) {
    return (
      <MainGameLayout>
        <CongratulationsScreen 
          treesEarned={userTreesTotal}
          streakDays={streakDays}
          co2Reduced={co2Reduced}
          iqIncrease={iqIncrease}
          onContinue={handleContinueFromCongratulations}
          onShare={handleShare}
        />
      </MainGameLayout>
    );
  }
  
  if (showSeedPlanted) {
    return (
      <MainGameLayout>
        <SeedPlantedScreen onContinue={handleContinueFromSeedPlanted} />
      </MainGameLayout>
    );
  }
  
  if (showCompletionScreen) {
    return (
      <MainGameLayout>
        <CompletionScreen 
          treesEarned={treesEarned}
          puzzleType={puzzleStage}
          onContinue={handleContinueFromSeedPlanted}
          isComplete={puzzleStage === 'custom'}
        />
      </MainGameLayout>
    );
  }

  if (showAnswerScreen && currentPuzzle) {
    return (
      <MainGameLayout>
        <AnswerRevealScreen
          answer={currentPuzzle.answer}
          puzzleContent={currentPuzzle.content}
          onContinue={handleContinueFromAnswer}
        />
      </MainGameLayout>
    );
  }

  return (
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
  );
};

export default Index;
