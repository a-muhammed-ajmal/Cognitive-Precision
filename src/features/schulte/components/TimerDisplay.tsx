'use client';
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
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

  const isSlow = elapsed > 30;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 font-mono text-2xl font-semibold',
        isSlow ? 'text-danger' : 'text-navy/70'
      )}
      role="timer"
      aria-live="polite"
    >
      <Clock className="h-5 w-5" aria-hidden="true" />
      {elapsed.toFixed(2)}s
    </div>
  );
}
