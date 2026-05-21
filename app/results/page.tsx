'use client';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';
import Link from 'next/link';

export default function ResultsPage() {
  const { sessions } = useSchulteStore();
  const lastSession = sessions[sessions.length - 1];

  if (!lastSession) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F0E8]">
        <p>No results found.</p>
        <Link href="/" className="text-blue-600">Go Home</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F0E8]">
      <h1 className="text-4xl font-bold text-[#0F5238] mb-8">Complete!</h1>
      <div className="text-6xl font-bold text-gray-900 mb-12">{lastSession.time.toFixed(2)}s</div>
      
      <div className="w-full max-w-sm flex flex-col gap-4">
        <Link 
          href="/game"
          className="w-full py-4 px-6 bg-[#0F5238] text-white text-center rounded-xl font-semibold hover:bg-opacity-90"
        >
          Play Again
        </Link>
        <Link 
          href="/stats"
          className="w-full py-4 px-6 border border-[#0F5238] text-[#0F5238] text-center rounded-xl font-semibold hover:bg-gray-50"
        >
          View Stats
        </Link>
        <Link 
          href="/"
          className="w-full py-4 px-6 bg-gray-200 text-gray-800 text-center rounded-xl font-semibold hover:bg-gray-300"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
