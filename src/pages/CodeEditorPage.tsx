
import React from 'react';
import Navbar from '@/components/Navbar';
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import Footer from '@/components/Footer';

const CodeEditorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-16 flex-grow">
        <CodeEditor />
      </main>
      <Footer />
    </div>
  );
};

export default CodeEditorPage;
