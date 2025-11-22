'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { mockEvents, mockConversations, mockUsers } from '@/lib/mock-data';
import {
  Bell,
  Search,
  Calendar,
  CalendarDays,
  MessageCircle,
  Settings,
  TrendingUp,
  Plus,
  Trophy,
  Briefcase,
  Compass,
  Users,
  GraduationCap,
  BriefcaseBusiness,
  BookOpen,
  UserCircle,
  Hash,
  FolderOpen,
  LayoutDashboard,
} from 'lucide-react';
import { RealtimeStatsPopup } from '@/components/social-proof/RealtimeStatsPopup';
import { CollapsibleSection } from '@/components/layout/CollapsibleSection';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user, setUser } = useUserStore();

  const isActive = (path: string) => {
    if (path === '/feed' && (pathname === '/feed' || pathname === '/discover')) return true;
    if (pathname === path) return true;
    if (path !== '/' && pathname?.startsWith(path + '/')) return true;
    return false;
  };

  const userEvents = user
    ? mockEvents.filter((event) => event.attendees.includes(user.id))
    : [];

  const unreadCount = mockConversations.filter((c) => c.unreadCount > 0).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#151515] border-b-2 border-white/10 fixed top-0 left-0 right-0 z-20">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
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

              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-white/70" />
              </button>
              <Link href="/notifications">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-white/70" />
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

      {/* Real-time Stats Popup */}
      <RealtimeStatsPopup />

      {/* Main Layout with Sidebar */}
      <div className="max-w-[1800px] mx-auto px-6 py-8 pt-24">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation - 3 ZONES */}
          <aside className="w-64 flex-shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)]">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-white/10 overflow-hidden flex flex-col max-h-full">

              {/* ═══ ZONE 1: STICKY TOP (Always visible) ═══ */}
              <div className="p-3 border-b border-white/10 flex-shrink-0">
                {/* PRIMARY NAVIGATION */}
                <nav className="space-y-1">
                  <Link href="/feed" data-tour="nav-feed">
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                        isActive('/feed')
                          ? 'bg-konekt-green text-white'
                          : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                      }`}
                    >
                      <Compass className="w-5 h-5 flex-shrink-0" />
                      <span>Discover</span>
                    </button>
                  </Link>

                  <Link href="/messages" data-tour="nav-messages">
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                        isActive('/messages')
                          ? 'bg-konekt-green text-white'
                          : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5 flex-shrink-0" />
                      <span>Messages</span>
                      {unreadCount > 0 && (
                        <span className="ml-auto text-xs bg-konekt-pink px-2 py-0.5 rounded-full text-white font-bold">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </Link>

                  <Link href="/calendar">
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                        pathname?.startsWith('/calendar')
                          ? 'bg-konekt-green text-white'
                          : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                      }`}
                    >
                      <CalendarDays className="w-5 h-5 flex-shrink-0" />
                      <span>Calendar</span>
                    </button>
                  </Link>
                </nav>
              </div>

              {/* ═══ ZONE 2: SCROLLABLE MIDDLE ═══ */}
              <div className="flex-1 overflow-y-auto sidebar-scroll py-2">

                {/* EVENT SPACES (Collapsible) */}
                <CollapsibleSection
                  title="Event Spaces"
                  icon={<Hash className="w-4 h-4" />}
                  defaultOpen={true}
                  count={userEvents.length}
                >
                  <div className="space-y-0.5">
                    {user && userEvents.map((event) => {
                      const eventIcon =
                        event.category === 'hackathon' ? '🚀' :
                        event.category === 'networking' ? '🎉' :
                        event.category === 'workshop' ? '🤖' :
                        event.category === 'meetup' ? '💼' : '📅';

                      return (
                        <Link key={event.id} href={`/events/${event.id}/space`}>
                          <button
                            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                              pathname?.startsWith(`/events/${event.id}/space`)
                                ? 'bg-konekt-green text-white'
                                : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                            }`}
                          >
                            <span className="text-base flex-shrink-0">{eventIcon}</span>
                            <span className="truncate">{event.name}</span>
                          </button>
                        </Link>
                      );
                    })}

                    {/* Join Event Button */}
                    <Link href="/events">
                      <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-konekt-black/50 dark:text-white/50 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white transition-all border border-dashed border-white/10 mt-1">
                        <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Join Event</span>
                      </button>
                    </Link>
                  </div>
                </CollapsibleSection>

                {/* MENTORSHIP (Collapsible) */}
                <CollapsibleSection
                  title="Mentorship"
                  icon={<GraduationCap className="w-4 h-4" />}
                  defaultOpen={false}
                >
                  <div className="space-y-0.5">
                    <Link href="/mentors">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          isActive('/mentors')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>Find Mentors</span>
                      </button>
                    </Link>

                    <Link href="/mentorship/sessions">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname?.startsWith('/mentorship')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>Your Sessions</span>
                      </button>
                    </Link>

                    <Link href="/mentors/dashboard">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname?.startsWith('/mentors/dashboard')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                        <span>Mentor Dashboard</span>
                      </button>
                    </Link>
                  </div>
                </CollapsibleSection>

                {/* RESOURCES (Collapsible) */}
                <CollapsibleSection
                  title="Resources"
                  icon={<BookOpen className="w-4 h-4" />}
                  defaultOpen={false}
                >
                  <div className="space-y-0.5">
                    <Link href="/library">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname === '/library'
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 flex-shrink-0" />
                        <span>Knowledge Library</span>
                      </button>
                    </Link>

                    <Link href="/library/collections">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname?.startsWith('/library/collections')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <FolderOpen className="w-4 h-4 flex-shrink-0" />
                        <span>Collections</span>
                      </button>
                    </Link>

                    <Link href="/library/contribute">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname?.startsWith('/library/contribute')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <Plus className="w-4 h-4 flex-shrink-0" />
                        <span>Contribute</span>
                      </button>
                    </Link>
                  </div>
                </CollapsibleSection>

                {/* COMMUNITY (Collapsible) */}
                <CollapsibleSection
                  title="Community"
                  icon={<Users className="w-4 h-4" />}
                  defaultOpen={false}
                >
                  <div className="space-y-0.5">
                    <Link href="/people">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          isActive('/people')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>People</span>
                      </button>
                    </Link>

                    <Link href="/projects">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname?.startsWith('/projects')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <Briefcase className="w-4 h-4 flex-shrink-0" />
                        <span>Projects</span>
                      </button>
                    </Link>

                    <Link href="/jobs">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          isActive('/jobs')
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <BriefcaseBusiness className="w-4 h-4 flex-shrink-0" />
                        <span>Opportunities</span>
                      </button>
                    </Link>

                    <Link href="/events">
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname === '/events'
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>All Events</span>
                        <span className="ml-auto text-xs bg-konekt-pink/20 text-konekt-pink px-1.5 py-0.5 rounded-full">
                          {mockEvents.filter((e) => e.status !== 'completed').length}
                        </span>
                      </button>
                    </Link>
                  </div>
                </CollapsibleSection>

                {/* Standalone Items */}
                <div className="px-2 mt-2 space-y-0.5">
                  {user && (
                    <Link href={`/profile/${user.username}`}>
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                          pathname?.startsWith(`/profile/${user.username}`)
                            ? 'bg-konekt-green text-white'
                            : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                        }`}
                      >
                        <UserCircle className="w-4 h-4 flex-shrink-0" />
                        <span>My Profile</span>
                      </button>
                    </Link>
                  )}

                  <Link href="/dashboard">
                    <button
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        isActive('/dashboard')
                          ? 'bg-konekt-green text-white'
                          : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 flex-shrink-0" />
                      <span>Dashboard</span>
                    </button>
                  </Link>

                  <Link href="/leaderboard">
                    <button
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        isActive('/leaderboard')
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                          : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                      }`}
                    >
                      <Trophy className="w-4 h-4 flex-shrink-0" />
                      <span>Leaderboard</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* ═══ ZONE 3: STICKY BOTTOM (Always visible) ═══ */}
              <div className="p-3 border-t border-white/10 flex-shrink-0">
                <Link href="/settings">
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
                      isActive('/settings')
                        ? 'bg-konekt-green text-white'
                        : 'text-konekt-black/70 dark:text-white/60 hover:bg-white/10 hover:text-konekt-black dark:hover:text-white'
                    }`}
                  >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    <span>Settings</span>
                  </button>
                </Link>

                {/* User Menu */}
                {user && (
                  <div className="mt-2 p-3 bg-konekt-cream dark:bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-konekt-green flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-konekt-black/60 dark:text-white/60 truncate">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
