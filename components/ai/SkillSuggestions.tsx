'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface SkillSuggestionsProps {
  suggestions: string[];
  onAdd: (skill: string) => void;
  onDismiss?: () => void;
}

export const SkillSuggestions = ({ suggestions, onAdd, onDismiss }: SkillSuggestionsProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || suggestions.length === 0) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-4 overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border border-konekt-green/20 relative">
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 hover:bg-konekt-black/10 rounded-lg transition-colors"
            aria-label="Dismiss suggestions"
          >
            <X className="w-4 h-4 text-konekt-black/60" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-3 pr-8">
            <Sparkles className="w-5 h-5 text-konekt-pink" />
            <p className="text-sm font-semibold text-konekt-black">
              💡 People with similar skills often have:
            </p>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <motion.button
                key={skill}
                onClick={() => onAdd(skill)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-konekt-white border-2 border-konekt-green/30 rounded-full text-sm font-medium text-konekt-black hover:border-konekt-green hover:bg-konekt-green/10 transition-all"
              >
                <Plus className="w-3 h-3 text-konekt-green" />
                {skill}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
