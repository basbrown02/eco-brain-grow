
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Tag, Tree } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
      <Link to="/" className="flex flex-col items-center">
        <Home 
          size={24}
          className={isActive('/') ? 'text-ecobrain-green' : 'text-gray-500'} 
        />
        <span className={`text-xs mt-1 ${isActive('/') ? 'text-ecobrain-green font-medium' : 'text-gray-500'}`}>
          Home
        </span>
      </Link>
      
      <Link to="/eco-pass" className="flex flex-col items-center">
        <Trophy 
          size={24}
          className={isActive('/eco-pass') ? 'text-ecobrain-green' : 'text-gray-500'} 
        />
        <span className={`text-xs mt-1 ${isActive('/eco-pass') ? 'text-ecobrain-green font-medium' : 'text-gray-500'}`}>
          Eco-Pass
        </span>
      </Link>
      
      <Link to="/my-forest" className="flex flex-col items-center">
        <Tree
          size={24}
          className={isActive('/my-forest') ? 'text-ecobrain-green' : 'text-gray-500'} 
        />
        <span className={`text-xs mt-1 ${isActive('/my-forest') ? 'text-ecobrain-green font-medium' : 'text-gray-500'}`}>
          My Forest
        </span>
      </Link>
      
      <Link to="/pricing" className="flex flex-col items-center">
        <Tag 
          size={24}
          className={isActive('/pricing') ? 'text-ecobrain-green' : 'text-gray-500'} 
        />
        <span className={`text-xs mt-1 ${isActive('/pricing') ? 'text-ecobrain-green font-medium' : 'text-gray-500'}`}>
          Pricing
        </span>
      </Link>
    </div>
  );
};

export default BottomNav;
