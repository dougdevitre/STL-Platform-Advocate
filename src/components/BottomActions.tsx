import { BookOpen, Share2, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';

export function BottomActions() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white pb-safe lg:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        <Link
          to="/issues"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors",
            isActive('/issues') ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <BookOpen className="h-6 w-6" />
          <span>Learn</span>
        </Link>
        <Link
          to="/share"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors",
            isActive('/share') ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Share2 className="h-6 w-6" />
          <span>Share</span>
        </Link>
        <Link
          to="/practice"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors",
            isActive('/practice') ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <MessageSquare className="h-6 w-6" />
          <span>Practice</span>
        </Link>
      </div>
    </nav>
  );
}
