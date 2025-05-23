
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

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
      className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}
      data-role={message.role}
    >
      <div className="inline-block relative max-w-[85%] md:max-w-[75%]">
        <div 
          className={`${
            isUser 
              ? 'bg-blue-600 text-white rounded-t-lg rounded-bl-lg shadow-lg' 
              : 'bg-gray-200 text-gray-800 rounded-t-lg rounded-br-lg shadow-lg'
          } px-4 py-3`}
        >
          {isUser ? (
            <div className="text-white whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="markdown-body text-gray-800">
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !match ? (
                      <code className="bg-gray-100 px-1 py-0.5 rounded-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                        className="rounded-md my-2 shadow-sm"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    );
                  },
                  h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-base font-bold my-2" {...props} />,
                  p: ({ node, ...props }) => <p className="my-2" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-800" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-3" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <span className={`text-xs text-gray-400 ${isUser ? 'text-right' : 'text-left'} block mt-1`}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
