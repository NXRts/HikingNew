'use client';

import { useState, useEffect } from 'react';
import { mountains } from '@/lib/data';
import WeatherWidget from '@/components/Weather/WeatherWidget';
import ElevationChart from '@/components/Mountain/ElevationChart';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Map as MapIcon, Clock, AlertCircle, Mountain as MountainIcon, Info, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { parseGPX, GPXPoint } from '@/lib/utils/gpx';

export default function MountainPage() {
    const params = useParams();
    const id = params.id as string;
    const mountain = mountains.find(m => m.id === id);

    const [elevationData, setElevationData] = useState<GPXPoint[]>([]);
    const [loadingGpx, setLoadingGpx] = useState(true);

    if (!mountain) notFound();

    useEffect(() => {
        const loadGpx = async () => {
            setLoadingGpx(true);
            const data = await parseGPX(mountain.gpxUrl);
            setElevationData(data);
            setLoadingGpx(false);
        };
        loadGpx();
    }, [mountain.gpxUrl]);

    const bgImage = mountain.imageUrl || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Status Banner for Warnings/Closures */}
            {mountain.status !== 'Open' && (
                <div className={`py-3 px-6 text-center text-white font-bold flex items-center justify-center gap-3 ${
                    mountain.status === 'Closed' ? 'bg-rose-600' : 'bg-amber-600'
                }`}>
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>
                        {mountain.status === 'Closed' ? 'JALUR DITUTUP: ' : 'PERINGATAN: '}
                        {mountain.statusReason || 'Terdapat kendala di jalur pendakian.'}
                    </span>
                </div>
            )}

            {/* Header / Hero */}
            <div className="relative h-[50vh] min-h-[400px] group overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-slate-900/10" />

                <div className="absolute top-6 left-6 z-10">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 px-8 pt-32 pb-24 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <div className="flex gap-2 mb-3">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${mountain.difficulty === 'Easy' ? 'bg-green-500/80 text-white' :
                                        mountain.difficulty === 'Moderate' ? 'bg-yellow-500/80 text-white' :
                                            'bg-red-500/80 text-white'
                                        }`}>
                                        {mountain.difficulty} Level
                                    </span>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg ${mountain.status === 'Open' ? 'bg-emerald-500/80 text-white' :
                                        mountain.status === 'Warning' ? 'bg-amber-500/80 text-white' :
                                            'bg-rose-500/80 text-white'
                                        }`}>
                                        Status: {mountain.status}
                                    </span>
                                </div>
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
                            {mountain.status === 'Open' ? (
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                            ) : (
                                <AlertCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                            )}
                            <p className="text-xs text-slate-500 uppercase font-semibold">Status Jalur</p>
                            <p className={`font-bold ${mountain.status === 'Open' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {mountain.status === 'Open' ? 'Lancar' : mountain.status}
                            </p>
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
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Profil Elevasi</h2>
                            {!loadingGpx && (
                                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                    Source: GPX Data
                                </span>
                            )}
                        </div>
                        <div className="h-64 w-full flex items-center justify-center">
                            {loadingGpx ? (
                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <p className="text-sm">Parsing data GPX...</p>
                                </div>
                            ) : (
                                <ElevationChart data={elevationData} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    {/* Weather Widget */}
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-1 shadow-lg text-white">
                        <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 h-full">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${mountain.status === 'Open' ? 'bg-green-400 animate-pulse' : 'bg-rose-400'}`} />
                                Cuaca & Kondisi
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
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
