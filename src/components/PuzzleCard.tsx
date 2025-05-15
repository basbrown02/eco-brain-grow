
import React from 'react';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PuzzleCardProps {
  puzzleType: 'text' | 'visual';
  puzzleContent: string;
  puzzleImage?: string;
  isAnimating?: boolean;
  puzzleIndex: number;
  totalPuzzles: number;
  onChangeIndex: (direction: 'prev' | 'next') => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ 
  puzzleType, 
  puzzleContent,
  puzzleImage,
  isAnimating = false,
  puzzleIndex,
  totalPuzzles,
  onChangeIndex
}) => {
  return (
    <div className="w-full max-w-[80%] mx-auto bg-white rounded-lg shadow-sm p-6 mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onChangeIndex('prev')}
          disabled={puzzleIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm font-medium">
          Puzzle {puzzleIndex + 1} of {totalPuzzles}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onChangeIndex('next')}
          disabled={puzzleIndex === totalPuzzles - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {puzzleType === 'visual' && puzzleImage && (
        <div className="w-full aspect-square mb-4 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          <img 
            src={puzzleImage} 
            alt="Visual puzzle" 
            className="w-full h-full object-contain"
          />
        </div>
      )}
      
      {puzzleType === 'text' && (
        <div className="text-center py-8">
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
      )}
    </div>
  );
};

export default PuzzleCard;
