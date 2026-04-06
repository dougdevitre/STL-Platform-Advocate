import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, MessageSquare } from 'lucide-react';
import issuesData from '../data/issues.seed.json';
import { Issue } from '../types';
import { generateContent } from '../lib/gemini';
import { useState, useEffect } from 'react';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { ISSUE_CONTENT } from '../data/static-content';

export function IssueDetail() {
  const { slug } = useParams<{ slug: string }>();
  const issue = issuesData.find((i) => i.slug === slug) as Issue | undefined;
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (issue) {
      // Check for static content first
      if (ISSUE_CONTENT[issue.slug]) {
        setAiContent(ISSUE_CONTENT[issue.slug]);
        return;
      }

      // Fallback to AI generation if no static content
      if (!aiContent) {
        setLoading(true);
        const prompt = `
          MODE: LEARN
          Issue: ${issue.title}
          Summary: ${issue.summary}
          Key Points: ${issue.keyPoints.join(', ')}
          
          Task: Provide a "60-Second STL Summary", "Why it matters", and a "Say it out loud" script.
        `;
        
        generateContent(prompt)
          .then((text) => {
              if (text) setAiContent(text);
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }
    }
  }, [issue, aiContent]);

  if (!issue) {
    return <div className="p-8 text-center">Issue not found.</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <Link to="/issues" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Issues
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{issue.title}</h1>
        <p className="text-xl text-gray-600">{issue.summary}</p>
        
        <div className="flex flex-wrap gap-2">
            {issue.shareTags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Points</h2>
          <ul className="space-y-2">
            {issue.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Why It Matters</h2>
          <ul className="space-y-2">
            {issue.whyItMatters.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-green-500 mt-2 mr-2" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Generated Content Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <span>✨ 60-Second Explainer & Script</span>
            {loading && <span className="text-sm font-normal text-blue-600 animate-pulse">(Generating...)</span>}
        </h2>
        
        {loading ? (
            <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                <div className="h-4 bg-blue-200 rounded w-5/6"></div>
            </div>
        ) : aiContent ? (
            <MarkdownRenderer content={aiContent} className="prose-blue" />
        ) : (
            <p className="text-sm text-blue-700">Content loading failed.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-3 lg:static lg:flex-row lg:mt-8">
        <Link
          to={`/share?issue=${issue.slug}`}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors font-medium"
        >
          <Share2 className="h-5 w-5" />
          Create Share Pack
        </Link>
        <Link
          to="/practice"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full shadow-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <MessageSquare className="h-5 w-5" />
          Practice Conversation
        </Link>
      </div>
    </div>
  );
}
