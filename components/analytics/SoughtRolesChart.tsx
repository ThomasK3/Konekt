'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleData {
  role: string;
  count: number;
  color: string;
  [key: string]: any; // Index signature for Recharts compatibility
}

interface SoughtRolesChartProps {
  data: RoleData[];
}

export const SoughtRolesChart = ({ data }: SoughtRolesChartProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black mb-1">{data.role}</p>
          <div className="flex items-center gap-2 text-xs">
            <Users className="w-3 h-3 text-konekt-black/60" />
            <span className="text-konekt-black">{data.count} positions</span>
          </div>
          <p className="text-xs font-medium mt-1" style={{ color: data.color }}>
            {((data.count / total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Donut chart */}
      <div className="w-full h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="count"
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-3xl font-bold text-konekt-black">{total}</div>
          <div className="text-xs text-konekt-black/60">Open Positions</div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <motion.div
            key={item.role}
            className="flex items-center gap-2 p-2 bg-konekt-white rounded-lg border border-konekt-black/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-konekt-black truncate">{item.role}</div>
              <div className="text-xs text-konekt-black/60">{item.count}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
