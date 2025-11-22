'use client';

import { motion } from 'framer-motion';
import { socialBadges, SocialBadge } from '@/lib/social-proof-data';
import { useState } from 'react';

interface SocialBadgesProps {
  userBadges: string[]; // Array of badge IDs the user has earned
}

export const SocialBadges = ({ userBadges }: SocialBadgesProps) => {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const earnedBadges = socialBadges.filter((badge) => userBadges.includes(badge.id));

  if (earnedBadges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {earnedBadges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
          onMouseEnter={() => setHoveredBadge(badge.id)}
          onMouseLeave={() => setHoveredBadge(null)}
          className="relative"
        >
          <div
            className={`px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg flex items-center gap-2 cursor-pointer hover:scale-110 transition-transform ${
              hoveredBadge === badge.id ? 'bg-white/20' : ''
            }`}
          >
            <span className="text-lg">{badge.icon}</span>
            <span className={`text-sm font-semibold ${badge.color}`}>{badge.label}</span>
          </div>

          {/* Tooltip */}
          {hoveredBadge === badge.id && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1F1F1F] border border-white/20 rounded-lg shadow-xl whitespace-nowrap z-10"
            >
              <div className="text-xs font-semibold text-white mb-1">{badge.label}</div>
              <div className="text-xs text-white/60">{badge.description}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1F1F1F]" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
