'use client';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';
import Link from 'next/link';
import { PartyPopper, Trophy, RotateCcw, BarChart3, Home, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonStyles } from '@/src/components/buttonStyles';

export default function ResultsPage() {
  const { sessions } = useSchulteStore();
  const lastSession = sessions[sessions.length - 1];

  if (!lastSession) {
    return (
      <main className="graph-bg flex min-h-screen flex-col items-center justify-center gap-4 bg-surface p-6">
        <p className="text-sm text-navy/70">No results found.</p>
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-brand-text">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Go Home
        </Link>
      </main>
    );
  }

  const previousBest =
    sessions.length > 1 ? Math.min(...sessions.slice(0, -1).map((s) => s.time)) : null;
  const isNewBest = previousBest === null || lastSession.time < previousBest;

  return (
    <main className="graph-bg flex min-h-screen flex-col items-center justify-center bg-surface p-6">
      <div className="fade-in flex flex-col items-center text-center">
        {isNewBest ? (
          <span className="eyebrow mb-3 flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
            New Best Time!
          </span>
        ) : (
          <PartyPopper className="mb-3 h-8 w-8 text-brand" aria-hidden="true" />
        )}
        <h1 className="text-xl font-bold text-navy">Complete!</h1>
        <div
          className={cn(
            'mt-4 font-mono text-[48px] font-extrabold tracking-tight',
            isNewBest ? 'text-brand' : 'text-navy'
          )}
        >
          {lastSession.time.toFixed(2)}s
        </div>
      </div>

      <div className="slide-up mt-12 flex w-full max-w-sm flex-col gap-3">
        <Link href="/game" className={buttonStyles('primary')}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Play Again
        </Link>
        <Link href="/stats" className={buttonStyles('secondary')}>
          <BarChart3 className="h-4 w-4" aria-hidden="true" />
          View Stats
        </Link>
        <Link href="/" className={buttonStyles('neutral')}>
          <Home className="h-4 w-4" aria-hidden="true" />
          Home
        </Link>
      </div>
    </main>
  );
}
