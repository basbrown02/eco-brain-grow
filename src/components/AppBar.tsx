
import React from 'react';
import BrainIcon from './BrainIcon';

const AppBar: React.FC = () => {
  return (
    <div className="w-full py-4 flex flex-col items-center">
      <BrainIcon className="w-16 h-16" />
    </div>
  );
};

export default AppBar;
