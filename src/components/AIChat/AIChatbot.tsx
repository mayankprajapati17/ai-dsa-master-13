
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import SuggestedPrompts from './SuggestedPrompts';
import { toast } from '@/components/ui/sonner';

// Types for our messages
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    
    // Focus back on textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    try {
      // Simulate AI response with a delay
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateMockResponse(userMessage.content),
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
      
      // In a real implementation, you would call your API here:
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     message: input,
      //     history: messages 
      //   }),
      // });
      // const data = await response.json();
      // setMessages(prev => [...prev, { id: Date.now().toString(), content: data.message, role: 'assistant' }]);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get response from the AI');
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Handle suggested prompt click
  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle textarea key press for Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto resize textarea based on content
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  // Toggle voice input
  const toggleVoiceInput = () => {
    if (!isListening) {
      // Check if browser supports speech recognition
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        setIsListening(true);
        
        // Simulating voice recognition with a timeout
        toast.info('Listening...');
        
        // In a real app, you would implement speech recognition here
        setTimeout(() => {
          setInput(prev => prev + ' I am using voice input');
          setIsListening(false);
          toast.success('Voice input captured');
        }, 2000);
      } else {
        toast.error('Speech recognition not supported in this browser');
      }
    } else {
      setIsListening(false);
      toast.info('Voice input stopped');
    }
  };

  // Mock function to generate responses based on input
  const generateMockResponse = (input: string): string => {
    if (input.toLowerCase().includes('recursion')) {
      return "# Recursion Explained\n\nRecursion is when a function calls itself to solve a smaller version of the same problem.\n\n```javascript\nfunction factorial(n) {\n  // Base case\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  // Recursive case\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // 120\n```\n\nThis factorial function is a classic example of recursion. It calls itself with a smaller input until it reaches the base case.";
    } else if (input.toLowerCase().includes('graph')) {
      return "Here's a graph problem for you to practice:\n\n# Depth-First Search\n\nImplement a function to determine if there is a path between two nodes in a directed graph using depth-first search.\n\n```python\ndef has_path_dfs(graph, start, end, visited=None):\n    if visited is None:\n        visited = set()\n    \n    if start == end:\n        return True\n        \n    visited.add(start)\n    \n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            if has_path_dfs(graph, neighbor, end, visited):\n                return True\n                \n    return False\n\n# Example usage\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D'],\n    'C': ['D'],\n    'D': ['E'],\n    'E': []\n}\n\nprint(has_path_dfs(graph, 'A', 'E'))  # True\n```";
    } else if (input.toLowerCase().includes('bug') || input.toLowerCase().includes('debug')) {
      return "I found the bug in your code. The issue is in the loop condition:\n\n```java\n// Original buggy code\nfor (int i = 0; i <= array.length; i++) {\n    sum += array[i];\n}\n\n// Fixed code\nfor (int i = 0; i < array.length; i++) {\n    sum += array[i];\n}\n```\n\nThe original loop was causing an ArrayIndexOutOfBoundsException because arrays in Java are 0-indexed, so the valid indices are from 0 to length-1. The loop condition should be `i < array.length` instead of `i <= array.length`.";
    } else if (input.toLowerCase().includes('time complexity') || input.toLowerCase().includes('big o')) {
      return "# Time Complexity and Big O Notation\n\nTime complexity is a way to describe how the runtime of an algorithm grows with the size of the input.\n\nHere are the common Big O notations, ordered from fastest to slowest:\n\n- O(1) - Constant Time: The algorithm takes the same amount of time regardless of the input size.\n  Example: Accessing an array element by index\n\n- O(log n) - Logarithmic Time: The algorithm's runtime grows logarithmically with the input size.\n  Example: Binary search\n\n- O(n) - Linear Time: The runtime grows directly proportional to the input size.\n  Example: Simple for loop through an array\n\n- O(n log n) - Linearithmic Time: Common in efficient sorting algorithms.\n  Example: Merge sort, quicksort (average case)\n\n- O(n²) - Quadratic Time: Nested loops over the data.\n  Example: Bubble sort, insertion sort\n\n- O(2^n) - Exponential Time: The runtime doubles with each addition to the input.\n  Example: Recursive calculation of Fibonacci numbers\n\n- O(n!) - Factorial Time: The runtime grows factorially with the input size.\n  Example: Brute force solution to the traveling salesman problem";
    } else if (input.toLowerCase().includes('sort') || input.toLowerCase().includes('sorting')) {
      return "# Sorting Algorithms Comparison\n\n| Algorithm | Best Case | Average Case | Worst Case | Space Complexity | Stable |\n|-----------|-----------|--------------|------------|-----------------|--------|\n| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |\n| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |\n| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |\n| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |\n| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |\n| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |\n| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(n+k) | Yes |\n| Radix Sort | O(n*k) | O(n*k) | O(n*k) | O(n+k) | Yes |\n\nWhere:\n- n is the number of elements\n- k is the range of the input";
    } else {
      return "I'm your DSA Master AI assistant. I can help you learn data structures and algorithms by:\n\n- Explaining concepts with examples\n- Providing practice problems\n- Debugging your code\n- Giving tips on optimization\n\nTry asking me something specific about:\n- Data structures (arrays, linked lists, trees, graphs, etc.)\n- Algorithms (sorting, searching, dynamic programming, etc.)\n- Time and space complexity\n- Common coding patterns\n- Interview preparation";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="bg-dsablue border border-white/10 shadow-xl">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <h2 className="text-xl font-bold">DSA Master Assistant</h2>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col h-[70vh] md:h-[65vh]">
          {/* Chat messages area */}
          <ScrollArea className="flex-grow p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-4xl mb-4">👋</div>
                <h3 className="text-xl font-medium mb-2">Welcome to DSA Master Assistant</h3>
                <p className="text-muted-foreground mb-6">
                  Ask any question about data structures and algorithms
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-left p-4 w-3/4 rounded-lg bg-secondary/60 my-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-dsapurple rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-dsapurple rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-dsapurple rounded-full animate-bounce"></span>
                    </div>
                    <p className="text-sm">DSA Master is thinking...</p>
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </ScrollArea>
          
          {/* Suggested prompts */}
          <div className="p-4 border-t border-white/10">
            <SuggestedPrompts onPromptClick={handlePromptClick} />
            
            {/* Input area */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-end gap-2 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about DSA..."
                  className="min-h-[80px] resize-none pr-12 bg-dsablue-light border-white/10"
                  disabled={isLoading}
                />
                <div className="absolute bottom-2 right-16">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={toggleVoiceInput}
                    disabled={isLoading}
                    className="text-dsapurple hover:text-dsapurple-light"
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </Button>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-dsapurple hover:bg-dsapurple-dark"
                >
                  {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChatbot;
