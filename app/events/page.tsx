'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, fastStaggerContainer, fastStaggerItem, hoverScaleBig, tapScale } from '@/lib/animations';
import { mockEvents } from '@/lib/mock-data';
import { Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { JoinEventModal } from '@/components/ui/JoinEventModal';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import type { Event } from '@/types';

type EventFilter = 'all' | 'upcoming' | 'ongoing' | 'completed';

const categoryEmojis = {
  hackathon: '💻',
  networking: '🤝',
  workshop: '🎓',
  conference: '🎤',
  meetup: '☕',
};

const categoryColors = {
  hackathon: 'bg-konekt-green/10 text-konekt-green border-konekt-green/20',
  networking: 'bg-konekt-pink/10 text-konekt-pink border-konekt-pink/20',
  workshop: 'bg-blue-50 text-blue-600 border-blue-200',
  conference: 'bg-purple-50 text-purple-600 border-purple-200',
  meetup: 'bg-orange-50 text-orange-600 border-orange-200',
};

const statusColors = {
  upcoming: 'bg-blue-50 text-blue-600 border-blue-200',
  ongoing: 'bg-konekt-green/10 text-konekt-green border-konekt-green/20',
  completed: 'bg-konekt-black/10 text-white/60 border-konekt-black/20',
};

const statusLabels = {
  upcoming: 'Nadcházející',
  ongoing: 'Probíhá',
  completed: 'Ukončeno',
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventFilter>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const filteredEvents = mockEvents.filter((event) => {
    if (activeFilter === 'all') return true;
    return event.status === activeFilter;
  });

  const handleJoinEvent = (eventId: string, attended: boolean) => {
    console.log(`Joining event ${eventId}, attended: ${attended}`);
    // TODO: Implement join event logic
  };

  const formatDate = (date: Date, endDate?: Date) => {
    const dateStr = date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (endDate) {
      const endDateStr = endDate.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
      });
      return `${dateStr} - ${endDateStr}`;
    }

    return dateStr;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AppLayout>
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        exit={fadeInUp.exit}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Event Hub</h1>
        <p className="text-white/60">
          Objevuj události, workshopy a hackathony v české startup komunitě
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="mb-6 flex flex-wrap gap-3"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        exit={fadeIn.exit}
      >
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-[#1a1a1a] text-white border-2 border-white/10 hover:border-konekt-black/30'
          }`}
        >
          Vše ({mockEvents.length})
        </button>
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'upcoming'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-[#1a1a1a] text-white border-2 border-white/10 hover:border-konekt-black/30'
          }`}
        >
          Nadcházející ({mockEvents.filter((e) => e.status === 'upcoming').length})
        </button>
        <button
          onClick={() => setActiveFilter('ongoing')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'ongoing'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-[#1a1a1a] text-white border-2 border-white/10 hover:border-konekt-black/30'
          }`}
        >
          Probíhá ({mockEvents.filter((e) => e.status === 'ongoing').length})
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'completed'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-[#1a1a1a] text-white border-2 border-white/10 hover:border-konekt-black/30'
          }`}
        >
          Ukončené ({mockEvents.filter((e) => e.status === 'completed').length})
        </button>
      </motion.div>

      {/* Events Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={fastStaggerContainer}
        initial="initial"
        animate="animate"
      >
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            variants={fastStaggerItem}
            whileHover={hoverScaleBig}
            whileTap={tapScale}
          >
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border-2 border-white/10 hover:shadow-2xl hover:border-konekt-black/20 transition-all duration-300 group h-full">
              {/* Hero Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold border ${
                    statusColors[event.status]
                  }`}
                >
                  {statusLabels[event.status]}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold border ${
                    categoryColors[event.category]
                  }`}
                >
                  {categoryEmojis[event.category]}{' '}
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-konekt-green transition-colors">
                {event.name}
              </h3>

              <p className="text-white/70 mb-4 line-clamp-2">{event.description}</p>

              {/* Event Info Grid */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Calendar className="w-4 h-4 text-konekt-pink" />
                  <span className="font-medium">{formatDate(event.date, event.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Clock className="w-4 h-4 text-konekt-pink" />
                  <span>{formatTime(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="w-4 h-4 text-konekt-pink" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Users className="w-4 h-4 text-konekt-pink" />
                  <span>
                    {event.attendees.length}
                    {event.maxAttendees && ` / ${event.maxAttendees}`} účastníků
                  </span>
                </div>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {event.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#151515] rounded-full text-xs font-medium text-white/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsJoinModalOpen(true);
                  }}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Připojit se
                </Button>
                <Link href={`/events/${event.id}`} className="flex-1">
                  <Button className="w-full group/btn">
                    Detail
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                {event.website && (
                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border-2 border-white/10 rounded-xl hover:bg-[#151515] transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-white/20" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Žádné události nenalezeny
          </h3>
          <p className="text-white/60">Zkuste změnit filtr nebo se vraťte později</p>
        </div>
      )}

      {/* Join Event Modal */}
      {selectedEvent && (
        <JoinEventModal
          event={selectedEvent}
          isOpen={isJoinModalOpen}
          onClose={() => {
            setIsJoinModalOpen(false);
            setSelectedEvent(null);
          }}
          onJoin={handleJoinEvent}
        />
      )}
    </AppLayout>
  );
}
