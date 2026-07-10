'use client';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';
import Link from 'next/link';
import { Trophy, TrendingUp, History, Calendar, ArrowLeft } from 'lucide-react';

export default function StatsPage() {
  const { sessions } = useSchulteStore();

  const bestTime = sessions.length > 0 ? Math.min(...sessions.map(s => s.time)) : 0;
  const avgTime = sessions.length > 0 ? sessions.reduce((acc, s) => acc + s.time, 0) / sessions.length : 0;

  return (
    <main className="graph-bg min-h-screen bg-surface p-6">
      <h1 className="text-xl font-bold text-navy">Your Progress</h1>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-card border border-line bg-surface p-4 shadow-card">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy/50">
            <Trophy className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            Best Time
          </div>
          <p className="mt-2 font-mono text-lg font-bold text-navy">{bestTime.toFixed(2)}s</p>
        </div>
        <div className="rounded-card border border-line bg-surface p-4 shadow-card">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-navy/50">
            <TrendingUp className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            Average
          </div>
          <p className="mt-2 font-mono text-lg font-bold text-navy">{avgTime.toFixed(2)}s</p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <History className="h-4 w-4 text-navy/50" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-navy">Recent Sessions</h2>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {sessions.slice().reverse().map((session, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-card border border-line bg-surface p-4 shadow-card"
          >
            <span className="flex items-center gap-1.5 text-sm text-navy/70">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {new Date(session.date).toLocaleDateString()}
            </span>
            <span className="font-mono text-sm font-semibold text-navy">{session.time.toFixed(2)}s</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-12 flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-text"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back Home
      </Link>
    </main>
  );
}
