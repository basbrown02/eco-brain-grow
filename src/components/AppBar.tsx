
import React from 'react';

const AppBar: React.FC = () => {
  return (
    <div className="w-full py-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">EcoBrain</h1>
      <p className="text-sm italic text-ecobrain-charcoal/70">Brainpower that plants trees.</p>
    </div>
  );
};

export default AppBar;
