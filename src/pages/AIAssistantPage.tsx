
import Navbar from '../components/Navbar';
import { AIChat } from '../components/AIChat';

export const AIAssistantPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] pt-16 p-2 md:p-4">
        <div className="h-full min-h-[80vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
          <AIChat />
        </div>
      </div>
    </>
  );
};
