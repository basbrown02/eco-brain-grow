
export interface Puzzle {
  type: 'text' | 'visual' | 'interactive';
  content: string;
  image?: string;
  answer: string;
  hints: string[];
  pieces?: {id: string, x: number, y: number, width: number, height: number}[];
}

const puzzles: Puzzle[] = [
  {
    type: 'text',
    content: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "candle",
    hints: [
      "You might find me on a birthday cake.",
      "I provide light.",
      "I melt as I'm used."
    ]
  },
  {
    type: 'interactive',
    content: "Re-arrange this into a cube by swiping the mini-cubes. Can you figure it out?",
    image: "/lovable-uploads/bfadd6c8-a83f-4b3a-9210-85e269d18fbe.png",
    answer: "cube",
    hints: [
      "Try to visualize the final 3D shape.",
      "Focus on creating a perfect cube with all pieces.",
      "Group similar sized pieces together."
    ],
    pieces: [
      { id: "piece1", x: 50, y: 50, width: 60, height: 60 },
      { id: "piece2", x: 120, y: 50, width: 60, height: 60 },
      { id: "piece3", x: 50, y: 120, width: 60, height: 60 },
      { id: "piece4", x: 120, y: 120, width: 60, height: 60 },
      { id: "piece5", x: 190, y: 85, width: 60, height: 60 }
    ]
  },
  {
    type: 'text',
    content: "What gets wetter as it dries?",
    answer: "towel",
    hints: [
      "You use me after a shower.",
      "I'm made of absorbent material.",
      "I remove moisture from surfaces."
    ]
  },
  {
    type: 'interactive',
    content: "Arrange the blocks to form the correct pattern",
    answer: "pattern",
    hints: [
      "Look for symmetry in the design.",
      "The pattern has rotational properties.",
      "Try to align similar shapes together."
    ],
    pieces: [
      { id: "piece1", x: 50, y: 80, width: 70, height: 70 },
      { id: "piece2", x: 130, y: 80, width: 70, height: 70 },
      { id: "piece3", x: 210, y: 80, width: 70, height: 70 },
      { id: "piece4", x: 90, y: 160, width: 70, height: 70 },
      { id: "piece5", x: 170, y: 160, width: 70, height: 70 }
    ]
  },
  {
    type: 'text',
    content: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "map",
    hints: [
      "I help you navigate.",
      "I show you where things are located.",
      "I represent the world on paper."
    ]
  },
  {
    type: 'visual',
    content: "What number completes the sequence: 1, 4, 9, 16, 25, ?",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800",
    answer: "36",
    hints: [
      "Think of square numbers.",
      "Each number is a perfect square.",
      "What is 6 squared?"
    ]
  },
  {
    type: 'text',
    content: "The more you take, the more you leave behind. What am I?",
    answer: "footsteps",
    hints: [
      "Think about walking.",
      "I'm created when you move.",
      "You make these as you travel."
    ]
  }
];

export default puzzles;
