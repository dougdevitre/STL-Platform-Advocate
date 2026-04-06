import { cn } from '../lib/cn';
import { Smile, Heart, Megaphone } from 'lucide-react';

interface ToneSliderProps {
  value: 'neutral' | 'neighborly' | 'rally-ready';
  onChange: (value: 'neutral' | 'neighborly' | 'rally-ready') => void;
}

export function ToneSlider({ value, onChange }: ToneSliderProps) {
  const steps = ['neutral', 'neighborly', 'rally-ready'];
  const currentIndex = steps.indexOf(value);

  const getIcon = (step: string) => {
    switch (step) {
      case 'neutral': return Smile;
      case 'neighborly': return Heart;
      case 'rally-ready': return Megaphone;
      default: return Smile;
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Tone: <span className="text-blue-600 font-semibold capitalize">{value.replace('-', ' ')}</span></label>
      <div className="relative pt-2 pb-6">
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-100 rounded-full -translate-y-1/2" />
        <div
          className="absolute top-1/2 left-0 h-2 bg-blue-100 rounded-full -translate-y-1/2 transition-all duration-300"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max="2"
          step="1"
          value={currentIndex}
          onChange={(e) => onChange(steps[parseInt(e.target.value)] as any)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        <div className="flex justify-between relative z-10 pointer-events-none">
          {steps.map((step, index) => {
            const Icon = getIcon(step);
            const isActive = index <= currentIndex;
            const isSelected = index === currentIndex;
            
            return (
              <div key={step} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                    isActive
                      ? "bg-blue-600 text-white scale-110"
                      : "bg-white text-gray-400 border border-gray-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className={cn(
                  "absolute top-10 text-xs font-medium transition-colors whitespace-nowrap",
                  isSelected ? "text-blue-700" : "text-gray-400"
                )}>
                  {step.replace('-', ' ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
