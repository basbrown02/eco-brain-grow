
import { useState } from 'react';

export interface ScreenState {
  showEntry: boolean;
  showCongratulations: boolean;
  showSeedPlanted: boolean;
  showCompletionScreen: boolean;
  showAnswerScreen: boolean;
  showConfetti: boolean;
  plantingStage: 'seed' | 'watering' | 'growing' | null;
}

export function useScreenNavigation() {
  const [showEntry, setShowEntry] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showSeedPlanted, setShowSeedPlanted] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [showAnswerScreen, setShowAnswerScreen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [plantingStage, setPlantingStage] = useState<'seed' | 'watering' | 'growing' | null>(null);

  return {
    showEntry,
    setShowEntry,
    showCongratulations,
    setShowCongratulations,
    showSeedPlanted,
    setShowSeedPlanted,
    showCompletionScreen,
    setShowCompletionScreen,
    showAnswerScreen,
    setShowAnswerScreen,
    showConfetti,
    setShowConfetti,
    plantingStage,
    setPlantingStage
  };
}
