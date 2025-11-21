'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, X, Link as LinkIcon, Github, Figma, Globe, Video } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface ProjectTechStackProps {
  data: {
    stack: string[];
    links: {
      demo?: string;
      github?: string;
      figma?: string;
      website?: string;
      video?: string;
    };
  };
  onChange: (data: any) => void;
}

const commonTech = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Flutter',
  'Vue', 'Svelte', 'Angular', 'TailwindCSS', 'Figma', 'Firebase',
  'PostgreSQL', 'MongoDB', 'Supabase', 'OpenAI', 'TensorFlow',
  'AWS', 'Vercel', 'Docker', 'Kubernetes', 'GraphQL', 'REST API',
];

export const ProjectTechStack = ({ data, onChange }: ProjectTechStackProps) => {
  const [newTech, setNewTech] = useState('');

  const addTech = (tech: string) => {
    if (tech && !data.stack.includes(tech)) {
      onChange({
        ...data,
        stack: [...data.stack, tech],
      });
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    onChange({
      ...data,
      stack: data.stack.filter((t) => t !== tech),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Tech & Links</h2>
        <p className="text-white/60">What are you building with? Where can people find it?</p>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Tech Stack * (Select at least 1)
        </label>

        {/* Add Custom Tech */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add technology..."
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTech(newTech);
              }
            }}
          />
          <button
            onClick={() => addTech(newTech)}
            disabled={!newTech}
            className="px-4 py-2 bg-konekt-green text-white rounded-lg hover:bg-konekt-green/90 transition-colors disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Tech */}
        {data.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 p-4 bg-[#151515] border-2 border-konekt-green/30 rounded-xl">
            {data.stack.map((tech) => (
              <motion.div
                key={tech}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-2 bg-konekt-green text-white rounded-lg font-medium"
              >
                {tech}
                <button
                  onClick={() => removeTech(tech)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Common Tech */}
        <div className="flex flex-wrap gap-2">
          {commonTech
            .filter((t) => !data.stack.includes(t))
            .map((tech) => (
              <button
                key={tech}
                onClick={() => addTech(tech)}
                className="px-3 py-2 bg-[#151515] border-2 border-white/10 rounded-lg text-sm text-white/70 hover:border-konekt-green hover:text-konekt-green transition-all"
              >
                + {tech}
              </button>
            ))}
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white">
          Project Links (Optional but recommended)
        </label>

        {/* Demo Link */}
        <div>
          <label className="block text-xs text-white/60 mb-2">
            <LinkIcon className="w-3 h-3 inline mr-1" />
            Live Demo
          </label>
          <Input
            placeholder="https://yourproject.com/demo"
            value={data.links.demo || ''}
            onChange={(e) =>
              onChange({
                ...data,
                links: { ...data.links, demo: e.target.value },
              })
            }
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs text-white/60 mb-2">
            <Github className="w-3 h-3 inline mr-1" />
            GitHub Repository
          </label>
          <Input
            placeholder="https://github.com/username/repo"
            value={data.links.github || ''}
            onChange={(e) =>
              onChange({
                ...data,
                links: { ...data.links, github: e.target.value },
              })
            }
          />
        </div>

        {/* Figma */}
        <div>
          <label className="block text-xs text-white/60 mb-2">
            <Figma className="w-3 h-3 inline mr-1" />
            Figma Design
          </label>
          <Input
            placeholder="https://figma.com/file/..."
            value={data.links.figma || ''}
            onChange={(e) =>
              onChange({
                ...data,
                links: { ...data.links, figma: e.target.value },
              })
            }
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs text-white/60 mb-2">
            <Globe className="w-3 h-3 inline mr-1" />
            Website
          </label>
          <Input
            placeholder="https://yourproject.com"
            value={data.links.website || ''}
            onChange={(e) =>
              onChange({
                ...data,
                links: { ...data.links, website: e.target.value },
              })
            }
          />
        </div>

        {/* Video */}
        <div>
          <label className="block text-xs text-white/60 mb-2">
            <Video className="w-3 h-3 inline mr-1" />
            Demo Video (YouTube/Vimeo)
          </label>
          <Input
            placeholder="https://youtube.com/watch?v=..."
            value={data.links.video || ''}
            onChange={(e) =>
              onChange({
                ...data,
                links: { ...data.links, video: e.target.value },
              })
            }
          />
        </div>
      </div>
    </motion.div>
  );
};
