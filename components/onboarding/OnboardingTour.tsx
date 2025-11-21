'use client';

import { useRouter } from 'next/navigation';
import { CustomTour } from './CustomTour';

interface OnboardingTourProps {
  run?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

export const OnboardingTour = ({ run = true, onComplete, onSkip }: OnboardingTourProps) => {
  const router = useRouter();

  const steps = [
    {
      target: 'body',
      placement: 'center' as const,
      content: (
        <div className="space-y-3 text-center">
          <div className="text-4xl">👋</div>
          <h2 className="text-2xl font-bold text-konekt-black">Vítej v Konekt!</h2>
          <p className="text-konekt-black/70">
            Ukážu ti jak na to. Za chvilku budeš profík!
          </p>
        </div>
      ),
    },
    {
      target: 'stats-cards',
      placement: 'bottom' as const,
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-konekt-black">Tvoje Statistiky</h3>
          <p className="text-sm text-konekt-black/70">
            Tady vidíš přehled tvé aktivity - spojení, zprávy, projekty a eventy.
          </p>
        </div>
      ),
    },
    {
      target: 'analytics',
      placement: 'top' as const,
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-konekt-black">📊 Analytics</h3>
          <p className="text-sm text-konekt-black/70">
            Sleduj svůj růst, aktivitu a engagement. Vypadá to jako enterprise produkt, že? 😎
          </p>
        </div>
      ),
    },
    {
      target: 'nav-feed',
      placement: 'right' as const,
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-konekt-black">🔥 Feed</h3>
          <p className="text-sm text-konekt-black/70">
            Tady najdeš lidi a projekty. Můžeš filtrovat podle skills a zájmů.
          </p>
        </div>
      ),
    },
    {
      target: 'nav-people',
      placement: 'right' as const,
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-konekt-black">🔍 Lidé</h3>
          <p className="text-sm text-konekt-black/70">
            Tvůj matching engine. Najdi přesně koho potřebuješ s pokročilými filtry.
          </p>
        </div>
      ),
    },
    {
      target: 'nav-events',
      placement: 'right' as const,
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-konekt-black">🎪 Eventy</h3>
          <p className="text-sm text-konekt-black/70">
            Připoj se k hackathonům, workshopům a networking eventům!
          </p>
        </div>
      ),
    },
    {
      target: 'nav-messages',
      placement: 'right' as const,
      content: (
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-konekt-black">💬 Zprávy</h3>
          <p className="text-sm text-konekt-black/70">
            Našel jsi někoho zajímavého? Napiš mu hned!
          </p>
        </div>
      ),
    },
    {
      target: 'body',
      placement: 'center' as const,
      content: (
        <div className="space-y-4 text-center">
          <div className="text-4xl">🎉</div>
          <h2 className="text-2xl font-bold text-konekt-black">Jsi ready!</h2>
          <p className="text-konekt-black/70">
            Teď už víš kde co je. Začni objevovat a buduj svojí síť!
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                router.push('/settings');
                if (onComplete) onComplete();
              }}
              className="flex-1 px-4 py-3 bg-konekt-white border-2 border-konekt-black/10 rounded-xl font-medium text-konekt-black hover:border-konekt-green transition-colors"
            >
              Dokončit Profil
            </button>
            <button
              onClick={() => {
                router.push('/feed');
                if (onComplete) onComplete();
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-konekt-green to-konekt-pink text-konekt-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Projít Feed
            </button>
          </div>
        </div>
      ),
    },
  ];

  return <CustomTour steps={steps} run={run} onComplete={onComplete} onSkip={onSkip} />;
};
