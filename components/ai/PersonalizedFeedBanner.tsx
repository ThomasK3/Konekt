'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Settings } from 'lucide-react';
import { useState } from 'react';
import type { User } from '@/types';

interface PersonalizedFeedBannerProps {
  currentUser: User;
  selectedSkills?: string[];
  selectedLookingFor?: string[];
  hasActiveFilters?: boolean;
  contentType: 'people' | 'mentors' | 'projects';
  resultCount: number;
}

export const PersonalizedFeedBanner = ({
  currentUser,
  selectedSkills = [],
  selectedLookingFor = [],
  hasActiveFilters = false,
  contentType,
  resultCount,
}: PersonalizedFeedBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  // Generate personalized message
  const generateMessage = () => {
    if (hasActiveFilters) {
      // User has active filters
      if (selectedSkills.length > 0 && selectedLookingFor.length > 0) {
        return `Filtered for ${selectedSkills.slice(0, 2).join(', ')} skills and "${selectedLookingFor[0]}" interests`;
      } else if (selectedSkills.length > 0) {
        return `Showing ${contentType} with ${selectedSkills.slice(0, 2).join(' or ')} skills${
          selectedSkills.length > 2 ? ` (+${selectedSkills.length - 2} more)` : ''
        }`;
      } else if (selectedLookingFor.length > 0) {
        return `Filtered by interest: "${selectedLookingFor[0]}"`;
      }
    }

    // No active filters - show personalized recommendations
    const userSkills = currentUser.skills.slice(0, 2).join(' and ');
    const userLookingFor = currentUser.lookingFor[0];

    if (contentType === 'people') {
      if (userSkills && userLookingFor) {
        return `Zaměřili jsme se na ${userSkills} ${contentType} hledající ${userLookingFor}, protože to odpovídá vašemu profilu`;
      } else if (userSkills) {
        return `Zaměřili jsme se na ${userSkills} ${contentType}, protože máte tyto skills`;
      } else if (userLookingFor) {
        return `Zaměřili jsme se na lidi hledající ${userLookingFor}, stejně jako vy`;
      }
    } else if (contentType === 'mentors') {
      return `Doporučujeme mentory na základě vašich skills: ${userSkills}`;
    } else if (contentType === 'projects') {
      if (userSkills) {
        return `Zobrazujeme projekty využívající ${userSkills}, které odpovídají vašim dovednostem`;
      }
    }

    return `Pro vás doporučujeme: Personalizováno podle vašeho profilu a zájmů`;
  };

  const message = generateMessage();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        className="mb-6 overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-konekt-pink/10 via-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-pink/20 relative">
          {/* Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-3 right-3 p-1 hover:bg-konekt-black/10 rounded-lg transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-konekt-black/60" />
          </button>

          <div className="flex items-start gap-3 pr-8">
            {/* Icon */}
            <div className="p-2 bg-gradient-to-br from-konekt-pink to-konekt-green rounded-lg flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-bold text-konekt-black mb-1 flex items-center gap-2">
                🤖 Pro tebe doporučujeme
                <span className="text-xs font-normal bg-konekt-black/10 px-2 py-0.5 rounded-full">
                  {resultCount} {resultCount === 1 ? 'result' : 'results'}
                </span>
              </h3>
              <p className="text-sm text-konekt-black/80 leading-relaxed">{message}</p>

              {/* Adjust Preferences Link */}
              <button className="mt-2 text-xs text-konekt-pink hover:text-konekt-pink/80 font-semibold flex items-center gap-1 transition-colors">
                <Settings className="w-3 h-3" />
                Upravit preference
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
