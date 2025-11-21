'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingDown } from 'lucide-react';

interface RetentionData {
  day: number;
  activeUsers: number;
  benchmark: number;
}

interface RetentionCurveChartProps {
  data: RetentionData[];
}

export const RetentionCurveChart = ({ data }: RetentionCurveChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const retentionRate = (data.activeUsers / data.activeUsers) * 100;

      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-xs text-konekt-black/60 mb-2">Day {data.day}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-konekt-green" />
              <span className="text-xs text-konekt-black/70">Your event:</span>
              <span className="text-sm font-bold text-konekt-black">{data.activeUsers}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-konekt-black/20" />
              <span className="text-xs text-konekt-black/70">Benchmark:</span>
              <span className="text-sm font-bold text-konekt-black/60">{data.benchmark}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate day 7 and day 30 retention
  const day7 = data.find((d) => d.day === 7);
  const day30 = data.find((d) => d.day === 30);
  const initialUsers = data[0].activeUsers;

  const retention7 = day7 ? ((day7.activeUsers / initialUsers) * 100).toFixed(1) : '0';
  const retention30 = day30 ? ((day30.activeUsers / initialUsers) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-4">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a6953" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4a6953" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.05} />

            <XAxis
              dataKey="day"
              label={{ value: 'Days After Event', position: 'insideBottom', offset: -5, style: { fontSize: 12, fill: '#00000099' } }}
              stroke="#000"
              strokeOpacity={0.3}
              tick={{ fontSize: 11, fill: '#000', fillOpacity: 0.6 }}
              tickLine={false}
            />

            <YAxis
              label={{ value: 'Active Users', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#00000099' } }}
              stroke="#000"
              strokeOpacity={0.3}
              tick={{ fontSize: 11, fill: '#000', fillOpacity: 0.6 }}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
              iconType="line"
            />

            {/* Your event */}
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Your Event"
              stroke="#4a6953"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6, fill: '#4a6953', stroke: '#fff', strokeWidth: 2 }}
              fill="url(#colorUsers)"
            />

            {/* Benchmark */}
            <Line
              type="monotone"
              dataKey="benchmark"
              name="Industry Benchmark"
              stroke="#000"
              strokeOpacity={0.2}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10 text-center">
          <div className="text-2xl font-bold text-konekt-black">{initialUsers}</div>
          <div className="text-xs text-konekt-black/60">Day 0</div>
        </div>
        <div className="p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10 text-center">
          <div className="text-2xl font-bold text-konekt-green">{retention7}%</div>
          <div className="text-xs text-konekt-black/60">Day 7</div>
        </div>
        <div className="p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10 text-center">
          <div className="text-2xl font-bold text-konekt-pink">{retention30}%</div>
          <div className="text-xs text-konekt-black/60">Day 30</div>
        </div>
      </div>

      {/* Insight */}
      {day30 && day30.activeUsers > day30.benchmark && (
        <div className="p-4 bg-konekt-green/10 rounded-xl border border-konekt-green/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-konekt-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-4 h-4 text-konekt-green" />
            </div>
            <div>
              <div className="text-sm font-bold text-konekt-black mb-1">Above Benchmark! 🎉</div>
              <div className="text-xs text-konekt-black/60">
                Your retention is {((day30.activeUsers / day30.benchmark - 1) * 100).toFixed(0)}% better than industry average.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
