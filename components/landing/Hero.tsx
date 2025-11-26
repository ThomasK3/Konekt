'use client';

import { useUserStore } from '@/lib/store';
import { mockUsers } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { BarChart3, Users, MessageSquare, Zap, Calendar, TrendingUp } from 'lucide-react';

export const Hero = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const handleGetStarted = () => {
    router.push('/register');
  };

  const handleDevLogin = () => {
    setUser(mockUsers[0]);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-konekt-green rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white/80">Event Management Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Event Management pro
            <br />
            moderní organizátory
          </h1>

          <p className="text-xl md:text-2xl text-white/60 mb-4 leading-relaxed">
            Spravujte účastníky, analyzujte data, budujte komunity
          </p>

          <p className="text-base md:text-lg text-white/40 mb-12 max-w-2xl mx-auto">
            Komplexní platforma pro organizátory eventů. Real-time analytics, attendee intelligence a long-term community engagement na jednom místě.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-konekt-green to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Začít zdarma
            </button>

            {/* DEV: Quick Login Button */}
            {process.env.NODE_ENV === 'development' && !user && (
              <button
                onClick={handleDevLogin}
                className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white/80 font-medium rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <Zap className="w-5 h-5" />
                <span>DEV Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-8 rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-konekt-green/50 transition-all duration-200 hover:shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-konekt-green/20 to-emerald-500/20 flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-konekt-green" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Analytics</h3>
            <p className="text-white/60 leading-relaxed">
              Sledujte engagement během eventu. Detailní metriky o účastnících, interakcích a aktivitě v reálném čase.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-konekt-pink/50 transition-all duration-200 hover:shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-konekt-pink/20 to-pink-500/20 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-konekt-pink" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Attendee Intelligence</h3>
            <p className="text-white/60 leading-relaxed">
              Detailní přehled o účastnících. Kdo jsou, co dělají, jaké mají zájmy. Vše pro lepší event experience.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-emerald-400/50 transition-all duration-200 hover:shadow-xl">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400/20 to-konekt-green/20 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Event Spaces</h3>
            <p className="text-white/60 leading-relaxed">
              Dlouhodobá komunita kolem vašich eventů. Discord-style hubs pro diskuse, materiály a networking i po akci.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="p-12 rounded-2xl bg-gradient-to-br from-konekt-green/10 via-emerald-500/10 to-konekt-pink/10 border border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Používáno organizátory top eventů
            </h2>
            <p className="text-white/60 text-lg">
              Platformu již využívají organizátoři hackathonů, konferencí a meetupů v Česku
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-6 h-6 text-konekt-green" />
                <div className="text-4xl font-bold text-white">50+</div>
              </div>
              <div className="text-sm text-white/60">Úspěšných eventů</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-konekt-pink" />
                <div className="text-4xl font-bold text-white">2000+</div>
              </div>
              <div className="text-sm text-white/60">Účastníků</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <div className="text-4xl font-bold text-white">40%</div>
              </div>
              <div className="text-sm text-white/60">Vyšší engagement</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Připraveni na váš další event?
        </h2>
        <p className="text-xl text-white/60 mb-8">
          Registrace zdarma. Žádná platební karta. Setup za 5 minut.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-10 py-5 bg-gradient-to-r from-konekt-green to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-xl text-lg"
        >
          Vyzkoušet zdarma
        </button>
      </div>
    </div>
  );
};
