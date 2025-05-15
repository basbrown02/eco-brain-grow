
import React from 'react';
import { Button } from '@/components/ui/button';
import { Book, BookOpen } from 'lucide-react';
import ApiKeyInput from './ApiKeyInput';

interface AppBarContentProps {
  onOpenSettings?: () => void;
}

const AppBarContent: React.FC<AppBarContentProps> = ({ onOpenSettings }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-ecobrain-green" />
        <span className="font-bold text-ecobrain-green">EcoBrain</span>
      </div>
      
      <div className="flex items-center gap-2">
        <ApiKeyInput />
        {onOpenSettings && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onOpenSettings}
            aria-label="Settings"
          >
            <Book className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppBarContent;
