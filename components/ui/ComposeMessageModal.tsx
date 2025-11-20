'use client';

import { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Mentor } from '@/types';

interface ComposeMessageModalProps {
  mentor: Mentor;
  isOpen: boolean;
  onClose: () => void;
  onSend?: (mentorId: string, subject: string, message: string) => void;
}

export const ComposeMessageModal: React.FC<ComposeMessageModalProps> = ({
  mentor,
  isOpen,
  onClose,
  onSend,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;
    if (onSend) onSend(mentor.id, subject, message);
    setSubject('');
    setMessage('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-konekt-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-konekt-black/10 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-konekt-black mb-1">
              Zpráva pro {mentor.name}
            </h2>
            <p className="text-sm text-konekt-black/60">
              {mentor.role} @ {mentor.company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 hover:bg-konekt-cream rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-konekt-black/60" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-konekt-black mb-2">
              Předmět <span className="text-konekt-pink">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Krátký, konkrétní předmět..."
              className="w-full px-4 py-3 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              maxLength={100}
            />
            <p className="text-xs text-konekt-black/50 mt-1">{subject.length}/100</p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-konekt-black mb-2">
              Zpráva <span className="text-konekt-pink">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Představ se, vysvětli proč píšeš a buď konkrétní..."
              rows={8}
              className="w-full px-4 py-3 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              maxLength={1000}
            />
            <p className="text-xs text-konekt-black/50 mt-1">{message.length}/1000</p>
          </div>

          {/* Tips */}
          <div className="p-4 bg-konekt-green/10 border border-konekt-green/20 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-konekt-green flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-konekt-black mb-2 text-sm">
                  💡 Tipy pro lepší odpověď:
                </h4>
                <ul className="text-sm text-konekt-black/70 space-y-1">
                  <li>• Buď konkrétní - proč píšeš zrovna tomuto mentorovi?</li>
                  <li>• Představ se - kdo jsi, čím se zabýváš</li>
                  <li>• Ukaž, že jsi udělal domácí úkol (přečetl profil, posty)</li>
                  <li>• Zeptej se na specifickou věc, ne &quot;můžete mi poradit?&quot;</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Option (UI Mockup) */}
          <div className="p-4 bg-konekt-pink/10 border-2 border-konekt-pink/20 rounded-xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                className="mt-1 w-5 h-5 rounded accent-konekt-pink"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-konekt-black">
                    🔥 Urgent Request (Premium)
                  </span>
                  <span className="px-2 py-0.5 bg-konekt-pink text-konekt-white text-xs font-bold rounded-full">
                    PRO
                  </span>
                </div>
                <p className="text-sm text-konekt-black/70 mb-2">
                  Tvoje zpráva dostane prioritu a zvýrazněný badge. Mentor dostane instant notifikaci.
                </p>
                <p className="text-xs text-konekt-black/50">
                  💎 50 Konekt kredits (coming soon)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-konekt-black/10 flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Zrušit
          </Button>
          <Button
            onClick={handleSend}
            disabled={!subject.trim() || !message.trim()}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Odeslat
          </Button>
        </div>
      </div>
    </div>
  );
};
