
import React from 'react';
import { Book, Lock, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// Define the data structure for our pass nodes
type NodeStatus = 'completed' | 'current' | 'locked';
type NodeIcon = 'star' | 'lock' | 'chest' | 'book' | 'trophy';

interface PassNode {
  id: number;
  title: string;
  description: string;
  status: NodeStatus;
  icon: NodeIcon;
  rewardDescription?: string;
}

// Create the pass data
const ecoPassData: PassNode[] = [
  {
    id: 1,
    title: "START",
    description: "Begin your eco journey",
    status: "current",
    icon: "star",
    rewardDescription: "Welcome reward: 50 eco points"
  },
  {
    id: 2,
    title: "Level 2",
    description: "Complete 5 daily puzzles",
    status: "locked",
    icon: "lock",
    rewardDescription: "Carbon offset badge"
  },
  {
    id: 3,
    title: "Green Treasure",
    description: "Solve 10 difficult puzzles",
    status: "locked",
    icon: "chest",
    rewardDescription: "Mystery eco gift"
  },
  {
    id: 4,
    title: "Knowledge Node",
    description: "Learn 5 climate facts",
    status: "locked",
    icon: "book",
    rewardDescription: "Digital tree certificate"
  },
  {
    id: 5,
    title: "Eco Champion",
    description: "Complete a full month",
    status: "locked",
    icon: "trophy",
    rewardDescription: "Plant a real tree in your name"
  }
];

// Helper function to render the appropriate icon
const getNodeIcon = (icon: NodeIcon, className?: string) => {
  switch (icon) {
    case 'star':
      return <Star className={className} />;
    case 'lock':
      return <Lock className={className} />;
    case 'chest':
      return <div className={cn("w-6 h-6", className)}>🧰</div>;
    case 'book':
      return <Book className={className} />;
    case 'trophy':
      return <Trophy className={className} />;
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero section with gradient */}
      <div className="bg-gradient-to-r from-ecobrain-green to-green-400 p-6 pt-20 pb-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-inter">Eco-Pass</h1>
            <p className="text-sm font-inter mt-1">Do daily puzzles to unlock rewards for doing good for the planet</p>
          </div>
          <div className="bg-yellow-100 rounded-full px-3 py-1 flex items-center space-x-2">
            <span className="text-yellow-600 text-sm font-medium">🔥 3</span>
          </div>
        </div>
      </div>

      {/* Main content with progress path */}
      <div className="flex-1 p-6">
        <div className="flex flex-col items-center max-w-sm mx-auto">
          {ecoPassData.map((node, index) => (
            <React.Fragment key={node.id}>
              {/* Node */}
              <div 
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-sm",
                  node.status === 'completed' ? "bg-ecobrain-green text-white" : 
                  node.status === 'current' ? "bg-white border-4 border-gray-200" : 
                  "bg-gray-300"
                )}
                onClick={() => handleNodeClick(node)}
              >
                {getNodeIcon(node.icon, "w-6 h-6")}
              </div>
              
              {/* Connecting line between nodes */}
              {index < ecoPassData.length - 1 && (
                <div className="h-16 w-0.5 bg-gray-200"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Bottom sheet for reward details */}
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-xl">
          {selectedNode && (
            <div className="flex flex-col items-center pt-4">
              <div className="w-20 h-20 rounded-full bg-ecobrain-green/10 flex items-center justify-center mb-4">
                {getNodeIcon(selectedNode.icon, "w-8 h-8 text-ecobrain-green")}
              </div>
              <SheetHeader className="text-center">
                <SheetTitle>{selectedNode.title}</SheetTitle>
                <SheetDescription>
                  {selectedNode.description}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 mb-4 text-center">
                <h4 className="font-medium">Reward:</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedNode.rewardDescription}</p>
              </div>
              
              <div className="flex gap-4 mt-4 w-full max-w-xs justify-center">
                <Button
                  className="bg-ecobrain-green hover:bg-ecobrain-green/90 px-6"
                  disabled={selectedNode.status === 'locked'}
                >
                  {selectedNode.status === 'locked' ? 'Locked' : 'Redeem'}
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
