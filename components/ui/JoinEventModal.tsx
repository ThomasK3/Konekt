'use client';

import { useState } from 'react';
import { X, Check, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Event } from '@/types';

interface JoinEventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onJoin?: (eventId: string, attended: boolean) => void;
}

export const JoinEventModal: React.FC<JoinEventModalProps> = ({
  event,
  isOpen,
  onClose,
  onJoin,
}) => {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null);

  if (!isOpen) return null;

  const handleJoin = () => {
    if (selectedOption && onJoin) {
      onJoin(event.id, selectedOption === 'yes');
    }
    setSelectedOption(null);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedOption(null);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-konekt-white rounded-2xl shadow-2xl max-w-xl w-full">
        {/* Header */}
        <div className="p-6 border-b border-konekt-black/10 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-konekt-black mb-1">
              Připojit se k eventu
            </h2>
            <p className="text-sm text-konekt-black/60">
              {event.name}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedOption(null);
              onClose();
            }}
            className="w-10 h-10 hover:bg-konekt-cream rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-konekt-black/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Event Preview */}
          <div className="p-4 bg-konekt-cream rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-konekt-green rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {event.category === 'hackathon'
                  ? '🚀'
                  : event.category === 'networking'
                  ? '🎉'
                  : event.category === 'workshop'
                  ? '🤖'
                  : event.category === 'meetup'
                  ? '💼'
                  : '📅'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-konekt-black mb-2">{event.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-konekt-black/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date.toLocaleDateString('cs-CZ')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.attendees.length} účastníků
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-konekt-black mb-2">
              Byl/a jsi na této akci?
            </h3>
            <p className="text-sm text-konekt-black/60 mb-6">
              Pomůže nám to lépe personalizovat tvůj zážitek a networking možnosti
            </p>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {/* Yes Option */}
              <button
                onClick={() => setSelectedOption('yes')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedOption === 'yes'
                    ? 'bg-konekt-green/10 border-konekt-green'
                    : 'bg-konekt-cream border-konekt-black/10 hover:border-konekt-green/50'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedOption === 'yes'
                        ? 'bg-konekt-green text-konekt-white'
                        : 'bg-konekt-white text-konekt-black/40'
                    }`}
                  >
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-konekt-black mb-1">Ano, byl/a jsem</div>
                    <div className="text-xs text-konekt-black/60">
                      Získej plný přístup k networkingu
                    </div>
                  </div>
                </div>
              </button>

              {/* No Option */}
              <button
                onClick={() => setSelectedOption('no')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedOption === 'no'
                    ? 'bg-konekt-pink/10 border-konekt-pink'
                    : 'bg-konekt-cream border-konekt-black/10 hover:border-konekt-pink/50'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedOption === 'no'
                        ? 'bg-konekt-pink text-konekt-white'
                        : 'bg-konekt-white text-konekt-black/40'
                    }`}
                  >
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-konekt-black mb-1">Ne, plánuju se zúčastnit</div>
                    <div className="text-xs text-konekt-black/60">
                      Připoj se k plánování
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-konekt-green/10 border border-konekt-green/20 rounded-xl">
            <p className="text-sm text-konekt-black/70">
              <strong>💡 Co získáš připojením:</strong><br />
              • Přístup k event channelu a diskuzím<br />
              • Networking s ostatními účastníky<br />
              • Materiály, nahrávky a prezentace<br />
              • Updates a notifikace o eventu
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-konekt-black/10 flex gap-3">
          <Button
            onClick={() => {
              setSelectedOption(null);
              onClose();
            }}
            variant="outline"
            className="flex-1"
          >
            Zrušit
          </Button>
          <Button
            onClick={handleJoin}
            disabled={!selectedOption}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Připojit se
          </Button>
        </div>
      </div>
    </div>
  );
};
