'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame, Lightbulb, HandMetal, Rocket, ThumbsUp } from 'lucide-react';

interface ReactionButtonProps {
  emoji: string;
  label: string;
  count: number;
  isActive?: boolean;
  onToggle: () => void;
  color: string;
}

const ReactionButton = ({ emoji, label, count, isActive, onToggle, color }: ReactionButtonProps) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
        isActive
          ? `${color} border-current`
          : 'bg-white border-konekt-black/10 text-konekt-black/60 hover:border-konekt-black/30'
      }`}
    >
      <span className="text-lg">{emoji}</span>
      <span className="font-medium text-sm">{count}</span>
    </motion.button>
  );
};

interface ReactionsBarProps {
  projectId: string;
  initialReactions?: {
    love: number;
    fire: number;
    brilliant: number;
    wellDone: number;
    ship: number;
    interesting: number;
  };
}

export const ReactionsBar = ({ projectId, initialReactions }: ReactionsBarProps) => {
  const [reactions, setReactions] = useState(
    initialReactions || {
      love: 45,
      fire: 23,
      brilliant: 12,
      wellDone: 34,
      ship: 8,
      interesting: 5,
    }
  );

  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());

  const toggleReaction = (type: keyof typeof reactions) => {
    const hasReacted = userReactions.has(type);

    setReactions((prev) => ({
      ...prev,
      [type]: hasReacted ? prev[type] - 1 : prev[type] + 1,
    }));

    setUserReactions((prev) => {
      const newSet = new Set(prev);
      if (hasReacted) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });

    // In real app, save to backend
    console.log(`${hasReacted ? 'Removed' : 'Added'} ${type} reaction for project ${projectId}`);
  };

  const reactionConfigs = [
    { type: 'love' as const, emoji: '❤️', label: 'Love it', color: 'bg-red-100 text-red-600 border-red-600' },
    { type: 'fire' as const, emoji: '🔥', label: 'Fire', color: 'bg-orange-100 text-orange-600 border-orange-600' },
    { type: 'brilliant' as const, emoji: '💡', label: 'Brilliant', color: 'bg-yellow-100 text-yellow-600 border-yellow-600' },
    { type: 'wellDone' as const, emoji: '👏', label: 'Well done', color: 'bg-blue-100 text-blue-600 border-blue-600' },
    { type: 'ship' as const, emoji: '🚀', label: 'Ship it!', color: 'bg-purple-100 text-purple-600 border-purple-600' },
    { type: 'interesting' as const, emoji: '🤔', label: 'Interesting', color: 'bg-gray-100 text-gray-600 border-gray-600' },
  ];

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-konekt-black">Reactions</h3>
        <span className="text-sm text-konekt-black/60">{totalReactions} total</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {reactionConfigs.map((config) => (
          <ReactionButton
            key={config.type}
            emoji={config.emoji}
            label={config.label}
            count={reactions[config.type]}
            isActive={userReactions.has(config.type)}
            onToggle={() => toggleReaction(config.type)}
            color={config.color}
          />
        ))}
      </div>

      {userReactions.size > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-konekt-black/50 mt-3"
        >
          You reacted with {Array.from(userReactions).join(', ')}
        </motion.p>
      )}
    </div>
  );
};
