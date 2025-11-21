'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { getRecommendedEvents, calendarEvents, CalendarEvent, eventCategoryConfig, EventCategory } from '@/lib/calendar-data';
import { TrendingUp, Users, Calendar, MapPin, Clock, Star, Check, Filter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<'all' | 'prague' | 'brno' | 'online'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'week' | 'month' | 'later'>('all');

  const recommendedEvents = getRecommendedEvents();

  // Filter all events
  let filteredEvents = calendarEvents.filter((event) => {
    // Category filter
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;

    // Location filter
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'online' && !event.isOnline) return false;
      if (selectedLocation === 'prague' && !event.location.toLowerCase().includes('pra')) return false;
      if (selectedLocation === 'brno' && !event.location.toLowerCase().includes('brno')) return false;
    }

    // Timeframe filter
    if (selectedTimeframe !== 'all') {
      const now = new Date();
      const eventDate = event.startDate;
      const diffTime = eventDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (selectedTimeframe === 'week' && diffDays > 7) return false;
      if (selectedTimeframe === 'month' && diffDays > 30) return false;
      if (selectedTimeframe === 'later' && diffDays <= 30) return false;
    }

    return true;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-konekt-black mb-2">🔍 Discover Events</h1>
          <p className="text-konekt-black/60">
            Find events that match your interests and grow your network
          </p>
        </div>

        {/* Filters */}
        <div className="bg-konekt-white rounded-xl border-2 border-konekt-black/10 p-4">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-konekt-black/60" />
            <span className="font-semibold text-konekt-black">Filters</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-konekt-black/70 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as EventCategory | 'all')}
                className="w-full px-4 py-2 bg-konekt-cream border-2 border-konekt-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {Object.entries(eventCategoryConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.icon} {config.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-konekt-black/70 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value as any)}
                className="w-full px-4 py-2 bg-konekt-cream border-2 border-konekt-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              >
                <option value="all">All Locations</option>
                <option value="prague">Prague</option>
                <option value="brno">Brno</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Timeframe Filter */}
            <div>
              <label className="block text-sm font-medium text-konekt-black/70 mb-2">
                Timeframe
              </label>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                className="w-full px-4 py-2 bg-konekt-cream border-2 border-konekt-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="later">Later</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recommended Events */}
        {recommendedEvents.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-konekt-green" />
              <h2 className="text-2xl font-bold text-konekt-black">Recommended For You</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {recommendedEvents.slice(0, 4).map((event, index) => (
                <RecommendedEventCard
                  key={event.id}
                  event={event}
                  index={index}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-konekt-black">All Upcoming Events</h2>
            <span className="text-sm text-konekt-black/60">
              {filteredEvents.length} events found
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-konekt-white rounded-2xl border-2 border-konekt-black/10">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                No events found
              </h3>
              <p className="text-konekt-black/60 mb-4">
                Try adjusting your filters to see more events
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                  setSelectedTimeframe('all');
                }}
                className="px-6 py-3 bg-konekt-green hover:bg-konekt-green/90 text-white font-medium rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

// Recommended Event Card (larger, more prominent)
const RecommendedEventCard = ({
  event,
  index,
  formatDate,
}: {
  event: CalendarEvent;
  index: number;
  formatDate: (date: Date) => string;
}) => {
  const config = eventCategoryConfig[event.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-konekt-white rounded-2xl border-2 border-konekt-green/30 overflow-hidden hover:shadow-xl transition-all group"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {event.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
            🔥 Featured
          </div>
        )}
        <div className={`absolute bottom-3 left-3 px-3 py-1 ${config.color} text-white text-sm font-medium rounded-full`}>
          {config.icon} {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-konekt-black mb-2 line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-konekt-black/70 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              {event.attendeeCount} attending, {event.interestedCount} interested
            </span>
          </div>
        </div>

        {/* Why Recommended */}
        <div className="mb-4 p-3 bg-konekt-green/5 border border-konekt-green/20 rounded-lg">
          <div className="text-xs font-semibold text-konekt-green mb-1">
            Why recommended:
          </div>
          <div className="text-xs text-konekt-black/70 space-y-1">
            {event.networkAttending > 0 && (
              <div>• {event.networkAttending} people from your network are going</div>
            )}
            <div>• Matches your interests ({config.label})</div>
            {event.featured && <div>• Trending in your area</div>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/events/${event.id}`} className="flex-1">
            <button className="w-full px-4 py-2 bg-konekt-green hover:bg-konekt-green/90 text-white text-sm font-medium rounded-lg transition-colors">
              Learn More →
            </button>
          </Link>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
            <Star className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-konekt-cream hover:bg-konekt-green/10 text-konekt-green rounded-lg transition-colors">
            <Check className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Regular Event Card (smaller grid)
const EventCard = ({
  event,
  index,
  formatDate,
}: {
  event: CalendarEvent;
  index: number;
  formatDate: (date: Date) => string;
}) => {
  const config = eventCategoryConfig[event.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 9) * 0.05 }}
      className="bg-konekt-white rounded-xl border-2 border-konekt-black/10 overflow-hidden hover:border-konekt-green/50 hover:shadow-lg transition-all group"
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className={`absolute bottom-2 left-2 px-2 py-1 ${config.color} text-white text-xs font-medium rounded`}>
          {config.icon}
        </div>
        {event.yourStatus !== 'none' && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-konekt-green text-white text-xs font-medium rounded">
            {event.yourStatus === 'going' ? '✓' : '⭐'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-konekt-black mb-2 line-clamp-2 min-h-[40px]">
          {event.name}
        </h3>

        <div className="space-y-1 text-xs text-konekt-black/70 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{event.attendeeCount} attending</span>
          </div>
        </div>

        {event.networkAttending > 0 && (
          <div className="text-xs text-konekt-green font-medium mb-3">
            {event.networkAttending} from your network
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/events/${event.id}`} className="flex-1">
            <button className="w-full px-3 py-1.5 bg-konekt-cream hover:bg-konekt-green/10 text-konekt-black text-xs font-medium rounded-lg transition-colors">
              View
            </button>
          </Link>
          {event.yourStatus === 'none' && (
            <>
              <button className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-lg transition-colors">
                <Star className="w-3 h-3" />
              </button>
              <button className="px-3 py-1.5 bg-konekt-green hover:bg-konekt-green/90 text-white text-xs rounded-lg transition-colors">
                <Check className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
