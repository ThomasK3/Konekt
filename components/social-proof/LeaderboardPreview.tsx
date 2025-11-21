'use client';

import { motion } from 'framer-motion';
import { mockLeaderboard } from '@/lib/social-proof-data';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeaderboardPreviewProps {
  currentUserId?: string;
  currentUserRank?: number;
  currentUserScore?: number;
}

export const LeaderboardPreview = ({
  currentUserId = 'user1',
  currentUserRank = 12,
  currentUserScore = 8,
}: LeaderboardPreviewProps) => {
  const topThree = mockLeaderboard.slice(0, 3);
  const showCurrentUser = currentUserRank > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🏆</span>
        <h3 className="text-lg font-bold text-white">Top Networkers This Week</h3>
      </div>

      {/* Top 3 */}
      <div className="space-y-3 mb-4">
        {topThree.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              index === 0
                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                : 'bg-white/5'
            }`}
          >
            {/* Medal */}
            <div className="text-2xl flex-shrink-0">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
            </div>

            {/* Avatar */}
            <img
              src={entry.avatar}
              alt={entry.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate">{entry.name}</div>
              <div className="text-xs text-white/60">{entry.score} connections</div>
            </div>

            {/* Change */}
            {entry.change !== undefined && entry.change !== 0 && (
              <div
                className={`flex items-center gap-1 text-xs font-bold ${
                  entry.change > 0
                    ? 'text-green-400'
                    : entry.change < 0
                    ? 'text-red-400'
                    : 'text-white/40'
                }`}
              >
                {entry.change > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : entry.change < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {Math.abs(entry.change)}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Separator */}
      {showCurrentUser && (
        <div className="border-t border-white/10 my-4 pt-4">
          <div className="flex items-center gap-3 p-3 bg-konekt-green/20 border border-konekt-green/30 rounded-xl">
            <div className="font-bold text-konekt-green">#{currentUserRank}</div>
            <div className="flex-1">
              <div className="font-semibold text-white">You</div>
              <div className="text-xs text-white/60">{currentUserScore} connections</div>
            </div>
          </div>
        </div>
      )}

      {/* View Full Leaderboard Button */}
      <button className="w-full mt-4 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white transition-colors">
        View Full Leaderboard →
      </button>

      {/* Motivational Text */}
      <p className="text-xs text-center text-white/40 mt-3">
        Connect with {topThree[0].score - currentUserScore} more people to reach top 10!
      </p>
    </motion.div>
  );
};
