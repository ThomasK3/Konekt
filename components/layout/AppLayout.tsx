'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { mockEvents, mockConversations, mockUsers } from '@/lib/mock-data';
import {
  Bell,
  Search,
  Home,
  Calendar,
  MessageCircle,
  Settings,
  TrendingUp,
  Plus,
  User,
  Trophy,
} from 'lucide-react';
import { LiveActivityTicker } from '@/components/social-proof/LiveActivityTicker';
import { RealtimeStatsPopup } from '@/components/social-proof/RealtimeStatsPopup';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user, setUser } = useUserStore();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 fixed top-0 left-0 right-0 z-20">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-konekt-black">
              Konekt
            </Link>

            <div className="flex items-center gap-4">
              {/* DEV: Quick Login when not authenticated */}
              {!user && process.env.NODE_ENV === 'development' && (
                <button
                  onClick={() => setUser(mockUsers[0])}
                  className="px-4 py-2 bg-gradient-to-r from-konekt-green to-konekt-pink text-konekt-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  🔓 DEV Login
                </button>
              )}

              <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
                <Search className="w-5 h-5 text-konekt-black/60" />
              </button>
              <Link href="/notifications">
                <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-konekt-black/60" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-konekt-pink rounded-full" />
                </button>
              </Link>
              {user && (
                <Link href={`/profile/${user.username}`}>
                  <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold cursor-pointer hover:opacity-80 transition-opacity">
                    {user.name.charAt(0)}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Live Activity Ticker */}
        <LiveActivityTicker />
      </header>

      {/* Real-time Stats Popup */}
      <RealtimeStatsPopup />

      {/* Main Layout with Sidebar */}
      <div className="max-w-[1800px] mx-auto px-6 py-8 pt-24">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0 sticky top-24 self-start">
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
              <div className="p-4 border-b border-konekt-black/10">
                <h2 className="font-bold text-konekt-black">Navigace</h2>
              </div>

              <nav className="p-2">
                {/* Feed */}
                <Link href="/feed" data-tour="nav-feed">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      isActive('/feed')
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span>Feed</span>
                  </button>
                </Link>

                <Link href="/people" data-tour="nav-people">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      isActive('/people')
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Lidé</span>
                  </button>
                </Link>

                <Link href="/events" data-tour="nav-events">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      pathname?.startsWith('/events')
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Eventy</span>
                    <span className="ml-auto text-xs bg-konekt-pink/20 text-konekt-pink px-2 py-1 rounded-full">
                      {mockEvents.filter((e) => e.status !== 'completed').length}
                    </span>
                  </button>
                </Link>

                <Link href="/messages" data-tour="nav-messages">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      isActive('/messages')
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Zprávy</span>
                    <span className="ml-auto text-xs bg-konekt-pink px-2 py-1 rounded-full text-konekt-white">
                      {mockConversations.filter((c) => c.unreadCount > 0).length}
                    </span>
                  </button>
                </Link>
              </nav>

              {/* Moje Eventy */}
              <div className="p-2 border-t border-konekt-black/10">
                <div className="px-4 py-2">
                  <h3 className="text-xs font-bold text-konekt-black/50 uppercase tracking-wider">
                    Moje Eventy
                  </h3>
                </div>

                {user && mockEvents
                  .filter((event) => event.attendees.includes(user.id))
                  .map((event) => {
                    const eventIcon =
                      event.category === 'hackathon'
                        ? '🚀'
                        : event.category === 'networking'
                        ? '🎉'
                        : event.category === 'workshop'
                        ? '🤖'
                        : event.category === 'meetup'
                        ? '💼'
                        : '📅';

                    return (
                      <Link key={event.id} href={`/events/${event.id}/space`}>
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all mb-1 text-sm ${
                            pathname?.startsWith(`/events/${event.id}/space`)
                              ? 'bg-konekt-green text-konekt-white'
                              : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                          }`}
                        >
                          <span className="text-lg">{eventIcon}</span>
                          <span className="truncate">{event.name}</span>
                        </button>
                      </Link>
                    );
                  })}

                {/* Připojit se k eventu */}
                <Link href="/events">
                  <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all text-sm text-konekt-black/50 hover:bg-konekt-cream hover:text-konekt-black border-2 border-dashed border-konekt-black/10 hover:border-konekt-black/20 mt-2">
                    <Plus className="w-4 h-4" />
                    <span>Připojit se</span>
                  </button>
                </Link>
              </div>

              <div className="p-2 border-t border-konekt-black/10">
                <Link href="/dashboard">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      isActive('/dashboard')
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                </Link>

                <Link href="/leaderboard">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      isActive('/leaderboard')
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Leaderboard</span>
                  </button>
                </Link>

                <Link href="/settings">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive('/settings')
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Nastavení</span>
                  </button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
