'use client';
import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

interface UserLocationMarkerProps {
    tracking: boolean;
}

const UserLocationMarker = ({ tracking }: UserLocationMarkerProps) => {
    const map = useMap();
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [heading, setHeading] = useState<number | null>(null);

    useEffect(() => {
        if (!tracking) return;

        const geoId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude, heading } = pos.coords;
                setPosition([latitude, longitude]);
                setHeading(heading);

                map.flyTo([latitude, longitude], map.getZoom());
            },
            (err) => console.error("Geolocation error:", err),
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(geoId);
    }, [tracking, map]);

    if (!position) return null;

    // Custom icon for user (blue dot with arrow maybe?)
    const userIcon = L.divIcon({
        className: 'custom-user-icon',
        html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md relative">
            ${heading !== null ? `<div class="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-blue-500 transform" style="transform: rotate(${heading}deg)"></div>` : ''}
            <div class="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
           </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });

    return (
        <Marker position={position} icon={userIcon}>
            <Popup>You are here</Popup>
        </Marker>
    );
};

export default UserLocationMarker;
