
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={cn("mb-4", isUser ? "text-right" : "text-left")}
      data-role={message.role}
    >
      <div className="inline-block relative max-w-[85%] md:max-w-[75%]">
        <div 
          className={cn(
            "px-4 py-3 shadow-sm",
            isUser 
              ? "bg-dsapurple text-white rounded-t-lg rounded-bl-lg" 
              : "bg-secondary/80 text-white rounded-t-lg rounded-br-lg"
          )}
        >
          {isUser ? (
            <div className="text-white whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="markdown-body text-white">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                        className="rounded-md mt-2"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-dsablue px-1 py-0.5 rounded-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Style other markdown elements
                  h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-base font-bold my-2" {...props} />,
                  p: ({ node, ...props }) => <p className="my-2" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-2" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-2 my-1" {...props} />,
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="border-collapse w-full" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="bg-white/10" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-white/20 px-4 py-2 text-left" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-white/20 px-4 py-2" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className={cn("text-xs text-gray-500 block mt-1", isUser ? "text-right" : "text-left")}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
