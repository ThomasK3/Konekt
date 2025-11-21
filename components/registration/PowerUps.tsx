'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { Github, Linkedin, Globe, Brain, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface PowerUpsProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const PowerUps = ({ data, updateData, onNext, onSkip }: PowerUpsProps) => {
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const handleContinue = () => {
    updateData({
      integrations: {
        github,
        linkedin,
        portfolio,
      },
    });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-konekt-green to-konekt-pink bg-clip-text text-transparent">
          ⚡ CONNECT YOUR POWERS
        </h2>
        <p className="text-white/60">Boost your profile with integrations</p>
      </div>

      {/* Integrations */}
      <div className="space-y-6">
        {/* GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Github className="w-8 h-8 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className="text-white/60 text-sm mb-4">Show your code & contributions</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="github.com/username"
                  className="flex-1 px-4 py-2 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  Connect
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* LinkedIn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Linkedin className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
              <p className="text-white/60 text-sm mb-4">Import work history & connections</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="flex-1 px-4 py-2 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Connect
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6 hover:border-konekt-green/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-konekt-green/20 rounded-xl">
              <Globe className="w-8 h-8 text-konekt-green" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Portfolio</h3>
              <p className="text-white/60 text-sm mb-4">Showcase your work</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="yoursite.com"
                  className="flex-1 px-4 py-2 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-konekt-green text-white rounded-lg font-semibold hover:bg-konekt-green/90 transition-colors"
                >
                  Add Link
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 16 Personalities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6 hover:border-konekt-pink/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-konekt-pink/20 rounded-xl">
              <Brain className="w-8 h-8 text-konekt-pink" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">16 Personalities</h3>
              <p className="text-white/60 text-sm mb-4">Show your personality type (MBTI)</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-konekt-pink text-white rounded-lg font-semibold hover:bg-konekt-pink/90 transition-colors"
              >
                Take Test
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSkip}
          className="flex-1 px-8 py-4 border-2 border-white/20 text-white/60 rounded-2xl font-semibold hover:bg-white/5 transition-all"
        >
          ⏭️ Skip this
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-konekt-green to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
};
