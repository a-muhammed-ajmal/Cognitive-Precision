'use client';
import { useEffect, useRef } from 'react';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';
import SchulteGrid from '@/src/features/schulte/components/SchulteGrid';
import TimerDisplay from '@/src/features/schulte/components/TimerDisplay';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const { startGame, isActive, nextNumber } = useSchulteStore();
  const router = useRouter();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isActive) {
      hasStartedRef.current = true;
      return;
    }
    if (hasStartedRef.current) {
      router.push('/results');
    }
  }, [isActive, router]);

  return (
    <main className="graph-bg flex min-h-screen flex-col items-center bg-surface p-6">
      <h1 className="text-xl font-bold text-navy">Find: {nextNumber}</h1>
      <div className="mt-3">
        <TimerDisplay />
      </div>

      <div className="slide-up mt-8 w-full">
        <SchulteGrid />
      </div>
    </main>
  );
}
