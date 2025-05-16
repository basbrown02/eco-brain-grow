
import React from 'react';
import BrainIcon from '@/components/BrainIcon';
import { Button } from '@/components/ui/button';

interface AnswerRevealScreenProps {
  answer: string;
  puzzleContent: string;
  onContinue: () => void;
}

const AnswerRevealScreen: React.FC<AnswerRevealScreenProps> = ({ 
  answer, 
  puzzleContent,
  onContinue 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
      <BrainIcon className="w-16 h-16 mb-6" />
      
      <h2 className="text-2xl font-bold text-ecobrain-charcoal mb-4">
        Thanks for trying!
      </h2>
      
      <div className="mb-8 text-center max-w-md px-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <p className="text-sm text-ecobrain-charcoal/70 mb-2">The puzzle was:</p>
          <p className="text-base text-ecobrain-charcoal font-medium mb-4">{puzzleContent}</p>
          <div className="border-t pt-4">
            <p className="text-sm text-ecobrain-charcoal/70 mb-1">The answer is:</p>
            <p className="text-xl font-bold text-ecobrain-green">{answer}</p>
          </div>
        </div>
        <p className="text-ecobrain-charcoal/80 text-sm">
          Don't worry! You'll have a new chance tomorrow with a fresh puzzle.
        </p>
      </div>
      
      <Button 
        onClick={onContinue}
        className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-6 py-3 mb-20"
      >
        Continue
      </Button>
    </div>
  );
};

export default AnswerRevealScreen;
