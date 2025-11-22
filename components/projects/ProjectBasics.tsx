'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Sparkles, Rocket, Lightbulb, Code, Smartphone, Palette, Cpu, Briefcase } from 'lucide-react';

interface ProjectBasicsProps {
  data: {
    name: string;
    oneLiner: string;
    category: string;
    stage: string;
  };
  onChange: (data: any) => void;
}

const categories = [
  { id: 'ai-ml', label: 'AI & ML', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { id: 'web-app', label: 'Web App', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { id: 'mobile-app', label: 'Mobile App', icon: Smartphone, color: 'from-green-500 to-emerald-500' },
  { id: 'design-tool', label: 'Design Tool', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { id: 'hardware', label: 'Hardware', icon: Cpu, color: 'from-orange-500 to-amber-500' },
  { id: 'service', label: 'Service', icon: Briefcase, color: 'from-indigo-500 to-purple-500' },
];

const stages = [
  { id: 'idea', label: '💡 Idea', description: 'Just starting out' },
  { id: 'development', label: '🔨 Development', description: 'Building MVP' },
  { id: 'beta', label: '🚀 Beta', description: 'Testing with users' },
  { id: 'launched', label: '✨ Launched', description: 'Live and growing' },
];

export const ProjectBasics = ({ data, onChange }: ProjectBasicsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">What are you building?</h2>
        <p className="text-white/60">Let's start with the basics</p>
      </div>

      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Project Name *
        </label>
        <Input
          placeholder="e.g., DesignToCode AI, MoodTracker..."
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="text-lg"
        />
      </div>

      {/* One-Liner */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          One-Liner (max 80 chars) *
        </label>
        <Input
          placeholder="Describe your project in one compelling sentence"
          value={data.oneLiner}
          onChange={(e) => onChange({ ...data, oneLiner: e.target.value.slice(0, 80) })}
          maxLength={80}
        />
        <div className="text-xs text-white/40 mt-1 text-right">
          {data.oneLiner.length}/80 characters
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Category *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = data.category === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => onChange({ ...data, category: category.id })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-konekt-green bg-konekt-green/20'
                    : 'border-white/10 bg-[#151515] hover:border-white/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-white text-left">{category.label}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Stage */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Current Stage *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {stages.map((stage) => {
            const isSelected = data.stage === stage.id;

            return (
              <motion.button
                key={stage.id}
                onClick={() => onChange({ ...data, stage: stage.id })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-konekt-green bg-konekt-green/20'
                    : 'border-white/10 bg-[#151515] hover:border-white/30'
                }`}
              >
                <div className="font-semibold text-white mb-1">{stage.label}</div>
                <div className="text-sm text-white/60">{stage.description}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
