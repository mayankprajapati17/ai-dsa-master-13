
import React from 'react';
import Navbar from '@/components/Navbar';
import AIChatbot from '@/components/AIChat/AIChatbot';
import Footer from '@/components/Footer';

const AIChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-16 flex-grow">
        <AIChatbot />
      </main>
      <Footer />
    </div>
  );
};

export default AIChatPage;
