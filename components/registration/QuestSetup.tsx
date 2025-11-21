'use client';

import { motion } from 'framer-motion';
import { RegistrationData } from '@/app/register/page';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface QuestSetupProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const quests = [
  { id: 'cofounder', label: '🤝 Co-founder', icon: '🤝' },
  { id: 'technical', label: '👨‍💻 Technical partner', icon: '👨‍💻' },
  { id: 'designer', label: '🎨 Designer', icon: '🎨' },
  { id: 'marketing', label: '📈 Marketing expert', icon: '📈' },
  { id: 'investor', label: '💼 Investor', icon: '💼' },
  { id: 'mentor', label: '🎓 Mentor', icon: '🎓' },
  { id: 'ideas', label: '💡 Project ideas', icon: '💡' },
  { id: 'job', label: '🏢 Job opportunities', icon: '🏢' },
];

const availabilityOptions = [
  { id: 'fulltime', label: 'Full-time (40h/week)' },
  { id: 'parttime', label: 'Part-time (10-20h/week)' },
  { id: 'consulting', label: 'Consulting (project-based)' },
  { id: 'networking', label: 'Just networking' },
];

export const QuestSetup = ({ data, updateData, onNext }: QuestSetupProps) => {
  const [selectedQuests, setSelectedQuests] = useState<string[]>(data.lookingFor || []);
  const [availability, setAvailability] = useState(data.availability || '');
  const [location, setLocation] = useState(data.location || '');
  const [remoteOk, setRemoteOk] = useState(data.remoteOk || false);

  const toggleQuest = (questId: string) => {
    setSelectedQuests((prev) =>
      prev.includes(questId) ? prev.filter((q) => q !== questId) : [...prev, questId]
    );
  };

  const handleContinue = () => {
    updateData({
      lookingFor: selectedQuests,
      availability,
      location,
      remoteOk,
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
          🎯 YOUR CURRENT QUESTS
        </h2>
        <p className="text-white/60">What are you looking for?</p>
      </div>

      {/* Quests Board */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-6">I'm looking for:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quests.map((quest) => (
            <motion.button
              key={quest.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleQuest(quest.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedQuests.includes(quest.id)
                  ? 'border-konekt-green bg-konekt-green/20'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="text-4xl mb-2">{quest.icon}</div>
              <div className="text-sm font-semibold">{quest.label.replace(/.*\s/, '')}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-6">My availability:</h3>
        <div className="space-y-3">
          {availabilityOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
            >
              <input
                type="radio"
                name="availability"
                checked={availability === option.id}
                onChange={() => setAvailability(option.id)}
                className="w-5 h-5"
              />
              <span className="font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="bg-[#151515] border-2 border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-6">My location:</h3>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Praha, Brno, etc..."
              className="w-full pl-12 pr-4 py-3 bg-[#0A0A0A] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green"
            />
          </div>
          <label className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={remoteOk}
              onChange={(e) => setRemoteOk(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-medium whitespace-nowrap">Remote OK</span>
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        disabled={selectedQuests.length === 0}
        className={`w-full px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
          selectedQuests.length === 0
            ? 'bg-white/10 text-white/30 cursor-not-allowed'
            : 'bg-gradient-to-r from-konekt-green to-emerald-500 text-white hover:shadow-lg'
        }`}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};
