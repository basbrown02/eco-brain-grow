
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

  // Anchor point grid - these mark where each trunk touches the surface
  // Y-values measured to ensure trees never float
  const ANCHORS: TreePosition[] = [
    // Row 1 (back edge)
    {x: 38, y: 96}, {x: 92, y: 82}, {x: 146, y: 96}, {x: 200, y: 82},
    // Row 2
    {x: 64, y: 126}, {x: 118, y: 112}, {x: 172, y: 126},
    // Row 3
    {x: 38, y: 156}, {x: 92, y: 142}, {x: 146, y: 156}, {x: 200, y: 142},
    // Row 4 (front edge)
    {x: 64, y: 186}, {x: 118, y: 172}, {x: 172, y: 186}
  ]; // 15 safe cells

  // Offsets for properly positioning tree sprites
  const HALF_W = 24; // Half sprite width (48/2)
  const FULL_H = 72; // Full sprite height

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
      const treesToShow = Math.min(treeCount, ANCHORS.length);
      
      // Get positions for trees to show - deterministic order
      const positions = ANCHORS.slice(0, treesToShow);
      
      // Optional: Shuffle for variety
      // const positions = [...ANCHORS].sort(() => 0.5 - Math.random()).slice(0, treesToShow);
      
      return positions.map((pos, idx) => (
        <div 
          key={idx}
          className="absolute"
          style={{
            left: `${pos.x - HALF_W}px`,
            top: `${pos.y - FULL_H}px`,
            width: '48px',
            height: '72px',
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
        className={`relative w-[256px] h-[256px] mt-8 transition-all duration-300 overflow-hidden ${
          animated ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
        }`}
        style={{ 
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
          zIndex: 1,
          position: 'relative'
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
