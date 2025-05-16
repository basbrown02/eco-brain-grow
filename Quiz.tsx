import { useEffect, useState } from "react";
import { generateRiddle } from "@/lib/gemini";

const Quiz = () => {
  const [riddle, setRiddle] = useState<{
    riddle: string;
    hints: string[];
    answer: string;
  } | null>(null);

  const [shownHints, setShownHints] = useState<number>(0);

  useEffect(() => {
    generateRiddle("nature").then(setRiddle);
  }, []);

  if (!riddle) return <p className="p-4 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">🌱 Daily Riddle</h1>
      <p className="text-lg">{riddle.riddle}</p>

      {/* Show hint buttons progressively */}
      {riddle.hints.slice(0, shownHints).map((hint, index) => (
        <p key={index} className="text-sm text-gray-600">
          Hint {index + 1}: {hint}
        </p>
      ))}

      {shownHints < 3 && (
        <button
          className="bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200 transition"
          onClick={() => setShownHints(shownHints + 1)}
        >
          Show Hint {shownHints + 1}
        </button>
      )}

      {/* Reveal answer after all hints */}
      {shownHints >= 3 && (
        <details className="text-green-700 font-medium">
          <summary className="cursor-pointer underline">Reveal Answer</summary>
          <p>{riddle.answer}</p>
        </details>
      )}
    </div>
  );
};

export default Quiz;