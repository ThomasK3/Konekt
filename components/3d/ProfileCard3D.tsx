'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { User } from '@/types';
import { MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ProfileCard3DProps {
  user: User;
  matchScore?: number;
  variant?: 'default' | 'holographic' | 'glass' | 'premium';
}

export const ProfileCard3D = ({ user, matchScore, variant = 'default' }: ProfileCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  // Holographic gradient position
  const gradientX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const gradientY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'holographic':
        return 'bg-gradient-to-br from-konekt-white via-konekt-cream to-konekt-white border-2 border-konekt-pink/30';
      case 'glass':
        return 'bg-white/5 backdrop-blur-xl border border-white/10';
      case 'premium':
        return 'bg-gradient-to-br from-yellow-50 via-white to-yellow-50 border-2 border-yellow-400/50';
      default:
        return 'bg-konekt-white border-2 border-konekt-black/10';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale: 1.05, z: 50 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl p-6 overflow-hidden shadow-lg min-h-[420px] max-h-[420px] flex flex-col ${getVariantStyles()}`}
    >
      {/* Holographic overlay (only for holographic variant) */}
      {variant === 'holographic' && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${gradientX.get()} ${gradientY.get()}, rgba(72, 114, 83, 0.3), transparent 50%)`,
          }}
        />
      )}

      {/* Animated gradient background (premium variant) */}
      {variant === 'premium' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.2), transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.2), transparent 50%)',
              'radial-gradient(circle at 0% 100%, rgba(255, 215, 0, 0.2), transparent 50%)',
              'radial-gradient(circle at 100% 0%, rgba(255, 215, 0, 0.2), transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.2), transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Content container with depth */}
      <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
        {/* Header with avatar and status */}
        <div className="flex items-start justify-between mb-4">
          {/* Avatar with holographic shimmer */}
          <motion.div
            className="relative"
            style={{ transform: 'translateZ(80px)' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <img
                src={user.mainImage || user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'}
                alt={user.name}
                className="w-full h-full object-cover"
              />

              {/* Holographic shimmer effect */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent, rgba(72, 114, 83, 0.5), transparent)',
                      'linear-gradient(135deg, transparent, rgba(200, 114, 164, 0.5), transparent)',
                      'linear-gradient(225deg, transparent, rgba(72, 114, 83, 0.5), transparent)',
                      'linear-gradient(315deg, transparent, rgba(200, 114, 164, 0.5), transparent)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </div>

            {/* Online status indicator */}
            {user.isOnline && (
              <motion.div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-konekt-green rounded-full border-4 border-konekt-white"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(74, 105, 83, 0.7)',
                    '0 0 0 8px rgba(74, 105, 83, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Match score badge */}
          {matchScore && (
            <motion.div
              style={{ transform: 'translateZ(60px)' }}
              className="px-4 py-2 bg-gradient-to-r from-konekt-green to-konekt-pink text-white rounded-full font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              {matchScore}% Match
            </motion.div>
          )}

          {/* Premium badge */}
          {variant === 'premium' && (
            <motion.div
              style={{ transform: 'translateZ(60px)' }}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-bold text-xs shadow-lg"
              animate={{
                y: [0, -3, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3" />
              Premium
            </motion.div>
          )}
        </div>

        {/* Name and bio with depth layers */}
        <motion.div
          style={{ transform: 'translateZ(70px)' }}
          className="mb-3 overflow-hidden"
        >
          <Link href={`/profile/${user.username}`}>
            <h3 className="text-xl font-bold text-konekt-black hover:text-konekt-pink transition-colors mb-1 truncate">
              {user.name}
            </h3>
          </Link>
          <p className="text-sm text-konekt-black/60 line-clamp-2 break-words">{user.bio}</p>
        </motion.div>

        {/* Skills with floating effect */}
        <motion.div
          style={{ transform: 'translateZ(40px)' }}
          className="flex flex-wrap gap-2 mb-4 overflow-hidden"
        >
          {user.skills.slice(0, 3).map((skill, index) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-konekt-green/20 text-konekt-green rounded-full text-xs font-semibold"
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(74, 105, 83, 0.4)',
                y: -2,
              }}
              animate={{
                y: isHovered ? [0, -3, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            >
              {skill}
            </motion.span>
          ))}
          {user.skills.length > 3 && (
            <span className="px-3 py-1 bg-konekt-black/5 text-konekt-black/70 rounded-full text-xs shrink-0">
              +{user.skills.length - 3}
            </span>
          )}
        </motion.div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1 min-h-[20px]" style={{ transform: 'translateZ(20px)' }} />

        {/* Action buttons */}
        <motion.div
          style={{ transform: 'translateZ(30px)' }}
          className="flex gap-3 mt-auto"
        >
          <Link href={`/profile/${user.username}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-2 bg-konekt-black text-white rounded-xl font-semibold hover:bg-konekt-black/90 transition-colors"
            >
              View Profile
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-konekt-pink text-white rounded-xl font-semibold hover:bg-konekt-pink/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Card shadow layer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-konekt-black/5 to-transparent rounded-2xl pointer-events-none"
        style={{ transform: 'translateZ(-10px)' }}
      />
    </motion.div>
  );
};
