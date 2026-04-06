import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/cn';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-sm max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800", className)}>
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 my-2 space-y-1" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="pl-1" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
