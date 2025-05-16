
import React from 'react';

interface StatsCardProps {
  streak: number;
  treesPlanted: number;
  topPercentage: number;
  co2Impact: number;
  iqIncrease: number;
  nextTierReward: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  streak,
  treesPlanted,
  topPercentage,
  co2Impact,
  iqIncrease,
  nextTierReward
}) => {
  return (
    <div className="w-full px-4">
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <div className="mb-3">
          <span className="text-sm font-semibold text-[#1C2539]">Streak</span>
          <div className="text-lg font-bold text-[#20B47B]">{streak}</div>
        </div>
        
        <div className="mb-3">
          <span className="text-sm font-semibold text-[#1C2539]">My trees planted</span>
          <div className="text-lg font-bold text-[#20B47B]">{treesPlanted}</div>
          <span className="text-xs italic text-[#6E7D9A]">Top {topPercentage}%</span>
        </div>
        
        <div className="mb-3">
          <span className="text-sm font-semibold text-[#1C2539]">My CO₂ impact</span>
          <div className="text-lg font-bold text-[#20B47B]">
            {co2Impact.toLocaleString()} kg
          </div>
        </div>
        
        <div className="mb-3">
          <span className="text-sm font-semibold text-[#1C2539]">IQ increase</span>
          <div className="text-lg font-bold text-[#20B47B]">+{iqIncrease}</div>
        </div>
        
        <div>
          <span className="text-sm font-semibold text-[#1C2539]">Next tier:</span>
          <div className="text-lg font-bold text-[#20B47B]">{nextTierReward}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
