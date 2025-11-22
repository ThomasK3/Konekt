'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface SkillRadarData {
  skill: string;
  userScore: number;
  communityAvg: number;
}

interface SkillsRadarChartProps {
  data: SkillRadarData[];
}

export const SkillsRadarChart = ({ data }: SkillsRadarChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-konekt-white border-2 border-konekt-black/10 rounded-xl p-3 shadow-xl">
          <p className="text-sm font-bold text-konekt-black mb-2">{data.skill}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-konekt-green" />
              <span className="text-konekt-black/60">You:</span>
              <span className="font-bold text-konekt-black">{data.userScore}%</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-konekt-pink/40" />
              <span className="text-konekt-black/60">Avg:</span>
              <span className="font-bold text-konekt-black">{data.communityAvg}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <defs>
            <linearGradient id="radarGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4a6953" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4a6953" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <PolarGrid stroke="#000" strokeOpacity={0.1} />

          <PolarAngleAxis
            dataKey="skill"
            tick={{
              fill: '#000',
              fillOpacity: 0.7,
              fontSize: 12,
              fontWeight: 600,
            }}
          />

          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#000', fillOpacity: 0.4, fontSize: 10 }}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Community average (background) */}
          <Radar
            name="Community Avg"
            dataKey="communityAvg"
            stroke="#c872a4"
            fill="#c872a4"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={false}
          />

          {/* User score (foreground) */}
          <Radar
            name="Your Score"
            dataKey="userScore"
            stroke="#4a6953"
            fill="url(#radarGreen)"
            fillOpacity={0.6}
            strokeWidth={3}
            dot={{ r: 4, fill: '#4a6953', stroke: '#fff', strokeWidth: 2 }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-konekt-green" />
          <span className="text-sm text-konekt-black/70">Your Skills</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-konekt-pink/40" />
          <span className="text-sm text-konekt-black/70">Community Average</span>
        </div>
      </div>
    </div>
  );
};
