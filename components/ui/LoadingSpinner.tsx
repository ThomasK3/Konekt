'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'pink' | 'black';
}

export function LoadingSpinner({ size = 'md', color = 'green' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    green: 'border-konekt-green',
    pink: 'border-konekt-pink',
    black: 'border-konekt-black',
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function LoadingDots({ color = 'green' }: { color?: 'green' | 'pink' | 'black' }) {
  const colors = {
    green: 'bg-konekt-green',
    pink: 'bg-konekt-pink',
    black: 'bg-konekt-black',
  };

  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${colors[color]}`}
          animate={{
            y: [0, -10, 0],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Skeleton loader for content placeholders
export function SkeletonCard() {
  return (
    <div className="p-6 bg-konekt-white rounded-2xl border-2 border-konekt-black/10 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-konekt-black/10 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-konekt-black/10 rounded w-3/4 mb-2" />
          <div className="h-3 bg-konekt-black/10 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-konekt-black/10 rounded" />
        <div className="h-3 bg-konekt-black/10 rounded w-5/6" />
      </div>
    </div>
  );
}
