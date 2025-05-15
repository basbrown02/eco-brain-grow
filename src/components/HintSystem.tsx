
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HintSystemProps {
  totalHints: number;
  onUseHint: () => void;
  availableHints: number;
  currentHint?: string;
  onShowAnswer?: () => void;
}

const HintSystem: React.FC<HintSystemProps> = ({ 
  totalHints = 3, 
  onUseHint,
  availableHints,
  currentHint,
  onShowAnswer
}) => {
  const [showHint, setShowHint] = useState(false);
  const [animatingHint, setAnimatingHint] = useState<number | null>(null);

  const handleUseHint = (index: number) => {
    if (index < totalHints - availableHints) return; // Already used
    if (availableHints <= 0) return; // No hints available
    
    setAnimatingHint(index);
    setTimeout(() => {
      onUseHint();
      setShowHint(true);
      setAnimatingHint(null);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4 mb-6">
      <div className="flex gap-3">
        {Array.from({ length: totalHints }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleUseHint(index)}
            disabled={index < totalHints - availableHints}
            className={cn(
              "w-5 h-5 rounded-full transition-all duration-200",
              index < totalHints - availableHints 
                ? "bg-ecobrain-green cursor-default" 
                : "bg-ecobrain-hintgrey hover:bg-ecobrain-green/70 cursor-pointer",
              animatingHint === index && "animate-hint-flip"
            )}
            aria-label={`Hint ${index + 1}`}
          />
        ))}
      </div>
      <div className="text-sm font-medium flex items-center gap-1">
        <span>Hints</span>
        {availableHints > 0 && (
          <span className="text-ecobrain-charcoal/60">({availableHints} left)</span>
        )}
      </div>
      
      {showHint && currentHint && (
        <div className="mt-2 text-sm px-4 py-2 bg-ecobrain-green/10 rounded-md text-ecobrain-charcoal">
          {currentHint}
        </div>
      )}

      {availableHints === 0 && onShowAnswer && (
        <Button 
          onClick={onShowAnswer}
          className="mt-4 bg-ecobrain-charcoal/80 hover:bg-ecobrain-charcoal text-white"
          size="sm"
        >
          Show Answer
        </Button>
      )}
    </div>
  );
};

export default HintSystem;
