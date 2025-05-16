
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTodaysDailyPuzzle, getCustomPuzzleForUser } from '@/utils/puzzleUtils';
import { hasValidApiKey } from '@/utils/geminiApi';

export interface PuzzleState {
  currentPuzzle: any;
  isLoadingPuzzle: boolean;
  isAnswerCorrect: boolean | null;
  showPuzzleContent: boolean;
  isTextAnimating: boolean;
  availableHints: number;
  currentHint: string | undefined;
  isDisabled: boolean;
  puzzleStage: 'daily' | 'custom' | 'complete';
}

export function usePuzzleState() {
  const { toast } = useToast();
  const [currentPuzzle, setCurrentPuzzle] = useState<any>(null);
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showPuzzleContent, setShowPuzzleContent] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [availableHints, setAvailableHints] = useState(3);
  const [currentHint, setCurrentHint] = useState<string | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState(false);
  const [puzzleStage, setPuzzleStage] = useState<'daily' | 'custom' | 'complete'>('daily');

  // Check API key on mount
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
  }, [puzzleStage]);

  const resetPuzzleState = () => {
    setAvailableHints(3);
    setCurrentHint(undefined);
    setIsAnswerCorrect(null);
  };

  return {
    currentPuzzle,
    setCurrentPuzzle,
    isLoadingPuzzle,
    setIsLoadingPuzzle,
    isAnswerCorrect,
    setIsAnswerCorrect,
    showPuzzleContent,
    setShowPuzzleContent,
    isTextAnimating,
    setIsTextAnimating,
    availableHints,
    setAvailableHints,
    currentHint,
    setCurrentHint,
    isDisabled,
    setIsDisabled,
    puzzleStage,
    setPuzzleStage,
    resetPuzzleState
  };
}
