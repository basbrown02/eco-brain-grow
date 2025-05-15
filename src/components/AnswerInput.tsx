
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
  puzzleType: 'text' | 'visual';
  onSubmit: (answer: string) => void;
  isCorrect?: boolean | null;
  isDisabled?: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ 
  puzzleType, 
  onSubmit,
  isCorrect,
  isDisabled = false
}) => {
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() || puzzleType === 'visual') {
      onSubmit(answer);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[80%] mx-auto mb-6">
      {puzzleType === 'text' ? (
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
      ) : (
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isDisabled}
            className={cn(
              "px-8 py-3 rounded-lg transition-all duration-200",
              isCorrect === null && "bg-ecobrain-lightgrey hover:bg-ecobrain-green/80 text-ecobrain-charcoal",
              isCorrect === true && "bg-ecobrain-green text-white",
              isCorrect === false && "bg-red-400 text-white",
              isDisabled && "opacity-60 cursor-not-allowed"
            )}
          >
            {isCorrect === null ? "Press to Submit" : 
             isCorrect === true ? "Correct!" : "Try Again"}
          </button>
        </div>
      )}
    </form>
  );
};

export default AnswerInput;
