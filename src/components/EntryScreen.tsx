
import React from 'react';
import { Button } from "@/components/ui/button";
import BrainIcon from './BrainIcon';

interface EntryScreenProps {
  onStartPuzzle: () => void;
}

const EntryScreen: React.FC<EntryScreenProps> = ({ onStartPuzzle }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        <div className="animate-fade-in">
          <BrainIcon className="w-24 h-24 opacity-80" />
        </div>
        
        <h1 className="text-3xl font-bold text-ecobrain-charcoal animate-fade-in opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
          EcoBrain
        </h1>
        
        <p className="text-lg text-center text-ecobrain-charcoal/80 max-w-xs animate-fade-in opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
          Solve puzzles, solve the planet.
        </p>
        
        <Button 
          onClick={onStartPuzzle}
          className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-8 py-6 rounded-full text-lg animate-fade-in opacity-0 hover:scale-105 transition-all"
          style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
        >
          See today's puzzle
        </Button>
      </div>
    </div>
  );
};

export default EntryScreen;
