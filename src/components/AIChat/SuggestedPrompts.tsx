
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  "Explain recursion with a factorial example",
  "How does quicksort work?",
  "What is the time complexity of binary search?",
  "Find the bug in this code: for(int i=0; i<=arr.length; i++) { sum += arr[i]; }",
  "Compare different sorting algorithms"
];

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestedPrompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className={cn(
            "bg-dsablue-light hover:bg-dsapurple hover:text-white text-xs md:text-sm border-white/10",
            "transition-all duration-300"
          )}
          onClick={() => onPromptClick(prompt)}
        >
          {prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt}
        </Button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
