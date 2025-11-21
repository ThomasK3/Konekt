'use client';

import { motion } from 'framer-motion';
import type { Achievement } from '@/types';
import { getRarityColor, getRarityGlow } from '@/lib/gamification';
import { Lock, Star } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
}

export const AchievementCard = ({ achievement, onClick }: AchievementCardProps) => {
  const { title, description, icon, rarity, unlocked, progress, target, xpReward } = achievement;

  const rarityColor = getRarityColor(rarity);
  const rarityGlow = getRarityGlow(rarity);

  const progressPercentage = target ? ((progress || 0) / target) * 100 : 0;
  const hasProgress = typeof progress === 'number' && typeof target === 'number';

  return (
    <motion.div
      onClick={onClick}
      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
        unlocked
          ? `${rarityColor} hover:shadow-xl ${rarityGlow}`
          : 'bg-konekt-black/5 border-konekt-black/10 hover:border-konekt-black/20'
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Unlocked Glow Effect */}
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-50 blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${
              rarity === 'legendary'
                ? '#fbbf24'
                : rarity === 'epic'
                ? '#a855f7'
                : rarity === 'rare'
                ? '#3b82f6'
                : '#9ca3af'
            }, transparent)`,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Locked Overlay */}
      {!unlocked && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-konekt-black/10 rounded-full flex items-center justify-center">
          <Lock className="w-4 h-4 text-konekt-black/40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`text-5xl mb-3 ${
            unlocked ? 'filter-none' : 'grayscale opacity-40'
          }`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className={`text-lg font-bold mb-1 ${
            unlocked ? 'text-konekt-black' : 'text-konekt-black/40'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm mb-3 ${
            unlocked ? 'text-konekt-black/70' : 'text-konekt-black/30'
          }`}
        >
          {description}
        </p>

        {/* Progress Bar */}
        {hasProgress && !unlocked && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-konekt-black/60 mb-1">
              <span>Progres</span>
              <span className="font-medium">
                {progress}/{target}
              </span>
            </div>
            <div className="w-full h-2 bg-konekt-black/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Rarity Badge */}
          <span
            className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
              unlocked ? rarityColor : 'text-konekt-black/30 bg-konekt-black/5'
            }`}
          >
            {rarity}
          </span>

          {/* XP Reward */}
          <div
            className={`flex items-center gap-1 ${
              unlocked ? 'text-konekt-green' : 'text-konekt-black/40'
            }`}
          >
            <Star className="w-3 h-3" />
            <span className="text-xs font-bold">+{xpReward} XP</span>
          </div>
        </div>

        {/* Unlocked Date */}
        {unlocked && achievement.unlockedAt && (
          <div className="mt-2 pt-2 border-t border-current/20">
            <p className="text-xs text-konekt-black/50">
              Odemčeno{' '}
              {new Date(achievement.unlockedAt).toLocaleDateString('cs-CZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
