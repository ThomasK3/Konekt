'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface MaterialData {
  type: string;
  value: number;
  color: string;
  [key: string]: any; // Index signature for Recharts compatibility
}

interface MaterialDownloadsChartProps {
  data: MaterialData[];
}

export const MaterialDownloadsChart = ({ data }: MaterialDownloadsChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black mb-1">{data.type}</p>
          <p className="text-xs text-konekt-black/60">{data.value} downloads</p>
          <p className="text-xs font-medium" style={{ color: data.color }}>
            {((data.value / total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Pie chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
              label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ''}
              labelLine={{
                stroke: '#000',
                strokeWidth: 1,
                strokeOpacity: 0.3,
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with stats */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <motion.div
            key={item.type}
            className="flex items-center justify-between p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10 hover:border-konekt-black/20 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-konekt-black">{item.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-konekt-black/40" />
              <span className="text-sm font-bold text-konekt-black">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total downloads */}
      <div className="p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-green/20 text-center">
        <div className="text-3xl font-bold text-konekt-black">{total}</div>
        <div className="text-sm text-konekt-black/60">Total Downloads</div>
      </div>
    </div>
  );
};
