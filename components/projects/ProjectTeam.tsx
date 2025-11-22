'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, X, Users, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ProjectTeamProps {
  data: {
    lookingForHelp: boolean;
    lookingFor: Array<{ role: string; skills: string[]; count: number }>;
    collaborationMessage?: string;
  };
  onChange: (data: any) => void;
}

const commonRoles = [
  { role: 'Frontend Developer', skills: ['React', 'TypeScript', 'CSS'] },
  { role: 'Backend Developer', skills: ['Node.js', 'Python', 'API Design'] },
  { role: 'Full-stack Developer', skills: ['React', 'Node.js', 'Database'] },
  { role: 'Designer', skills: ['UI/UX', 'Figma', 'Prototyping'] },
  { role: 'Product Manager', skills: ['Product Strategy', 'User Research'] },
  { role: 'Marketing', skills: ['SEO', 'Content', 'Growth'] },
  { role: 'Mobile Developer', skills: ['React Native', 'Flutter', 'iOS/Android'] },
  { role: 'Data Scientist', skills: ['Python', 'ML', 'Data Analysis'] },
];

export const ProjectTeam = ({ data, onChange }: ProjectTeamProps) => {
  const [newRole, setNewRole] = useState('');
  const [customSkills, setCustomSkills] = useState('');

  const addRole = (role: string, skills: string[]) => {
    if (role && !data.lookingFor.find((r) => r.role === role)) {
      onChange({
        ...data,
        lookingFor: [...data.lookingFor, { role, skills, count: 1 }],
      });
      setNewRole('');
      setCustomSkills('');
    }
  };

  const removeRole = (roleToRemove: string) => {
    onChange({
      ...data,
      lookingFor: data.lookingFor.filter((r) => r.role !== roleToRemove),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Team & Collaboration</h2>
        <p className="text-white/60">Are you looking for collaborators?</p>
      </div>

      {/* Looking For Help Toggle */}
      <motion.div
        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
          data.lookingForHelp
            ? 'bg-gradient-to-br from-konekt-green/20 to-konekt-pink/20 border-konekt-green'
            : 'bg-[#151515] border-white/10 hover:border-white/30'
        }`}
        onClick={() =>
          onChange({
            ...data,
            lookingForHelp: !data.lookingForHelp,
            lookingFor: !data.lookingForHelp ? data.lookingFor : [],
            collaborationMessage: !data.lookingForHelp ? data.collaborationMessage : '',
          })
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              data.lookingForHelp ? 'bg-konekt-green' : 'bg-white/10'
            }`}
          >
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-white text-lg mb-1">
              Looking for team members
            </div>
            <div className="text-white/60 text-sm">
              {data.lookingForHelp
                ? "Great! Let's specify what roles you need"
                : 'Click to enable if you want collaborators'}
            </div>
          </div>
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              data.lookingForHelp
                ? 'bg-konekt-green border-konekt-green'
                : 'border-white/30'
            }`}
          >
            {data.lookingForHelp && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 bg-white rounded-full"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Roles Section (only if looking for help) */}
      {data.lookingForHelp && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          {/* Add Custom Role */}
          <div className="bg-[#151515] border-2 border-white/10 rounded-xl p-4">
            <label className="block text-sm font-medium text-white mb-3">
              Add a role you're looking for
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="e.g., Frontend Developer, Designer..."
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
              <button
                onClick={() => {
                  if (newRole) {
                    const skills = customSkills
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean);
                    addRole(newRole, skills);
                  }
                }}
                disabled={!newRole}
                className="px-4 py-2 bg-konekt-green text-white rounded-lg hover:bg-konekt-green/90 transition-colors disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <Input
              placeholder="Skills (comma-separated, e.g., React, TypeScript, CSS)"
              value={customSkills}
              onChange={(e) => setCustomSkills(e.target.value)}
            />
          </div>

          {/* Selected Roles */}
          {data.lookingFor.length > 0 && (
            <div className="space-y-2">
              {data.lookingFor.map((role, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-konekt-pink/20 to-konekt-pink/10 border-2 border-konekt-pink/30 rounded-xl"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-konekt-pink mb-1">
                      {role.role} ({role.count}x)
                    </div>
                    {role.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-white/10 text-xs text-white/80 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeRole(role.role)}
                    className="p-2 text-konekt-pink hover:bg-konekt-pink/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Common Roles */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-3">
              Or choose from common roles:
            </label>
            <div className="flex flex-wrap gap-2">
              {commonRoles
                .filter((r) => !data.lookingFor.find((lf) => lf.role === r.role))
                .map((role) => (
                  <button
                    key={role.role}
                    onClick={() => addRole(role.role, role.skills)}
                    className="px-3 py-2 bg-[#151515] border-2 border-white/10 rounded-lg text-sm text-white/70 hover:border-konekt-pink hover:text-konekt-pink transition-all"
                  >
                    + {role.role}
                  </button>
                ))}
            </div>
          </div>

          {/* Collaboration Message */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Collaboration Message (Optional)
            </label>
            <Textarea
              placeholder="Tell potential collaborators why they should join your project. What's in it for them? What's the vision?"
              value={data.collaborationMessage || ''}
              onChange={(e) =>
                onChange({ ...data, collaborationMessage: e.target.value })
              }
              rows={4}
            />
            <div className="mt-2 flex items-start gap-2 text-xs text-white/60">
              <Sparkles className="w-4 h-4 text-konekt-green mt-0.5" />
              <p>
                Tip: Be specific about what you're looking for and what makes your project exciting!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
