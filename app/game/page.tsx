'use client';
import { useEffect } from 'react';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';
import SchulteGrid from '@/src/features/schulte/components/SchulteGrid';
import TimerDisplay from '@/src/features/schulte/components/TimerDisplay';
import { useRouter } from 'next/navigation';

export default function GamePage() {
  const { startGame, isActive, nextNumber } = useSchulteStore();
  const router = useRouter();

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (!isActive) {
      router.push('/results');
    }
  }, [isActive, router]);

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-[#F5F0E8]">
      <h1 className="text-2xl font-bold text-[#0F5238] mb-4">Find: {nextNumber}</h1>
      <TimerDisplay />
      
      <div className="w-full mt-8">
        <SchulteGrid />
      </div>
    </main>
  );
}
