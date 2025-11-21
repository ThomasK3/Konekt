'use client';

import { motion } from 'framer-motion';
import { Sparkles, Rocket, FastForward } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
  onSkip: () => void;
}

export const IntroScreen = ({ onStart, onSkip }: IntroScreenProps) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-konekt-green/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center relative z-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-konekt-green to-konekt-pink rounded-full blur-2xl opacity-50" />
            <div className="relative p-6 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-3xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-konekt-green to-konekt-pink bg-clip-text text-transparent"
        >
          BUILD YOUR PROFILE
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/60 mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Vytvoř si profesní postavu která reprezentuje tvoje skills a ambice
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-konekt-green to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3"
          >
            <Rocket className="w-6 h-6" />
            Let's Go!
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSkip}
            className="px-8 py-4 border-2 border-white/20 text-white/80 rounded-2xl font-semibold text-lg hover:bg-white/5 transition-colors flex items-center gap-3"
          >
            <FastForward className="w-6 h-6" />
            Skip for now
          </motion.button>
        </motion.div>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-white/40"
        >
          ⏱️ Takes ~5 minutes • 🎯 Boost your visibility by 5x • 💾 Auto-saved
        </motion.p>
      </motion.div>
    </div>
  );
};
