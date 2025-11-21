'use client';

import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface EngagementBreakdown {
  category: string;
  value: number;
  color: string;
}

interface EngagementScoreProps {
  totalScore: number;
  breakdown: EngagementBreakdown[];
}

export const EngagementScore = ({ totalScore, breakdown }: EngagementScoreProps) => {
  // Prepare data for radial chart
  const chartData = [
    {
      name: 'Score',
      value: totalScore,
      fill: totalScore >= 70 ? '#4a6953' : totalScore >= 40 ? '#f59e0b' : '#c872a4',
    },
  ];

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: 'Elite', color: 'text-konekt-green' };
    if (score >= 60) return { text: 'Active', color: 'text-blue-600' };
    if (score >= 40) return { text: 'Growing', color: 'text-amber-600' };
    return { text: 'Starting', color: 'text-konekt-pink' };
  };

  const scoreLabel = getScoreLabel(totalScore);

  return (
    <div className="space-y-6">
      {/* Circular score display */}
      <div className="relative">
        <div className="w-48 h-48 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: '#f5f5f5' }}
                dataKey="value"
                cornerRadius={10}
                animationDuration={1500}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Score text in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-5xl font-bold text-konekt-black"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {totalScore}
            </motion.div>
            <div className={`text-sm font-medium ${scoreLabel.color}`}>{scoreLabel.text}</div>
            <div className="text-xs text-konekt-black/40 mt-1">Engagement Score</div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        {breakdown.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-konekt-black/70">{item.category}</span>
              </div>
              <span className="text-sm font-bold text-konekt-black">{item.value}/40</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-konekt-black/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / 40) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights */}
      <div className="p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-green/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-konekt-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-konekt-green" />
          </div>
          <div>
            <div className="text-sm font-bold text-konekt-black mb-1">Keep it up!</div>
            <div className="text-xs text-konekt-black/60">
              {totalScore >= 70
                ? "You're one of the most active members. Amazing work!"
                : totalScore >= 40
                ? 'Send more messages to boost your engagement score.'
                : 'Start connecting and messaging to increase your score.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
