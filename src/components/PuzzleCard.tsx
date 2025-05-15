
import React, { useState, useRef, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface PuzzleCardProps {
  puzzleType: 'text' | 'visual' | 'interactive';
  puzzleContent: string;
  puzzleImage?: string;
  isAnimating?: boolean;
  puzzleIndex: number;
  totalPuzzles: number;
  onChangeIndex: (direction: 'prev' | 'next') => void;
  puzzlePieces?: {id: string, x: number, y: number, width: number, height: number}[];
  answer?: string;
  onPuzzleSolved?: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ 
  puzzleType, 
  puzzleContent,
  puzzleImage,
  isAnimating = false,
  puzzleIndex,
  totalPuzzles,
  onChangeIndex,
  puzzlePieces = [],
  answer,
  onPuzzleSolved
}) => {
  const [activePiece, setActivePiece] = useState<string | null>(null);
  const [pieces, setPieces] = useState(puzzlePieces);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Initialize puzzle pieces when they change
  useEffect(() => {
    setPieces(puzzlePieces);
  }, [puzzlePieces, puzzleIndex]);

  // Track container size for responsive positioning
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };
    
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    
    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []);

  // Handle mouse/touch down on a puzzle piece
  const handlePieceDown = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    setActivePiece(id);
    
    // Get current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setStartPos({ x: clientX, y: clientY });
  };

  // Handle mouse/touch move
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!activePiece || !containerRef.current) return;
    
    // Get current position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate the difference
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    // Update the position
    setPieces(pieces.map(piece => {
      if (piece.id === activePiece) {
        const containerRect = containerRef.current!.getBoundingClientRect();
        const newX = Math.max(0, Math.min(containerRect.width - piece.width, piece.x + deltaX));
        const newY = Math.max(0, Math.min(containerRect.height - piece.height, piece.y + deltaY));
        
        return {
          ...piece,
          x: newX,
          y: newY
        };
      }
      return piece;
    }));
    
    // Reset the start position for the next movement
    setStartPos({ x: clientX, y: clientY });
    
    // Check if puzzle is solved
    checkSolution();
  };
  
  // Handle mouse/touch up or leave
  const handlePointerUp = () => {
    setActivePiece(null);
  };
  
  // Reset puzzle to initial state
  const resetPuzzle = () => {
    setPieces(puzzlePieces);
  };
  
  // Check if the puzzle is solved
  const checkSolution = () => {
    // Simple check - this would be replaced with actual solution checking logic
    // For example, checking if pieces are in the correct positions
    if (onPuzzleSolved && pieces.every(piece => 
      // Example condition - this would be customized per puzzle
      Math.abs(piece.x - piece.width) < 20 && Math.abs(piece.y - piece.height) < 20
    )) {
      onPuzzleSolved();
    }
  };

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
      
      {puzzleType === 'interactive' && (
        <div 
          className="w-full aspect-square mb-4 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden"
          ref={containerRef}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchEnd={handlePointerUp}
        >
          <div className="absolute top-2 right-2 z-10">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={resetPuzzle}
              className="bg-white/80 hover:bg-white"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
          
          {pieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute bg-black cursor-move select-none"
              style={{
                left: `${piece.x}px`,
                top: `${piece.y}px`,
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                zIndex: activePiece === piece.id ? 10 : 1,
                transition: activePiece === piece.id ? 'none' : 'all 0.2s',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
              onMouseDown={(e) => handlePieceDown(piece.id, e)}
              onTouchStart={(e) => handlePieceDown(piece.id, e)}
            />
          ))}
          
          <div className="text-center p-4 absolute bottom-0 left-0 right-0 bg-white/75">
            {puzzleContent}
          </div>
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
