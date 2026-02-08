import { mountains } from '@/lib/data';
import WeatherWidget from '@/components/Weather/WeatherWidget';
import ElevationChart from '@/components/Mountain/ElevationChart';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Map as MapIcon, Calendar, Clock, AlertCircle } from 'lucide-react';

export function generateStaticParams() {
    return mountains.map((mountain) => ({
        id: mountain.id,
    }));
}

export default function MountainPage({ params }: { params: { id: string } }) {
    const mountain = mountains.find(m => m.id === params.id);

    if (!mountain) notFound();

    // Mock elevation data - in real app parse GPX or DB
    const elevationData = Array.from({ length: 20 }, (_, i) => ({
        distance: i * 500,
        elevation: mountain.elevation - 1000 + Math.random() * 500 + (i * 50)
    }));

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="relative h-72 bg-slate-900 group">
                <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                    <Link href="/" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </div>

                <div className="absolute bottom-8 left-6 right-6">
                    <h1 className="text-4xl font-bold text-white mb-2 leading-tight">{mountain.name}</h1>
                    <div className="flex items-center gap-3 text-slate-200">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${mountain.difficulty === 'Easy' ? 'bg-emerald-500/80' :
                                mountain.difficulty === 'Moderate' ? 'bg-amber-500/80' :
                                    'bg-rose-500/80'
                            }`}>
                            {mountain.difficulty}
                        </span>
                        <span className="text-sm border-l border-white/30 pl-3">{mountain.elevation} mdpl</span>
                    </div>
                </div>
            </div>

            <div className="px-6 space-y-8 -mt-6 relative z-10">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                        <Clock className="w-6 h-6 text-blue-500 mb-2" />
                        <span className="text-sm text-slate-500">Est. Time</span>
                        <span className="font-bold text-slate-800">6-8 Hours</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                        <AlertCircle className="w-6 h-6 text-orange-500 mb-2" />
                        <span className="text-sm text-slate-500">Status</span>
                        <span className="font-bold text-green-600">Open</span>
                    </div>
                </div>

                {/* Action Button */}
                <Link href={`/map/${mountain.id}`} className="block w-full bg-slate-900 text-white font-bold py-4 rounded-2xl text-center shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-slate-800">
                    <MapIcon className="w-5 h-5" />
                    <span>Start Tracking</span>
                </Link>

                {/* Weather */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Live Weather</h2>
                        <span className="text-xs text-slate-400">Updated 5m ago</span>
                    </div>
                    <WeatherWidget lat={mountain.location[0]} lon={mountain.location[1]} elevation={mountain.elevation} />
                </section>

                {/* Chart */}
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Elevation Profile</h2>
                    <ElevationChart data={elevationData} />
                </section>

                {/* Description */}
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">About the Trail</h2>
                    <p className="text-slate-600 leading-relaxed">
                        {mountain.description}
                        <br /><br />
                        Jalur ini menawarkan pemandangan spektakuler terutama saat matahari terbit. Pastikan membawa perbekalan cukup dan jaket hangat karena suhu bisa mencapai 5°C di malam hari.
                    </p>
                </section>
            </div>
        </div>
    );
}
