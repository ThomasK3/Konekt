'use client';

import { useUserStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export const Hero = () => {
  const router = useRouter();
  const currentEvent = useUserStore((state) => state.currentEvent);

  const handleCreateProfile = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-konekt-white rounded-full border-2 border-konekt-green/20">
        <Sparkles className="w-4 h-4 text-konekt-green" />
        <span className="text-sm font-medium text-konekt-green">{currentEvent}</span>
      </div>

      <h1 className="text-6xl md:text-8xl font-bold text-konekt-black mb-6 tracking-tight">
        Konekt
      </h1>

      <p className="text-xl md:text-2xl text-konekt-black/70 mb-4 max-w-2xl">
        Propojujeme studenty a mentory z českého startup ekosystému
      </p>

      <p className="text-base md:text-lg text-konekt-black/50 mb-12 max-w-xl">
        Networking, který ti otevře dveře do tech kariéry.
        Začni teď z {currentEvent}.
      </p>

      <Button size="lg" onClick={handleCreateProfile}>
        Vytvořit Profil
      </Button>

      <div className="mt-20 grid grid-cols-3 gap-12 max-w-2xl">
        <div>
          <div className="text-4xl font-bold text-konekt-green mb-2">500+</div>
          <div className="text-sm text-konekt-black/60">Studentů</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-konekt-pink mb-2">50+</div>
          <div className="text-sm text-konekt-black/60">Mentorů</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-konekt-green mb-2">10+</div>
          <div className="text-sm text-konekt-black/60">Akcí</div>
        </div>
      </div>
    </div>
  );
};
