import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateSharePack } from '../lib/gemini';
import { Chips } from '../components/Chips';
import { ToneSlider } from '../components/ToneSlider';
import { CopyButton } from '../components/CopyButton';
import { Issue, Channel, Audience, Tone, Length } from '../types';
import issuesData from '../data/issues.seed.json';
import { Loader2 } from 'lucide-react';
import { PreviewCard } from '../components/PreviewCard';

export function ShareBuilder() {
  const [searchParams] = useSearchParams();
  const initialIssueSlug = searchParams.get('issue') || '';
  
  const [selectedIssue, setSelectedIssue] = useState<string>(initialIssueSlug);
  const [channel, setChannel] = useState<Channel>('X');
  const [audience, setAudience] = useState<Audience>('friend');
  const [tone, setTone] = useState<Tone>('neighborly');
  const [length, setLength] = useState<Length>('medium');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const issues: Issue[] = issuesData;

  const handleGenerate = async () => {
    if (!selectedIssue) return;
    setLoading(true);
    setResults([]);
    try {
      const issue = issues.find(i => i.slug === selectedIssue);
      if (issue) {
        const generated = await generateSharePack(issue.title, channel, audience, tone, length);
        setResults(generated);
      }
    } catch (error) {
      console.error("Failed to generate share pack:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Share Pack Builder</h1>
        <p className="text-lg text-gray-600">Create custom content in seconds.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Issue</label>
          <select
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          >
            <option value="">Choose an issue...</option>
            {issues.map((issue) => (
              <option key={issue.slug} value={issue.slug}>{issue.title}</option>
            ))}
          </select>
        </div>

        <Chips
          label="Channel"
          options={['X', 'IG', 'FB', 'LinkedIn', 'SMS', 'Email']}
          selected={channel}
          onChange={(val) => setChannel(val as Channel)}
        />

        <Chips
          label="Audience"
          options={['friend', 'undecided', 'busy parent', 'renter', 'union member', 'student', 'senior']}
          selected={audience}
          onChange={(val) => setAudience(val as Audience)}
        />

        <ToneSlider value={tone} onChange={(val) => setTone(val as Tone)} />

        <Chips
          label="Length"
          options={['short', 'medium', 'long']}
          selected={length}
          onChange={(val) => setLength(val as Length)}
        />

        <button
          onClick={handleGenerate}
          disabled={!selectedIssue || loading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            'Generate Share Pack'
          )}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Share Pack</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {results.map((result, idx) => (
              <PreviewCard key={idx} content={result} channel={channel} />
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Unofficial summary—verify with the Dave Messner campaign
          </p>
        </div>
      )}
    </div>
  );
}
