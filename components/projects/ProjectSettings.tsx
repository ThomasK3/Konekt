'use client';

import { motion } from 'framer-motion';
import { Eye, Lock, EyeOff, MessageCircle, Bell, Check } from 'lucide-react';

interface ProjectSettingsProps {
  data: {
    visibility: 'public' | 'private' | 'unlisted';
    allowComments: boolean;
    tags: string[];
  };
  onChange: (data: any) => void;
}

const visibilityOptions = [
  {
    id: 'public' as const,
    icon: Eye,
    label: 'Public',
    description: 'Anyone can discover and view your project',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'unlisted' as const,
    icon: EyeOff,
    label: 'Unlisted',
    description: 'Only people with the link can view',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'private' as const,
    icon: Lock,
    label: 'Private',
    description: 'Only you and your team can view',
    color: 'from-red-500 to-pink-500',
  },
];

const commonTags = [
  'Open Source',
  'Startup',
  'Side Project',
  'Hackathon',
  'MVP',
  'Early Stage',
  'Funded',
  'Looking for Feedback',
  'Beta Testing',
  'Launching Soon',
];

export const ProjectSettings = ({ data, onChange }: ProjectSettingsProps) => {
  const toggleTag = (tag: string) => {
    if (data.tags.includes(tag)) {
      onChange({ ...data, tags: data.tags.filter((t) => t !== tag) });
    } else {
      onChange({ ...data, tags: [...data.tags, tag] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Launch Settings</h2>
        <p className="text-white/60">Final touches before going live</p>
      </div>

      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Project Visibility *
        </label>
        <div className="grid gap-3">
          {visibilityOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = data.visibility === option.id;

            return (
              <motion.button
                key={option.id}
                onClick={() => onChange({ ...data, visibility: option.id })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-konekt-green bg-konekt-green/20'
                    : 'border-white/10 bg-[#151515] hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white mb-1 flex items-center gap-2">
                      {option.label}
                      {isSelected && (
                        <Check className="w-4 h-4 text-konekt-green" />
                      )}
                    </div>
                    <div className="text-sm text-white/60">
                      {option.description}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Allow Comments */}
      <motion.div
        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
          data.allowComments
            ? 'bg-gradient-to-br from-konekt-green/20 to-konekt-pink/20 border-konekt-green'
            : 'bg-[#151515] border-white/10 hover:border-white/30'
        }`}
        onClick={() => onChange({ ...data, allowComments: !data.allowComments })}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              data.allowComments ? 'bg-konekt-green' : 'bg-white/10'
            }`}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-white text-lg mb-1">
              Allow Comments
            </div>
            <div className="text-white/60 text-sm">
              {data.allowComments
                ? 'People can comment on your project'
                : 'Comments are disabled'}
            </div>
          </div>
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              data.allowComments
                ? 'bg-konekt-green border-konekt-green'
                : 'border-white/30'
            }`}
          >
            {data.allowComments && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 bg-white rounded-full"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Project Tags (Optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {commonTags.map((tag) => {
            const isSelected = data.tags.includes(tag);

            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-konekt-pink text-white'
                    : 'bg-[#151515] text-white/70 border-2 border-white/10 hover:border-konekt-pink hover:text-konekt-pink'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {data.tags.length > 0 && (
          <div className="mt-3 text-xs text-white/60">
            Selected: {data.tags.join(', ')}
          </div>
        )}
      </div>

      {/* Final Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-2 border-konekt-green/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-konekt-green mt-1" />
          <div>
            <div className="font-bold text-white mb-1">Ready to launch?</div>
            <div className="text-sm text-white/70">
              Your project will be visible based on your visibility settings. You can always edit it later from your dashboard.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
