'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { useEffect, useState } from 'react';
import { Sparkles, CheckCircle, Rocket, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileRevealProps {
  data: RegistrationData;
}

export const ProfileReveal = ({ data }: ProfileRevealProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fake loading animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowConfetti(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completion = 70; // Base completion
    if (data.videoUrl) completion += 5;
    if (data.integrations?.github) completion += 5;
    if (data.integrations?.linkedin) completion += 5;
    if (data.integrations?.portfolio) completion += 5;
    if (data.bio && data.bio.length > 50) completion += 5;
    if (data.skills.length >= 7) completion += 5;
    return completion;
  };

  const completionPercentage = calculateCompletion();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mb-8 mx-auto w-24 h-24 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-3xl flex items-center justify-center"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4">Preparing your profile...</h2>

          {/* Progress bar */}
          <div className="w-80 h-3 bg-white/10 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-konekt-green via-emerald-400 to-konekt-pink"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-4 text-white/60">{progress}%</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
                background: ['#4A6953', '#E97B8A', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 4)],
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Achievement Unlocked */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="font-bold text-lg">Achievement Unlocked: Profile Creator!</span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-konekt-green to-konekt-pink bg-clip-text text-transparent"
          >
            🎉 PROFILE COMPLETE!
          </motion.h1>
        </motion.div>

        {/* Profile Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#151515] border-2 border-white/10 rounded-3xl p-8 mb-8"
        >
          {/* Avatar */}
          <div className="flex items-start gap-6 mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
              style={{ background: data.avatarBackground || '#4A6953' }}
            >
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">
                {data.oneLiner || 'Your amazing profile'}
              </h2>
              {data.location && (
                <p className="text-white/60 mb-2">
                  📍 {data.location} {data.remoteOk && '• Remote OK'}
                </p>
              )}
              {data.archetype && (
                <span className="inline-block px-3 py-1 bg-konekt-green/20 text-konekt-green rounded-full text-sm font-semibold">
                  {data.archetype.charAt(0).toUpperCase() + data.archetype.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Bio */}
          {data.bio && (
            <p className="text-white/80 mb-6 leading-relaxed">{data.bio}</p>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/60 mb-3">Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/10 rounded-lg text-sm font-medium"
                  >
                    {skill}
                    {data.skillLevels[skill] && (
                      <span className="ml-1">
                        {'⭐'.repeat(data.skillLevels[skill])}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Looking For */}
          {data.lookingFor.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white/60 mb-3">Looking for:</h3>
              <div className="flex flex-wrap gap-2">
                {data.lookingFor.map((quest) => (
                  <span
                    key={quest}
                    className="px-3 py-1 bg-konekt-pink/20 text-konekt-pink rounded-lg text-sm font-medium"
                  >
                    {quest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Completion Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#151515] border-2 border-white/10 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Profile Completion</h3>
            <span className="text-3xl font-bold text-konekt-green">{completionPercentage}%</span>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-konekt-green to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>

          {completionPercentage < 100 && (
            <div>
              <h4 className="font-semibold mb-3">💡 Quick wins to reach 100%:</h4>
              <div className="space-y-2 text-sm text-white/60">
                {!data.videoUrl && <div>• Add a video intro (+5%)</div>}
                {!data.integrations?.github && <div>• Connect GitHub (+5%)</div>}
                {!data.integrations?.linkedin && <div>• Connect LinkedIn (+5%)</div>}
                {!data.integrations?.portfolio && <div>• Add portfolio link (+5%)</div>}
                {data.skills.length < 7 && <div>• Add more skills (+5%)</div>}
                {(!data.bio || data.bio.length < 50) && <div>• Write a longer bio (+5%)</div>}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard')}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-konekt-green to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <Rocket className="w-6 h-6" />
            🚀 Explore Konekt
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/profile/jakub-prochazka')}
            className="flex-1 px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-3"
          >
            <Edit className="w-6 h-6" />
            ✏️ Edit Profile
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
