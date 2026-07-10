import Link from 'next/link';
import { Play, BarChart3 } from 'lucide-react';
import { buttonStyles } from '@/src/components/buttonStyles';

export default function HomePage() {
  return (
    <main className="graph-bg flex min-h-screen flex-col items-center justify-center bg-surface p-6">
      <div className="fade-in flex flex-col items-center text-center">
        <span className="eyebrow mb-3">Focus Training</span>
        <h1 className="text-[48px] font-extrabold tracking-tight text-navy">Schulte Table</h1>
        <p className="mt-4 text-sm text-navy/70">Train your focus &amp; processing speed</p>
      </div>

      <div className="slide-up mt-12 flex w-full max-w-sm flex-col gap-3">
        <Link href="/game" className={buttonStyles('primary')}>
          <Play className="h-4 w-4" aria-hidden="true" />
          Start Training
        </Link>
        <Link href="/stats" className={buttonStyles('secondary')}>
          <BarChart3 className="h-4 w-4" aria-hidden="true" />
          View Stats
        </Link>
      </div>
    </main>
  );
}
