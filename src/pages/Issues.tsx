import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import issuesData from '../data/issues.seed.json';
import { IssueCard } from '../components/IssueCard';
import { Issue } from '../types';

export function Issues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const issues: Issue[] = issuesData;

  // Update local state when URL changes
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Update URL when local state changes (debounced slightly or just on change)
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.shareTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Issue Hub</h1>
        <p className="text-lg text-gray-600">Learn the platform fast.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search issues..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filteredIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
      
      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No issues found matching "{searchQuery}".</p>
        </div>
      )}
    </div>
  );
}
