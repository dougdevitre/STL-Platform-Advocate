import { cn } from '../lib/cn';

interface ChipsProps<T extends string> {
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  label?: string;
}

export function Chips<T extends string>({ options, selected, onChange, label }: ChipsProps<T>) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
              selected === option
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
