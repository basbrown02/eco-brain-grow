
import React, { useEffect, useState } from 'react';

type Period = 'day' | 'week' | 'month' | 'year';

interface TreePosition {
  x: number;
  y: number;
}

interface ForestVisualizationProps {
  period: Period;
  treeCount: number;
  isWinter: boolean;
}

const ForestVisualization: React.FC<ForestVisualizationProps> = ({ 
  period, 
  treeCount,
  isWinter 
}) => {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [period, treeCount, isWinter]);

  // 5×5 isometric grid inside the 256-px cube
  // Coordinates guarantee every sprite's base sits inside the visible top surface
  const GRID: TreePosition[] = [
    {x: 26, y: 48}, {x: 78, y: 32}, {x: 130, y: 48}, {x: 182, y: 32}, {x: 234, y: 48},
    {x: 50, y: 96}, {x: 102, y: 80}, {x: 154, y: 96}, {x: 206, y: 80},
    {x: 26, y: 144}, {x: 78, y: 128}, {x: 130, y: 144}, {x: 182, y: 128}, {x: 234, y: 144},
    {x: 50, y: 192}, {x: 102, y: 176}, {x: 154, y: 192}, {x: 206, y: 176},
    {x: 78, y: 224}, {x: 130, y: 240}, {x: 182, y: 224}
  ];  // 21 safe spots

  // Base island image based on season
  const getBaseIslandImage = () => {
    if (isWinter) {
      return "/lovable-uploads/a55f8157-2b90-49d0-9da6-bc08fa0a8f54.png"; // Snow covered island
    } else {
      return "/lovable-uploads/a55f8157-2b90-49d0-9da6-bc08fa0a8f54.png"; // Using same green island base for now
    }
  };

  // Render trees or sad sign based on count
  const renderTreesOrSign = () => {
    if (treeCount === 0) {
      // Render sad sign when no trees
      return (
        <div 
          className="absolute"
          style={{
            top: '104px',
            left: '104px',
            width: '48px',
            height: '48px',
            zIndex: 2
          }}
        >
          <img 
            src="/lovable-uploads/99e8996e-3919-4ba8-960d-662701345c7b.png" 
            alt="Sad sign" 
            className="w-full h-full object-contain"
          />
        </div>
      );
    } else {
      // Calculate how many trees to show (limit to available positions)
      const treesToShow = Math.min(treeCount, GRID.length);
      
      // Optional shuffle for variety
      const shuffledPositions = [...GRID]
        .sort(() => 0.5 - Math.random())
        .slice(0, treesToShow);
      
      return shuffledPositions.map((pos, idx) => (
        <div 
          key={idx}
          className="absolute transition-all"
          style={{
            top: `${pos.y}px`,
            left: `${pos.x}px`,
            width: '48px',
            height: '72px',
            marginLeft: '-24px',   // center sprite on x
            marginTop: '-72px',    // base aligned to cell
            zIndex: 2,
            animation: animated ? `grow 320ms ${idx * 80}ms ease-out forwards` : 'none'
          }}
        >
          <img 
            src="/lovable-uploads/1b4c0d77-a0f6-411a-91a9-ae129bef4e48.png" 
            alt={`Tree ${idx + 1}`} 
            className="w-full h-full object-contain"
          />
        </div>
      ));
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div 
        className={`relative w-[256px] h-[256px] mt-8 transition-all duration-300 overflow-hidden rounded-lg ${
          animated ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
        }`}
        style={{ 
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
          zIndex: 1
        }}
        aria-label={`Island showing ${treeCount} trees planted in ${period}`}
      >
        {/* Base island image */}
        <img 
          src={getBaseIslandImage()} 
          alt="Forest island base"
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
        
        {/* Tree layer */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          {renderTreesOrSign()}
        </div>
        
        {/* Snow effect for winter */}
        {isWinter && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-snowfall"
                style={{
                  top: `-${Math.random() * 20}px`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.6 + Math.random() * 0.4,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForestVisualization;
