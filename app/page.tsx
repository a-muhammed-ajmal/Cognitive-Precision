import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F5F0E8]">
      <h1 className="text-4xl font-bold text-[#0F5238] mb-4">Schulte Table</h1>
      <p className="text-lg text-gray-600 mb-12">Train your focus & processing speed</p>
      
      <div className="w-full max-w-sm flex flex-col gap-4">
        <Link 
          href="/game"
          className="w-full py-4 px-6 bg-[#0F5238] text-white text-center rounded-xl font-semibold hover:bg-opacity-90"
        >
          Start Training
        </Link>
        <Link 
          href="/stats"
          className="w-full py-4 px-6 border border-[#0F5238] text-[#0F5238] text-center rounded-xl font-semibold hover:bg-gray-50"
        >
          View Stats
        </Link>
      </div>
    </main>
  );
}
