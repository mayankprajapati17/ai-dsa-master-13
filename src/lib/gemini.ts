
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Configure the model with safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Configure the model with DSA-focused system prompt
const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 4096,
};

const systemPrompt = `
You are an AI assistant specialized in Data Structures and Algorithms (DSA). You help students and developers understand DSA concepts, solve coding problems, and improve their algorithmic thinking. Your responses should be:

1. Educational and informative
2. Include code examples when appropriate (in multiple languages if requested)
3. Provide step-by-step explanations
4. Focus on time and space complexity analysis
5. Mention optimization techniques when relevant

Your expertise covers:
- Basic and advanced data structures (arrays, linked lists, trees, graphs, heaps, etc.)
- Sorting and searching algorithms
- Dynamic programming
- Greedy algorithms
- Graph algorithms
- Recursion and backtracking
- Bit manipulation
- Time and space complexity analysis
- Common coding patterns for interviews
- Problem-solving approaches

Keep explanations clear for both beginners and experienced programmers.
`;

// Get response from Gemini API
export const getGeminiResponse = async (prompt: string) => {
  try {
    // For chat conversations - updated to use gemini-1.5-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{ text: 'Hi! I want to learn about DSA concepts.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Hello! I\'d be happy to help you learn about Data Structures and Algorithms (DSA). What specific concept would you like to start with?' }],
        },
      ],
    });

    // Add system prompt
    await chat.sendMessage(systemPrompt);

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error: unknown) {
    // Properly type check the error
    if (error && typeof error === 'object' && 'message' in error) {
      throw new Error(`Failed to get Gemini response: ${(error as Error).message}`);
    } else {
      throw new Error('Failed to get Gemini response: Unknown error');
    }
  }
};
