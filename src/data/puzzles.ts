
export interface Puzzle {
  type: 'daily' | 'custom';
  content: string;
  answer: string;
  hints: string[];
  difficultyLevel?: number; // Used for custom puzzles
}

// Daily puzzles that are fun, clever, or contextually relevant
const dailyPuzzles: Puzzle[] = [
  {
    type: 'daily',
    content: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
    hints: [
      "You might hear me in the mountains.",
      "I repeat what I hear.",
      "I'm a reflection of sound."
    ]
  },
  {
    type: 'daily',
    content: "Rearrange the letters in 'ELVIS' to find something he might live in.",
    answer: "lives",
    hints: [
      "It's an anagram.",
      "Think about where someone resides.",
      "The word is a verb that means 'to exist'."
    ]
  },
  {
    type: 'daily',
    content: "What 5-letter word becomes shorter when you add two letters to it?",
    answer: "short",
    hints: [
      "Think about the meaning, not just the spelling.",
      "The word describes something that isn't long.",
      "It's a play on words about length."
    ]
  }
];

// Custom puzzles based on difficulty levels
const customPuzzles: Puzzle[] = [
  // Easy (IQ level: 80-100)
  {
    type: 'custom',
    content: "I'm full of holes but still hold water. What am I?",
    answer: "sponge",
    hints: [
      "You might use me in the kitchen.",
      "I'm absorbent.",
      "I clean surfaces."
    ],
    difficultyLevel: 1
  },
  // Medium (IQ level: 100-120)
  {
    type: 'custom',
    content: "What common word has three consecutive double letters?",
    answer: "bookkeeper",
    hints: [
      "Think about spelling patterns.",
      "It's someone who works with finances.",
      "Look for repeated letters."
    ],
    difficultyLevel: 2
  },
  // Hard (IQ level: 120-140)
  {
    type: 'custom',
    content: "A man leaves home, turns left three times, and returns home to find two masked men. Who are they?",
    answer: "catcher and umpire",
    hints: [
      "Think about sports.",
      "It involves a diamond.",
      "It's a baseball scenario."
    ],
    difficultyLevel: 3
  },
  // Very Hard (IQ level: 140+)
  {
    type: 'custom',
    content: "What word sounds the same if you take away four of its five letters?",
    answer: "queue",
    hints: [
      "It's about waiting in line.",
      "Most of the letters are silent.",
      "Only one letter is pronounced."
    ],
    difficultyLevel: 4
  }
];

export { dailyPuzzles, customPuzzles };
