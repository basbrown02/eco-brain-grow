
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BrainIcon from '@/components/BrainIcon';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleGetPlan = (plan: string) => {
    setIsTransitioning(true);
    setSelectedPlan(plan);
    
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

  const PlanBullet = ({ label }: { label: string }) => (
    <div className="flex items-center mt-3">
      <div className="rounded-full bg-emerald-400 p-1 mr-2 flex-shrink-0">
        <Check className="h-4 w-4 text-white" />
      </div>
      <span className="text-[#1C2539] text-base">{label}</span>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col bg-white ${isTransitioning ? 'opacity-50 transition-opacity duration-500' : 'opacity-100 animate-fade-in'}`}>
      
      <div className="flex-grow px-4 py-6 flex flex-col items-center">
        {/* Single pricing header with proper spacing */}
        <div id="pricing-header" className="flex flex-col items-center mt-10 mb-10 z-10">
          <BrainIcon className="h-14 w-14 mb-4" />
          <h1 className="text-[28px] font-bold text-[#1C2539] text-center">
            Subscription Plans
          </h1>
          <p className="text-base text-[#6E7D9A] text-center max-w-[280px] mt-3">
            Choose a plan that grows your mind—and a forest.
          </p>
        </div>
        
        {/* Plan stack */}
        <div className="max-w-md w-full space-y-6 z-10">
          {/* Free Card */}
          <div className={`bg-white rounded-2xl p-6 shadow-md ${selectedPlan === 'free' ? 'ring-2 ring-emerald-500' : ''}`}>
            <h2 className="text-[28px] font-bold text-[#1C2539]">Free plan</h2>
            <p className="text-sm text-[#6E7D9A] mb-3">Always free.</p>
            
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-[#1C2539]">$0</span>
              <span className="text-base text-[#6E7D9A] ml-1">/month</span>
            </div>
            
            <div className="mt-4">
              <PlanBullet label="1 tree planted each day" />
              <PlanBullet label="Ads included" />
              <PlanBullet label="2 daily riddles" />
            </div>
            
            <Button 
              onClick={() => handleGetPlan('free')} 
              className="w-full h-12 rounded-[28px] mt-6 border border-[#20B47B] bg-white hover:bg-[#F5FAF7] text-[#20B47B] font-semibold"
            >
              Get Free Plan
            </Button>
          </div>
          
          {/* Charity Card */}
          <div 
            className={`bg-[#F5FAF7] rounded-2xl p-6 border-2 border-[#20B47B] 
              ${selectedPlan === 'premium' ? 'shadow-lg transform transition-all duration-300' : ''}`}
          >
            <h2 className="text-[28px] font-bold text-[#1C2539]">Charity</h2>
            <p className="text-sm text-[#6E7D9A] mb-3">
              Boost your impact—double the trees, ad-free puzzles.
            </p>
            
            <div className="flex items-baseline">
              <span className="text-5xl font-bold text-[#1C2539]">$10</span>
              <span className="text-base text-[#6E7D9A] ml-1">/month</span>
            </div>
            
            <div className="mt-4">
              <PlanBullet label="2 trees planted daily" />
              <PlanBullet label="No ads" />
              <PlanBullet label="Unlimited puzzles" />
              <PlanBullet label="Eco-rewards & tier multiplier" />
            </div>
            
            <Button 
              onClick={() => handleGetPlan('premium')} 
              className="w-full h-12 rounded-[28px] mt-6 bg-[#20B47B] hover:bg-[#20B47B]/90 text-white font-semibold"
            >
              Start Charity Plan
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate(-1)}
          className="mt-8 text-[#6E7D9A] bg-transparent hover:bg-gray-50"
          aria-label="Go back"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PricingPage;
