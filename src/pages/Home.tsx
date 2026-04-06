import { Link } from 'react-router-dom';
import { BookOpen, Share2, MessageSquare, CheckCircle, Calendar } from 'lucide-react';
import { cn } from '../lib/cn';

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Let’s build a stronger Missouri—starting right here at home.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real talk. Real issues. Real neighbor-to-neighbor change.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/issues"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
        >
          <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Learn in 60 seconds</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Get the facts fast.</p>
        </Link>

        <Link
          to="/share"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
        >
          <div className="p-3 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
            <Share2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Make a Share Pack</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Create posts & texts.</p>
        </Link>

        <Link
          to="/practice"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all group"
        >
          <div className="p-3 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors">
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Practice a Conversation</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Handle objections calmly.</p>
        </Link>
        
        <Link
          to="/integrity"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all group"
        >
          <div className="p-3 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Check my message</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Verify accuracy & tone.</p>
        </Link>

        <Link
          to="/weekly"
          className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-pink-500 hover:shadow-md transition-all group sm:col-span-2 lg:col-span-1"
        >
          <div className="p-3 bg-pink-50 rounded-full group-hover:bg-pink-100 transition-colors">
            <Calendar className="h-8 w-8 text-pink-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Give me a 7-day plan</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Stay consistent.</p>
        </Link>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Unofficial Advocate Tool</h2>
        <p className="text-blue-700 mb-4">
          This app helps you share Dave Messner's platform accurately. It is not an official campaign tool.
        </p>
        <Link to="/about" className="text-sm font-medium text-blue-600 hover:text-blue-800 underline">
          Learn more & see sources
        </Link>
      </div>
    </div>
  );
}
