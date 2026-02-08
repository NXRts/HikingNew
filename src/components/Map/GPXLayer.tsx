'use client';

import { useEffect, useState } from 'react';
import { useMap, Polyline } from 'react-leaflet';
import { parseGPX } from '@/lib/gpxUtils'; // Removed GPXData import as it's not used as value
import L from 'leaflet';

interface GPXLayerProps {
    url: string;
    color?: string;
    onDataLoaded?: (data: any) => void;
}

const GPXLayer = ({ url, color = '#ef4444', onDataLoaded }: GPXLayerProps) => {
    const map = useMap();
    const [positions, setPositions] = useState<[number, number][]>([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.text())
            .then(text => {
                const data = parseGPX(text);
                setPositions(data.positions);

                if (data.positions.length > 0) {
                    const bounds = L.latLngBounds(data.positions);
                    map.fitBounds(bounds, { padding: [50, 50] });
                }

                if (onDataLoaded) {
                    onDataLoaded(data);
                }
            })
            .catch(err => console.error("Failed to load GPX", err));
    }, [url, map, onDataLoaded]);

    if (positions.length === 0) return null;

    return <Polyline positions={positions} pathOptions={{ color, weight: 5, opacity: 0.8 }} />;
};

export default GPXLayer;
