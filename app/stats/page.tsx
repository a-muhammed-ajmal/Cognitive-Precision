'use client';
import { useSchulteStore } from '@/src/features/schulte/store/schulteStore';
import Link from 'next/link';

export default function StatsPage() {
  const { sessions } = useSchulteStore();
  
  const bestTime = sessions.length > 0 ? Math.min(...sessions.map(s => s.time)) : 0;
  const avgTime = sessions.length > 0 ? sessions.reduce((acc, s) => acc + s.time, 0) / sessions.length : 0;

  return (
    <main className="min-h-screen p-6 bg-[#F5F0E8]">
      <h1 className="text-3xl font-bold text-[#0F5238] mb-8">Your Progress</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Best Time</p>
          <p className="text-2xl font-bold text-[#0F5238]">{bestTime.toFixed(2)}s</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Average</p>
          <p className="text-2xl font-bold text-gray-900">{avgTime.toFixed(2)}s</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
      <div className="flex flex-col gap-2">
        {sessions.slice().reverse().map((session, i) => (
          <div key={i} className="p-4 bg-white rounded-lg flex justify-between items-center shadow-sm">
            <span className="text-gray-600">{new Date(session.date).toLocaleDateString()}</span>
            <span className="font-semibold">{session.time.toFixed(2)}s</span>
          </div>
        ))}
      </div>

      <Link href="/" className="block mt-12 text-center text-[#0F5238] font-semibold underline">Back Home</Link>
    </main>
  );
}
