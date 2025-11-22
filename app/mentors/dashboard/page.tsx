'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { useUserStore } from '@/lib/store';
import {
  getUpcomingSessionsByMentor,
  getBookingRequestsByMentor,
  sessions,
  bookingRequests
} from '@/lib/mentor-data';
import {
  Calendar,
  MessageCircle,
  Star,
  Clock,
  CheckCircle,
  X,
  Users,
  TrendingUp,
  Settings,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MentorDashboardPage() {
  const { user } = useUserStore();

  // For demo, assume current user is mentor1 (Eva Novotná)
  const mentorId = 'mentor1';

  const upcomingSessions = getUpcomingSessionsByMentor(mentorId);
  const pendingRequests = getBookingRequestsByMentor(mentorId);

  // Calculate stats
  const allSessions = sessions.filter(s => s.mentorId === mentorId);
  const completedSessions = allSessions.filter(s => s.status === 'completed');
  const totalReviews = 45; // From mock data
  const averageRating = 4.9; // From mock data

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-konekt-black dark:text-white mb-2">
          Mentor Dashboard
        </h1>
        <p className="text-konekt-black/60 dark:text-white/70">
          Welcome back, Eva!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-konekt-green/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-konekt-green" />
            </div>
            <div className="text-3xl font-bold text-konekt-black dark:text-white">
              156
            </div>
          </div>
          <p className="text-konekt-black/60 dark:text-white/60">
            Sessions Completed
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-konekt-black dark:text-white">
              {totalReviews}
            </div>
          </div>
          <p className="text-konekt-black/60 dark:text-white/60">
            Reviews
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-konekt-green/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-konekt-green" />
            </div>
            <div className="text-3xl font-bold text-konekt-black dark:text-white flex items-center gap-1">
              {averageRating}
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <p className="text-konekt-black/60 dark:text-white/60">
            Rating
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-konekt-pink/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-konekt-pink" />
            </div>
            <div className="text-3xl font-bold text-konekt-black dark:text-white">
              {pendingRequests.length}
            </div>
          </div>
          <p className="text-konekt-black/60 dark:text-white/60">
            Pending Requests
          </p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
          Upcoming Sessions
        </h2>

        {upcomingSessions.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-12 text-center">
            <Calendar className="w-16 h-16 text-konekt-black/20 dark:text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-2">
              No upcoming sessions
            </h3>
            <p className="text-konekt-black/60 dark:text-white/60">
              Your next booked sessions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6 hover:border-konekt-green transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={session.menteePhoto}
                      alt={session.menteeName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-1">
                        {session.scheduledAt.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })},{' '}
                        {session.scheduledAt.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}{' '}
                        - {session.menteeName}
                      </h3>
                      <p className="text-konekt-black/60 dark:text-white/60 mb-2">
                        Topic: {session.topic}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-konekt-black/50 dark:text-white/50">
                        <span>Format: {session.format === 'video' ? 'Video call (Zoom)' : session.format}</span>
                        <span>•</span>
                        <span>{session.duration} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Join Call
                    </button>
                  </div>
                </div>

                {session.prepNotes && (
                  <div className="bg-konekt-cream dark:bg-white/5 rounded-lg p-4">
                    <p className="text-sm font-bold text-konekt-black dark:text-white mb-2">
                      Prep Notes:
                    </p>
                    <p className="text-sm text-konekt-black/70 dark:text-white/70">
                      "{session.prepNotes}"
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Requests */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
          Pending Requests ({pendingRequests.length})
        </h2>

        {pendingRequests.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-12 text-center">
            <Users className="w-16 h-16 text-konekt-black/20 dark:text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-2">
              No pending requests
            </h3>
            <p className="text-konekt-black/60 dark:text-white/60">
              New booking requests will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={request.menteePhoto}
                    alt={request.menteeName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-konekt-black dark:text-white mb-1">
                      {request.menteeName}
                    </h3>
                    <p className="text-sm text-konekt-black/60 dark:text-white/60 mb-2">
                      Requested: {request.requestedDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}{' '}
                      at {request.requestedTime}
                    </p>
                    <p className="text-konekt-black dark:text-white mb-2">
                      Topic: "{request.topic}"
                    </p>
                    {request.background && (
                      <p className="text-sm text-konekt-black/60 dark:text-white/60">
                        Background: {request.background}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                  <button className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all">
                    Suggest Different Time
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability Settings */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6">
        <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
          Availability Settings
        </h2>

        <div className="flex gap-4 mb-6">
          <button className="px-6 py-3 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Manage Calendar
          </button>
          <button className="px-6 py-3 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Booking Settings
          </button>
        </div>

        <div className="bg-konekt-cream dark:bg-white/5 rounded-lg p-4">
          <p className="text-sm font-bold text-konekt-black dark:text-white mb-3">
            Current availability:
          </p>
          <ul className="space-y-1 text-sm text-konekt-black/70 dark:text-white/70">
            <li>• Mon-Fri: 14:00-18:00</li>
            <li>• Max 3 sessions per week</li>
            <li>• 30-min buffer between sessions</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
