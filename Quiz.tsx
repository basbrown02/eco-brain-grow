import { useEffect, useState } from "react";
import { generateRiddle } from "@/lib/gemini";
import HintSystem from "@/components/HintSystem";
import AnswerInput from "@/components/AnswerInput";

const Quiz = () => {
  const [riddle, setRiddle] = useState<{
    riddle: string;
    hints: string[];
    answer: string;
  } | null>(null);

  const [availableHints, setAvailableHints] = useState<number>(3);
  const [currentHint, setCurrentHint] = useState<string | undefined>(undefined);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    generateRiddle("nature").then(setRiddle);
  }, []);

  const handleUseHint = () => {
    if (!riddle || availableHints <= 0) return;
    
    // Calculate which hint to show (3 - availableHints gives the hint index)
    const hintIndex = 3 - availableHints;
    setCurrentHint(riddle.hints[hintIndex]);
    setAvailableHints(availableHints - 1);
  };

  const handleShowAnswer = () => {
    // This function will be called when the "Show Answer" button is clicked
    // after all hints are used
    if (!riddle) return;
    setCurrentHint(`The answer is: ${riddle.answer}`);
  };

  const handleSubmitAnswer = (answer: string) => {
    if (!riddle) return;
    
    const normalizedUserAnswer = answer.trim().toLowerCase();
    const normalizedCorrectAnswer = riddle.answer.toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsAnswerCorrect(correct);
    setIsDisabled(true);
    
    if (correct) {
      // Trigger existing correct answer logic
      // (showing details element with the answer)
      setTimeout(() => {
        setIsDisabled(false);
      }, 2000);
    } else {
      // Reset after wrong answer
      setTimeout(() => {
        setIsDisabled(false);
        setIsAnswerCorrect(null);
      }, 2000);
    }
  };

  if (!riddle) return <p className="p-4 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">🌱 Daily Riddle</h1>
      <p className="text-lg">{riddle.riddle}</p>

      <HintSystem
        totalHints={3}
        availableHints={availableHints}
        onUseHint={handleUseHint}
        currentHint={currentHint}
        onShowAnswer={handleShowAnswer}
      />

      <AnswerInput
        puzzleType="text"
        onSubmit={handleSubmitAnswer}
        isCorrect={isAnswerCorrect}
        isDisabled={isDisabled}
      />

      {isAnswerCorrect === true && (
        <details className="text-green-700 font-medium" open>
          <summary className="cursor-pointer underline">Correct!</summary>
          <p>{riddle.answer}</p>
        </details>
      )}
    </div>
  );
};

export default Quiz;