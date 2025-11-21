'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { Sparkles, BookOpen } from 'lucide-react';

interface ProjectDescriptionProps {
  data: {
    description: string;
  };
  onChange: (data: any) => void;
}

const aiSuggestions = [
  "# The Problem\n\n[What pain point are you solving?]\n\n# Our Solution\n\n[How does your product solve it?]\n\n# Progress So Far\n\n• [Key milestone 1]\n• [Key milestone 2]\n• [Key milestone 3]\n\n# What's Next\n\n- [Future goal 1]\n- [Future goal 2]",
  "## 🎯 Vision\n\n[Your big picture goal]\n\n## 💡 How It Works\n\n[Explain your core features]\n\n## 🚀 Traction\n\n[Share your wins and metrics]\n\n## 🔮 Roadmap\n\n[What's coming next]",
  "**Why we're building this:**\n[Your motivation and mission]\n\n**What makes us different:**\n[Your unique value proposition]\n\n**Where we are:**\n[Current status and metrics]\n\n**Where we're going:**\n[Future plans]",
];

export const ProjectDescription = ({ data, onChange }: ProjectDescriptionProps) => {
  const [showSuggestions, setShowSuggestions] = useState(true);

  const applySuggestion = (suggestion: string) => {
    onChange({ ...data, description: suggestion });
    setShowSuggestions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Tell your story</h2>
        <p className="text-white/60">What's the vision? What problem are you solving?</p>
      </div>

      {/* AI Suggestions */}
      {showSuggestions && !data.description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gradient-to-br from-konekt-green/20 to-konekt-pink/20 border-2 border-konekt-green/30 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-konekt-green" />
            <h3 className="font-bold text-white">AI Template Suggestions</h3>
          </div>
          <p className="text-white/80 text-sm mb-4">
            Start with a template to structure your story
          </p>
          <div className="grid gap-3">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => applySuggestion(suggestion)}
                className="text-left p-4 bg-[#151515] border-2 border-white/10 rounded-xl hover:border-konekt-green/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-konekt-green mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-1 group-hover:text-konekt-green transition-colors">
                      Template {index + 1}
                    </div>
                    <div className="text-xs text-white/60 font-mono line-clamp-2">
                      {suggestion.split('\n')[0]}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Description Textarea */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Project Description * (Markdown supported)
        </label>
        <Textarea
          placeholder="## The Problem&#10;&#10;[Describe the pain point you're solving]&#10;&#10;## Our Solution&#10;&#10;[Explain your approach]&#10;&#10;..."
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={16}
          className="font-mono text-sm"
        />
        <div className="text-xs text-white/40 mt-2">
          💡 Tip: Use markdown for formatting (# headings, **bold**, • bullets, etc.)
        </div>
      </div>

      {/* Markdown Preview */}
      {data.description && (
        <div className="bg-[#151515] border-2 border-white/10 rounded-xl p-6">
          <div className="text-sm font-semibold text-white/60 mb-3">Preview</div>
          <div className="prose prose-invert max-w-none text-white/80">
            {data.description.split('\n').map((line, i) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-bold text-white mt-4 mb-2">{line.slice(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold text-white mt-3 mb-2">{line.slice(3)}</h2>;
              } else if (line.startsWith('• ') || line.startsWith('- ')) {
                return <li key={i} className="ml-4 text-white/70">{line.slice(2)}</li>;
              } else if (line.includes('**')) {
                const parts = line.split('**');
                return (
                  <p key={i} className="mb-2">
                    {parts.map((part, j) => (
                      j % 2 === 0 ? part : <strong key={j} className="font-bold text-white">{part}</strong>
                    ))}
                  </p>
                );
              } else {
                return line ? <p key={i} className="mb-2">{line}</p> : <br key={i} />;
              }
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};
