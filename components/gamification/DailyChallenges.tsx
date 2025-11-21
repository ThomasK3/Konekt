'use client';

import { motion } from 'framer-motion';
import type { DailyChallenge } from '@/types';
import { CheckCircle2, Circle, Star, Clock } from 'lucide-react';

interface DailyChallengesProps {
  challenges: DailyChallenge[];
}

export const DailyChallenges = ({ challenges }: DailyChallengesProps) => {
  const completedCount = challenges.filter((c) => c.completed).length;
  const totalXP = challenges.reduce((sum, c) => sum + (c.completed ? c.xpReward : 0), 0);
  const potentialXP = challenges.reduce((sum, c) => sum + c.xpReward, 0);

  // Calculate time until reset (midnight)
  const getTimeUntilReset = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 bg-konekt-white rounded-2xl border-2 border-konekt-black/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-konekt-black">Denní Výzvy</h3>
            <div className="px-2 py-0.5 bg-konekt-green/10 text-konekt-green text-xs font-bold rounded-full">
              {completedCount}/{challenges.length}
            </div>
          </div>
          <p className="text-sm text-konekt-black/60">
            Splň všechny pro bonus XP
          </p>
        </div>

        {/* Timer */}
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-konekt-black/60 mb-1">
            <Clock className="w-3 h-3" />
            <span>Reset za</span>
          </div>
          <div className="text-sm font-bold text-konekt-black">{getTimeUntilReset()}</div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-6 p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-green/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-konekt-black/70">Dnešní XP</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-lg font-bold text-konekt-black">
              {totalXP}/{potentialXP} XP
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-konekt-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink"
            initial={{ width: 0 }}
            animate={{ width: `${(totalXP / potentialXP) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {challenges.map((challenge, index) => {
          const progressPercentage = (challenge.progress / challenge.target) * 100;

          return (
            <motion.div
              key={challenge.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                challenge.completed
                  ? 'bg-konekt-green/5 border-konekt-green/30'
                  : 'bg-konekt-white border-konekt-black/10 hover:border-konekt-black/20'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox Icon */}
                <div className="mt-0.5">
                  {challenge.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-konekt-green" />
                  ) : (
                    <Circle className="w-5 h-5 text-konekt-black/30" />
                  )}
                </div>

                {/* Challenge Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4
                        className={`font-bold text-sm ${
                          challenge.completed
                            ? 'text-konekt-green line-through'
                            : 'text-konekt-black'
                        }`}
                      >
                        {challenge.task}
                      </h4>
                      <p
                        className={`text-xs ${
                          challenge.completed ? 'text-konekt-green/70' : 'text-konekt-black/60'
                        }`}
                      >
                        {challenge.description}
                      </p>
                    </div>

                    {/* XP Reward */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                        challenge.completed
                          ? 'bg-konekt-green/20 text-konekt-green'
                          : 'bg-konekt-black/5 text-konekt-black/60'
                      }`}
                    >
                      <Star className="w-3 h-3" />
                      +{challenge.xpReward}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {!challenge.completed && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-konekt-black/60 mb-1">
                        <span>Progres</span>
                        <span className="font-medium">
                          {challenge.progress}/{challenge.target}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-konekt-black/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All Complete Bonus */}
      {completedCount === challenges.length && (
        <motion.div
          className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎉</div>
            <div>
              <div className="font-bold text-amber-900">Všechny výzvy splněny!</div>
              <div className="text-sm text-amber-700">
                Bonus: +{Math.floor(potentialXP * 0.5)} XP za perfektní den!
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
