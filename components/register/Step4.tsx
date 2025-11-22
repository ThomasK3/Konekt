'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUserStore } from '@/lib/store';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus } from 'lucide-react';

interface Step4Props {
  onBack: () => void;
}

const commonRoles = [
  'Co-founder',
  'Frontend Developer',
  'Backend Developer',
  'Full-stack Developer',
  'Designer',
  'Product Manager',
  'Marketing',
  'Sales',
];

export const Step4: React.FC<Step4Props> = ({ onBack }) => {
  const router = useRouter();
  const { registrationData, updateRegistrationData, setUser } = useUserStore();
  const [lookingFor, setLookingFor] = useState<string[]>(registrationData.lookingFor);
  const [newRole, setNewRole] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(registrationData.availability.hoursPerWeek);
  const [isPaid, setIsPaid] = useState(registrationData.availability.isPaid);

  const addRole = (role: string) => {
    if (role && !lookingFor.includes(role)) {
      setLookingFor([...lookingFor, role]);
      setNewRole('');
    }
  };

  const removeRole = (roleToRemove: string) => {
    setLookingFor(lookingFor.filter((r) => r !== roleToRemove));
  };

  const handleComplete = () => {
    updateRegistrationData({
      lookingFor,
      availability: { hoursPerWeek, isPaid },
    });

    createUserAndRedirect();
  };

  const handleSkip = () => {
    // Set default values when skipping
    updateRegistrationData({
      lookingFor: [],
      availability: { hoursPerWeek: 10, isPaid: false },
    });

    createUserAndRedirect();
  };

  const createUserAndRedirect = () => {
    // Create user profile
    const username = registrationData.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const newUser = {
      id: Math.random().toString(36).substring(7),
      name: registrationData.name,
      username,
      email: registrationData.email,
      school: registrationData.school,
      skills: registrationData.skills,
      bio: registrationData.bio,
      videoUrl: registrationData.videoUrl,
      role: 'student' as const,
      lookingFor: registrationData.lookingFor,
      availability: registrationData.availability,
      badges: [],
      projectIds: [],
    };

    setUser(newUser);
    router.push('/feed');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-konekt-black mb-2">
          Co hledáš?
        </h2>
        <p className="text-konekt-black/60">
          Jakou roli nebo spolupracovníka potřebuješ? (volitelné)
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Přidat roli..."
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addRole(newRole);
            }
          }}
        />
        <Button
          onClick={() => addRole(newRole)}
          variant="outline"
          className="shrink-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {lookingFor.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {lookingFor.map((role) => (
            <div
              key={role}
              className="inline-flex items-center gap-2 px-4 py-2 bg-konekt-pink text-konekt-white rounded-full text-sm"
            >
              {role}
              <button
                onClick={() => removeRole(role)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-sm text-konekt-black/60 mb-3">Populární role:</p>
        <div className="flex flex-wrap gap-2">
          {commonRoles
            .filter((r) => !lookingFor.includes(r))
            .map((role) => (
              <button
                key={role}
                onClick={() => addRole(role)}
                className="px-4 py-2 bg-konekt-white border-2 border-konekt-black/10 rounded-full text-sm
                  hover:border-konekt-pink hover:text-konekt-pink transition-colors"
              >
                + {role}
              </button>
            ))}
        </div>
      </div>

      <div className="border-t-2 border-konekt-black/10 pt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-konekt-black mb-2">
            Kolik hodin týdně můžeš věnovat?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="flex-1"
            />
            <div className="w-20 text-center px-4 py-2 bg-konekt-white border-2 border-konekt-black/10 rounded-lg font-semibold">
              {hoursPerWeek}h
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-konekt-black mb-3">
            Typ spolupráce
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsPaid(false)}
              className={`px-6 py-4 rounded-xl border-2 font-medium transition-all ${
                !isPaid
                  ? 'bg-konekt-green text-konekt-white border-konekt-green'
                  : 'bg-konekt-white text-konekt-black border-konekt-black/10 hover:border-konekt-green'
              }`}
            >
              🎓 Projekt / Zkušenosti
            </button>
            <button
              onClick={() => setIsPaid(true)}
              className={`px-6 py-4 rounded-xl border-2 font-medium transition-all ${
                isPaid
                  ? 'bg-konekt-green text-konekt-white border-konekt-green'
                  : 'bg-konekt-white text-konekt-black border-konekt-black/10 hover:border-konekt-green'
              }`}
            >
              💰 Placené
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline">
          Zpět
        </Button>
        <Button onClick={handleSkip} variant="outline" className="flex-1">
          Přeskočit
        </Button>
        <Button onClick={handleComplete} className="flex-1">
          Dokončit
        </Button>
      </div>
    </div>
  );
};
