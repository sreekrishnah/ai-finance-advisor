"use client";

import React from 'react';
import Image from "next/image";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Custom markdown component to render various markdown elements with proper styling
const MarkdownRenderer = ({ children }) => {
  return (
    <div className="markdown-content">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings
          h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-slate-100" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 text-slate-100" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-base font-bold mt-3 mb-2 text-slate-200" {...props} />,
          
          // Paragraphs
          p: ({node, ...props}) => <p className="text-sm md:text-base text-gray-300 leading-7 mb-3" {...props} />,
          
          // Lists
          ul: ({node, ...props}) => <ul className="list-disc list-inside text-sm md:text-base text-gray-300 mb-3 ml-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside text-sm md:text-base text-gray-300 mb-3 ml-2" {...props} />,
          li: ({node, ...props}) => <li className="mb-1 text-gray-300" {...props} />,
          
          // Code blocks
          code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 my-3 overflow-x-auto">
                <code className={className || 'text-green-400 text-xs md:text-sm'} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs md:text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          
          // Inline code
          inlineCode: ({node, ...props}) => <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-mono" {...props} />,
          
          // Blockquotes
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-3 bg-gray-900 bg-opacity-50 italic text-gray-300 rounded" {...props} />
          ),
          
          // Links
          a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
          
          // Tables
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-4 rounded-lg border border-gray-700">
              <table className="w-full border-collapse text-sm md:text-base" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => (
            <thead className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600" {...props} />
          ),
          tbody: ({node, ...props}) => (
            <tbody className="divide-y divide-gray-700" {...props} />
          ),
          tr: ({node, ...props}) => (
            <tr className="hover:bg-gray-800 transition-colors duration-200" {...props} />
          ),
          th: ({node, ...props}) => (
            <th className="px-4 py-3 text-left font-semibold text-slate-100 border-r border-gray-600 last:border-r-0" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="px-4 py-3 text-gray-300 border-r border-gray-700 last:border-r-0" {...props} />
          ),
          
          // Emphasis
          strong: ({node, ...props}) => <strong className="font-bold text-slate-100" {...props} />,
          em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
          
          // Horizontal rule
          hr: ({node, ...props}) => <hr className="my-4 border-gray-700" {...props} />,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

// This functional component represents a single chat message, 
// displaying the sender's avatar, name, and the message content.
const ChatMessage = ({ message, sender, image }) => {
  return (
    <section>
      <div className="flex items-start">
        {/* Display the sender's avatar using Next.js Image component */}
        <Image src={image} alt="" width={25} className="bg-black p-2 rounded-full mr-2" />

        {/* Message content wrapper */}
        <div className='mt-1 w-full'>
          {/* Display the sender's name */}
          <p className="uppercase text-slate-300 text-xs font-medium mb-2">{sender}</p>
          
          {/* Render the message content with custom markdown rendering */}
          <MarkdownRenderer>{message}</MarkdownRenderer>
        </div>
      </div>
      
      {/* A horizontal line to separate this message from others */}
      <hr className="w-5/6 opacity-10 m-auto my-4"></hr>
    </section>
  );
};

export default ChatMessage;
