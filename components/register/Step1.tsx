'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/lib/store';
import { useState } from 'react';

interface Step1Props {
  onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const { registrationData, updateRegistrationData } = useUserStore();
  const [formData, setFormData] = useState({
    name: registrationData.name,
    email: registrationData.email,
    school: registrationData.school,
  });

  const handleNext = () => {
    updateRegistrationData(formData);
    onNext();
  };

  const isValid = formData.name && formData.email && formData.school;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-konekt-black mb-2">
          Základní informace
        </h2>
        <p className="text-konekt-black/60">
          Řekni nám něco o sobě
        </p>
      </div>

      <Input
        label="Jméno a příjmení"
        placeholder="Jan Novák"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Input
        label="Email"
        type="email"
        placeholder="jan@email.cz"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Input
        label="Škola / Firma"
        placeholder="ČVUT, VŠE, ..."
        value={formData.school}
        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
      />

      <Button
        onClick={handleNext}
        disabled={!isValid}
        className="w-full"
      >
        Pokračovat
      </Button>
    </div>
  );
};
