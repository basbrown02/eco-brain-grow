
import React, { useState, useEffect } from 'react';
import { Sprout, TreeDeciduous } from 'lucide-react';

interface TreePlantingAnimationProps {
  stage: 'seed' | 'watering' | 'growing' | null;
  onComplete?: () => void;
}

const TreePlantingAnimation: React.FC<TreePlantingAnimationProps> = ({ 
  stage,
  onComplete
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    if (stage) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        if (onComplete) onComplete();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);
  
  if (!stage) return null;
  
  const renderAnimationContent = () => {
    switch (stage) {
      case 'seed':
        return (
          <div className="flex flex-col items-center">
            <div className="mb-6 relative h-48 w-48">
              <div className="absolute bottom-0 w-full h-20 bg-ecobrain-hintgrey rounded-md"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-ecobrain-charcoal/80 rounded-full mb-1 animate-bounce"></div>
                <div className="w-2 h-12 bg-ecobrain-green origin-bottom animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 w-full flex justify-center">
                <div className="bg-ecobrain-charcoal/20 w-24 h-6 rounded-full"></div>
              </div>
            </div>
            <p className="text-lg text-ecobrain-charcoal font-medium">Planting your seed...</p>
          </div>
        );
      
      case 'watering':
        return (
          <div className="flex flex-col items-center">
            <div className="mb-6 relative h-48 w-48">
              <div className="absolute bottom-0 w-full h-20 bg-ecobrain-hintgrey rounded-md"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <Sprout className="text-ecobrain-green w-12 h-12 animate-pulse" strokeWidth={2.5} />
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-2 bg-ecobrain-charcoal/30 rounded-full mb-1"></div>
                <div className="flex space-x-1 animate-bounce">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-0.5 h-20 bg-ecobrain-charcoal/20 origin-top"
                      style={{ 
                        animationDelay: `${i * 100}ms`,
                        transform: `rotate(${(i - 2) * 5}deg)`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-lg text-ecobrain-charcoal font-medium">Watering your plant...</p>
          </div>
        );
      
      case 'growing':
        return (
          <div className="flex flex-col items-center">
            <div className="mb-6 relative h-48 w-48">
              <div className="absolute bottom-0 w-full h-20 bg-ecobrain-hintgrey rounded-md"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scale-in-center">
                <TreeDeciduous className="text-ecobrain-green w-24 h-24" strokeWidth={2} />
              </div>
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full bg-ecobrain-green/30 animate-pulse"
                    style={{
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      top: `${Math.random() * 60 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 200}ms`,
                      animationDuration: `${Math.random() * 2 + 1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-lg text-ecobrain-charcoal font-medium">Your tree is growing!</p>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className={`fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center transition-opacity duration-500 ${animationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center p-8 rounded-lg animate-fade-in">
        {renderAnimationContent()}
      </div>
    </div>
  );
};

export default TreePlantingAnimation;
