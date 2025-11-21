'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillData {
  skill: string;
  growth: number;
  count: number;
}

interface GrowingSkillsChartProps {
  data: SkillData[];
}

export const GrowingSkillsChart = ({ data }: GrowingSkillsChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black mb-1">{data.skill}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="w-3 h-3 text-konekt-green" />
              <span className="text-konekt-black/70">Growth:</span>
              <span className="font-bold text-konekt-green">+{data.growth}%</span>
            </div>
            <div className="text-xs text-konekt-black/60">
              {data.count} members
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Color gradient based on growth
  const getColor = (growth: number) => {
    if (growth >= 100) return '#4a6953'; // Dark green
    if (growth >= 70) return '#10b981'; // Green
    if (growth >= 40) return '#f59e0b'; // Amber
    return '#c872a4'; // Pink
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.05} horizontal={false} />

            <XAxis
              type="number"
              stroke="#000"
              strokeOpacity={0.3}
              tick={{ fontSize: 11, fill: '#000', fillOpacity: 0.6 }}
              tickLine={false}
              label={{ value: 'Growth %', position: 'insideBottom', offset: -5, style: { fontSize: 11, fill: '#00000099' } }}
            />

            <YAxis
              dataKey="skill"
              type="category"
              width={100}
              stroke="#000"
              strokeOpacity={0.3}
              tick={{ fontSize: 12, fill: '#000', fillOpacity: 0.7 }}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />

            <Bar
              dataKey="growth"
              radius={[0, 8, 8, 0]}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.growth)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top skill highlight */}
      {data.length > 0 && (
        <motion.div
          className="p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-green/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-konekt-green/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-konekt-green" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-konekt-black">
                {data[0].skill} is trending! 🔥
              </div>
              <div className="text-xs text-konekt-black/60">
                {data[0].growth}% growth with {data[0].count} members learning it
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
