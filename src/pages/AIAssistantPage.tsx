
import React from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import Footer from '@/components/Footer';

const AIAssistantPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-16 flex-grow">
        <AIAssistant />
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistantPage;
