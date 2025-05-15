
import React from 'react';
import BrainIcon from '@/components/BrainIcon';
import { Button } from '@/components/ui/button';

interface CompletionScreenProps {
  treesEarned: number;
  puzzleType: string;
  onContinue: () => void;
  isComplete?: boolean;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ 
  treesEarned, 
  puzzleType, 
  onContinue, 
  isComplete = false 
}) => {
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
        <Button 
          onClick={onContinue}
          className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-6 py-3 rounded-full text-lg hover:scale-105 transition-all"
        >
          Continue
        </Button>
      ) : (
        <p className="text-ecobrain-charcoal/80 text-center max-w-xs">
          Come back tomorrow for a new daily puzzle and continue your streak!
        </p>
      )}
    </div>
  );
};

export default CompletionScreen;
