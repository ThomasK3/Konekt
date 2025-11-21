'use client';

import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

interface WhoIsHiringBannerProps {
  count?: number;
  skill?: string;
}

export const WhoIsHiringBanner = ({ count = 5, skill = 'React Developers' }: WhoIsHiringBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 rounded-2xl p-6 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/30 rounded-xl group-hover:scale-110 transition-transform">
          <Briefcase className="w-6 h-6 text-blue-300" />
        </div>

        <div className="flex-1">
          <div className="font-bold text-white text-lg mb-1">
            💼 {count} companies actively hiring
          </div>
          <div className="text-white/80 text-sm">
            {skill} right now
          </div>
        </div>

        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-blue-300 font-semibold"
        >
          See opportunities
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Urgency indicator */}
      <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span>New positions added today</span>
      </div>
    </motion.div>
  );
};
