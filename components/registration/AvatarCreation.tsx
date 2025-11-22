'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { Upload, Sparkles, Shuffle } from 'lucide-react';
import { useState } from 'react';

interface AvatarCreationProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const avatarStyles = [
  { id: 'photo', label: '📸 Photo', emoji: '📸' },
  { id: 'illustrated', label: '🎨 Illustrated', emoji: '🎨' },
  { id: '3d-emoji', label: '😎 3D Emoji', emoji: '😎' },
  { id: 'abstract', label: '🌀 Abstract', emoji: '🌀' },
  { id: 'minimalist', label: '⚪ Minimalist', emoji: '⚪' },
];

const bgColors = [
  '#4A6953', '#E97B8A', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
];

const frames = [
  { id: 'none', label: 'None' },
  { id: 'circle', label: 'Circle' },
  { id: 'hexagon', label: 'Hexagon' },
  { id: 'squircle', label: 'Squircle' },
];

const effects = [
  { id: 'holographic', label: '✨ Holographic shimmer' },
  { id: 'particles', label: '🌟 Animated particles' },
  { id: 'glow', label: '💫 Glow effect' },
];

export const AvatarCreation = ({ data, updateData, onNext }: AvatarCreationProps) => {
  const [selectedBg, setSelectedBg] = useState(bgColors[0]);
  const [selectedFrame, setSelectedFrame] = useState<string>('circle');
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);

  const randomize = () => {
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
    const randomFrame = frames[Math.floor(Math.random() * frames.length)].id;
    setSelectedBg(randomBg);
    setSelectedFrame(randomFrame);
  };

  const toggleEffect = (effectId: string) => {
    setSelectedEffects((prev) =>
      prev.includes(effectId)
        ? prev.filter((e) => e !== effectId)
        : [...prev, effectId]
    );
  };

  const handleContinue = () => {
    updateData({
      avatarBackground: selectedBg,
      avatarFrame: selectedFrame as any,
      avatarEffects: selectedEffects,
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
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-konekt-pink bg-clip-text text-transparent">
          AVATAR CREATION
        </h2>
        <p className="text-white/60">Create your unique profile picture</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Preview</h3>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
              style={{
                width: 200,
                height: 200,
                background: selectedBg,
                borderRadius:
                  selectedFrame === 'circle'
                    ? '50%'
                    : selectedFrame === 'hexagon'
                    ? '10%'
                    : selectedFrame === 'squircle'
                    ? '30%'
                    : '0',
              }}
            >
              {selectedEffects.includes('glow') && (
                <div
                  className="absolute inset-0 blur-2xl opacity-50"
                  style={{ background: selectedBg }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                👤
              </div>
              {selectedEffects.includes('holographic') && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent animate-pulse" />
              )}
            </motion.div>
          </div>
        </div>

        {/* Customization */}
        <div className="space-y-6">
          {/* Upload */}
          <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
            <button className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl hover:border-konekt-green/50 transition-colors flex items-center justify-center gap-3 text-white/60">
              <Upload className="w-5 h-5" />
              Upload Photo
            </button>
          </div>

          {/* Background Color */}
          <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Background</h4>
            <div className="grid grid-cols-6 gap-3">
              {bgColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedBg(color)}
                  className={`w-12 h-12 rounded-lg transition-transform ${
                    selectedBg === color ? 'ring-2 ring-white scale-110' : ''
                  }`}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>

          {/* Frame */}
          <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Frame</h4>
            <div className="grid grid-cols-4 gap-3">
              {frames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    selectedFrame === frame.id
                      ? 'border-konekt-green bg-konekt-green/20'
                      : 'border-white/20'
                  }`}
                >
                  {frame.label}
                </button>
              ))}
            </div>
          </div>

          {/* Effects */}
          <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Effects</h4>
            <div className="space-y-2">
              {effects.map((effect) => (
                <label key={effect.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEffects.includes(effect.id)}
                    onChange={() => toggleEffect(effect.id)}
                    className="w-5 h-5"
                  />
                  <span>{effect.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={randomize}
              className="flex-1 px-6 py-3 border-2 border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <Shuffle className="w-5 h-5" />
              Randomize
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-konekt-green to-emerald-500 rounded-xl font-bold hover:shadow-lg transition-shadow"
            >
              Continue
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
