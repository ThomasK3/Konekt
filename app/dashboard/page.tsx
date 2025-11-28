'use client';

import { useUserStore } from '@/lib/store';
import { mockEvents, mockUsers } from '@/lib/mock-data';
import {
  Users2,
  Calendar,
  TrendingUp,
  ArrowRight,
  Plus,
  BarChart3,
  CalendarDays,
  Eye,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import AppLayout from '@/components/layout/AppLayout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useUserStore();
  const [greeting, setGreeting] = useState('');

  // Dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Dobré ráno');
    } else if (hour < 18) {
      setGreeting('Dobrý den');
    } else {
      setGreeting('Dobrý večer');
    }
  }, []);

  // In development mode, user should always be set by store
  // Show loading spinner briefly during store hydration
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-konekt-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Get user's events (assuming user is an organizer)
  const userEvents = mockEvents.filter((e) => e.organizer === user.username);
  const upcomingEvents = userEvents.filter((e) => e.status === 'upcoming').slice(0, 3);
  const ongoingEvents = userEvents.filter((e) => e.status === 'ongoing');

  // Calculate stats
  const totalEvents = userEvents.length;
  const totalAttendees = userEvents.reduce((sum, e) => sum + e.attendees.length, 0);
  const avgAttendeesPerEvent = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;

  // Recent registrations (mock)
  const recentRegistrations = mockUsers.slice(0, 5);

  return (
    <AppLayout>
      {/* HERO SECTION */}
      <motion.div
        className="mb-8 p-8 rounded-2xl border shadow-lg"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#27272a',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight mb-2" style={{ color: '#e4e4e7' }}>
              {greeting}, {user.name.split(' ')[0]}!
            </h1>
            <p style={{ color: '#a1a1aa' }}>
              {new Date().toLocaleDateString('cs-CZ', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-[#6366f1] to-[#c872a4] rounded-2xl flex items-center justify-center text-3xl text-white font-bold">
            {user.name.charAt(0)}
          </div>
        </div>

        {/* Quick Highlights */}
        {ongoingEvents.length > 0 && (
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#4a6953]/20 rounded-full text-sm font-medium" style={{ color: '#4a6953' }}>
              <div className="w-2 h-2 bg-[#4a6953] rounded-full animate-pulse" />
              <span>{ongoingEvents[0].name} probíhá právě teď</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Events */}
        <Link href="/events">
          <div
            className="p-6 rounded-xl border transition-all duration-200 hover:shadow-xl cursor-pointer"
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: '#27272a',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                <Calendar className="w-6 h-6" style={{ color: '#6366f1' }} />
              </div>
            </div>
            <div className="text-3xl font-semibold mb-1" style={{ color: '#e4e4e7' }}>{totalEvents}</div>
            <div className="text-sm" style={{ color: '#a1a1aa' }}>Celkem eventů</div>
          </div>
        </Link>

        {/* Total Attendees */}
        <div
          className="p-6 rounded-xl border transition-all duration-200"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: '#27272a',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(74, 105, 83, 0.1)' }}>
              <Users2 className="w-6 h-6" style={{ color: '#4a6953' }} />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium" style={{ color: '#4a6953' }}>
              <TrendingUp className="w-4 h-4" />
              <span>+12</span>
            </div>
          </div>
          <div className="text-3xl font-semibold mb-1" style={{ color: '#e4e4e7' }}>{totalAttendees}</div>
          <div className="text-sm" style={{ color: '#a1a1aa' }}>Celkem účastníků</div>
        </div>

        {/* Avg Attendees */}
        <div
          className="p-6 rounded-xl border transition-all duration-200"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: '#27272a',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(200, 114, 164, 0.1)' }}>
              <BarChart3 className="w-6 h-6" style={{ color: '#c872a4' }} />
            </div>
          </div>
          <div className="text-3xl font-semibold mb-1" style={{ color: '#e4e4e7' }}>{avgAttendeesPerEvent}</div>
          <div className="text-sm" style={{ color: '#a1a1aa' }}>Průměr na event</div>
        </div>

        {/* Upcoming Events */}
        <div
          className="p-6 rounded-xl border transition-all duration-200"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: '#27272a',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
              <CalendarDays className="w-6 h-6" style={{ color: '#6366f1' }} />
            </div>
          </div>
          <div className="text-3xl font-semibold mb-1" style={{ color: '#e4e4e7' }}>{upcomingEvents.length}</div>
          <div className="text-sm" style={{ color: '#a1a1aa' }}>Nadcházející</div>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (70%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* UPCOMING EVENTS */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold tracking-tight" style={{ color: '#e4e4e7' }}>
                Nadcházející eventy
              </h2>
              <Link href="/events">
                <Button size="sm" variant="outline">Zobrazit vše</Button>
              </Link>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <div
                      className="p-6 rounded-xl border hover:shadow-xl transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: '#1a1a1a',
                        borderColor: '#27272a',
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2" style={{ color: '#e4e4e7' }}>
                            {event.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm mb-3" style={{ color: '#a1a1aa' }}>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date.toLocaleDateString('cs-CZ')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users2 className="w-4 h-4" />
                              <span>{event.attendees.length} účastníků</span>
                            </div>
                          </div>
                          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                            {event.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                className="p-12 rounded-xl border text-center"
                style={{
                  backgroundColor: '#1a1a1a',
                  borderColor: '#27272a',
                }}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: '#52525b' }} />
                <p className="mb-4" style={{ color: '#a1a1aa' }}>Zatím nemáte žádné nadcházející eventy</p>
                <Link href="/events">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Vytvořit event
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-6" style={{ color: '#e4e4e7' }}>
              Rychlé akce
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/events">
                <button
                  className="w-full p-6 rounded-xl border hover:shadow-xl transition-all duration-200 flex items-center gap-4"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#27272a',
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                    <Plus className="w-6 h-6" style={{ color: '#6366f1' }} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1" style={{ color: '#e4e4e7' }}>Vytvořit event</div>
                    <div className="text-sm" style={{ color: '#a1a1aa' }}>Nový hackathon, workshop...</div>
                  </div>
                </button>
              </Link>

              <Link href="/people">
                <button
                  className="w-full p-6 rounded-xl border hover:shadow-xl transition-all duration-200 flex items-center gap-4"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#27272a',
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(74, 105, 83, 0.1)' }}>
                    <Users2 className="w-6 h-6" style={{ color: '#4a6953' }} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1" style={{ color: '#e4e4e7' }}>Procházet účastníky</div>
                    <div className="text-sm" style={{ color: '#a1a1aa' }}>Kdo se registroval</div>
                  </div>
                </button>
              </Link>

              <Link href="/calendar">
                <button
                  className="w-full p-6 rounded-xl border hover:shadow-xl transition-all duration-200 flex items-center gap-4"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#27272a',
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(200, 114, 164, 0.1)' }}>
                    <CalendarDays className="w-6 h-6" style={{ color: '#c872a4' }} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1" style={{ color: '#e4e4e7' }}>Zobrazit kalendář</div>
                    <div className="text-sm" style={{ color: '#a1a1aa' }}>Plánujte další eventy</div>
                  </div>
                </button>
              </Link>

              <Link href="/events">
                <button
                  className="w-full p-6 rounded-xl border hover:shadow-xl transition-all duration-200 flex items-center gap-4"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#27272a',
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                    <BarChart3 className="w-6 h-6" style={{ color: '#6366f1' }} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold mb-1" style={{ color: '#e4e4e7' }}>Analytika</div>
                    <div className="text-sm" style={{ color: '#a1a1aa' }}>Přehled výkonnosti</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (30%) */}
        <div className="space-y-6">
          {/* RECENT REGISTRATIONS */}
          <div
            className="p-6 rounded-xl border"
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: '#27272a',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: '#e4e4e7' }}>Nedávné registrace</h3>
            </div>

            <div className="space-y-3">
              {recentRegistrations.map((person) => (
                <Link key={person.id} href={`/profile/${person.username}`}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
                    style={{ backgroundColor: '#242424' }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#c872a4] rounded-full flex items-center justify-center text-white font-bold">
                      {person.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: '#e4e4e7' }}>
                        {person.name}
                      </div>
                      <div className="text-xs truncate" style={{ color: '#a1a1aa' }}>
                        {person.school}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/people">
              <button
                className="w-full mt-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                style={{ color: '#6366f1' }}
              >
                <span>Zobrazit vše</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* EVENT ENGAGEMENT */}
          {userEvents.length > 0 && (
            <div
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: '#27272a',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5" style={{ color: '#4a6953' }} />
                <h3 className="font-semibold" style={{ color: '#e4e4e7' }}>Engagement přehled</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: '#a1a1aa' }}>Průměrná účast</span>
                    <span className="text-sm font-semibold" style={{ color: '#e4e4e7' }}>87%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#242424' }}>
                    <div className="h-full rounded-full" style={{ width: '87%', backgroundColor: '#4a6953' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: '#a1a1aa' }}>Post-event engagement</span>
                    <span className="text-sm font-semibold" style={{ color: '#e4e4e7' }}>65%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#242424' }}>
                    <div className="h-full rounded-full" style={{ width: '65%', backgroundColor: '#c872a4' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: '#a1a1aa' }}>Satisfaction rate</span>
                    <span className="text-sm font-semibold" style={{ color: '#e4e4e7' }}>92%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: '#242424' }}>
                    <div className="h-full rounded-full" style={{ width: '92%', backgroundColor: '#6366f1' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
