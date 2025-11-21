'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AttendanceData {
  time: string;
  checkins: number;
  cumulative: number;
}

interface EventAttendanceChartProps {
  data: AttendanceData[];
}

export const EventAttendanceChart = ({ data }: EventAttendanceChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-xs text-konekt-black/60 mb-1">{data.time}</p>
          <p className="text-sm font-bold text-konekt-black">
            {data.checkins} check-ins
          </p>
          <p className="text-xs text-konekt-black/60 mt-1">
            Total: {data.cumulative}
          </p>
        </div>
      );
    }
    return null;
  };

  // Find peak time
  const peakData = data.reduce((max, item) => (item.checkins > max.checkins ? item : max), data[0]);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCheckins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c872a4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#c872a4" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.05} />

          <XAxis
            dataKey="time"
            stroke="#000"
            strokeOpacity={0.3}
            tick={{ fontSize: 11, fill: '#000', fillOpacity: 0.6 }}
            tickLine={false}
            interval={7} // Show every 2 hours
          />

          <YAxis
            stroke="#000"
            strokeOpacity={0.3}
            tick={{ fontSize: 11, fill: '#000', fillOpacity: 0.6 }}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="checkins"
            stroke="#c872a4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCheckins)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Peak time indicator */}
      <div className="mt-3 p-3 bg-konekt-pink/10 rounded-xl border border-konekt-pink/20">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-konekt-pink rounded-full animate-pulse" />
          <span className="text-konekt-black/70">Peak time:</span>
          <span className="font-bold text-konekt-black">{peakData.time}</span>
          <span className="text-konekt-black/60">({peakData.checkins} check-ins)</span>
        </div>
      </div>
    </div>
  );
};
