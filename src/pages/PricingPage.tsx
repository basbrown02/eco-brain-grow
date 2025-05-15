
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@/components/AppBar';
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetPlan = (plan: string) => {
    setIsTransitioning(true);
    
    toast({
      title: plan === 'free' ? "Already on Free Plan" : "Premium Plan Selected",
      description: plan === 'free' 
        ? "You're already enjoying our free plan!" 
        : "Thanks for your interest! Premium features would be activated here.",
      variant: "default",
    });
    
    // For demo purposes, just navigate back after a delay
    if (plan === 'premium') {
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setIsTransitioning(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isTransitioning ? 'opacity-50 transition-opacity duration-500' : 'opacity-100 animate-fade-in'}`}>
      <AppBar />
      
      <div className="flex-grow px-4 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-ecobrain-charcoal mb-3">Subscription Plans</h1>
        <p className="text-ecobrain-charcoal/70 mb-10 text-center">
          Choose the right plan to maximize your impact on the planet and your mind
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-bold">Free plan</h2>
              <p className="text-gray-500">Free for life.</p>
              <div className="mt-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green/10 p-1">
                    <Check className="h-4 w-4 text-ecobrain-green" />
                  </div>
                  <span className="ml-2">1 tree per day donated</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green/10 p-1">
                    <Check className="h-4 w-4 text-ecobrain-green" />
                  </div>
                  <span className="ml-2">Ads</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green/10 p-1">
                    <Check className="h-4 w-4 text-ecobrain-green" />
                  </div>
                  <span className="ml-2">2 riddles</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleGetPlan('free')} 
                className="w-full py-6 bg-white hover:bg-gray-50 text-ecobrain-charcoal border border-gray-300"
              >
                Get Free Plan
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className="border-2 border-ecobrain-green bg-ecobrain-green/10 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-bold">Charity</h2>
              <p className="text-gray-500">All essentials to maximise your wealth</p>
              <div className="mt-4">
                <span className="text-5xl font-bold">$10</span>
                <span className="text-gray-500">/month</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2">2 trees donated a day</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2">No Ads</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2">Unlimited puzzles</span>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-ecobrain-green p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2">Eco rewards and tier multiplier</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleGetPlan('premium')} 
                className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white"
              >
                Get Advanced Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Button 
          onClick={() => navigate(-1)}
          className="mt-10 bg-ecobrain-charcoal/10 hover:bg-ecobrain-charcoal/20 text-ecobrain-charcoal"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PricingPage;
