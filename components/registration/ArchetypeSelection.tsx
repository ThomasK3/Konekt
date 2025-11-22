'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { Code, Palette, Briefcase, Brain, BarChart3, Users } from 'lucide-react';

interface ArchetypeSelectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const archetypes = [
  {
    id: 'builder',
    icon: Code,
    title: '👨‍💻 BUILDER',
    tagline: '"I code, I build, I ship"',
    description: 'Full-stack developers, engineers, and makers',
    suggestedSkills: ['React', 'Node.js', 'Python', 'TypeScript', 'Git'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'creator',
    icon: Palette,
    title: '🎨 CREATOR',
    tagline: '"I design, I create, I inspire"',
    description: 'Designers, artists, and visual storytellers',
    suggestedSkills: ['Figma', 'UI/UX', 'Adobe', 'Branding', 'Animation'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'hustler',
    icon: Briefcase,
    title: '💼 HUSTLER',
    tagline: '"I connect, I sell, I grow"',
    description: 'Business developers, sales, and growth hackers',
    suggestedSkills: ['Sales', 'Marketing', 'Networking', 'Strategy', 'Growth'],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'thinker',
    icon: Brain,
    title: '🧠 THINKER',
    tagline: '"I research, I learn, I teach"',
    description: 'Researchers, academics, and educators',
    suggestedSkills: ['Research', 'Writing', 'Teaching', 'Analysis', 'Innovation'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'analyst',
    icon: BarChart3,
    title: '📊 ANALYST',
    tagline: '"I measure, I optimize, I data"',
    description: 'Data scientists, analysts, and strategists',
    suggestedSkills: ['Data Analysis', 'SQL', 'Python', 'Excel', 'Tableau'],
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'leader',
    icon: Users,
    title: '🌟 LEADER',
    tagline: '"I inspire, I lead, I build teams"',
    description: 'Team leads, managers, and founders',
    suggestedSkills: ['Leadership', 'Management', 'Strategy', 'Communication', 'Vision'],
    color: 'from-yellow-500 to-orange-500',
  },
];

export const ArchetypeSelection = ({ data, updateData, onNext }: ArchetypeSelectionProps) => {
  const handleSelect = (archetypeId: string) => {
    const archetype = archetypes.find((a) => a.id === archetypeId);
    updateData({
      archetype: archetypeId,
      // Pre-fill suggested skills
      skills: archetype?.suggestedSkills || [],
    });
    setTimeout(onNext, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-konekt-green bg-clip-text text-transparent"
        >
          CHOOSE YOUR ARCHETYPE
        </motion.h2>
        <p className="text-white/60 text-lg">
          Select the role that best describes you
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archetypes.map((archetype, index) => {
          const Icon = archetype.icon;
          return (
            <motion.button
              key={archetype.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(archetype.id)}
              className={`relative p-6 bg-[#151515] border-2 border-white/10 rounded-2xl text-left overflow-hidden group transition-all ${
                data.archetype === archetype.id ? 'border-konekt-green' : ''
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${archetype.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Icon */}
              <div className="relative mb-4">
                <div className={`inline-block p-3 bg-gradient-to-br ${archetype.color} rounded-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold mb-2">{archetype.title}</h3>
                <p className="text-konekt-green text-sm font-semibold mb-3">
                  {archetype.tagline}
                </p>
                <p className="text-white/60 text-sm mb-4">{archetype.description}</p>

                {/* Suggested skills preview */}
                <div className="flex flex-wrap gap-2">
                  {archetype.suggestedSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-white/5 text-white/40 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-white/5 text-white/40 rounded text-xs">
                    +{archetype.suggestedSkills.length - 3}
                  </span>
                </div>

                {/* Select button */}
                <div className="mt-6">
                  <div className={`px-4 py-2 bg-gradient-to-r ${archetype.color} text-white rounded-lg font-semibold text-center group-hover:shadow-lg transition-shadow`}>
                    Select
                  </div>
                </div>
              </div>

              {/* Selected indicator */}
              {data.archetype === archetype.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-konekt-green rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Skip option */}
      <div className="text-center mt-8">
        <p className="text-white/40 text-sm">
          Not sure yet? You can customize everything later
        </p>
      </div>
    </motion.div>
  );
};
