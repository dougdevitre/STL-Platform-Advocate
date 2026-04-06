import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link
      to={`/issues/${issue.slug}`}
      className="block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
          {issue.title}
        </h3>
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      <p className="mt-2 text-gray-600 line-clamp-2">{issue.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {issue.shareTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
