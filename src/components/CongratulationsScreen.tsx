
import React from 'react';
import { TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrainIcon from '@/components/BrainIcon';

interface CongratulationsScreenProps {
  treesEarned: number;
  onContinue: () => void;
}

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({
  treesEarned,
  onContinue,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
      <div className="flex items-center justify-center mb-8">
        <BrainIcon className="w-12 h-12 opacity-80 mr-4" />
        <TreeDeciduous className="w-16 h-16 text-ecobrain-green" strokeWidth={2} />
      </div>

      <h2 className="text-2xl font-bold text-ecobrain-charcoal mb-4">
        Congratulations!
      </h2>

      <div className="mb-8 text-center max-w-md px-4">
        <p className="text-lg mb-4">
          You've planted <span className="font-bold text-ecobrain-green">{treesEarned}</span> {treesEarned === 1 ? 'tree' : 'trees'} today!
        </p>
        <div className="bg-ecobrain-green/10 rounded-lg p-6 mb-4">
          <p className="text-ecobrain-charcoal">
            Thanks for doing good for the environment and your brain.
          </p>
        </div>
        <p className="text-ecobrain-charcoal/80 text-sm">
          Come back tomorrow for a new daily puzzle and continue your streak!
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

export default CongratulationsScreen;
