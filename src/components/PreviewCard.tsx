import { Channel } from '../types';
import { CopyButton } from './CopyButton';
import { Twitter, Instagram, Facebook, Linkedin, MessageCircle, Mail, User } from 'lucide-react';
import { cn } from '../lib/cn';

interface PreviewCardProps {
  content: string;
  channel: Channel;
}

export function PreviewCard({ content, channel }: PreviewCardProps) {
  const getIcon = () => {
    switch (channel) {
      case 'X': return <Twitter className="h-5 w-5 text-white" />;
      case 'IG': return <Instagram className="h-5 w-5 text-white" />;
      case 'FB': return <Facebook className="h-5 w-5 text-white" />;
      case 'LinkedIn': return <Linkedin className="h-5 w-5 text-white" />;
      case 'SMS': return <MessageCircle className="h-5 w-5 text-white" />;
      case 'Email': return <Mail className="h-5 w-5 text-white" />;
    }
  };

  const getBgColor = () => {
    switch (channel) {
      case 'X': return 'bg-black';
      case 'IG': return 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500';
      case 'FB': return 'bg-[#1877F2]';
      case 'LinkedIn': return 'bg-[#0A66C2]';
      case 'SMS': return 'bg-green-500';
      case 'Email': return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className={cn("px-4 py-3 flex items-center gap-3", getBgColor())}>
        <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
          {getIcon()}
        </div>
        <span className="font-medium text-white text-sm">{channel} Preview</span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-gray-400" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-2.5 bg-gray-100 rounded w-1/3"></div>
            <div className="h-2.5 bg-gray-50 rounded w-1/4"></div>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap flex-1 font-sans">
          {content}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-400">Character count: {content.length}</span>
        <CopyButton text={content} label="Copy" />
      </div>
    </div>
  );
}
