export interface GPXData {
    positions: [number, number][]; // [lat, lon]
    elevations: { distance: number; elevation: number }[]; // distance from start (m), elevation (m)
    totalDistance: number;
    elevationGain: number;
    elevationLoss: number;
}

export const parseGPX = (gpxText: string): GPXData => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxText, "text/xml");
    const trkpts = xmlDoc.querySelectorAll("trkpt");

    const positions: [number, number][] = [];
    const elevations: { distance: number; elevation: number }[] = [];
    let totalDistance = 0;
    let elevationGain = 0;
    let elevationLoss = 0;

    let prevLat = 0;
    let prevLon = 0;
    let prevEle = 0;

    trkpts.forEach((pt, index) => {
        const lat = parseFloat(pt.getAttribute("lat") || "0");
        const lon = parseFloat(pt.getAttribute("lon") || "0");
        const ele = parseFloat(pt.querySelector("ele")?.textContent || "0");

        positions.push([lat, lon]);

        if (index > 0) {
            const dist = calculateDistance(prevLat, prevLon, lat, lon);
            totalDistance += dist;

            const eleDiff = ele - prevEle;
            if (eleDiff > 0) elevationGain += eleDiff;
            else elevationLoss += Math.abs(eleDiff);
        }

        elevations.push({ distance: totalDistance, elevation: ele });

        prevLat = lat;
        prevLon = lon;
        prevEle = ele;
    });

    return { positions, elevations, totalDistance, elevationGain, elevationLoss };
};

// Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};
