
import React from 'react';
import { AIChat } from './AIChat';

const AIAssistant = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="h-[80vh] shadow-2xl rounded-lg overflow-hidden">
        <AIChat />
      </div>
    </div>
  );
};

export default AIAssistant;
