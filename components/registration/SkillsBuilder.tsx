'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { useState } from 'react';
import { Plus, Star } from 'lucide-react';

interface SkillsBuilderProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const skillCategories = {
  Design: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX', 'Branding'],
  Development: ['React', 'Node.js', 'Python', 'TypeScript', 'Vue', 'Angular', 'Go', 'Rust'],
  Business: ['Sales', 'Marketing', 'Strategy', 'Growth', 'Product', 'Analytics'],
  Data: ['SQL', 'Python', 'R', 'Tableau', 'Excel', 'Machine Learning'],
  Other: ['Management', 'Writing', 'Public Speaking', 'Leadership', 'Research'],
};

export const SkillsBuilder = ({ data, updateData, onNext }: SkillsBuilderProps) => {
  const [customSkill, setCustomSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(data.skills || []);
  const [skillLevels, setSkillLevels] = useState<{ [key: string]: number }>(data.skillLevels || {});

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      const newLevels = { ...skillLevels };
      delete newLevels[skill];
      setSkillLevels(newLevels);
    } else {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillLevels({ ...skillLevels, [skill]: 2 });
    }
  };

  const setSkillLevel = (skill: string, level: number) => {
    setSkillLevels({ ...skillLevels, [skill]: level });
  };

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill]);
      setSkillLevels({ ...skillLevels, [customSkill]: 2 });
      setCustomSkill('');
    }
  };

  const handleContinue = () => {
    updateData({ skills: selectedSkills, skillLevels });
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
          SKILLS BUILDER
        </h2>
        <p className="text-white/60">Select your skills and expertise</p>
        <div className="mt-4 text-2xl font-bold">
          Selected: {selectedSkills.length} skills
          <span className="text-sm text-white/40 ml-2">(Recommended: 5-10)</span>
        </div>
      </div>

      {/* Selected Skills Summary */}
      {selectedSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#151515] border-2 border-konekt-green/50 rounded-2xl p-6"
        >
          <h3 className="font-bold mb-4">Your Skills:</h3>
          <div className="flex flex-wrap gap-3">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 bg-konekt-green/20 border border-konekt-green rounded-xl flex items-center gap-3"
              >
                <span className="font-semibold">{skill}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSkillLevel(skill, level)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (skillLevels[skill] || 0) >= level
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-white/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => toggleSkill(skill)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Skill Categories */}
      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <motion.button
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-konekt-green text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {skill}
                    {isSelected && (
                      <span className="ml-2">
                        {Array.from({ length: skillLevels[skill] || 0 })
                          .map(() => '⭐')
                          .join('')}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Skill Input */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Add Custom Skill</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
            placeholder="Type a skill..."
            className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addCustomSkill}
            className="px-6 py-3 bg-konekt-green rounded-lg font-semibold hover:bg-konekt-green/90 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add
          </motion.button>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={selectedSkills.length === 0}
        className={`w-full px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
          selectedSkills.length === 0
            ? 'bg-white/10 text-white/30 cursor-not-allowed'
            : 'bg-gradient-to-r from-konekt-green to-emerald-500 text-white hover:shadow-lg'
        }`}
      >
        Continue {selectedSkills.length > 0 && `with ${selectedSkills.length} skills`}
      </motion.button>
    </motion.div>
  );
};
