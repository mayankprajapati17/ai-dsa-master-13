
import React from 'react';
import { Button } from '@/components/ui/button';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  "Explain recursion with an example",
  "Give me a graph problem for practice",
  "What is the time complexity of quicksort?",
  "Find the bug in this code: for(int i=0; i<=arr.length; i++) { sum += arr[i]; }"
];

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestedPrompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="bg-black/20 hover:bg-blue-600 hover:text-white text-xs md:text-sm transition-all duration-300 text-gray-700"
          onClick={() => onPromptClick(prompt)}
        >
          {prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt}
        </Button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
