
import React, { useEffect, useState } from 'react';

type Period = 'day' | 'week' | 'month' | 'year';

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

  // Determine which image to show based on period and tree count
  const getImageSource = () => {
    if (treeCount === 0) {
      return "/lovable-uploads/af5399a3-5f0b-4883-9ee2-6e81bc8633c4.png"; // Empty forest
    }
    
    if (isWinter) {
      if (period === 'week') {
        return "/lovable-uploads/af5399a3-5f0b-4883-9ee2-6e81bc8633c4.png"; // Weekly snow with single pine
      } else {
        return "/lovable-uploads/59bd4923-8448-412e-a51b-30a830ceee5a.png"; // Monthly snow with multiple trees
      }
    } else {
      // Here would be the non-winter version which isn't provided in the references
      return "/lovable-uploads/59bd4923-8448-412e-a51b-30a830ceee5a.png"; // Using the available image as fallback
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
        <img 
          src={getImageSource()} 
          alt={`Forest visualization for ${period} with ${treeCount} trees`}
          className="w-full h-full object-contain"
        />
        
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
