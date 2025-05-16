
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import AppBar from '@/components/AppBar';
import AdRail from '@/components/AdRail';
import AppBarContent from '@/components/AppBarContent';

interface MainGameLayoutProps {
  children: React.ReactNode;
}

const MainGameLayout: React.FC<MainGameLayoutProps> = ({ children }) => {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <AppBar>
          <AppBarContent />
        </AppBar>
        <div className="flex-grow flex items-center justify-center pb-20">
          {children}
        </div>
        <AdRail />
      </div>
    </TooltipProvider>
  );
};

export default MainGameLayout;
