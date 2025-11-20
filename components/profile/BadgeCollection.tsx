'use client';

import type { Badge } from '@/types';
import { Award, Lock } from 'lucide-react';
import { useState } from 'react';

interface BadgeCollectionProps {
  badges: Badge[];
  allBadges?: Badge[];
  showProgress?: boolean;
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({
  badges,
  allBadges,
  showProgress = false,
}) => {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  // If allBadges is provided, show both earned and locked badges
  const displayBadges = allBadges || badges;
  const earnedBadgeIds = new Set(badges.map((b) => b.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-konekt-green" />
          <h3 className="font-bold text-konekt-black">Achievement Badges</h3>
        </div>
        {showProgress && allBadges && (
          <div className="text-sm text-konekt-black/60">
            {badges.length} / {allBadges.length} získáno
          </div>
        )}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {displayBadges.map((badge) => {
          const isEarned = earnedBadgeIds.has(badge.id);
          const isHovered = hoveredBadge === badge.id;

          return (
            <div
              key={badge.id}
              className="relative"
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isEarned
                    ? 'bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-konekt-green/30 hover:border-konekt-green hover:shadow-lg'
                    : 'bg-konekt-black/5 border-konekt-black/10 opacity-50'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  {/* Icon */}
                  <div
                    className={`text-4xl ${
                      isEarned ? 'filter-none' : 'grayscale opacity-40'
                    }`}
                  >
                    {isEarned ? badge.icon : '🔒'}
                  </div>

                  {/* Name */}
                  <div>
                    <div className={`text-sm font-bold ${isEarned ? 'text-konekt-black' : 'text-konekt-black/40'}`}>
                      {badge.name}
                    </div>
                  </div>

                  {/* Lock icon for unearned badges */}
                  {!isEarned && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-3 h-3 text-konekt-black/30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 w-48">
                  <div className="bg-konekt-black text-konekt-white text-xs rounded-lg p-3 shadow-xl">
                    <div className="font-bold mb-1">{badge.name}</div>
                    <div className="text-konekt-white/80">{badge.description}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-konekt-black" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Achievement Stats (if showing progress) */}
      {showProgress && (
        <div className="p-4 bg-konekt-cream rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-konekt-black">Postup</span>
            <span className="text-sm text-konekt-black/60">
              {Math.round((badges.length / (allBadges?.length || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-konekt-white rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink transition-all duration-500"
              style={{
                width: `${(badges.length / (allBadges?.length || 1)) * 100}%`,
              }}
            />
          </div>
          <div className="mt-3 text-xs text-konekt-black/60">
            💡 Získej další odznaky účastí v komunitě a aktivitou na platformě!
          </div>
        </div>
      )}
    </div>
  );
};
