
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Copy, Check, Trash2 } from 'lucide-react';
import { getGeminiResponse } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from './ui/button';

interface Message {
  text: string;
  isBot: boolean;
  error?: boolean;
}

// Add proper type definitions for the code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your DSA learning assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Explain time complexity analysis",
    "How does quicksort work?",
    "Difference between BFS and DFS",
    "What are dynamic programming techniques?",
    "Explain hash table collisions",
    "Binary search tree operations"
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return;
    
    const userMessage = messageText.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        { 
          text: error.message || 'Sorry, I encountered an error. Please try again.',
          isBot: true,
          error: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const clearChat = () => {
    setMessages([
      { text: "Hi! I'm your DSA learning assistant. How can I help you today?", isBot: true },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="p-4 bg-gray-900 text-white rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-6 h-6 text-purple-300" />
          <h2 className="font-semibold text-xl">AI DSA Assistant</h2>
        </div>
        <Button 
          onClick={clearChat} 
          variant="destructive" 
          size="sm" 
          className="flex items-center gap-1"
          aria-label="Clear chat"
        >
          <Trash2 className="w-4 h-4" />
          Clear Chat
        </Button>
      </div>
      
      {messages.length === 1 && (
        <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-center">Suggested Topics</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => sendMessage(prompt)}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-lg text-sm transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            <div
              className={`max-w-[90%] p-5 rounded-lg shadow-md ${
                message.isBot
                  ? message.error 
                    ? 'bg-red-100 text-red-800 border-l-4 border-red-500'
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-l-4 border-purple-500'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {message.isBot ? (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <ReactMarkdown
                    components={{
                      code: ({ node, inline, className, children, ...props }: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeText = String(children).replace(/\n$/, '');
                        
                        return !inline ? (
                          <div className="relative group mt-6 mb-6">
                            <button
                              onClick={() => copyToClipboard(codeText, index)}
                              className="absolute right-2 top-2 p-2 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedIndex === index ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <SyntaxHighlighter
                              language={match?.[1] || 'text'}
                              style={oneDark}
                              PreTag="div"
                              className="!mt-0 rounded-lg text-base"
                              {...props}
                            >
                              {codeText}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded`} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-white text-lg">{message.text}</div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[90%] p-5 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-l-4 border-purple-500 shadow-md">
              <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex space-x-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about DSA..."
            className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base dark:bg-gray-800 dark:text-white"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            className={`bg-purple-600 text-white p-4 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
            } flex items-center justify-center`}
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
