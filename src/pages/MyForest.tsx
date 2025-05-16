
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PeriodSwitcher from '@/components/PeriodSwitcher';
import ForestVisualization from '@/components/ForestVisualization';
import StatsCard from '@/components/StatsCard';

type Period = 'day' | 'week' | 'month' | 'year';

const MyForest: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Check if current month is December or January for winter theme
  const isWinter = currentDate.getMonth() === 11 || currentDate.getMonth() === 0;
  
  // Stats based on the mockup data (these would come from your state/API in a real app)
  const [stats, setStats] = useState({
    streak: 42,
    treesPlantedTotal: 321,
    treesPlantedPeriod: 13, // Changes based on period
    percentileText: "Top 2%",
    co2Impact: 50000,
    iqIncrease: 12,
    nextTierReward: '50% off GYG burrito',
    lastPuzzleCorrect: false
  });
  
  // When period changes, adjust trees for that period
  useEffect(() => {
    // Mock logic - in reality would come from API/state
    const treesForPeriod = {
      day: 1,
      week: 5,
      month: 13,
      year: stats.treesPlantedTotal
    };
    
    setStats(prev => ({
      ...prev,
      treesPlantedPeriod: treesForPeriod[activePeriod]
    }));
  }, [activePeriod]);
  
  const handlePeriodChange = (period: Period) => {
    setActivePeriod(period);
    // Add haptic feedback if browser supports it
    if (navigator.vibrate) {
      navigator.vibrate(10); // light impact
    }
  };
  
  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch(activePeriod) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };
  
  const handleShare = () => {
    toast.success("Sharing forest stats!");
    // Add medium haptic feedback if browser supports it
    if (navigator.vibrate) {
      navigator.vibrate(20); // medium impact
    }
  };
  
  // Effect to handle puzzle success scenario
  useEffect(() => {
    if (stats.lastPuzzleCorrect) {
      // Update stats after correct puzzle
      setStats(prev => ({
        ...prev,
        treesPlantedTotal: prev.treesPlantedTotal + 1,
        treesPlantedPeriod: prev.treesPlantedPeriod + 1,
        co2Impact: prev.co2Impact + 4,
        iqIncrease: prev.iqIncrease + 2,
        lastPuzzleCorrect: false
      }));
    }
  }, [stats.lastPuzzleCorrect]);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      {/* App Bar */}
      <div className="flex items-center justify-between p-4">
        <Link to="/" aria-label="Back to home">
          <ArrowLeft className="text-[#1C2539]" />
        </Link>
        <div className="flex items-center">
          <span className="font-semibold text-xl">Overview</span>
          <ChevronDown className="w-4 h-4 ml-1 text-[#1C2539]" />
        </div>
        <button 
          onClick={handleShare}
          aria-label="Share forest stats"
        >
          <Share2 className="text-[#1C2539]" />
        </button>
      </div>
      
      {/* Period Switcher */}
      <PeriodSwitcher 
        activePeriod={activePeriod}
        onPeriodChange={handlePeriodChange}
        currentDate={currentDate}
        onDateChange={handleDateChange}
      />
      
      {/* Forest Visualization */}
      <ForestVisualization 
        period={activePeriod}
        treeCount={stats.treesPlantedPeriod}
        isWinter={isWinter}
      />
      
      {/* Stats Card */}
      <StatsCard 
        streak={stats.streak}
        treesPlanted={stats.treesPlantedTotal}
        topPercentage={parseInt(stats.percentileText.split(' ')[1])}
        co2Impact={stats.co2Impact}
        iqIncrease={stats.iqIncrease}
        nextTierReward={stats.nextTierReward}
      />
    </div>
  );
};

export default MyForest;
