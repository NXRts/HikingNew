import { useState, useEffect } from 'react';
import { Cloud, Sun, Wind, Droplets, Loader2, CloudRain, CloudLightning, SunDim } from 'lucide-react';
import { getWeatherData, WeatherData } from '@/lib/weather';

interface WeatherWidgetProps {
    lat: number;
    lon: number;
    elevation?: number;
}

const WeatherWidget = ({ lat, lon, elevation }: WeatherWidgetProps) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            const data = await getWeatherData(lat, lon, elevation);
            setWeather(data);
            setLoading(false);
        };
        fetchWeather();
    }, [lat, lon, elevation]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 text-white/50">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    if (!weather) return null;

    const WeatherIcon = () => {
        const cond = weather.condition.toLowerCase();
        if (cond.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400" />;
        if (cond.includes('cloud')) return <Cloud className="w-8 h-8 text-blue-300" />;
        if (cond.includes('clear')) return <Sun className="w-8 h-8 text-yellow-400" />;
        if (cond.includes('storm')) return <CloudLightning className="w-8 h-8 text-indigo-400" />;
        return <SunDim className="w-8 h-8 text-slate-400" />;
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-4xl font-bold">{weather.temp}°</h3>
                    <p className="text-white/70 text-sm font-medium">{weather.condition}</p>
                </div>
                <div className="p-3 bg-white/10 rounded-2xl">
                    <WeatherIcon />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl">
                    <Wind className="w-5 h-5 text-cyan-300" />
                    <div>
                        <p className="text-[10px] uppercase font-bold text-white/50">Wind</p>
                        <p className="text-sm font-bold">{Math.round(weather.wind)} kmh</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl">
                    <Droplets className="w-5 h-5 text-blue-300" />
                    <div>
                        <p className="text-[10px] uppercase font-bold text-white/50">Humid</p>
                        <p className="text-sm font-bold">{weather.humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
