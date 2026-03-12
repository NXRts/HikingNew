import { Mountain } from '@/types';

export const mountains: Mountain[] = [
    {
        id: 'merapi',
        name: 'Gunung Merapi',
        elevation: 2930,
        difficulty: 'Hard',
        description: 'Salah satu gunung berapi teraktif di Indonesia dengan jalur pendakian yang menantang via Selo.',
        location: [-7.5407, 110.4457],
        gpxUrl: '/gpx/merapi.gpx',
        imageUrl: 'https://images.unsplash.com/photo-1518070588484-2b53926cba76?q=80&w=2070&auto=format&fit=crop',
        status: 'Warning',
        statusReason: 'Aktivitas vulkanik meningkat, pendakian dibatasi hingga Pasar Bubrah.'
    },
    {
        id: 'merbabu',
        name: 'Gunung Merbabu',
        elevation: 3145,
        difficulty: 'Moderate',
        description: 'Dikenal dengan sabana yang indah dan pemandangan Gunung Merapi yang megah.',
        location: [-7.4550, 110.4400],
        gpxUrl: '/gpx/merbabu.gpx',
        imageUrl: 'https://images.unsplash.com/photo-1716712875891-c0cd2cc99f40?q=80&w=2072&auto=format&fit=crop',
        status: 'Open'
    },
    {
        id: 'prau',
        name: 'Gunung Prau',
        elevation: 2565,
        difficulty: 'Easy',
        description: 'Gunung ramah pemula dengan sunrise terbaik di Asia Tenggara (Golden Sunrise).',
        location: [-7.1878, 109.9300],
        gpxUrl: '/gpx/prau.gpx',
        imageUrl: 'https://images.unsplash.com/photo-1667542027177-0999f6c94874?q=80&w=2070&auto=format&fit=crop',
        status: 'Open'
    }
];
