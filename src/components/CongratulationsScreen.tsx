
import React from 'react';
import { TreeDeciduous, Share, Award, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrainIcon from '@/components/BrainIcon';
import { Link } from 'react-router-dom';

interface CongratulationsScreenProps {
  treesEarned: number;
  streakDays: number;
  co2Reduced: number;
  iqIncrease: number;
  onContinue: () => void;
  onShare: () => void;
}

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({
  treesEarned,
  streakDays,
  co2Reduced,
  iqIncrease,
  onContinue,
  onShare,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <BrainIcon className="w-12 h-12 opacity-80 mr-4" />
        <TreeDeciduous className="w-16 h-16 text-ecobrain-green" strokeWidth={2} />
      </div>

      <h2 className="text-2xl font-bold text-ecobrain-charcoal mb-4">
        Congratulations!
      </h2>

      <div className="mb-6 text-center max-w-md px-4">
        <div className="bg-ecobrain-green/10 rounded-lg p-6 mb-4">
          <p className="text-ecobrain-charcoal text-lg mb-3">
            You've planted a tree today!
          </p>
          <p className="text-ecobrain-charcoal/80">
            Thanks for doing good for your brain and the planet.
          </p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm px-4">
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
          <div className="text-ecobrain-green mb-1">
            <TreeDeciduous className="w-6 h-6" />
          </div>
          <p className="text-xs text-ecobrain-charcoal/70">Total Trees</p>
          <p className="text-xl font-bold text-ecobrain-charcoal">{treesEarned}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
          <div className="text-ecobrain-green mb-1">
            <Award className="w-6 h-6" />
          </div>
          <p className="text-xs text-ecobrain-charcoal/70">Streak</p>
          <p className="text-xl font-bold text-ecobrain-charcoal">{streakDays} days</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
          <div className="text-ecobrain-green mb-1">
            <Activity className="w-6 h-6" />
          </div>
          <p className="text-xs text-ecobrain-charcoal/70">CO₂ Reduced</p>
          <p className="text-xl font-bold text-ecobrain-charcoal">{co2Reduced} kg</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
          <div className="text-ecobrain-green mb-1">
            <BrainIcon className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-xs text-ecobrain-charcoal/70">IQ Increase</p>
          <p className="text-xl font-bold text-ecobrain-charcoal">+{iqIncrease}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-3 mb-8">
        <Button
          onClick={onShare}
          className="bg-ecobrain-charcoal hover:bg-ecobrain-charcoal/90 text-white px-6 py-3"
        >
          <Share className="mr-2 h-4 w-4" />
          Share Your Impact
        </Button>
        
        <Button
          onClick={onContinue}
          className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-6 py-3"
        >
          Continue
        </Button>
        
        <Link to="/pricing" className="mt-4">
          <Button
            className="bg-ecobrain-green/10 hover:bg-ecobrain-green/20 text-ecobrain-green border border-ecobrain-green/30 px-6 py-3"
          >
            Want to plant more trees?
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CongratulationsScreen;
