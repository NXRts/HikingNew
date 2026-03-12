import { parseGPX } from './src/lib/utils/gpx';
import fs from 'fs';
import path from 'path';

// Mock fetch for Node environment test
global.fetch = (url) => {
    const filePath = path.join(process.cwd(), 'public', url.toString());
    const content = fs.readFileSync(filePath, 'utf8');
    return Promise.resolve({
        text: () => Promise.resolve(content)
    });
};

async function test() {
    console.log('Testing GPX Parser...');
    const points = await parseGPX('/gpx/merapi.gpx');
    console.log(`Parsed ${points.length} points.`);
    if (points.length > 0) {
        console.log('First point:', points[0]);
        console.log('Last point:', points[points.length - 1]);
    } else {
        console.error('No points parsed!');
        process.exit(1);
    }
}

test();
