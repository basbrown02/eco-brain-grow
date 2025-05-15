
import React, { useEffect, useState } from 'react';

// Mock ad data
const adMockData = [
  { id: 1, image: '/placeholder.svg', alt: 'Ad placeholder 1' },
  { id: 2, image: '/placeholder.svg', alt: 'Ad placeholder 2' },
  { id: 3, image: '/placeholder.svg', alt: 'Ad placeholder 3' },
  { id: 4, image: '/placeholder.svg', alt: 'Ad placeholder 4' },
];

const AdRail: React.FC = () => {
  const [visibleAds, setVisibleAds] = useState<typeof adMockData>([]);
  
  useEffect(() => {
    // Initialize with the first two ads
    setVisibleAds(adMockData.slice(0, 2));
    
    // If we have more than 2 ads, set up auto-scrolling
    if (adMockData.length > 2) {
      const interval = setInterval(() => {
        setVisibleAds(prev => {
          // Find the indices of current visible ads
          const firstIndex = adMockData.findIndex(ad => ad.id === prev[0].id);
          const secondIndex = adMockData.findIndex(ad => ad.id === prev[1].id);
          
          // Calculate next indices with wrap-around
          const nextFirstIndex = (firstIndex + 1) % adMockData.length;
          const nextSecondIndex = (secondIndex + 1) % adMockData.length;
          
          return [adMockData[nextFirstIndex], adMockData[nextSecondIndex]];
        });
      }, 5000); // Scroll every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <div className="bg-gray-50 border-t border-gray-200 h-[90px] px-3 mt-auto">
      <div className="flex justify-center items-center h-full gap-1.5">
        {visibleAds.map(ad => (
          <div 
            key={ad.id} 
            className="h-[80px] aspect-[1.6/1] bg-gray-200 rounded shadow-sm overflow-hidden flex items-center justify-center"
          >
            <img 
              src={ad.image} 
              alt={ad.alt} 
              className="w-12 h-12 opacity-50"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdRail;
