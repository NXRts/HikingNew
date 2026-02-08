import { Mountain } from '@/types';

export const mountains: Mountain[] = [
    {
        id: 'merapi',
        name: 'Gunung Merapi',
        elevation: 2930,
        difficulty: 'Hard',
        description: 'Salah satu gunung berapi teraktif di Indonesia dengan jalur pendakian yang menantang via Selo.',
        location: [-7.5407, 110.4457],
        gpxUrl: '/gpx/merapi.gpx'
    },
    {
        id: 'merbabu',
        name: 'Gunung Merbabu',
        elevation: 3145,
        difficulty: 'Moderate',
        description: 'Dikenal dengan sabana yang indah dan pemandangan Gunung Merapi yang megah.',
        location: [-7.4550, 110.4400],
        gpxUrl: '/gpx/merbabu.gpx'
    },
    {
        id: 'prau',
        name: 'Gunung Prau',
        elevation: 2565,
        difficulty: 'Easy',
        description: 'Gunung ramah pemula dengan sunrise terbaik di Asia Tenggara (Golden Sunrise).',
        location: [-7.1878, 109.9300],
        gpxUrl: '/gpx/prau.gpx'
    }
];
