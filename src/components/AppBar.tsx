
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrainIcon from './BrainIcon';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const AppBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full py-6 flex flex-col items-center border-b border-gray-100">
      <BrainIcon className="w-14 h-14" />
      
      <NavigationMenu className="mt-4">
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink 
                className={navigationMenuTriggerStyle()}
                active={location.pathname === "/"}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/eco-pass">
              <NavigationMenuLink 
                className={navigationMenuTriggerStyle()}
                active={location.pathname === "/eco-pass"}
              >
                Eco-Pass
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/pricing">
              <NavigationMenuLink 
                className={navigationMenuTriggerStyle()}
                active={location.pathname === "/pricing"}
              >
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AppBar;
