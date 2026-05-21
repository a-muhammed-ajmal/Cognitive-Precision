'use client';
import { useEffect, useState } from 'react';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';

export default function TimerDisplay() {
  const { startTime, isActive } = useSchulteStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && startTime) {
      interval = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  return (
    <div className={`font-mono text-2xl ${elapsed > 30 ? 'text-red-500' : 'text-gray-700'}`}>
      {elapsed.toFixed(2)}s
    </div>
  );
}
