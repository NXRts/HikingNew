export interface WeatherData {
    temp: number;
    condition: string;
    wind: number;
    humidity: number;
    icon?: string;
}

export async function getWeatherData(lat: number, lon: number, elevation?: number): Promise<WeatherData> {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!apiKey) {
        // Fallback / Simulator if no API key
        return {
            temp: Math.round(20 - (elevation || 0) / 1000 * 6),
            condition: 'Clear',
            wind: 12 + Math.random() * 5,
            humidity: 65 + Math.random() * 10,
        };
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        return {
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            wind: data.wind.speed * 3.6, // m/s to km/h
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        return {
            temp: Math.round(20 - (elevation || 0) / 1000 * 6),
            condition: 'N/A',
            wind: 0,
            humidity: 0,
        };
    }
}
