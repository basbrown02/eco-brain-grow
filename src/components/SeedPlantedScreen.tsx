
import React from 'react';
import { Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrainIcon from '@/components/BrainIcon';

interface SeedPlantedScreenProps {
  onContinue: () => void;
}

const SeedPlantedScreen: React.FC<SeedPlantedScreenProps> = ({
  onContinue,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <BrainIcon className="w-12 h-12 opacity-80 mr-3" />
        <Sprout className="w-14 h-14 text-ecobrain-green" strokeWidth={2} />
      </div>

      <h2 className="text-2xl font-bold text-ecobrain-charcoal mb-4">
        Seed Planted!
      </h2>

      <div className="mb-8 text-center max-w-md px-4">
        <div className="bg-ecobrain-green/10 rounded-lg p-6 mb-6">
          <p className="text-ecobrain-charcoal text-lg">
            One more correct puzzle to complete planting your daily tree.
          </p>
        </div>
        <p className="text-ecobrain-charcoal/70 text-sm">
          Keep going! Your brain and the planet will thank you.
        </p>
      </div>

      <Button
        onClick={onContinue}
        className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-6 py-3"
      >
        Continue to Next Puzzle
      </Button>
    </div>
  );
};

export default SeedPlantedScreen;
