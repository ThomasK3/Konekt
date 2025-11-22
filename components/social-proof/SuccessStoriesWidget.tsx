'use client';

import { motion } from 'framer-motion';
import { mockSuccessStories } from '@/lib/social-proof-data';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const SuccessStoriesWidget = () => {
  const [currentStory, setCurrentStory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % mockSuccessStories.length);
    }, 10000); // Rotate every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const story = mockSuccessStories[currentStory];

  return (
    <motion.div
      key={currentStory}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-2 border-konekt-green/30 rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💚</span>
        <h3 className="text-lg font-bold text-white">Success Story</h3>
      </div>

      <div className="mb-4">
        <p className="text-white/90 text-sm leading-relaxed italic mb-3">
          "{story.quote}"
        </p>

        <div className="flex items-center gap-3">
          <img
            src={story.avatar}
            alt={story.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-white text-sm">{story.author}</div>
            <div className="text-xs text-white/60">{story.title}</div>
            {story.event && (
              <div className="text-xs text-konekt-green">{story.event}</div>
            )}
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 text-sm font-semibold text-konekt-green hover:text-konekt-green/80 transition-colors">
        Read more stories
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Indicator dots */}
      <div className="flex gap-2 mt-4 justify-center">
        {mockSuccessStories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStory(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentStory
                ? 'bg-konekt-green w-6'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
