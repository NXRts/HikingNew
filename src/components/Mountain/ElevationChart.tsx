'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ElevationChartProps {
    data: { distance: number; elevation: number }[];
}

const ElevationChart = ({ data }: ElevationChartProps) => {
    // Filter data to reduce points for performance if needed
    const chartData = data.filter((_, i) => i % 5 === 0); // basic downsampling

    return (
        <div className="h-64 w-full bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-neutral-200/50">
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">Elevation Profile</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis
                        dataKey="distance"
                        tickFormatter={(val) => `${(val / 1000).toFixed(1)} km`}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tickFormatter={(val) => `${val}m`}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        formatter={(val: number) => [`${Math.round(val)}m`, 'Elevation']}
                        labelFormatter={(val: number) => `Distance: ${(val / 1000).toFixed(2)} km`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="elevation"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ElevationChart;
