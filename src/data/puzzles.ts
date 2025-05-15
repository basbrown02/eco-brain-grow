
export interface Puzzle {
  type: 'text' | 'visual';
  content: string;
  image?: string;
  answer: string;
  hints: string[];
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
    type: 'visual',
    content: "Identify the pattern and select the next shape.",
    image: "/placeholder.svg",
    answer: "circle",
    hints: [
      "Look at the number of sides.",
      "The pattern decreases by one side each time.",
      "After a triangle comes a..."
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
