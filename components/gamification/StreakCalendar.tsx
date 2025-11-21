'use client';

import { motion } from 'framer-motion';
import type { Streak } from '@/types';
import { Flame, Trophy, Calendar } from 'lucide-react';

interface StreakCalendarProps {
  streak: Streak;
}

export const StreakCalendar = ({ streak }: StreakCalendarProps) => {
  const { current, longest, loginHistory } = streak;

  // Get last 30 days
  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last30Days = getLast30Days();
  const loginSet = new Set(loginHistory);

  // Determine streak milestone
  const getStreakMilestone = (current: number) => {
    if (current >= 365) return { label: '1 Year Legend', color: 'text-amber-500', icon: '🏆' };
    if (current >= 100) return { label: '100 Day Warrior', color: 'text-purple-500', icon: '⚡' };
    if (current >= 30) return { label: 'Month Master', color: 'text-blue-500', icon: '🌟' };
    if (current >= 7) return { label: 'Week Warrior', color: 'text-konekt-green', icon: '🔥' };
    return { label: 'Getting Started', color: 'text-gray-500', icon: '🌱' };
  };

  const milestone = getStreakMilestone(current);

  return (
    <div className="p-6 bg-konekt-white rounded-2xl border-2 border-konekt-black/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-konekt-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-konekt-black">Login Streak</h3>
            <p className="text-sm text-konekt-black/60">Udržuj aktivitu každý den</p>
          </div>
        </div>

        {/* Current Streak */}
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {current}
          </div>
          <div className="text-xs text-konekt-black/60 font-medium">dní</div>
        </motion.div>
      </div>

      {/* Milestone Badge */}
      <motion.div
        className={`mb-6 p-3 rounded-xl border-2 ${
          current >= 7 ? 'bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 border-konekt-green/30' : 'bg-konekt-black/5 border-konekt-black/10'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{milestone.icon}</span>
          <div className="flex-1">
            <div className={`font-bold ${milestone.color}`}>{milestone.label}</div>
            <div className="text-xs text-konekt-black/60">
              Nejdelší streak: {longest} dní
              {longest > current && <Trophy className="inline w-3 h-3 ml-1 text-amber-500" />}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Calendar Grid - Last 30 Days */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-konekt-black/60" />
          <h4 className="text-sm font-bold text-konekt-black">Posledních 30 dní</h4>
        </div>

        <div className="grid grid-cols-10 gap-1.5">
          {last30Days.map((day, index) => {
            const hasLogin = loginSet.has(day);
            const isToday = day === new Date().toISOString().split('T')[0];

            return (
              <motion.div
                key={day}
                className={`aspect-square rounded-lg transition-all ${
                  hasLogin
                    ? 'bg-gradient-to-br from-konekt-green to-konekt-pink'
                    : 'bg-konekt-black/5'
                } ${isToday ? 'ring-2 ring-konekt-black ring-offset-2' : ''}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                title={`${new Date(day).toLocaleDateString('cs-CZ')}${
                  hasLogin ? ' ✓' : ''
                }${isToday ? ' (Dnes)' : ''}`}
              >
                {hasLogin && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-konekt-white rounded-full" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-konekt-black/50">
          <span>Před 30 dny</span>
          <span>Dnes</span>
        </div>
      </div>

      {/* Next Milestone */}
      {current < 365 && (
        <div className="mt-6 p-3 bg-konekt-cream rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-konekt-black/60">Další milestone:</span>
            <span className="font-bold text-konekt-black">
              {current < 7 && `${7 - current} dní do Week Warrior 🔥`}
              {current >= 7 && current < 30 && `${30 - current} dní do Month Master 🌟`}
              {current >= 30 && current < 100 && `${100 - current} dní do 100 Day Warrior ⚡`}
              {current >= 100 && current < 365 && `${365 - current} dní do Year Legend 🏆`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
