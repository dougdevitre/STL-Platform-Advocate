import { useState } from 'react';
import { checkIntegrity } from '../lib/gemini';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export function IntegrityCheck() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await checkIntegrity(text);
      if (response) setResult(response);
    } catch (error) {
      console.error("Failed to check integrity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Message Integrity Check</h1>
        <p className="text-lg text-gray-600">Ensure your message is accurate and on-brand.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Paste your draft text here
        </label>
        <textarea
          id="message"
          rows={6}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          placeholder="e.g., Rachel is going to fix all the potholes personally..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleCheck}
          disabled={!text.trim() || loading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Checking...
            </>
          ) : (
            <>
              <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
              Check Integrity
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Analysis Result
          </h2>
          <MarkdownRenderer content={result} />
        </div>
      )}
    </div>
  );
}
