'use client';

import { motion } from 'framer-motion';
import { User } from '@/types';
import { MatchResult } from '@/lib/ai-matching';
import { Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface MatchCardProps {
  user: User;
  matchResult: MatchResult;
}

export const MatchCard = ({ user, matchResult }: MatchCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-konekt-green to-emerald-500';
    if (score >= 70) return 'from-konekt-pink to-rose-500';
    if (score >= 50) return 'from-blue-500 to-cyan-500';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-konekt-white rounded-2xl border-2 border-konekt-black/10 hover:border-konekt-pink/30 transition-all"
    >
      {/* Header with Profile Info */}
      <div className="flex items-start justify-between mb-4">
        <Link href={`/profile/${user.username}`} className="flex items-center gap-4 flex-1">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-konekt-black/10"
          />
          <div>
            <h3 className="font-bold text-lg text-konekt-black hover:text-konekt-pink transition-colors">
              {user.name}
            </h3>
            <p className="text-sm text-konekt-black/60">{user.bio.slice(0, 80)}...</p>
          </div>
        </Link>

        {/* Match Score Badge */}
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-4 py-2 bg-gradient-to-r ${getScoreColor(
              matchResult.matchScore
            )} text-white rounded-full font-bold text-sm shadow-lg`}
          >
            {matchResult.matchScore}% Match
          </div>
          {user.isOnline && (
            <div className="flex items-center gap-1.5 text-xs text-konekt-green">
              <div className="w-2 h-2 rounded-full bg-konekt-green animate-pulse"></div>
              Online now
            </div>
          )}
        </div>
      </div>

      {/* Match Reasons */}
      <div className="space-y-2 mb-4 p-4 bg-konekt-cream/50 rounded-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-konekt-black mb-2">
          <Sparkles className="w-4 h-4 text-konekt-pink" />
          Why you match:
        </div>
        {matchResult.reasons.map((reason, index) => (
          <div key={index} className="flex items-start gap-2 text-sm text-konekt-black/80">
            <span className="text-konekt-green font-bold">{reason.icon}</span>
            <span>{reason.description}</span>
          </div>
        ))}

        {matchResult.prediction && (
          <div className="mt-3 pt-3 border-t border-konekt-black/10">
            <p className="text-sm font-semibold text-konekt-pink">{matchResult.prediction}</p>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {user.skills.slice(0, 5).map((skill) => {
          const isShared = matchResult.sharedSkills.includes(skill);
          return (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs ${
                isShared
                  ? 'bg-konekt-green text-white font-semibold'
                  : 'bg-konekt-black/5 text-konekt-black/70'
              }`}
            >
              {skill}
            </span>
          );
        })}
        {user.skills.length > 5 && (
          <span className="px-3 py-1 rounded-full text-xs bg-konekt-black/5 text-konekt-black/70">
            +{user.skills.length - 5} more
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link href={`/profile/${user.username}`} className="flex-1">
          <button className="w-full px-4 py-2 bg-konekt-black text-white rounded-xl font-semibold hover:bg-konekt-black/90 transition-colors">
            View Profile
          </button>
        </Link>
        <button className="px-4 py-2 bg-konekt-pink text-white rounded-xl font-semibold hover:bg-konekt-pink/90 transition-colors flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Message
        </button>
      </div>
    </motion.div>
  );
};
