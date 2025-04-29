
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with error handling
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const RESPONSE_TEMPLATE = `
Please analyze and execute the following code. Provide your response in this format:

1. **If the user asks for a topic** (without providing code):
   - **Theoretical Explanation**: Provide an in-depth explanation of the topic.
   - **Java Code Example**: Include a relevant code snippet in Java to demonstrate the concept.
   - **Use Cases**: Explain practical applications of the topic.

   **Example Format:**
   \`\`\`java
   // Java code demonstrating the concept
   public class Example {
       public static void main(String[] args) {
           System.out.println("Hello, Java!");
       }
   }
   \`\`\`

2. **If the user provides code**:
   1. **Code Analysis**
      - Brief explanation of what the code does.
      - Key components and their purpose.
      - Logic flow explanation.

   2. **Expected Output**
      - Show the expected program output.
      - Explain any conditions or variations.

   3. **Code Quality & Improvements**
      - Potential issues or edge cases.
      - Suggested improvements.
      - Best practices.

   4. **Performance Analysis**
      - Time complexity.
      - Space complexity.
      - Performance considerations.
Please format code examples using markdown code blocks with proper syntax highlighting.
`;

export async function getGeminiResponse(prompt: string): Promise<string> {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please check your .env file.');
  }

  try {
    // Use the correct model name: 'gemini-pro'
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Sanitize and format the prompt
    const sanitizedPrompt = prompt.trim().replace(/\u0000/g, '');
    const enhancedPrompt = `${RESPONSE_TEMPLATE}\n\n${sanitizedPrompt}`;
    
    // Add timeout and safety checks
    const result = await Promise.race([
      model.generateContent(enhancedPrompt),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000)
      )
    ]);

    if (!result) {
      throw new Error('No response received from Gemini API');
    }

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response received from Gemini API');
    }

    return text;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your environment configuration.');
    }
    if (error.message?.includes('timeout')) {
      throw new Error('The request took too long to complete. Please try again.');
    }
    if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    if (error.message?.includes('blocked')) {
      throw new Error('The request was blocked. Please check your input.');
    }
    
    // Generic error with more context
    throw new Error(`Failed to get AI response: ${error.message || 'Unknown error occurred'}`);
  }
}