
import { useState } from 'react';

export interface AppStats {
  treesToday: number;
  treesTotal: number;
  activeUsers: number;
}

export function useAppStats() {
  const [treesToday, setTreesToday] = useState(12453);
  const [treesTotal, setTreesTotal] = useState(5287401);
  const [activeUsers, setActiveUsers] = useState(32859);

  return {
    treesToday, 
    setTreesToday,
    treesTotal, 
    setTreesTotal,
    activeUsers, 
    setActiveUsers
  };
}
