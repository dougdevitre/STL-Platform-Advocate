import { useState, useEffect } from 'react';
import { generateWeeklyPlan } from '../lib/gemini';
import { Loader2, Calendar, Trash2 } from 'lucide-react';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import issuesData from '../data/issues.seed.json';
import { storage } from '../lib/storage';
import { useToast } from '../components/Toast';
import { WEEKLY_PLAN_MARKDOWN } from '../data/static-content';

const STORAGE_KEY = 'stl_advocate_weekly_plan';

export function WeeklyPlan() {
  const [focusIssue, setFocusIssue] = useState('');
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const savedPlan = storage.get<string | null>(STORAGE_KEY, null);
    if (savedPlan) {
      setPlan(savedPlan);
    }
  }, []);

  const handleGenerate = async () => {
    // Use static plan if no specific issue is selected (General Platform)
    if (!focusIssue) {
      setPlan(WEEKLY_PLAN_MARKDOWN);
      storage.set(STORAGE_KEY, WEEKLY_PLAN_MARKDOWN);
      showToast('New weekly plan generated!', 'success');
      return;
    }

    setLoading(true);
    setPlan(null);
    try {
      const response = await generateWeeklyPlan(focusIssue);
      if (response) {
        setPlan(response);
        storage.set(STORAGE_KEY, response);
        showToast('New weekly plan generated!', 'success');
      }
    } catch (error) {
      console.error("Failed to generate weekly plan:", error);
      showToast('Failed to generate plan. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPlan(null);
    storage.remove(STORAGE_KEY);
    showToast('Plan cleared.', 'info');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">7-Day Advocacy Plan</h1>
        <p className="text-lg text-gray-600">Stay consistent with a week of action.</p>
      </div>

      {!plan ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Focus Issue (Optional)</label>
            <select
              value={focusIssue}
              onChange={(e) => setFocusIssue(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              <option value="">General Platform (Mixed)</option>
              {issuesData.map((issue) => (
                <option key={issue.slug} value={issue.title}>{issue.title}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Building Plan...
              </>
            ) : (
              <>
                <Calendar className="-ml-1 mr-2 h-4 w-4" />
                Generate Plan
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Start Over
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MarkdownRenderer content={plan} className="prose-pink" />
          </div>
        </div>
      )}
    </div>
  );
}
