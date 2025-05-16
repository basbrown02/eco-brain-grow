
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

  // Tree planting positions (deterministic layout)
  const TREE_POSITIONS: TreePosition[] = [
    {x: 24, y: 56}, {x: 72, y: 40}, {x: 120, y: 56},
    {x: 168, y: 40}, {x: 48, y: 104}, {x: 96, y: 88},
    {x: 144, y: 104}, {x: 192, y: 88}, {x: 72, y: 152},
    {x: 120, y: 136}, {x: 168, y: 152}, {x: 96, y: 200},
    {x: 144, y: 200}
  ];

  // Base island image based on season
  const getBaseIslandImage = () => {
    if (isWinter) {
      return "/lovable-uploads/9f2c9542-20e9-4485-a751-e4209efc8e5f.png"; // Snow covered island
    } else {
      return "/lovable-uploads/af5399a3-5f0b-4883-9ee2-6e81bc8633c4.png"; // Green island base
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
            height: '48px'
          }}
        >
          <img 
            src="/lovable-uploads/9bf5ca4a-bfc4-46dd-8238-0ab3f8c6f76f.png" 
            alt="Sad sign" 
            className="w-full h-full object-contain"
          />
        </div>
      );
    } else {
      // Calculate how many trees to show (limit to available positions)
      const treesToShow = Math.min(treeCount, TREE_POSITIONS.length);
      
      // Get positions for trees to show
      const positions = TREE_POSITIONS.slice(0, treesToShow);
      
      return positions.map((pos, idx) => (
        <div 
          key={idx}
          className="absolute transition-all"
          style={{
            top: `${pos.y}px`,
            left: `${pos.x}px`,
            width: '48px',
            height: '72px',
            animation: animated ? `grow 300ms ${idx * 50}ms forwards` : 'none'
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
        className={`relative w-64 h-64 transition-all duration-300 ${
          animated ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
        }`}
        style={{ 
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))'
        }}
        aria-label={`Island showing ${treeCount} trees planted in ${period}`}
      >
        {/* Base island image */}
        <img 
          src={getBaseIslandImage()} 
          alt="Forest island base"
          className="w-full h-full object-contain"
        />
        
        {/* Tree layer */}
        <div className="absolute inset-0 pointer-events-none">
          {renderTreesOrSign()}
        </div>
        
        {/* Snow effect for winter */}
        {isWinter && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
