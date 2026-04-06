import { Menu, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/issues?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} className="p-2 -ml-2 rounded-md hover:bg-gray-100 lg:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-blue-700">
            <span className="bg-blue-100 text-blue-700 p-1 rounded-md text-sm font-mono">STL</span>
            <span className="hidden sm:inline">Advocate</span>
          </Link>
        </div>
        
        <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-xs w-full ml-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              placeholder="Search issues..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
}
