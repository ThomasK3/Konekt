'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '@/types';
import { X, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getRarityColor } from '@/lib/gamification';
import { useEffect, useState } from 'react';

interface AchievementUnlockModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
  onShare?: () => void;
}

export const AchievementUnlockModal = ({
  achievement,
  isOpen,
  onClose,
  onShare,
}: AchievementUnlockModalProps) => {
  const [confettiPieces, setConfettiPieces] = useState<
    Array<{ id: number; x: number; y: number; rotation: number; color: string; delay: number }>
  >([]);

  useEffect(() => {
    if (isOpen && achievement) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        rotation: Math.random() * 360,
        color: ['#10b981', '#ec4899', '#f59e0b', '#3b82f6', '#8b5cf6'][
          Math.floor(Math.random() * 5)
        ],
        delay: Math.random() * 0.2,
      }));
      setConfettiPieces(pieces);
    }
  }, [isOpen, achievement]);

  if (!achievement) return null;

  const rarityColor = getRarityColor(achievement.rarity);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-konekt-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Confetti */}
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  left: `${piece.x}%`,
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotation}deg)`,
                }}
                initial={{ y: `${piece.y}vh`, opacity: 1 }}
                animate={{
                  y: '110vh',
                  opacity: [1, 1, 0],
                  rotate: [piece.rotation, piece.rotation + 360 * 3],
                }}
                transition={{
                  duration: 3,
                  delay: piece.delay,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              className="relative bg-konekt-white rounded-3xl p-8 max-w-md w-full border-4 border-konekt-black/10 shadow-2xl"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-konekt-black/5 hover:bg-konekt-black/10 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5 text-konekt-black/60" />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Sparkles */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    className="text-8xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {achievement.icon}
                  </motion.div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 blur-2xl opacity-60"
                    style={{
                      background: `radial-gradient(circle, ${
                        achievement.rarity === 'legendary'
                          ? '#fbbf24'
                          : achievement.rarity === 'epic'
                          ? '#a855f7'
                          : achievement.rarity === 'rare'
                          ? '#3b82f6'
                          : '#10b981'
                      }, transparent)`,
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-bold text-konekt-black mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Achievement Unlocked!
                </motion.h2>

                {/* Achievement Title */}
                <motion.div
                  className="text-2xl font-bold text-konekt-black mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {achievement.title}
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-konekt-black/70 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {achievement.description}
                </motion.p>

                {/* Rarity Badge */}
                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase border-2 ${rarityColor}`}
                  >
                    {achievement.rarity}
                  </span>

                  <div className="flex items-center gap-1 px-4 py-2 bg-amber-50 text-amber-600 rounded-full border-2 border-amber-200">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-bold">+{achievement.xpReward} XP</span>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {onShare && (
                    <Button
                      variant="outline"
                      onClick={onShare}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Sdílet
                    </Button>
                  )}
                  <Button onClick={onClose} className="flex-1">
                    Pokračovat
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
