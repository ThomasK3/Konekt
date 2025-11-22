'use client';

import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';

interface ProfileOptimizationProps {
  percentage: number;
  suggestions: Array<{ action: string; impact: string }>;
}

export const ProfileOptimization = ({ percentage, suggestions }: ProfileOptimizationProps) => {
  const getColor = () => {
    if (percentage >= 80) return 'from-konekt-green to-emerald-500';
    if (percentage >= 60) return 'from-blue-500 to-cyan-500';
    if (percentage >= 40) return 'from-amber-500 to-orange-500';
    return 'from-konekt-pink to-rose-500';
  };

  const getLabel = () => {
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 70) return 'Great!';
    if (percentage >= 50) return 'Good';
    return 'Needs work';
  };

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-konekt-white to-konekt-cream rounded-2xl border-2 border-konekt-black/10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-konekt-black">Profile Strength</h3>
          <p className="text-xs text-konekt-black/60">AI-powered analysis</p>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-konekt-black/10"
            />
            {/* Progress Circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="text-konekt-pink" stopColor="currentColor" />
                <stop offset="100%" className="text-konekt-green" stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-konekt-black">{percentage}%</span>
            <span className="text-xs text-konekt-black/60">{getLabel()}</span>
          </div>
        </div>

        {/* Celebration message for high scores */}
        {percentage >= 90 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center text-sm font-semibold text-konekt-green"
          >
            🎉 You&apos;re in the top 10% of users!
          </motion.p>
        )}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-konekt-black mb-3">
            <Lightbulb className="w-4 h-4 text-konekt-pink" />
            To improve your visibility:
          </div>

          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-konekt-white rounded-lg border border-konekt-black/10"
            >
              <CheckCircle className="w-4 h-4 text-konekt-green flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-konekt-black">{suggestion.action}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <TrendingUp className="w-3 h-3 text-konekt-pink" />
                  <span className="text-xs font-semibold text-konekt-pink">{suggestion.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Footer tip */}
          <div className="mt-4 pt-4 border-t border-konekt-black/10">
            <p className="text-xs text-konekt-black/60 text-center italic">
              💡 Profiles with these improvements get 37% more responses
            </p>
          </div>
        </div>
      )}

      {/* Perfect score message */}
      {suggestions.length === 0 && percentage === 100 && (
        <div className="p-4 bg-gradient-to-r from-konekt-green/20 to-konekt-pink/20 rounded-lg text-center">
          <p className="text-sm font-semibold text-konekt-black">
            ✨ Your profile is perfect! Keep engaging with the community.
          </p>
        </div>
      )}
    </motion.div>
  );
};
