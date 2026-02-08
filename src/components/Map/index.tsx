'use client';

import dynamic from 'next/dynamic';

const MapInner = dynamic(() => import('./MapInner'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>,
});

export default MapInner;
