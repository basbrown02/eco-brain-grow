
import React from 'react';

interface PuzzleCardProps {
  puzzleType: 'text' | 'visual';
  puzzleContent: string;
  puzzleImage?: string;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ 
  puzzleType, 
  puzzleContent,
  puzzleImage
}) => {
  return (
    <div className="w-full max-w-[80%] mx-auto bg-white rounded-lg shadow-sm p-6 mb-6">
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
          <p className="text-base text-ecobrain-charcoal font-medium leading-relaxed">
            {puzzleContent}
          </p>
        </div>
      )}
    </div>
  );
};

export default PuzzleCard;
