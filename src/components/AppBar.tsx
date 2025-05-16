
import React from 'react';
import BrainIcon from './BrainIcon';

const AppBar: React.FC = () => {
  return (
    <div className="w-full py-4 flex justify-center border-b border-gray-100">
      <BrainIcon className="w-10 h-10" />
    </div>
  );
};

export default AppBar;
