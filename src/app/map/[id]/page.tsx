'use client';

import dynamic from 'next/dynamic';
import { mountains } from '@/lib/data';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Navigation, Layers } from 'lucide-react';
import { useState } from 'react';

// Dynamic imports for Leaflet components
const Map = dynamic(() => import('@/components/Map/index'), { ssr: false });
const GPXLayer = dynamic(() => import('@/components/Map/GPXLayer'), { ssr: false });
const UserLocationMarker = dynamic(() => import('@/components/Map/UserLocationMarker'), { ssr: false });

export default function MapPage() {
    const params = useParams();
    const router = useRouter();
    const mountain = mountains.find(m => m.id === params.id);
    const [tracking, setTracking] = useState(false);
    const [showSatellite, setShowSatellite] = useState(false);

    if (!mountain) {
        if (typeof window !== 'undefined') router.push('/'); // Safe redirect
        return <div className="h-screen flex items-center justify-center bg-slate-50">Loading or not found...</div>;
    }

    return (
        <div className="h-screen w-full relative bg-slate-200 overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-[400] p-4 bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
                <div className="flex justify-between items-start">
                    <Link href={`/mountain/${mountain.id}`} className="pointer-events-auto p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-slate-700 hover:bg-white transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>

                    <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
                        <h1 className="font-bold text-slate-800 text-sm">{mountain.name}</h1>
                        <p className="text-xs text-slate-500 font-medium">Map View</p>
                    </div>
                </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-8 right-6 z-[400] flex flex-col gap-4 pointer-events-none">
                <button
                    onClick={() => setTracking(!tracking)}
                    className={`pointer-events-auto p-4 rounded-full shadow-xl shadow-blue-900/20 transition-all active:scale-90 duration-300 ${tracking ? 'bg-blue-600 text-white ring-4 ring-blue-500/30' : 'bg-white text-slate-700'}`}
                >
                    <Navigation className={`w-6 h-6 ${tracking ? 'animate-pulse' : ''}`} />
                </button>
            </div>

            <div className="absolute inset-0 z-0">
                <Map center={mountain.location} zoom={13}>
                    {/* GPX Track */}
                    {mountain.gpxUrl && (
                        <GPXLayer url={mountain.gpxUrl} color="#10b981" />
                    )}

                    {/* User Location */}
                    <UserLocationMarker tracking={tracking} />
                </Map>
            </div>
        </div>
    );
}
