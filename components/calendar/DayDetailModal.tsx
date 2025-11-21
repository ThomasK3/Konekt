'use client';

import { CalendarEvent, eventCategoryConfig } from '@/lib/calendar-data';
import { X, MapPin, Clock, Users, ExternalLink, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface DayDetailModalProps {
  date: Date | null;
  events: CalendarEvent[];
  isOpen: boolean;
  onClose: () => void;
}

export const DayDetailModal = ({ date, events, isOpen, onClose }: DayDetailModalProps) => {
  if (!date) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-konekt-white rounded-2xl border-2 border-konekt-black/10 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-konekt-white border-b border-konekt-black/10 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-konekt-black mb-1">
                  {formatDate(date)}
                </h2>
                <p className="text-sm text-konekt-black/60">
                  {events.length} {events.length === 1 ? 'event' : 'events'} scheduled
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-konekt-cream rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-konekt-black" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-konekt-black mb-2">
                    No events scheduled
                  </h3>
                  <p className="text-sm text-konekt-black/60">
                    This day is free. Maybe time to relax?
                  </p>
                </div>
              ) : (
                events.map((event) => {
                  const config = eventCategoryConfig[event.category];
                  return (
                    <div
                      key={event.id}
                      className="p-6 bg-konekt-cream rounded-xl border-2 border-konekt-black/10 hover:border-konekt-green/50 transition-colors"
                    >
                      {/* Event Header */}
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
                                ✓ Going
                              </span>
                            )}
                            {event.yourStatus === 'interested' && (
                              <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                                ⭐ Interested
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-konekt-black/70">
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
                        </div>
                      </div>

                      {/* Agenda */}
                      {event.agenda && event.agenda.length > 0 && (
                        <div className="mb-4 p-4 bg-konekt-white rounded-lg">
                          <h4 className="text-sm font-semibold text-konekt-black mb-3">
                            📋 Agenda
                          </h4>
                          <div className="space-y-2">
                            {event.agenda.map((item, idx) => (
                              <div
                                key={idx}
                                className={`flex items-start gap-3 text-sm ${
                                  item.enrolled ? 'bg-konekt-green/10 p-2 rounded' : ''
                                }`}
                              >
                                <span className="text-konekt-black/60 font-mono text-xs pt-0.5">
                                  {item.time}
                                </span>
                                <span className="flex-1 text-konekt-black">
                                  {item.title}
                                  {item.enrolled && (
                                    <span className="ml-2 text-xs text-konekt-green font-medium">
                                      (You enrolled)
                                    </span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/events/${event.id}`}>
                          <button className="px-4 py-2 bg-konekt-green hover:bg-konekt-green/90 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Event Hub
                          </button>
                        </Link>
                        <button className="px-4 py-2 bg-konekt-cream hover:bg-konekt-black/10 text-konekt-black text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download ICS
                        </button>
                        <button className="px-4 py-2 bg-konekt-cream hover:bg-konekt-black/10 text-konekt-black text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
