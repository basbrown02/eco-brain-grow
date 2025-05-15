
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ImpactStatsProps {
  treesToday: number;
  treesTotal: number;
  activeUsers: number;
  animateIncrease?: boolean;
  userIQ?: number;
}

const ImpactStats: React.FC<ImpactStatsProps> = ({ 
  treesToday, 
  treesTotal,
  activeUsers,
  animateIncrease = false,
  userIQ = 100
}) => {
  const [animateToday, setAnimateToday] = useState(false);
  const [animateTotal, setAnimateTotal] = useState(false);
  const [animateIQ, setAnimateIQ] = useState(false);
  const prevTreesTodayRef = useRef(treesToday);
  const prevTreesTotalRef = useRef(treesTotal);
  const prevUserIQRef = useRef(userIQ);
  
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
  
  useEffect(() => {
    if (animateIncrease && userIQ > prevUserIQRef.current) {
      setAnimateIQ(true);
      setTimeout(() => setAnimateIQ(false), 1000);
    }
    prevUserIQRef.current = userIQ;
  }, [userIQ, animateIncrease]);

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
          <span className="text-sm text-ecobrain-charcoal/70">Your Puzzle IQ</span>
          <span className={cn(
            "text-lg font-bold text-ecobrain-charcoal",
            animateIQ && "animate-count-up"
          )}>
            {userIQ}
          </span>
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
          <span className="text-sm text-ecobrain-charcoal/70">Active Users</span>
          <span className="text-lg font-bold text-ecobrain-charcoal">{activeUsers.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
