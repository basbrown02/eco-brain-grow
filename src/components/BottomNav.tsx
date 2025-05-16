
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Tag, Trees } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2 px-4 flex justify-around items-center z-50">
      <Link to="/" className="flex flex-col items-center">
        <Home 
          size={24}
          className={isActive('/') ? 'text-ecobrain-green' : 'text-white'} 
        />
        <span className={`text-xs mt-1 ${isActive('/') ? 'text-ecobrain-green font-medium' : 'text-white'}`}>
          Home
        </span>
      </Link>
      
      <Link to="/eco-pass" className="flex flex-col items-center">
        <Trophy 
          size={24}
          className={isActive('/eco-pass') ? 'text-ecobrain-green' : 'text-white'} 
        />
        <span className={`text-xs mt-1 ${isActive('/eco-pass') ? 'text-ecobrain-green font-medium' : 'text-white'}`}>
          Eco-Pass
        </span>
      </Link>
      
      <Link to="/my-forest" className="flex flex-col items-center">
        <Trees
          size={24}
          className={isActive('/my-forest') ? 'text-ecobrain-green' : 'text-white'} 
        />
        <span className={`text-xs mt-1 ${isActive('/my-forest') ? 'text-ecobrain-green font-medium' : 'text-white'}`}>
          My Forest
        </span>
      </Link>
      
      <Link to="/pricing" className="flex flex-col items-center">
        <Tag 
          size={24}
          className={isActive('/pricing') ? 'text-ecobrain-green' : 'text-white'} 
        />
        <span className={`text-xs mt-1 ${isActive('/pricing') ? 'text-ecobrain-green font-medium' : 'text-white'}`}>
          Pricing
        </span>
      </Link>
    </div>
  );
};

export default BottomNav;
