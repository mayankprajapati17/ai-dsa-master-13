
import React from 'react';
import Navbar from '@/components/Navbar';
import Topics from '@/components/Topics';
import Footer from '@/components/Footer';

const TopicsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-16">
        <Topics />
      </main>
      <Footer />
    </div>
  );
};

export default TopicsPage;
