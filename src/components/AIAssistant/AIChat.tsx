
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, Copy, Check } from 'lucide-react';
import { getGeminiResponse } from '../../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
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

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg">
      <div className="p-4 bg-gray-900 text-white rounded-t-lg flex items-center space-x-2">
        <Bot className="w-5 h-5" />
        <h2 className="font-semibold">AI Assistant</h2>
      </div>
      
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? message.error 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-200 text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.isBot ? (
                <div className="prose max-w-none dark:prose-invert">
                  <ReactMarkdown
                    components={{
                      code: ({ node, inline, className, children, ...props }: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeText = String(children).replace(/\n$/, '');
                        
                        return !inline ? (
                          <div className="relative group">
                            <button
                              onClick={() => copyToClipboard(codeText, index)}
                              className="absolute right-2 top-2 p-1 rounded bg-gray-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
                              className="!mt-0"
                              {...props}
                            >
                              {codeText}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className={className} {...props}>
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
                message.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about DSA..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className={`bg-blue-600 text-white p-2 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
