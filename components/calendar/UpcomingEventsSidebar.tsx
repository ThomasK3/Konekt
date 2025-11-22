'use client';

import { CalendarEvent, eventCategoryConfig } from '@/lib/calendar-data';
import { Calendar, Users, TrendingUp, MessageCircle, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface UpcomingEventsSidebarProps {
  events: CalendarEvent[];
}

export const UpcomingEventsSidebar = ({ events }: UpcomingEventsSidebarProps) => {
  const [filters, setFilters] = useState({
    myEvents: true,
    interested: true,
    allPublic: false,
    categories: {
      conference: true,
      workshop: true,
      networking: true,
      online: false,
      social: false,
      competition: false,
      meetup: false,
    },
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `In ${days} days`;
    if (days < 14) return 'Next week';
    if (days < 30) return `In ${Math.floor(days / 7)} weeks`;
    return new Intl.DateTimeFormat('cs-CZ', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  // Group events by time period
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() + 7);

  const thisWeekEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate > today && eventDate <= thisWeek;
  });

  const nextWeek = new Date(thisWeek);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const nextWeekEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate > thisWeek && eventDate <= nextWeek;
  });

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category as keyof typeof prev.categories],
      },
    }));
  };

  return (
    <aside className="w-80 flex-shrink-0 space-y-6">
      {/* Upcoming Events */}
      <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
        <div className="p-4 border-b border-konekt-black/10">
          <h3 className="font-bold text-konekt-black flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Events
          </h3>
        </div>

        <div className="p-4 space-y-6">
          {/* Today */}
          <div>
            <h4 className="text-xs font-bold text-konekt-black/50 uppercase tracking-wider mb-3">
              📅 Today
            </h4>
            {todayEvents.length === 0 ? (
              <p className="text-sm text-konekt-black/60">No events scheduled</p>
            ) : (
              <div className="space-y-2">
                {todayEvents.map((event) => (
                  <EventCard key={event.id} event={event} formatDate={formatDate} />
                ))}
              </div>
            )}
          </div>

          {/* This Week */}
          {thisWeekEvents.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-konekt-black/50 uppercase tracking-wider mb-3">
                📅 This Week
              </h4>
              <div className="space-y-2">
                {thisWeekEvents.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} formatDate={formatDate} />
                ))}
                {thisWeekEvents.length > 3 && (
                  <Link href="/calendar/agenda">
                    <button className="w-full text-sm text-indigo-600 hover:text-indigo-700 transition-colors py-2 font-medium">
                      +{thisWeekEvents.length - 3} more this week →
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Next Week */}
          {nextWeekEvents.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-konekt-black/50 uppercase tracking-wider mb-3">
                📅 Next Week
              </h4>
              <div className="space-y-2">
                {nextWeekEvents.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} formatDate={formatDate} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
        <div className="p-4 border-b border-konekt-black/10">
          <h3 className="font-bold text-konekt-black flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h3>
        </div>

        <div className="p-4 space-y-4">
          {/* Status Filters */}
          <div>
            <label className="flex items-center gap-2 p-2 hover:bg-konekt-cream rounded-lg cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.myEvents}
                onChange={(e) => setFilters({ ...filters, myEvents: e.target.checked })}
                className="w-4 h-4 rounded accent-konekt-green"
              />
              <span className="text-sm text-konekt-black">My Events</span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-konekt-cream rounded-lg cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.interested}
                onChange={(e) => setFilters({ ...filters, interested: e.target.checked })}
                className="w-4 h-4 rounded accent-konekt-green"
              />
              <span className="text-sm text-konekt-black">Interested</span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-konekt-cream rounded-lg cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.allPublic}
                onChange={(e) => setFilters({ ...filters, allPublic: e.target.checked })}
                className="w-4 h-4 rounded accent-konekt-green"
              />
              <span className="text-sm text-konekt-black">All Public Events</span>
            </label>
          </div>

          {/* Category Filters */}
          <div className="pt-4 border-t border-konekt-black/10">
            <h4 className="text-xs font-bold text-konekt-black/50 uppercase tracking-wider mb-2">
              Categories
            </h4>
            {Object.entries(eventCategoryConfig).map(([key, config]) => (
              <label
                key={key}
                className="flex items-center gap-2 p-2 hover:bg-konekt-cream rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.categories[key as keyof typeof filters.categories]}
                  onChange={() => toggleCategory(key)}
                  className="w-4 h-4 rounded accent-konekt-green"
                />
                <span className="text-sm">{config.icon}</span>
                <span className="text-sm text-konekt-black">{config.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

// Event Card Component
const EventCard = ({ event, formatDate }: { event: CalendarEvent; formatDate: (date: Date) => string }) => {
  const config = eventCategoryConfig[event.category];

  return (
    <Link href={`/events/${event.id}`}>
      <div className="p-3 bg-konekt-cream rounded-xl hover:bg-konekt-green/5 transition-colors border border-konekt-black/5">
        <div className="flex items-start gap-2 mb-2">
          <div className={`w-6 h-6 ${config.color} rounded flex items-center justify-center text-sm flex-shrink-0`}>
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-konekt-black truncate">
              {event.name}
            </div>
            <div className="text-xs text-konekt-black/60">
              {formatDate(event.startDate)}
              {event.isOnline ? ' • Online' : ` • ${event.location}`}
            </div>
          </div>
        </div>

        {event.yourStatus !== 'none' && (
          <div className="flex items-center gap-1 text-xs">
            {event.yourStatus === 'going' && (
              <span className="px-2 py-0.5 bg-konekt-green text-white rounded">
                ✓ Going
              </span>
            )}
            {event.yourStatus === 'interested' && (
              <span className="px-2 py-0.5 bg-yellow-500 text-white rounded">
                ⭐ Interested
              </span>
            )}
          </div>
        )}

        {event.networkAttending > 0 && (
          <div className="text-xs text-konekt-green font-medium mt-1">
            {event.networkAttending} from your network
          </div>
        )}
      </div>
    </Link>
  );
};
