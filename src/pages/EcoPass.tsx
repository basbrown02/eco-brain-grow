import React from 'react';
import { 
  Award, 
  BookOpen, 
  ChevronDown, 
  Lock, 
  Share2, 
  Star, 
  Trophy 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

// Define the data structure for our pass nodes
type NodeStatus = 'completed' | 'current' | 'locked';
type NodeIcon = 'star' | 'lock' | 'book' | 'trophy' | 'award';

interface PassNode {
  id: number;
  title: string;
  description: string;
  status: NodeStatus;
  icon: NodeIcon;
  rewardDescription?: string;
  progress: number;
}

// Create the pass data with 20 nodes
const ecoPassData: PassNode[] = [
  {
    id: 1,
    title: "Start Your Journey",
    description: "Begin your eco journey",
    status: "completed",
    icon: "star",
    rewardDescription: "Welcome reward: 50 eco points",
    progress: 100
  },
  {
    id: 2,
    title: "First Steps",
    description: "Complete 5 daily puzzles",
    status: "current",
    icon: "star",
    rewardDescription: "Carbon offset badge",
    progress: 60
  },
  {
    id: 3,
    title: "Growing Knowledge",
    description: "Solve 10 difficult puzzles",
    status: "locked",
    icon: "lock",
    rewardDescription: "Plant a tree in your name",
    progress: 0
  },
  {
    id: 4,
    title: "Climate Scholar",
    description: "Learn 5 climate facts",
    status: "locked",
    icon: "book",
    rewardDescription: "Digital tree certificate",
    progress: 0
  },
  {
    id: 5,
    title: "Eco Champion",
    description: "Complete a full month",
    status: "locked",
    icon: "trophy",
    rewardDescription: "Plant a real tree in your name",
    progress: 0
  },
  {
    id: 6,
    title: "Conservation Expert",
    description: "Complete 15 water puzzles",
    status: "locked",
    icon: "lock",
    rewardDescription: "Water conservation badge",
    progress: 0
  },
  {
    id: 7,
    title: "Renewable Advocate",
    description: "Complete 20 energy puzzles",
    status: "locked",
    icon: "lock",
    rewardDescription: "Solar panel discount code",
    progress: 0
  },
  {
    id: 8,
    title: "Biodiversity Protector",
    description: "Learn about 10 endangered species",
    status: "locked",
    icon: "book",
    rewardDescription: "Wildlife foundation donation",
    progress: 0
  },
  {
    id: 9,
    title: "Zero Waste Hero",
    description: "Complete recycling challenge",
    status: "locked",
    icon: "lock",
    rewardDescription: "Reusable kit discount code",
    progress: 0
  },
  {
    id: 10,
    title: "Climate Activist",
    description: "Share 5 eco facts on social media",
    status: "locked",
    icon: "lock",
    rewardDescription: "Exclusive climate action stickers",
    progress: 0
  },
  {
    id: 11,
    title: "Eco Influencer",
    description: "Invite 3 friends to join",
    status: "locked",
    icon: "lock",
    rewardDescription: "Premium profile badge",
    progress: 0
  },
  {
    id: 12,
    title: "Forest Guardian",
    description: "Plant 10 virtual trees",
    status: "locked",
    icon: "lock",
    rewardDescription: "Real forest protection donation",
    progress: 0
  },
  {
    id: 13,
    title: "Ocean Defender",
    description: "Complete ocean conservation quiz",
    status: "locked",
    icon: "lock",
    rewardDescription: "Beach cleanup sponsorship",
    progress: 0
  },
  {
    id: 14,
    title: "Sustainable Traveler",
    description: "Calculate and offset travel emissions",
    status: "locked",
    icon: "lock",
    rewardDescription: "Eco-friendly travel discount",
    progress: 0
  },
  {
    id: 15,
    title: "Master Recycler",
    description: "Achieve perfect score on recycling test",
    status: "locked",
    icon: "lock",
    rewardDescription: "Zero waste starter kit",
    progress: 0
  },
  {
    id: 16,
    title: "Energy Expert",
    description: "Complete all energy efficiency puzzles",
    status: "locked",
    icon: "lock",
    rewardDescription: "Smart home energy monitor discount",
    progress: 0
  },
  {
    id: 17,
    title: "Climate Scientist",
    description: "Master all climate science quizzes",
    status: "locked",
    icon: "book",
    rewardDescription: "Exclusive climate science e-book",
    progress: 0
  },
  {
    id: 18,
    title: "Rainforest Protector",
    description: "Learn about biodiversity hotspots",
    status: "locked",
    icon: "lock",
    rewardDescription: "Rainforest protection donation",
    progress: 0
  },
  {
    id: 19,
    title: "Sustainability Maven",
    description: "Complete all sustainability challenges",
    status: "locked",
    icon: "lock",
    rewardDescription: "Sustainable living workshop access",
    progress: 0
  },
  {
    id: 20,
    title: "Climate Hero",
    description: "Reach the ultimate eco-pass level",
    status: "locked",
    icon: "trophy",
    rewardDescription: "Personalized climate impact report & premium rewards",
    progress: 0
  },
];

// Helper function to render the appropriate icon
const getNodeIcon = (icon: NodeIcon, className?: string) => {
  switch (icon) {
    case 'star':
      return <Star className={className} />;
    case 'lock':
      return <Lock className={className} />;
    case 'book':
      return <BookOpen className={className} />;
    case 'trophy':
      return <Trophy className={className} />;
    case 'award':
      return <Award className={className} />;
    default:
      return <Star className={className} />;
  }
};

const EcoPass: React.FC = () => {
  const [selectedNode, setSelectedNode] = React.useState<PassNode | null>(null);
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  const handleNodeClick = (node: PassNode) => {
    setSelectedNode(node);
    setSheetOpen(true);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white font-inter overflow-hidden">
      {/* Background overlay image - reduced opacity from 0.05 to 0.02 */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: "url('/lovable-uploads/8141c7bb-6aa8-4eff-91f9-924ff6900a39.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Hero section with gradient - reduced opacity */}
      <div className="relative bg-gradient-to-r from-ecobrain-green/90 to-green-400/90 p-6 pt-20 pb-8 text-white z-10">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold font-inter">Eco-Pass</h1>
              <ChevronDown size={18} className="ml-1 mt-1" />
            </div>
            <p className="text-sm font-inter mt-1">Complete challenges and earn rewards</p>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/20 p-2 h-auto">
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      {/* Streak display - reduced background opacity */}
      <div className="relative flex justify-center items-center py-4 bg-white/50 z-10">
        <div className="bg-ecobrain-green/10 px-6 py-2 rounded-full flex items-center">
          <Trophy className="text-ecobrain-green mr-2" size={16} />
          <span className="text-ecobrain-green font-medium">Streak: 7 days</span>
        </div>
      </div>

      {/* Main content with progress path - background made more transparent */}
      <div className="relative flex-1 px-4 pb-24 z-10">
        <ScrollArea className="h-[calc(100vh-240px)] pr-4">
          <div className="flex flex-col items-center max-w-sm mx-auto py-6">
            {ecoPassData.map((node, index) => (
              <React.Fragment key={node.id}>
                {/* Node */}
                <div 
                  className={cn(
                    "w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-md relative",
                    node.status === 'completed' ? "bg-ecobrain-green text-white" : 
                    node.status === 'current' ? "bg-white/80 border-4 border-ecobrain-green" : 
                    "bg-gray-100/60 border border-gray-200"
                  )}
                  onClick={() => handleNodeClick(node)}
                >
                  {getNodeIcon(node.icon, cn(
                    "w-8 h-8",
                    node.status === 'completed' ? "text-white" : 
                    node.status === 'current' ? "text-ecobrain-green" : 
                    "text-gray-400"
                  ))}
                  
                  {/* Progress ring for current node */}
                  {node.status === 'current' && node.progress > 0 && (
                    <div className="absolute -bottom-2 -right-2 bg-white/90 rounded-full p-1 shadow-sm">
                      <div className="w-5 h-5 rounded-full bg-ecobrain-green/20 flex items-center justify-center text-[10px] font-bold text-ecobrain-green">
                        {node.progress}%
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Title beside node */}
                <div className="mt-2 mb-1 text-center">
                  <h3 className={cn(
                    "text-sm font-medium",
                    node.status === 'locked' ? "text-gray-400" : "text-ecobrain-charcoal"
                  )}>
                    {node.title}
                  </h3>
                </div>
                
                {/* Connecting line between nodes - made more transparent */}
                {index < ecoPassData.length - 1 && (
                  <div className={cn(
                    "h-16 w-0.5 my-2",
                    ecoPassData[index + 1].status === 'locked' ? "bg-gray-200/60" : "bg-ecobrain-green/70"
                  )}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Bottom sheet for reward details */}
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl bg-white/95">
          {selectedNode && (
            <div className="flex flex-col items-center pt-6">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mb-6",
                selectedNode.status === 'completed' ? "bg-ecobrain-green text-white" : 
                selectedNode.status === 'current' ? "bg-ecobrain-green/10" : 
                "bg-gray-100"
              )}>
                {getNodeIcon(selectedNode.icon, cn(
                  "w-10 h-10",
                  selectedNode.status === 'completed' ? "text-white" : 
                  selectedNode.status === 'current' ? "text-ecobrain-green" : 
                  "text-gray-400"
                ))}
              </div>
              
              <SheetHeader className="text-center">
                <SheetTitle className="text-xl font-inter">{selectedNode.title}</SheetTitle>
                <SheetDescription className="text-base">
                  {selectedNode.description}
                </SheetDescription>
              </SheetHeader>
              
              {selectedNode.status === 'current' && (
                <div className="w-full mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-medium">{selectedNode.progress}%</span>
                  </div>
                  <Progress value={selectedNode.progress} className="h-2 bg-gray-100" />
                </div>
              )}
              
              <div className="mt-8 mb-4 text-center">
                <h4 className="font-medium text-lg">Reward:</h4>
                <p className="text-base text-gray-600 mt-2">{selectedNode.rewardDescription}</p>
              </div>
              
              <div className="flex gap-4 mt-6 w-full max-w-xs justify-center">
                <Button
                  className="bg-ecobrain-green hover:bg-ecobrain-green/90 px-6"
                  disabled={selectedNode.status === 'locked'}
                >
                  {selectedNode.status === 'completed' ? 'Claimed' : 
                   selectedNode.status === 'current' ? 'In Progress' : 'Locked'}
                </Button>
                <Button variant="outline">
                  Share
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EcoPass;
