'use client';

import { Cloud, Sun, Wind, Droplets } from 'lucide-react';

interface WeatherWidgetProps {
    lat: number;
    lon: number;
    elevation?: number;
}

const WeatherWidget = ({ lat, lon, elevation }: WeatherWidgetProps) => {
    // TODO: Integrate OpenWeatherMap API
    // constant for now
    const weather = {
        temp: Math.round(20 - (elevation || 0) / 1000 * 6), // simple lapse rate approximation
        condition: 'Partly Cloudy',
        wind: 15,
        humidity: 70,
    };

    return (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20 w-full max-w-xs">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Mountain Weather</h3>
                    <p className="text-xs text-slate-500">{(elevation || 0)}m elevation</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                    <Cloud className="w-6 h-6 text-blue-500" />
                </div>
            </div>

            <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-bold text-slate-800">{weather.temp}°</span>
                <span className="text-sm text-slate-500 mb-1">C</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Wind className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{weather.wind} km/h</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <Droplets className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">{weather.humidity}%</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
