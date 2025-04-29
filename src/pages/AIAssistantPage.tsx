import { AIChat } from '../components/AIChat';

export const AIAssistantPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <AIChat />
      </div>
    </div>
  );
};