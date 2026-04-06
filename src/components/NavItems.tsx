import { Home, BookOpen, Share2, MessageSquare, CheckCircle, Calendar, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/cn';

const navItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Issue Hub', path: '/issues', icon: BookOpen },
  { label: 'Share Pack Builder', path: '/share', icon: Share2 },
  { label: 'Objection Practice', path: '/practice', icon: MessageSquare },
  { label: 'Message Integrity', path: '/integrity', icon: CheckCircle },
  { label: 'Weekly Plan', path: '/weekly', icon: Calendar },
  { label: 'About', path: '/about', icon: Info },
];

export function NavItems({ onItemClick }: { onItemClick?: () => void }) {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-blue-500" : "text-gray-400")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
