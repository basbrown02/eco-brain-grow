
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
      <Card className="bg-white rounded-2xl p-2 shadow-md border-none">
        <CardContent className="pt-4">
          <div className="space-y-6 text-center">
            <div>
              <span className="text-sm font-semibold text-[#1C2539]/80">Streak</span>
              <div className="text-2xl font-bold text-ecobrain-green">{streak}</div>
            </div>
            
            <div>
              <span className="text-sm font-semibold text-[#1C2539]/80">My trees planted</span>
              <div className="text-2xl font-bold text-ecobrain-green">{treesPlanted}</div>
              <span className="text-xs italic text-[#6E7D9A]">Top {topPercentage}%</span>
            </div>
            
            <div>
              <span className="text-sm font-semibold text-[#1C2539]/80">My CO<sub>2</sub> impact</span>
              <div className="text-2xl font-bold text-ecobrain-green">
                {co2Impact.toLocaleString()} kg
              </div>
            </div>
            
            <div>
              <span className="text-sm font-semibold text-[#1C2539]/80">IQ increase</span>
              <div className="text-2xl font-bold text-ecobrain-green">+{iqIncrease}</div>
            </div>
            
            <div className="pb-2">
              <span className="text-sm font-semibold text-[#1C2539]/80">Next tier:</span>
              <div className="text-2xl font-bold text-ecobrain-green">{nextTierReward}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
