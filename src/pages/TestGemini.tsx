import React, { useState, useEffect } from 'react';
import { generateRiddle } from '@/lib/gemini';
import { createPuzzleFromGeminiData } from '@/data/puzzles';

const TestGemini = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [riddle, setRiddle] = useState<{
    riddle: string;
    hints: string[];
    answer: string;
  } | null>(null);

  const tryGenerateRiddle = async () => {
    try {
      setLoading(true);
      setError(null);
      setRawResponse(null);
      
      // Try with different topics
      const topics = ['nature', 'animals', 'technology', 'food', 'space'];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      console.log('Calling generateRiddle with topic:', randomTopic);
      const result = await generateRiddle(randomTopic);
      console.log('Result:', result);
      
      if (result) {
        setRiddle(result);
        setRawResponse(JSON.stringify(result, null, 2));
      } else {
        setError('Got empty result from Gemini API');
      }
    } catch (err) {
      console.error('Error fetching riddle:', err);
      setError('Failed to generate riddle: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tryGenerateRiddle();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gemini API Test</h1>
      
      <div className="mb-4">
        <button 
          onClick={tryGenerateRiddle} 
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Try Again with New Topic'}
        </button>
      </div>
      
      {loading && <p>Loading riddle from Gemini API...</p>}
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-800 rounded-md">
          <h2 className="font-bold">Error:</h2>
          <p className="whitespace-pre-wrap">{error}</p>
        </div>
      )}
      
      {rawResponse && (
        <div className="p-4 mb-4 bg-gray-100 rounded-md">
          <h2 className="font-bold mb-2">Raw Response:</h2>
          <pre className="whitespace-pre-wrap overflow-auto">{rawResponse}</pre>
        </div>
      )}
      
      {riddle && (
        <div className="p-4 bg-green-100 text-green-800 rounded-md">
          <h2 className="font-bold mb-2">Riddle Generated:</h2>
          <p className="mb-4">{riddle.riddle}</p>
          
          <h3 className="font-bold mt-4">Hints:</h3>
          <ul className="list-disc pl-5">
            {riddle.hints && riddle.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
          
          <h3 className="font-bold mt-4">Answer:</h3>
          <p>{riddle.answer}</p>
        </div>
      )}
    </div>
  );
};

export default TestGemini; 