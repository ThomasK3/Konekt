'use client';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useUserStore } from '@/lib/store';
import { useState } from 'react';
import { Video, Upload } from 'lucide-react';

interface Step3Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step3: React.FC<Step3Props> = ({ onBack, onNext }) => {
  const { registrationData, updateRegistrationData } = useUserStore();
  const [bio, setBio] = useState(registrationData.bio);
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const handleNext = () => {
    updateRegistrationData({ bio, videoUrl: videoFile || undefined });
    onNext();
  };

  const handleVideoClick = () => {
    // Placeholder for video upload
    alert('Video upload funkce bude dostupná brzy! 🎥');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-konekt-black mb-2">
          Představ se
        </h2>
        <p className="text-konekt-black/60">
          Napiš něco o sobě
        </p>
      </div>

      <Textarea
        label="O mně"
        placeholder="Studuji informatiku, zajímám se o web development a AI. Hledám mentora v oblasti React..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={6}
      />

      <div>
        <label className="block text-sm font-medium text-konekt-black mb-2">
          Video představení (volitelné)
        </label>
        <button
          onClick={handleVideoClick}
          className="w-full px-6 py-8 border-2 border-dashed border-konekt-black/20 rounded-xl
            hover:border-konekt-green hover:bg-konekt-green/5 transition-all
            flex flex-col items-center gap-3 text-konekt-black/60 hover:text-konekt-green"
        >
          {videoFile ? (
            <>
              <Video className="w-12 h-12" />
              <span className="font-medium">Video nahráno ✓</span>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12" />
              <div className="text-center">
                <span className="font-medium block">Nahrát video</span>
                <span className="text-sm">Max 60 sekund</span>
              </div>
            </>
          )}
        </button>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Zpět
        </Button>
        <Button onClick={handleNext} disabled={!bio} className="flex-1">
          Pokračovat
        </Button>
      </div>
    </div>
  );
};
