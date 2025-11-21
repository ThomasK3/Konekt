'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User } from '@/types';
import {
  MessageCircle,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface FlipProfileCardProps {
  user: User;
  stats?: {
    projectsCompleted: number;
    eventsAttended: number;
    connections: number;
    streak: number;
  };
}

export const FlipProfileCard = ({
  user,
  stats = {
    projectsCompleted: 5,
    eventsAttended: 12,
    connections: 23,
    streak: 7,
  },
}: FlipProfileCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full min-h-[420px] max-h-[420px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="h-full bg-gradient-to-br from-konekt-white to-konekt-cream rounded-2xl border-2 border-konekt-black/10 p-6 flex flex-col items-center justify-center text-center overflow-hidden relative shadow-lg">
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage:
                  'radial-gradient(circle, #4a6953 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* Avatar with glow effect */}
            <motion.div
              className="relative mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-konekt-green to-konekt-pink rounded-full blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={user.mainImage || user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online indicator */}
              {user.isOnline && (
                <motion.div
                  className="absolute bottom-2 right-2 w-8 h-8 bg-konekt-green rounded-full border-4 border-white shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.div>

            {/* Name and role */}
            <h3 className="text-2xl font-bold text-konekt-black mb-2 relative z-10 truncate px-4">
              {user.name}
            </h3>
            <p className="text-lg text-konekt-pink font-semibold mb-3 relative z-10 truncate px-4">
              {user.lookingFor[0] || 'Developer'}
            </p>

            {/* Bio */}
            <p className="text-sm text-konekt-black/60 mb-6 line-clamp-2 max-w-xs relative z-10 break-words px-4">
              {user.bio}
            </p>

            {/* Top skills */}
            <div className="flex flex-wrap gap-2 justify-center relative z-10">
              {user.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-konekt-green text-white rounded-full text-sm font-semibold shadow-lg"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Hover hint */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-konekt-black/40 font-medium"
              animate={{
                y: [0, -5, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Hover to see stats →
            </motion.div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full bg-gradient-to-br from-konekt-green to-konekt-pink rounded-2xl p-6 flex flex-col text-white relative overflow-hidden shadow-lg">
            {/* Animated circles background */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: 1,
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold mb-1">{user.name}</h4>
                <p className="text-sm text-white/80">Profile Stats & Achievements</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Projects */}
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <Award className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.projectsCompleted}</div>
                  <div className="text-xs text-white/80">Projects</div>
                </motion.div>

                {/* Events */}
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <Calendar className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.eventsAttended}</div>
                  <div className="text-xs text-white/80">Events</div>
                </motion.div>

                {/* Connections */}
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.connections}</div>
                  <div className="text-xs text-white/80">Connections</div>
                </motion.div>

                {/* Streak */}
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <Zap className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.streak}</div>
                  <div className="text-xs text-white/80">Day Streak</div>
                </motion.div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Top Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Link href={`/profile/${user.username}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-3 bg-white text-konekt-green rounded-xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Target className="w-5 h-5" />
                    View Full Profile
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
