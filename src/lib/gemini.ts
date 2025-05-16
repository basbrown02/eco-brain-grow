import { GoogleGenerativeAI } from "@google/generative-ai";

const prompt = `
Generate a clever riddle about "${topic}" and return it in **valid JSON format** like this:

{
  "riddle": "What has hands but can’t clap?",
  "hints": ["It tells time", "It hangs on a wall", "It has numbers"],
  "answer": "A clock"
}

Only return pure JSON. No commentary or extra formatting.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const raw = await response.text();
  return JSON.parse(raw);
}