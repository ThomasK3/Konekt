'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUserStore } from '@/lib/store';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const suggestedSkills = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Python',
  'Marketing',
  'Design',
  'Product Management',
  'Data Analytics',
  'AI/ML',
];

export const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  const { registrationData, updateRegistrationData } = useUserStore();
  const [skills, setSkills] = useState<string[]>(registrationData.skills);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleNext = () => {
    updateRegistrationData({ skills });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-konekt-black mb-2">
          Tvoje dovednosti
        </h2>
        <p className="text-konekt-black/60">
          Co umíš nebo se chceš naučit?
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Přidat dovednost..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(newSkill);
            }
          }}
        />
        <Button
          onClick={() => addSkill(newSkill)}
          variant="outline"
          className="shrink-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center gap-2 px-4 py-2 bg-konekt-green text-konekt-white rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-sm text-konekt-black/60 mb-3">Naše tipy:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter((s) => !skills.includes(s))
            .map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="px-4 py-2 bg-konekt-white border-2 border-konekt-black/10 rounded-full text-sm
                  hover:border-konekt-green hover:text-konekt-green transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Zpět
        </Button>
        <Button onClick={handleNext} disabled={skills.length === 0} className="flex-1">
          Pokračovat
        </Button>
      </div>
    </div>
  );
};
