'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface IndustryData {
  name: string;
  value: number;
  color: string;
  [key: string]: any; // Index signature for Treemap compatibility
}

interface IndustriesTreemapProps {
  data: IndustryData[];
}

export const IndustriesTreemap = ({ data }: IndustriesTreemapProps) => {
  // Prepare data for treemap (needs children array)
  const treemapData: any[] = [
    {
      name: 'Industries',
      children: data,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black mb-1">{data.name}</p>
          <p className="text-xs text-konekt-black/60">{data.value} startups</p>
        </div>
      );
    }
    return null;
  };

  // Custom content renderer for treemap cells
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, value, color } = props;

    // Don't render if too small
    if (width < 40 || height < 30) return null;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            stroke: '#fff',
            strokeWidth: 2,
          }}
          rx={8}
        />
        <text
          x={x + width / 2}
          y={y + height / 2 - 8}
          textAnchor="middle"
          fill="#fff"
          fontSize={width > 80 ? 14 : 12}
          fontWeight="bold"
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 8}
          textAnchor="middle"
          fill="#fff"
          fontSize={10}
          opacity={0.9}
        >
          {value} startups
        </text>
      </g>
    );
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      {/* Treemap */}
      <div className="w-full h-96 bg-konekt-cream rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="value"
            stroke="#fff"
            fill="#4a6953"
            content={<CustomizedContent />}
            animationDuration={1000}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-3">
        {data.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.name}
            className="p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className="w-6 h-6 rounded-full mx-auto mb-2"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-lg font-bold text-konekt-black">{item.value}</div>
            <div className="text-xs text-konekt-black/60 truncate">{item.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Total summary */}
      <div className="p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-green/20 text-center">
        <div className="text-3xl font-bold text-konekt-black">{total}</div>
        <div className="text-sm text-konekt-black/60">Total Active Startups</div>
      </div>
    </div>
  );
};
