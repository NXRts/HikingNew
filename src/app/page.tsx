import Link from 'next/link';
import { mountains } from '@/lib/data';
import { MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-br from-emerald-800 to-slate-900 flex items-end p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-10 w-full">
          <h1 className="text-4xl font-bold text-white mb-2">Smart Hiking<br /><span className="text-emerald-400">Companion</span></h1>
          <p className="text-slate-300 text-sm">Temukan jalur pendakian terbaik dan aman.</p>
        </div>
      </div>

      {/* List Section */}
      <div className="px-4 -mt-6 relative z-20 space-y-4">
        {mountains.map((mountain) => (
          <Link href={`/mountain/${mountain.id}`} key={mountain.id} className="block group">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 transition-all active:scale-95 duration-200">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {mountain.name}
                </h2>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${mountain.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    mountain.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                  }`}>
                  {mountain.difficulty}
                </span>
              </div>

              <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                {mountain.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{mountain.elevation} mdpl</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Jawa Tengah</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
