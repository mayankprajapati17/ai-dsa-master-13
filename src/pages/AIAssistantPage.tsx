
import { AIChat } from '../components/AIChat';

export const AIAssistantPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] p-2 md:p-4">
      <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        <AIChat />
      </div>
    </div>
  );
};
