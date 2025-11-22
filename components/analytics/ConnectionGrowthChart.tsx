'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { format } from 'date-fns';

interface ConnectionGrowthData {
  date: string;
  connections: number;
  newConnections?: number;
}

interface ConnectionGrowthChartProps {
  data: ConnectionGrowthData[];
  events?: Array<{ date: string; name: string }>;
}

export const ConnectionGrowthChart = ({ data, events = [] }: ConnectionGrowthChartProps) => {
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black">{data.connections} connections</p>
          <p className="text-xs text-konekt-black/60">
            {format(new Date(data.date), 'MMM d, yyyy')}
          </p>
          {data.newConnections && (
            <p className="text-xs text-konekt-green font-medium mt-1">
              +{data.newConnections} new
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorConnections" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4a6953" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4a6953" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.05} />

          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM')}
            stroke="#000"
            strokeOpacity={0.3}
            tick={{ fontSize: 12, fill: '#000', fillOpacity: 0.6 }}
            tickLine={false}
          />

          <YAxis
            stroke="#000"
            strokeOpacity={0.3}
            tick={{ fontSize: 12, fill: '#000', fillOpacity: 0.6 }}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4a6953', strokeWidth: 2 }} />

          <Line
            type="monotone"
            dataKey="connections"
            stroke="#4a6953"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#4a6953', stroke: '#fff', strokeWidth: 2 }}
            fill="url(#colorConnections)"
          />

          {/* Event markers */}
          {events.map((event, index) => {
            const dataPoint = data.find((d) => d.date === event.date);
            if (!dataPoint) return null;

            return (
              <ReferenceDot
                key={index}
                x={event.date}
                y={dataPoint.connections}
                r={8}
                fill="#c872a4"
                stroke="#fff"
                strokeWidth={2}
                label={{
                  value: event.name,
                  position: 'top',
                  fill: '#c872a4',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
