
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ImpactStatsProps {
  treesToday: number;
  treesTotal: number;
  activeUsers: number;
  animateIncrease?: boolean;
}

const ImpactStats: React.FC<ImpactStatsProps> = ({ 
  treesToday, 
  treesTotal,
  activeUsers,
  animateIncrease = false
}) => {
  const [animateToday, setAnimateToday] = useState(false);
  const [animateTotal, setAnimateTotal] = useState(false);
  const prevTreesTodayRef = useRef(treesToday);
  const prevTreesTotalRef = useRef(treesTotal);
  
  useEffect(() => {
    if (animateIncrease && treesToday > prevTreesTodayRef.current) {
      setAnimateToday(true);
      setTimeout(() => setAnimateToday(false), 1000);
    }
    prevTreesTodayRef.current = treesToday;
  }, [treesToday, animateIncrease]);
  
  useEffect(() => {
    if (animateIncrease && treesTotal > prevTreesTotalRef.current) {
      setAnimateTotal(true);
      setTimeout(() => setAnimateTotal(false), 1000);
    }
    prevTreesTotalRef.current = treesTotal;
  }, [treesTotal, animateIncrease]);

  return (
    <div className="w-full max-w-[80%] mx-auto mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <span className="text-sm text-ecobrain-charcoal/70">Trees Planted Today</span>
          <span className={cn(
            "text-lg font-bold text-ecobrain-green",
            animateToday && "animate-count-up"
          )}>
            {treesToday.toLocaleString()}
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-ecobrain-charcoal/70">Active Users</span>
          <span className="text-lg font-bold text-ecobrain-charcoal">{activeUsers.toLocaleString()}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-ecobrain-charcoal/70">Total Trees Planted</span>
          <span className={cn(
            "text-lg font-bold text-ecobrain-green",
            animateTotal && "animate-count-up"
          )}>
            {treesTotal.toLocaleString()}
          </span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-ecobrain-charcoal/70">Your Streaks</span>
          <span className="text-lg font-bold text-ecobrain-charcoal">12 Days</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
