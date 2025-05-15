
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
  puzzleType: 'text';
  onSubmit: (answer: string) => void;
  isCorrect?: boolean | null;
  isDisabled?: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ 
  onSubmit,
  isCorrect,
  isDisabled = false
}) => {
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[80%] mx-auto mb-6">
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer..."
        disabled={isDisabled}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2",
          isCorrect === true && "border-ecobrain-green focus:ring-ecobrain-green",
          isCorrect === false && "border-red-300 focus:ring-red-300",
          isDisabled && "bg-gray-100 opacity-70"
        )}
      />
    </form>
  );
};

export default AnswerInput;
