
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import SuggestedPrompts from './SuggestedPrompts';
import { toast } from '@/components/ui/sonner';
import { getGeminiResponse } from '@/utils/geminiService';

// Types for our messages
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
    
    // Focus back on textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    try {
      // Call the Gemini API for response
      const response = await getGeminiResponse(userMessage.content);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      toast.error(error.message || 'Failed to get response from the AI');
    } finally {
      setIsLoading(false);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="bg-gradient-to-br from-dsablue to-dsablue/90 border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-dsapurple p-2 rounded-full flex items-center justify-center">
                <Badge variant="outline" className="border-white text-white px-2 py-0.5 bg-transparent">AI</Badge>
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">DSA Master Assistant</h2>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col h-[70vh] md:h-[65vh]">
          {/* Chat messages area */}
          <ScrollArea className="flex-grow p-4 bg-gradient-to-b from-transparent to-black/10">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="text-4xl mb-4 bg-dsapurple/20 p-4 rounded-full">👨‍💻</div>
                <h3 className="text-xl font-bold mb-2 text-white">Welcome to DSA Master Assistant</h3>
                <p className="text-gray-300 mb-6 max-w-md">
                  Your AI-powered guide to mastering data structures and algorithms. Ask anything from basic concepts to complex problem-solving strategies.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-left p-4 rounded-lg bg-dsapurple/20 border border-dsapurple/30 my-2 animate-pulse">
                    <Loader size={16} className="animate-spin text-dsapurple" />
                    <p className="text-sm text-white">DSA Master is thinking...</p>
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </ScrollArea>
          
          {/* Suggested prompts */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <SuggestedPrompts onPromptClick={handlePromptClick} />
            
            {/* Input area */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-end gap-2 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about DSA..."
                  className="min-h-[80px] resize-none pr-12 bg-dsablue-light border-white/10 focus:border-dsapurple focus:ring-1 focus:ring-dsapurple/50"
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
                  className="bg-dsapurple hover:bg-dsapurple-dark shadow-lg shadow-dsapurple/20 transition-all duration-300"
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

export default AIAssistant;
