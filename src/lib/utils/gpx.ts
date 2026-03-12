export interface GPXPoint {
    distance: number;
    elevation: number;
}

export async function parseGPX(url: string): Promise<GPXPoint[]> {
    try {
        const response = await fetch(url);
        const text = await response.text();

        // Simple regex-based parsing to avoid heavy XML parsers for basic use case
        // Matching <trkpt lat="..." lon="..."> ... <ele>...</ele> ... </trkpt>
        const trkptRegex = /<trkpt[^>]*>[\s\S]*?<ele>([\d.]+)<\/ele>[\s\S]*?<\/trkpt>/g;
        const matches = [...text.matchAll(trkptRegex)];

        const points: GPXPoint[] = matches.map((match, index) => ({
            distance: index * 500, // Distance approximation if not in GPX
            elevation: parseFloat(match[1])
        }));

        return points;
    } catch (error) {
        console.error('Error parsing GPX:', error);
        return [];
    }
}
