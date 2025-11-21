'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { useUserStore } from '@/lib/store';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export const ProgressChecklist = () => {
  const { user } = useUserStore();

  if (!user) return null;

  const checklist: ChecklistItem[] = [
    {
      id: 'create-account',
      label: 'Create account',
      completed: true, // Always true if user exists
    },
    {
      id: 'complete-profile',
      label: 'Complete profile',
      completed: user.bio.length > 20,
    },
    {
      id: 'add-skills',
      label: 'Add first skill',
      completed: user.skills.length > 0,
    },
    {
      id: 'upload-photo',
      label: 'Upload photo',
      completed: !!user.avatar,
    },
    {
      id: 'add-project',
      label: 'Add a project',
      completed: (user.projectIds?.length || 0) > 0,
    },
    {
      id: 'send-message',
      label: 'Send first message',
      completed: (user.gamification?.stats.messagesSent || 0) > 0,
    },
    {
      id: 'join-event',
      label: 'Join an event',
      completed: (user.gamification?.stats.eventsAttended || 0) > 0,
    },
  ];

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  // Don't show if fully completed
  if (completedCount === totalCount) return null;

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-konekt-white to-konekt-cream rounded-2xl border-2 border-konekt-black/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-konekt-green/10 rounded-xl flex items-center justify-center">
          <Trophy className="w-5 h-5 text-konekt-green" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-konekt-black">Getting Started</h3>
          <p className="text-xs text-konekt-black/60">
            {completedCount}/{totalCount} completed
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-konekt-black">{progressPercentage}%</span>
          <span className="text-xs text-konekt-black/60">
            {totalCount - completedCount} tasks left
          </span>
        </div>
        <div className="w-full bg-konekt-black/5 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-konekt-green to-konekt-pink h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {checklist.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-konekt-cream/50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {item.completed ? (
              <CheckCircle2 className="w-5 h-5 text-konekt-green flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-konekt-black/20 flex-shrink-0" />
            )}
            <span
              className={`text-sm ${
                item.completed
                  ? 'text-konekt-black/50 line-through'
                  : 'text-konekt-black font-medium'
              }`}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Reward Badge */}
      {progressPercentage >= 85 && completedCount < totalCount && (
        <motion.div
          className="mt-4 p-3 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 border border-konekt-green/20 rounded-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="text-xl">🏆</div>
            <div className="flex-1">
              <p className="text-xs font-bold text-konekt-green">Almost there!</p>
              <p className="text-xs text-konekt-black/60">
                Complete for <span className="font-bold">Early Adopter</span> badge!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
