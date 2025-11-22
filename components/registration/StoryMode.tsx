'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface StoryModeProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const AI_SUGGESTIONS = [
  'Developer passionate about AI tools who loves turning ideas into products',
  'Creative designer specializing in user experiences that make people smile',
  'Growth hacker with a knack for finding unconventional marketing strategies',
  'Tech entrepreneur looking to connect with co-founders and investors',
];

export const StoryMode = ({ data, updateData, onNext }: StoryModeProps) => {
  const [oneLiner, setOneLiner] = useState(data.oneLiner || '');
  const [workingOn, setWorkingOn] = useState(data.workingOn || '');
  const [superpower, setSuperpower] = useState(data.superpower || '');
  const [bio, setBio] = useState(data.bio || '');

  const useSuggestion = (suggestion: string) => {
    setBio(suggestion);
  };

  const handleContinue = () => {
    updateData({ oneLiner, workingOn, superpower, bio });
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
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-konekt-green bg-clip-text text-transparent">
          📖 YOUR ORIGIN STORY
        </h2>
        <p className="text-white/60">Tell your story in your own words</p>
      </div>

      {/* Three Questions */}
      <div className="space-y-6">
        <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
          <label className="block text-lg font-semibold mb-3">1. Who are you?</label>
          <input
            type="text"
            value={oneLiner}
            onChange={(e) => setOneLiner(e.target.value)}
            placeholder="e.g. Full-stack developer passionate about AI"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green"
          />
        </div>

        <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
          <label className="block text-lg font-semibold mb-3">2. What are you working on?</label>
          <input
            type="text"
            value={workingOn}
            onChange={(e) => setWorkingOn(e.target.value)}
            placeholder="e.g. Building an AI-powered productivity tool"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green"
          />
        </div>

        <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
          <label className="block text-lg font-semibold mb-3">3. What's your superpower?</label>
          <input
            type="text"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            placeholder="e.g. Turning complex problems into simple solutions"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green"
          />
        </div>
      </div>

      {/* Full Bio */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
        <label className="block text-lg font-semibold mb-3">Full bio (optional):</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell your full story..."
          rows={4}
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green resize-none"
        />
      </div>

      {/* AI Suggestions */}
      <div className="bg-[#151515] border-2 border-konekt-pink/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-konekt-pink" />
          <h3 className="text-lg font-bold">AI Suggestions:</h3>
        </div>
        <div className="space-y-2">
          {AI_SUGGESTIONS.map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => useSuggestion(suggestion)}
              className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white/80 transition-colors"
            >
              "{suggestion}"
            </motion.button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        className="w-full px-8 py-4 bg-gradient-to-r from-konekt-green to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
      >
        Continue
      </motion.button>
    </motion.div>
  );
};
