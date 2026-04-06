import { useState, useEffect } from 'react';
import { practiceObjection } from '../lib/gemini';
import { Accordion } from '../components/Accordion';
import { Loader2, MessageSquare } from 'lucide-react';
import { storage } from '../lib/storage';
import { PRACTICE_RESPONSES } from '../data/static-content';

const STORAGE_KEY = 'stl_advocate_practice_history';

const COMMON_OBJECTIONS = [
  "Both parties are the same.",
  "Nothing changes anyway.",
  "I’m worried about taxes going up.",
  "I don’t follow politics.",
  "Why should I care about state elections?",
];

export function Practice() {
  const [loading, setLoading] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});

  useEffect(() => {
    const savedHistory = storage.get<Record<string, any>>(STORAGE_KEY, {});
    setResponses(savedHistory);
  }, []);

  const handlePractice = async (objection: string) => {
    if (responses[objection]) return; // Already loaded

    // Check for static content first
    if (PRACTICE_RESPONSES[objection]) {
      const result = PRACTICE_RESPONSES[objection];
      const newResponses = { ...responses, [objection]: result };
      setResponses(newResponses);
      storage.set(STORAGE_KEY, newResponses);
      return;
    }
    
    setLoading(objection);
    try {
      const result = await practiceObjection(objection);
      const newResponses = { ...responses, [objection]: result };
      setResponses(newResponses);
      storage.set(STORAGE_KEY, newResponses);
    } catch (error) {
      console.error("Failed to practice objection:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Practice Conversation</h1>
        <p className="text-lg text-gray-600">Keep it classy in the Lou.</p>
      </div>

      <div className="space-y-4">
        {COMMON_OBJECTIONS.map((objection) => (
          <div key={objection} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => handlePractice(objection)}
              className="flex items-center justify-between w-full px-4 py-4 text-left font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <span className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                {objection}
              </span>
              {loading === objection && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
            </button>
            
            {responses[objection] && (
              <div className="p-6 bg-blue-50 border-t border-blue-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Respectful Reply (10s)</h4>
                  <p className="text-gray-800 italic">"{responses[objection].reply}"</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Follow-Up Question</h4>
                  <p className="text-gray-800 font-medium">{responses[objection].followUp}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">Bridge Back to Issue</h4>
                  <p className="text-gray-800">{responses[objection].bridge}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
