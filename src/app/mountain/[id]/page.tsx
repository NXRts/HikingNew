import { mountains } from '@/lib/data';
import WeatherWidget from '@/components/Weather/WeatherWidget';
import ElevationChart from '@/components/Mountain/ElevationChart';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Map as MapIcon, Clock, AlertCircle, Mountain as MountainIcon, Info } from 'lucide-react';

export function generateStaticParams() {
    return mountains.map((mountain) => ({
        id: mountain.id,
    }));
}

export default async function MountainPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const mountain = mountains.find(m => m.id === id);

    if (!mountain) notFound();

    // Mock elevation data - in real app parse GPX or DB
    const elevationData = Array.from({ length: 20 }, (_, i) => ({
        distance: i * 500,
        elevation: mountain.elevation - 1000 + Math.random() * 500 + (i * 50)
    }));

    // Dynamic background based on mountain ID
    const bgImage = mountain.id === 'merapi' ? "https://images.unsplash.com/photo-1605649487215-476786814631?q=80&w=2070" :
        mountain.id === 'merbabu' ? "https://images.unsplash.com/photo-1594928172960-e883a9687985?q=80&w=2673" :
            "https://images.unsplash.com/photo-1549615555-53bb3b2462bc?q=80&w=2070";

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header / Hero */}
            <div className="relative h-[50vh] min-h-[400px] group overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-slate-900/10" />

                <div className="absolute top-6 left-6 z-10">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10 group-back">
                        <ArrowLeft className="w-5 h-5 group-back-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 to-transparent">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-sm ${mountain.difficulty === 'Easy' ? 'bg-green-500/80 text-white' :
                                        mountain.difficulty === 'Moderate' ? 'bg-yellow-500/80 text-white' :
                                            'bg-red-500/80 text-white'
                                    }`}>
                                    {mountain.difficulty} Level
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight tracking-tight">{mountain.name}</h1>
                                <div className="flex items-center gap-4 text-slate-300">
                                    <span className="flex items-center gap-1.5"><MountainIcon className="w-4 h-4 text-emerald-400" /> {mountain.elevation} mdpl</span>
                                    <span className="flex items-center gap-1.5"><MapIcon className="w-4 h-4 text-emerald-400" /> Jawa Tengah</span>
                                </div>
                            </div>

                            <Link href={`/map/${mountain.id}`} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-lg hover:-translate-y-1">
                                <MapIcon className="w-6 h-6" />
                                <span>Buka Peta Interaktif</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 grid lg:grid-cols-3 gap-8">
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 uppercase font-semibold">Estimasi</p>
                            <p className="font-bold text-slate-800">6-8 Jam</p>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <AlertCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 uppercase font-semibold">Status</p>
                            <p className="font-bold text-emerald-600">Buka</p>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
                            <Info className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                            <p className="text-xs text-slate-500 uppercase font-semibold">Jarak</p>
                            <p className="font-bold text-slate-800">± 8 km</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            Tentang Jalur
                        </h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                            <p>{mountain.description}</p>
                            <p>
                                Jalur pendakian {mountain.name} menawarkan pengalaman yang tak terlupakan bagi para petualang.
                                Dengan medan yang bervariasi mulai dari hutan tropis hingga sabana terbuka, pendaki akan disuguhkan
                                pemandangan alam yang memukau.
                            </p>
                            <p>
                                Puncak {mountain.name} adalah spot terbaik untuk menikmati matahari terbit (sunrise).
                                Pastikan Anda mempersiapkan fisik dan perlengkapan yang memadai sebelum melakukan pendakian.
                            </p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Profil Elevasi</h2>
                            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                Gain: +1000m
                            </span>
                        </div>
                        <div className="h-64 w-full">
                            <ElevationChart data={elevationData} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    {/* Weather Widget */}
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-1 shadow-lg text-white">
                        <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 h-full">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Cuaca di Puncak
                            </h3>
                            <WeatherWidget lat={mountain.location[0]} lon={mountain.location[1]} elevation={mountain.elevation} />
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                            <Info className="w-5 h-5" /> Tips Pendakian
                        </h3>
                        <ul className="space-y-3 text-amber-700/90 text-sm">
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                                Bawa air minum minimal 3 liter.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                                Gunakan sepatu trekking yang antislip.
                            </li>
                            <li className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5" />
                                Jangan buang sampah sembarangan.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
