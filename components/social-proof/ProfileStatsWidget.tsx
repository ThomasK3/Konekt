'use client';

import { motion } from 'framer-motion';
import { Eye, TrendingUp, Clock, Bookmark } from 'lucide-react';

interface ProfileStatsWidgetProps {
  views: number;
  isTrending?: boolean;
  trendingCategory?: string;
  responseTime?: string;
  savedCount?: number;
}

export const ProfileStatsWidget = ({
  views,
  isTrending = false,
  trendingCategory,
  responseTime = '2h',
  savedCount = 0,
}: ProfileStatsWidgetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6 space-y-3"
    >
      {/* Views */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Eye className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{views}</div>
          <div className="text-sm text-white/60">views this week</div>
        </div>
      </div>

      {/* Trending Badge */}
      {isTrending && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-konekt-green/20 to-konekt-pink/20 border border-konekt-green/30 rounded-lg"
        >
          <TrendingUp className="w-4 h-4 text-konekt-green" />
          <span className="text-sm font-semibold text-konekt-green">
            Trending in "{trendingCategory || 'React Devs'}"
          </span>
        </motion.div>
      )}

      {/* Response Time */}
      <div className="flex items-center gap-3">
        <Clock className="w-4 h-4 text-white/40" />
        <span className="text-sm text-white/80">
          Typically responds in <strong className="text-white">{responseTime}</strong>
        </span>
      </div>

      {/* Saved Count */}
      {savedCount > 0 && (
        <div className="flex items-center gap-3">
          <Bookmark className="w-4 h-4 text-white/40" />
          <span className="text-sm text-white/80">
            <strong className="text-white">{savedCount}</strong> people saved this profile
          </span>
        </div>
      )}
    </motion.div>
  );
};
