'use client';

import { useUserStore } from '@/lib/store';
import { mockEvents, mockProjects, mockConversations } from '@/lib/mock-data';
import { Users2, MessageCircle, Briefcase, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import AppLayout from '@/components/layout/AppLayout';

export default function DashboardPage() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-konekt-black mb-4">
            Pro zobrazení dashboardu se prosím přihlaste
          </h2>
          <Link href="/register">
            <Button>Registrace</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get user's projects
  const userProjects = mockProjects.filter((p) => user.projectIds?.includes(p.id));

  // Get upcoming events user is attending
  const upcomingEvents = mockEvents.filter(
    (e) => e.status === 'upcoming' && e.attendees.includes(user.id)
  );

  // Mock activity data for the week
  const weekActivity = [
    { day: 'Po', messages: 12, views: 8 },
    { day: 'Út', messages: 8, views: 15 },
    { day: 'St', messages: 15, views: 12 },
    { day: 'Čt', messages: 20, views: 18 },
    { day: 'Pá', messages: 5, views: 6 },
    { day: 'So', messages: 0, views: 2 },
    { day: 'Ne', messages: 3, views: 4 },
  ];

  const maxMessages = Math.max(...weekActivity.map((d) => d.messages));

  return (
    <AppLayout>
      {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-konekt-black mb-2">
            👋 Ahoj, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-lg text-konekt-black/60">
            Zde je tvůj přehled aktivit a statistik
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-konekt-green to-konekt-green/80 rounded-2xl p-6 text-konekt-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-white/20 rounded-xl flex items-center justify-center">
                <Users2 className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-konekt-white/60" />
            </div>
            <p className="text-sm text-konekt-white/80 mb-1">Spojení</p>
            <p className="text-4xl font-bold mb-1">23</p>
            <p className="text-xs text-konekt-white/60">+3 tento týden</p>
          </div>

          <div className="bg-gradient-to-br from-konekt-pink to-konekt-pink/80 rounded-2xl p-6 text-konekt-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-konekt-white/60" />
            </div>
            <p className="text-sm text-konekt-white/80 mb-1">Zprávy</p>
            <p className="text-4xl font-bold mb-1">{mockConversations.length * 15}</p>
            <p className="text-xs text-konekt-white/60">+12 dnes</p>
          </div>

          <div className="bg-gradient-to-br from-konekt-black to-konekt-black/80 rounded-2xl p-6 text-konekt-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-white/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-konekt-white/80 mb-1">Projekty</p>
            <p className="text-4xl font-bold mb-1">{userProjects.length}</p>
            <p className="text-xs text-konekt-white/60">Aktivní projekty</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Chart */}
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-konekt-black mb-1">
                    🔥 Aktivita tento týden
                  </h2>
                  <p className="text-sm text-konekt-black/60">Zprávy a zobrazení profilu</p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4 h-48">
                {weekActivity.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex-1 w-full flex flex-col justify-end gap-1">
                      {/* Messages bar */}
                      <div
                        className="w-full bg-konekt-green rounded-t-lg transition-all hover:opacity-80"
                        style={{
                          height: `${(day.messages / maxMessages) * 100}%`,
                          minHeight: day.messages > 0 ? '8px' : '0',
                        }}
                        title={`${day.messages} zpráv`}
                      />
                      {/* Views bar */}
                      <div
                        className="w-full bg-konekt-pink rounded-t-lg transition-all hover:opacity-80"
                        style={{
                          height: `${(day.views / maxMessages) * 80}%`,
                          minHeight: day.views > 0 ? '6px' : '0',
                        }}
                        title={`${day.views} zobrazení`}
                      />
                    </div>
                    <span className="text-xs font-medium text-konekt-black/60">{day.day}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-konekt-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-konekt-green rounded" />
                  <span className="text-sm text-konekt-black/70">Zprávy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-konekt-pink rounded" />
                  <span className="text-sm text-konekt-black/70">Zobrazení profilu</span>
                </div>
              </div>
            </div>

            {/* My Projects */}
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-konekt-black">🎯 Tvoje Projekty</h2>
                <Link href="/projects/new">
                  <Button size="sm">+ Nový projekt</Button>
                </Link>
              </div>

              {userProjects.length > 0 ? (
                <div className="space-y-4">
                  {userProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block group"
                    >
                      <div className="p-4 bg-konekt-cream hover:bg-konekt-green/5 border-2 border-konekt-black/10 hover:border-konekt-green/30 rounded-xl transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-konekt-black group-hover:text-konekt-green transition-colors">
                            {project.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.stage === 'idea'
                                ? 'bg-blue-100 text-blue-600'
                                : project.stage === 'mvp'
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {project.stage === 'idea'
                              ? 'Idea'
                              : project.stage === 'mvp'
                              ? 'MVP'
                              : 'Launched'}
                          </span>
                        </div>
                        <p className="text-sm text-konekt-black/60 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-konekt-white rounded text-xs font-medium text-konekt-black/70"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="text-xs text-konekt-black/50">
                              +{project.stack.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-konekt-black/20" />
                  <p className="text-konekt-black/60 mb-4">Zatím nemáš žádné projekty</p>
                  <Link href="/projects/new">
                    <Button size="sm">Vytvoř první projekt</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-konekt-black">📅 Nadcházející Eventy</h2>
                <Link
                  href="/events"
                  className="text-sm text-konekt-green hover:text-konekt-green/80 font-medium"
                >
                  Vše
                </Link>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block group"
                    >
                      <div className="p-3 bg-konekt-cream hover:bg-konekt-green/5 border border-konekt-black/10 hover:border-konekt-green/30 rounded-xl transition-all">
                        <h3 className="font-semibold text-sm text-konekt-black group-hover:text-konekt-green transition-colors mb-1">
                          {event.name}
                        </h3>
                        <p className="text-xs text-konekt-black/60 mb-2">{event.location}</p>
                        <p className="text-xs text-konekt-pink font-medium">
                          {event.date.toLocaleDateString('cs-CZ', {
                            day: 'numeric',
                            month: 'long',
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="w-10 h-10 mx-auto mb-2 text-konekt-black/20" />
                  <p className="text-sm text-konekt-black/60">Žádné nadcházející eventy</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-konekt-green to-konekt-green/80 rounded-2xl p-6 text-konekt-white">
              <h2 className="text-lg font-bold mb-4">⚡ Rychlé akce</h2>
              <div className="space-y-2">
                <Link
                  href="/messages"
                  className="flex items-center justify-between p-3 bg-konekt-white/10 hover:bg-konekt-white/20 rounded-xl transition-colors"
                >
                  <span className="text-sm font-medium">Zprávy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/people"
                  className="flex items-center justify-between p-3 bg-konekt-white/10 hover:bg-konekt-white/20 rounded-xl transition-colors"
                >
                  <span className="text-sm font-medium">Najít lidi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects/new"
                  className="flex items-center justify-between p-3 bg-konekt-white/10 hover:bg-konekt-white/20 rounded-xl transition-colors"
                >
                  <span className="text-sm font-medium">Nový projekt</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </AppLayout>
  );
}
