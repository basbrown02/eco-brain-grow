
import React from 'react';
import TypewriterText from './TypewriterText';

interface PuzzleCardProps {
  puzzleType: 'text';
  puzzleContent: string;
  isAnimating?: boolean;
  puzzleStage: 'daily' | 'complete';
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ 
  puzzleType, 
  puzzleContent,
  isAnimating = false,
  puzzleStage
}) => {
  // Now we only have "Daily Puzzle"
  const getBadgeText = () => {
    return "Daily Puzzle";
  };

  return (
    <div className="w-full max-w-[90%] sm:max-w-[80%] mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 relative">
      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ecobrain-green/10 text-ecobrain-green">
          {getBadgeText()}
        </span>
      </div>

      <div className="text-center py-8 mt-4">
        {isAnimating ? (
          <TypewriterText 
            text={puzzleContent}
            className="text-base text-ecobrain-charcoal font-medium leading-relaxed"
          />
        ) : (
          <p className="text-base text-ecobrain-charcoal font-medium leading-relaxed">
            {puzzleContent}
          </p>
        )}
      </div>
    </div>
  );
};

export default PuzzleCard;
