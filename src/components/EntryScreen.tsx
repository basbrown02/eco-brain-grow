import React from 'react';
import { Button } from "@/components/ui/button";
import BrainIcon from './BrainIcon';

interface EntryScreenProps {
  onStartPuzzle: () => Promise<void>;
}

const EntryScreen: React.FC<EntryScreenProps> = ({ onStartPuzzle }) => {
  const handleClick = async () => {
    try {
      await onStartPuzzle();
    } catch (error) {
      console.error("Error starting puzzle:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-8">
        <div className="animate-fade-in">
          <BrainIcon className="w-32 h-32" />
        </div>
        
        <Button 
          onClick={handleClick}
          className="bg-ecobrain-green hover:bg-ecobrain-green/90 text-white px-8 py-6 rounded-full text-lg animate-fade-in opacity-0 hover:scale-105 transition-all"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          See today's puzzle
        </Button>
      </div>
    </div>
  );
};

export default EntryScreen;
