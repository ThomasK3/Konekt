'use client';

import { motion } from 'framer-motion';
import type { Level } from '@/types';
import { Star, TrendingUp } from 'lucide-react';

interface LevelBadgeProps {
  level: Level;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  showTitle?: boolean;
}

export const LevelBadge = ({ level, size = 'md', showProgress = false, showTitle = false }: LevelBadgeProps) => {
  const { level: lvl, xp, xpToNextLevel, title } = level;

  // Calculate progress to next level
  const xpForCurrentLevel = (lvl - 1) * (lvl - 1) * 100;
  const xpForNextLevel = lvl * lvl * 100;
  const currentLevelXP = xp - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = (currentLevelXP / xpNeededForLevel) * 100;

  // Size variants
  const sizeClasses = {
    sm: {
      badge: 'w-10 h-10 text-xs',
      icon: 'w-3 h-3',
      text: 'text-xs',
    },
    md: {
      badge: 'w-14 h-14 text-base',
      icon: 'w-4 h-4',
      text: 'text-sm',
    },
    lg: {
      badge: 'w-20 h-20 text-2xl',
      icon: 'w-5 h-5',
      text: 'text-base',
    },
  };

  const classes = sizeClasses[size];

  // Level color based on level
  const getLevelColor = (level: number) => {
    if (level <= 3) return 'from-gray-400 to-gray-600';
    if (level <= 10) return 'from-blue-400 to-blue-600';
    if (level <= 20) return 'from-purple-400 to-purple-600';
    if (level <= 30) return 'from-amber-400 to-amber-600';
    return 'from-pink-400 via-purple-500 to-indigo-600';
  };

  return (
    <div className="flex items-center gap-3">
      {/* Level Badge */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${getLevelColor(
            lvl
          )} blur-lg opacity-40`}
        />

        {/* Badge */}
        <div
          className={`relative ${classes.badge} rounded-full bg-gradient-to-br ${getLevelColor(
            lvl
          )} flex items-center justify-center font-bold text-konekt-white shadow-xl border-4 border-konekt-white`}
        >
          {lvl}
        </div>

        {/* Spinning ring animation */}
        {showProgress && (
          <svg
            className="absolute inset-0 -m-1 w-[calc(100%+8px)] h-[calc(100%+8px)]"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${progressPercentage * 3.14} ${314 - progressPercentage * 3.14}`}
              initial={{ strokeDasharray: '0 314' }}
              animate={{ strokeDasharray: `${progressPercentage * 3.14} ${314 - progressPercentage * 3.14}` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </motion.div>

      {/* Level Info */}
      {(showProgress || showTitle) && (
        <div className="flex flex-col">
          {showTitle && (
            <div className="flex items-center gap-1">
              <span className={`font-bold ${classes.text} text-konekt-black`}>Level {lvl}</span>
              <Star className={`${classes.icon} text-amber-500`} />
            </div>
          )}

          {showTitle && (
            <span className={`text-xs text-konekt-black/60 font-medium`}>{title}</span>
          )}

          {showProgress && (
            <div className="mt-1">
              <div className="flex items-center gap-1 text-xs text-konekt-black/60 mb-1">
                <TrendingUp className="w-3 h-3" />
                <span>
                  {xp.toLocaleString()} XP
                </span>
              </div>
              <div className="w-32 h-1.5 bg-konekt-black/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs text-konekt-black/50 mt-0.5 block">
                {xpToNextLevel.toLocaleString()} XP do dalšího levelu
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
