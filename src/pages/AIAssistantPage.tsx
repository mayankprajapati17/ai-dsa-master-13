
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const AIAssistantPage = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  // Check for API key in the environment or session storage on component mount
  useEffect(() => {
    const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const sessionApiKey = sessionStorage.getItem('gemini-api-key');
    
    if (envApiKey || sessionApiKey) {
      setHasApiKey(true);
      
      // If there's a session key but no environment key, set it for this session
      if (sessionApiKey && !envApiKey) {
        // @ts-ignore - This is a runtime modification for demo purposes
        window.env = window.env || {};
        // @ts-ignore
        window.env.VITE_GEMINI_API_KEY = sessionApiKey;
      }
    }
  }, []);

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    // Store API key in session storage (not visible in code)
    sessionStorage.setItem('gemini-api-key', apiKey);
    // Update environment variable for this session
    // @ts-ignore - This is a runtime modification for demo purposes
    window.env = window.env || {};
    // @ts-ignore
    window.env.VITE_GEMINI_API_KEY = apiKey;

    setHasApiKey(true);
    toast.success("API key stored for this session");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-16 flex-grow">
        {!hasApiKey ? (
          <div className="container max-w-md mx-auto px-4 py-8">
            <Card className="p-6 bg-dsablue border border-white/10 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Enter your Gemini API Key</h2>
              <p className="mb-4 text-sm text-gray-300">
                To use the DSA Master AI Assistant, you need a Google Gemini API key.
                Get your API key from{" "}
                <a 
                  href="https://ai.google.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dsapurple hover:underline"
                >
                  Google AI Studio
                </a>.
              </p>
              <div className="space-y-4">
                <Input 
                  type="password"
                  placeholder="Enter your Gemini API key" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-dsablue-light border-white/10"
                />
                <Button 
                  onClick={handleApiKeySubmit}
                  className="w-full bg-dsapurple hover:bg-dsapurple-dark"
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <AIAssistant />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistantPage;
