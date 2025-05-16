
import { useState } from 'react';

export interface UserStats {
  userIQ: number;
  userTreesTotal: number;
  streakDays: number;
  co2Reduced: number;
  iqIncrease: number;
  treesEarned: number;
  totalTreesEarned: number;
}

export function useUserStats() {
  const [userIQ, setUserIQ] = useState(100); // Starting IQ score
  const [userTreesTotal, setUserTreesTotal] = useState(5);
  const [streakDays, setStreakDays] = useState(3);
  const [co2Reduced, setCo2Reduced] = useState(20); // kg
  const [iqIncrease, setIqIncrease] = useState(3); // points
  const [treesEarned, setTreesEarned] = useState(0);
  const [totalTreesEarned, setTotalTreesEarned] = useState(0);
  
  return {
    userIQ,
    setUserIQ,
    userTreesTotal,
    setUserTreesTotal,
    streakDays,
    setStreakDays,
    co2Reduced,
    setCo2Reduced,
    iqIncrease,
    setIqIncrease,
    treesEarned,
    setTreesEarned,
    totalTreesEarned,
    setTotalTreesEarned
  };
}
