'use client';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';

export default function SchulteGrid() {
  const { grid, tapCell, nextNumber } = useSchulteStore();

  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-sm aspect-square">
      {grid.map((num) => (
        <button
          key={num}
          onClick={() => tapCell(num)}
          className={`flex items-center justify-center rounded-lg text-xl font-bold border ${
            num < nextNumber
              ? 'bg-green-200 text-green-800'
              : 'bg-white text-gray-900'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
