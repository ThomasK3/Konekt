'use client';

import { motion } from 'framer-motion';
import { User } from '@/types';
import { MessageCircle, Sparkles, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface GlassProfileCardProps {
  user: User;
  matchScore?: number;
}

export const GlassProfileCard = ({ user, matchScore }: GlassProfileCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Static connections count (not random!)
  const connectionsCount = user.id ? parseInt(user.id.replace(/\D/g, '') || '0') % 50 + 10 : 23;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group min-h-[420px] max-h-[420px]"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-konekt-green via-konekt-pink to-konekt-green rounded-2xl opacity-0 group-hover:opacity-100 blur-sm"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Glass card */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden shadow-2xl h-full flex flex-col">
        {/* Light reflection effect following mouse */}
        <motion.div
          className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            width: '200px',
            height: '200px',
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with avatar */}
          <div className="flex items-start justify-between mb-4">
            {/* Avatar with frost effect */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 backdrop-blur-sm relative">
                <img
                  src={user.mainImage || user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />

                {/* Glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
              </div>

              {/* Online status with glow */}
              {user.isOnline && (
                <motion.div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white/50 backdrop-blur-sm"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(74, 105, 83, 1), rgba(74, 105, 83, 0.5))',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(74, 105, 83, 0.7)',
                      '0 0 0 8px rgba(74, 105, 83, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>

            {/* Match score with frost */}
            {matchScore && (
              <motion.div
                className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-sm text-white shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <span className="bg-gradient-to-r from-konekt-green to-konekt-pink bg-clip-text text-transparent">
                  {matchScore}% Match
                </span>
              </motion.div>
            )}
          </div>

          {/* Name and bio */}
          <div className="mb-4 overflow-hidden">
            <Link href={`/profile/${user.username}`}>
              <motion.h3
                className="text-xl font-bold text-white mb-1 hover:text-konekt-pink transition-colors truncate"
                whileHover={{ x: 5 }}
              >
                {user.name}
              </motion.h3>
            </Link>
            <p className="text-sm text-white/70 line-clamp-2 break-words">{user.bio}</p>
          </div>

          {/* Skills with glass effect */}
          <div className="flex flex-wrap gap-2 mb-4 overflow-hidden">
            {user.skills.slice(0, 3).map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-semibold"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  y: -2,
                }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {skill}
              </motion.span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 text-white/70 rounded-full text-xs shrink-0">
                +{user.skills.length - 3}
              </span>
            )}
          </div>

          {/* Stats bar with frosted glass */}
          <div className="flex items-center gap-4 mb-4 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-white/80">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold">4.9</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-white/80">
              <TrendingUp className="w-4 h-4 text-konekt-green" />
              <span className="text-sm font-semibold">
                {connectionsCount} connections
              </span>
            </div>
          </div>

          {/* Action buttons with glass effect */}
          <div className="flex gap-3">
            <Link href={`/profile/${user.username}`} className="flex-1">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                View Profile
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-3 bg-gradient-to-r from-konekt-green to-konekt-pink text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
