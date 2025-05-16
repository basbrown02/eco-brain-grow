
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Charity ad data
const adData = [
  { 
    id: 1, 
    image: '/lovable-uploads/3e23f07b-5b0b-4615-876c-bb146032cb03.png', 
    alt: 'Erase Hunger campaign with child eating', 
    link: '#'
  },
  { 
    id: 2, 
    image: '/lovable-uploads/7a0395c5-c6ae-4425-b10c-7cf0faa8364c.png', 
    alt: 'School meals investment info with child', 
    link: '#'
  },
];

const AdRail: React.FC = () => {
  return (
    <div className="bg-white mt-4 mb-16">
      <ScrollArea className="w-full">
        <div className="p-4 space-y-4">
          {adData.map(ad => (
            <a 
              key={ad.id}
              href={ad.link}
              className="block w-full max-w-[70%] mx-auto rounded-lg overflow-hidden shadow-md mb-4"
            >
              <img 
                src={ad.image} 
                alt={ad.alt} 
                className="w-full h-auto object-cover"
              />
            </a>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdRail;
