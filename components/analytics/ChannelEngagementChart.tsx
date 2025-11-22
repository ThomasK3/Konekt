'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MessageCircle } from 'lucide-react';

interface ChannelData {
  name: string;
  messages: number;
}

interface ChannelEngagementChartProps {
  data: ChannelData[];
}

export const ChannelEngagementChart = ({ data }: ChannelEngagementChartProps) => {
  const colors = ['#4a6953', '#c872a4', '#f59e0b', '#3b82f6', '#8b5cf6'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black mb-1">#{data.name}</p>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-konekt-black/60" />
            <span className="text-sm text-konekt-black">{data.messages} messages</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalMessages = data.reduce((sum, item) => sum + item.messages, 0);

  return (
    <div className="space-y-4">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.05} />

            <XAxis
              dataKey="name"
              stroke="#000"
              strokeOpacity={0.3}
              tick={{ fontSize: 12, fill: '#000', fillOpacity: 0.7 }}
              tickLine={false}
            />

            <YAxis
              stroke="#000"
              strokeOpacity={0.3}
              tick={{ fontSize: 12, fill: '#000', fillOpacity: 0.6 }}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />

            <Bar
              dataKey="messages"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
          <div className="text-2xl font-bold text-konekt-black">{totalMessages}</div>
          <div className="text-xs text-konekt-black/60">Total Messages</div>
        </div>
        <div className="p-3 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
          <div className="text-2xl font-bold text-konekt-black">{data.length}</div>
          <div className="text-xs text-konekt-black/60">Active Channels</div>
        </div>
      </div>
    </div>
  );
};
