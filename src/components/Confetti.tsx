
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    size: number;
    color: string;
    speed: number;
    rotation: number;
  }>>([]);
  
  useEffect(() => {
    if (!active) return;
    
    const colors = ['#34C34A', '#E7A8B0', '#FFD166', '#118AB2'];
    const newParticles = Array.from({ length: 40 }).map((_, index) => ({
      id: index,
      x: Math.random() * 100, // percentage across screen
      size: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.8 + Math.random() * 1,
      rotation: Math.random() * 360
    }));
    
    setParticles(newParticles);
    
    // Clear particles after animation completes
    const timer = setTimeout(() => {
      setParticles([]);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [active]);
  
  if (particles.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bottom-0 animate-confetti"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${1 / particle.speed}s`,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: particle.id % 3 === 0 ? '50%' : '0'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
