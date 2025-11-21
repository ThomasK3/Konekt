'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { Video, Upload, CheckCircle } from 'lucide-react';

interface VideoChallengeProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onSkip: () => void;
}

export const VideoChallenge = ({ data, updateData, onNext, onSkip }: VideoChallengeProps) => {
  const handleUpload = () => {
    // TODO: Implement video upload
    updateData({ videoUrl: 'placeholder-video-url' });
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
          🎥 LEVEL UP: VIDEO PRESENTATION
        </h2>
        <p className="text-white/60">Stand out with a 30-second intro video</p>
      </div>

      {/* Why Video */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">Why video?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-konekt-green mb-2">5x</div>
            <div className="text-white/60">more profile views</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-konekt-pink mb-2">3x</div>
            <div className="text-white/60">more messages received</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
            <div className="text-white/60">more memorable!</div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto w-32 h-32 bg-gradient-to-br from-konekt-pink to-purple-500 rounded-3xl flex items-center justify-center"
          >
            <Video className="w-16 h-16 text-white" />
          </motion.div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3"
            >
              <Video className="w-6 h-6" />
              Start Recording
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-3"
            >
              <Upload className="w-6 h-6" />
              Upload Video
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-[#151515] border-2 border-konekt-green/30 rounded-2xl p-8">
        <h3 className="text-lg font-bold mb-4">Tips for a great video:</h3>
        <div className="space-y-3">
          {[
            'Good lighting - face the light source',
            'Clear audio - minimize background noise',
            'Smile & be yourself!',
            'Say: Who you are, what you do, what you're looking for',
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-konekt-green flex-shrink-0 mt-0.5" />
              <span className="text-white/80">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skip Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSkip}
        className="w-full px-8 py-4 border-2 border-white/20 text-white/60 rounded-2xl font-semibold hover:bg-white/5 transition-all"
      >
        ⏭️ Skip for now
      </motion.button>
    </motion.div>
  );
};
