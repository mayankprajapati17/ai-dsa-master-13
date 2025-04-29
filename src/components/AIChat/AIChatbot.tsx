
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
      // Get AI response from Gemini API
      const response = await getGeminiResponse(userMessage.content);
      
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      toast.error(error.message || 'Failed to get response from the AI');
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="bg-dsablue border border-white/10 shadow-xl">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <h2 className="text-xl font-bold">DSA Master Assistant</h2>
            </div>
            <div className="text-xs bg-dsapurple/50 px-2 py-1 rounded-full">
              Powered by Gemini AI
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
