
import React from 'react';
import BrainIcon from './BrainIcon';

const AppBar: React.FC = () => {
  return (
    <div className="w-full py-6 flex flex-col items-center border-b border-gray-100">
      <BrainIcon className="w-14 h-14" />
    </div>
  );
};

export default AppBar;
