'use client';

import AppLayout from '@/components/layout/AppLayout';
import { getUserEvents, CalendarEvent, eventCategoryConfig } from '@/lib/calendar-data';
import { Calendar, Clock, MapPin, Users, ExternalLink, Download, Share2, Bell, Settings as SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AgendaPage() {
  const userEvents = getUserEvents().sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );

  // Group events by time period
  const now = new Date();
  const thisWeekEnd = new Date(now);
  thisWeekEnd.setDate(thisWeekEnd.getDate() + 7);

  const nextWeekEnd = new Date(thisWeekEnd);
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

  const thisWeekEvents = userEvents.filter(
    (e) => e.startDate >= now && e.startDate <= thisWeekEnd
  );

  const nextWeekEvents = userEvents.filter(
    (e) => e.startDate > thisWeekEnd && e.startDate <= nextWeekEnd
  );

  const laterEvents = userEvents.filter((e) => e.startDate > nextWeekEnd);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-konekt-black mb-2">📋 Your Agenda</h1>
            <p className="text-konekt-black/60">
              All your upcoming events in one place
            </p>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-konekt-cream hover:bg-konekt-black/10 text-konekt-black font-medium rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export All (ICS)
            </button>
            <button className="px-4 py-2 bg-konekt-cream hover:bg-konekt-black/10 text-konekt-black font-medium rounded-lg transition-colors flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Reminders
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
            <div className="text-3xl font-bold text-konekt-green mb-1">
              {userEvents.length}
            </div>
            <div className="text-sm text-konekt-black/60">Total events</div>
          </div>
          <div className="p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {thisWeekEvents.length}
            </div>
            <div className="text-sm text-konekt-black/60">This week</div>
          </div>
          <div className="p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {userEvents.filter((e) => e.yourStatus === 'interested').length}
            </div>
            <div className="text-sm text-konekt-black/60">Interested</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-8 space-y-8">
          {userEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                No events in your agenda
              </h3>
              <p className="text-konekt-black/60 mb-6">
                Start discovering events and add them to your calendar
              </p>
              <Link href="/calendar/discover">
                <button className="px-6 py-3 bg-konekt-green hover:bg-konekt-green/90 text-white font-medium rounded-lg transition-colors">
                  Discover Events
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* This Week */}
              {thisWeekEvents.length > 0 && (
                <TimelineSection
                  title="THIS WEEK"
                  events={thisWeekEvents}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              )}

              {/* Next Week */}
              {nextWeekEvents.length > 0 && (
                <TimelineSection
                  title="NEXT WEEK"
                  events={nextWeekEvents}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              )}

              {/* Later */}
              {laterEvents.length > 0 && (
                <TimelineSection
                  title="LATER"
                  events={laterEvents.slice(0, 5)}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              )}

              {laterEvents.length > 5 && (
                <div className="text-center pt-4">
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    View {laterEvents.length - 5} more events →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

// Timeline Section Component
const TimelineSection = ({
  title,
  events,
  formatDate,
  formatTime,
}: {
  title: string;
  events: CalendarEvent[];
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-konekt-black/50 uppercase tracking-wider mb-6 flex items-center gap-2">
        <div className="w-2 h-2 bg-konekt-green rounded-full" />
        {title}
      </h2>

      <div className="space-y-6">
        {events.map((event, index) => {
          const config = eventCategoryConfig[event.category];

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Date Header */}
              <div className="text-sm font-semibold text-konekt-black mb-3">
                {formatDate(event.startDate)}
              </div>

              {/* Event Card */}
              <div className="p-6 bg-konekt-cream rounded-xl border-2 border-konekt-black/10 hover:border-konekt-green/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-bold text-konekt-black">
                        {event.name}
                      </h3>
                      {event.yourStatus === 'going' && (
                        <span className="px-3 py-1 bg-konekt-green text-white text-xs font-medium rounded-full">
                          ✓ You're attending
                        </span>
                      )}
                      {event.yourStatus === 'interested' && (
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                          ⭐ Status: Interested
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-sm text-konekt-black/70 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {event.attendeeCount} attending
                          {event.networkAttending > 0 && (
                            <span className="ml-1 text-konekt-green font-medium">
                              • {event.networkAttending} from your network
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Agenda */}
                    {event.agenda && event.agenda.length > 0 && (
                      <div className="mb-4 p-4 bg-konekt-white rounded-lg">
                        <h4 className="text-sm font-semibold text-konekt-black mb-2">
                          YOUR SCHEDULE:
                        </h4>
                        <div className="space-y-1">
                          {event.agenda.filter((item) => item.enrolled).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-konekt-black/60 font-mono text-xs pt-0.5">
                                {item.time}
                              </span>
                              <span className="flex-1 text-konekt-black">
                                {item.title}
                                <span className="ml-2 text-xs text-konekt-green font-medium">
                                  (enrolled)
                                </span>
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-konekt-black/60">
                          ⏰ Reminder set: 30 min before
                        </div>
                      </div>
                    )}

                    {/* Network Attending */}
                    {event.networkAttending > 0 && (
                      <div className="mb-4 p-3 bg-konekt-white rounded-lg">
                        <div className="text-sm font-semibold text-konekt-black mb-2">
                          WHO'S GOING (from your network):
                        </div>
                        <div className="flex items-center gap-2">
                          {[...Array(Math.min(3, event.networkAttending))].map((_, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-konekt-green flex items-center justify-center text-white text-xs font-semibold"
                            >
                              {String.fromCharCode(65 + idx)}
                            </div>
                          ))}
                          {event.networkAttending > 3 && (
                            <span className="text-sm text-konekt-black/60">
                              +{event.networkAttending - 3} others
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/events/${event.id}`}>
                        <button className="px-4 py-2 bg-konekt-green hover:bg-konekt-green/90 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Full Event
                        </button>
                      </Link>
                      {event.yourStatus === 'interested' && (
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                          Confirm Attendance
                        </button>
                      )}
                      <button className="px-4 py-2 bg-konekt-cream hover:bg-konekt-black/10 text-konekt-black text-sm font-medium rounded-lg transition-colors">
                        Manage RSVP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
