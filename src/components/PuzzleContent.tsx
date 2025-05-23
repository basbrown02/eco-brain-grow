
import React from 'react';
import PuzzleCard from '@/components/PuzzleCard';
import HintSystem from '@/components/HintSystem';
import AnswerInput from '@/components/AnswerInput';
import ImpactStats from '@/components/ImpactStats';

interface PuzzleContentProps {
  puzzleContent: string;
  isTextAnimating: boolean;
  puzzleStage: 'daily' | 'complete';
  availableHints: number;
  currentHint?: string;
  handleUseHint: () => void;
  handleShowAnswer: () => void;
  handleSubmitAnswer: (answer: string) => void;
  isAnswerCorrect: boolean | null;
  isDisabled: boolean;
  treesToday: number;
  treesTotal: number;
  activeUsers: number;
  userIQ: number;
}

const PuzzleContent: React.FC<PuzzleContentProps> = ({
  puzzleContent,
  isTextAnimating,
  puzzleStage,
  availableHints,
  currentHint,
  handleUseHint,
  handleShowAnswer,
  handleSubmitAnswer,
  isAnswerCorrect,
  isDisabled,
  treesToday,
  treesTotal,
  activeUsers,
  userIQ
}) => {
  return (
    <>
      <div className="flex-grow pt-4">
        <PuzzleCard 
          puzzleType="text"
          puzzleContent={puzzleContent}
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
    </>
  );
};

export default PuzzleContent;
