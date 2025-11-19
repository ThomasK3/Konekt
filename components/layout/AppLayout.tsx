'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { mockEvents, mockUsers, mockProjects, mockConversations } from '@/lib/mock-data';
import {
  Bell,
  Search,
  Home,
  Briefcase,
  Users2,
  Calendar,
  MessageCircle,
  Settings,
  TrendingUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user } = useUserStore();
  const [feedExpanded, setFeedExpanded] = useState(true);

  const isActive = (path: string) => pathname === path;
  const isInFeedSection = pathname === '/feed' || pathname === '/people' || pathname?.startsWith('/projects');

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 fixed top-0 left-0 right-0 z-20">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/feed" className="text-2xl font-bold text-konekt-black">
              Konekt
            </Link>

            <div className="flex items-center gap-4">
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
      </header>

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
                {/* Feed with Submenu */}
                <div>
                  <button
                    onClick={() => setFeedExpanded(!feedExpanded)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                      isInFeedSection
                        ? 'bg-konekt-green text-konekt-white'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="flex-1 text-left">Feed</span>
                    {feedExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {/* Feed Submenu */}
                  {feedExpanded && (
                    <div className="ml-4 mb-1 space-y-1">
                      <Link href="/people">
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            isActive('/people')
                              ? 'bg-konekt-green/20 text-konekt-green'
                              : 'text-konekt-black/60 hover:bg-konekt-cream hover:text-konekt-black'
                          }`}
                        >
                          <Users2 className="w-4 h-4" />
                          <span className="flex-1 text-left">Lidé</span>
                          <span className="text-xs bg-konekt-black/10 px-2 py-0.5 rounded-full">
                            {mockUsers.length}
                          </span>
                        </button>
                      </Link>

                      <Link href="/projects">
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            pathname?.startsWith('/projects')
                              ? 'bg-konekt-green/20 text-konekt-green'
                              : 'text-konekt-black/60 hover:bg-konekt-cream hover:text-konekt-black'
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          <span className="flex-1 text-left">Projekty</span>
                          <span className="text-xs bg-konekt-black/10 px-2 py-0.5 rounded-full">
                            {mockProjects.length}
                          </span>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/events">
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

                <Link href="/messages">
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
