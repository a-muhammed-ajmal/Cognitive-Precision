'use client';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';

export default function SchulteGrid() {
  const { grid, tapCell, nextNumber } = useSchulteStore();

  return (
    <div className="mx-auto grid aspect-square w-full max-w-sm grid-cols-5 gap-2">
      {grid.map((num) => {
        const isFound = num < nextNumber;
        return (
          <button
            key={num}
            onClick={() => tapCell(num)}
            aria-label={`${num}${isFound ? ', found' : ''}`}
            className={cn(
              'tap-target relative flex items-center justify-center rounded-card border text-xl font-bold transition-colors duration-150',
              isFound
                ? 'border-success/30 bg-success/10 text-success'
                : 'border-line bg-surface text-navy hover:border-brand'
            )}
          >
            {num}
            {isFound && (
              <Check className="absolute right-1 top-1 h-3 w-3 text-success" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
}
