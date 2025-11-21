'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { useUserStore } from '@/lib/store';
import {
  getUpcomingSessionsByMentee,
  getPastSessionsByMentee
} from '@/lib/mentor-data';
import {
  Calendar,
  Video,
  Download,
  Star,
  MessageCircle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MentorshipSessionsPage() {
  const { user } = useUserStore();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // For demo, assume current user is user1
  const userId = 'user1';

  const upcomingSessions = getUpcomingSessionsByMentee(userId);
  const pastSessions = getPastSessionsByMentee(userId);

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-konekt-black dark:text-white mb-2">
          Your Mentorship Sessions
        </h1>
        <p className="text-konekt-black/60 dark:text-white/70">
          Manage your sessions and track your learning journey
        </p>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-konekt-green" />
          Upcoming Sessions
        </h2>

        {upcomingSessions.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-12 text-center">
            <Calendar className="w-16 h-16 text-konekt-black/20 dark:text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-2">
              No upcoming sessions
            </h3>
            <p className="text-konekt-black/60 dark:text-white/60 mb-6">
              Ready to learn from experienced mentors?
            </p>
            <Link href="/mentors">
              <button className="px-6 py-3 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                Browse Mentors
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 overflow-hidden hover:border-konekt-green transition-all"
              >
                <div className="p-6">
                  {/* Session Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={session.mentorPhoto}
                        alt={session.mentorName}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-konekt-black dark:text-white">
                            {session.scheduledAt.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}{' '}
                            at{' '}
                            {session.scheduledAt.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </h3>
                          <span className="px-2 py-1 bg-konekt-green/10 text-konekt-green text-xs font-bold rounded">
                            UPCOMING
                          </span>
                        </div>
                        <p className="text-konekt-black/60 dark:text-white/60 mb-1">
                          With: <span className="font-medium text-konekt-black dark:text-white">{session.mentorName}</span>
                          <span className="text-konekt-black/50 dark:text-white/50"> ({session.mentorTitle})</span>
                        </p>
                        <p className="text-konekt-black dark:text-white mb-2">
                          Topic: {session.topic}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-konekt-black/50 dark:text-white/50">
                          <span>Format: {session.format === 'video' ? 'Video call' : session.format}</span>
                          <span>•</span>
                          <span>{session.duration} min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Your Prep Notes */}
                  {session.background && (
                    <div className="bg-konekt-cream dark:bg-white/5 rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-konekt-black dark:text-white mb-2">
                        Your prep notes:
                      </p>
                      <p className="text-sm text-konekt-black/70 dark:text-white/70">
                        {session.background}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 border-t border-konekt-black/10 dark:border-white/10 pt-4">
                    <button className="px-6 py-2 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Join Call
                    </button>
                    <button className="px-6 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Add to Calendar
                    </button>
                    <button className="px-6 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all">
                      Reschedule
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Past Sessions */}
      <div>
        <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-konekt-green" />
          Past Sessions
        </h2>

        {pastSessions.length === 0 ? (
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-12 text-center">
            <CheckCircle className="w-16 h-16 text-konekt-black/20 dark:text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-konekt-black dark:text-white mb-2">
              No past sessions yet
            </h3>
            <p className="text-konekt-black/60 dark:text-white/60">
              Your completed sessions will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 p-6"
              >
                {/* Session Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={session.mentorPhoto}
                      alt={session.mentorName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-konekt-black dark:text-white mb-1">
                        {session.scheduledAt.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}{' '}
                        - {session.mentorName}
                      </h3>
                      <p className="text-sm text-konekt-black/60 dark:text-white/60 mb-1">
                        {session.mentorTitle}
                      </p>
                      <p className="text-konekt-black dark:text-white mb-2">
                        Topic: {session.topic}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-konekt-black/50 dark:text-white/50">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {session.duration} min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review */}
                {session.review ? (
                  <div className="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-4 mb-4 border border-amber-200 dark:border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < session.review!.rating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-amber-500/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-300">
                        You rated this session
                      </span>
                    </div>
                    <p className="text-sm text-amber-900/80 dark:text-amber-300/80">
                      "{session.review.comment}"
                    </p>
                  </div>
                ) : (
                  <div className="bg-konekt-cream dark:bg-white/5 rounded-lg p-4 mb-4 border border-dashed border-konekt-black/20 dark:border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-bold text-konekt-black dark:text-white">
                          Leave a review
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedSession(session.id);
                          setShowReviewModal(true);
                        }}
                        className="px-4 py-2 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm"
                      >
                        Write Review →
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 border-t border-konekt-black/10 dark:border-white/10 pt-4">
                  <Link href={`/mentors/${session.mentorId}`}>
                    <button className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all">
                      View Mentor Profile
                    </button>
                  </Link>
                  <button className="px-4 py-2 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message Mentor
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border-2 border-konekt-black/10 dark:border-white/10 max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-konekt-black dark:text-white mb-6">
              Leave a Review
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-bold text-konekt-black dark:text-white mb-3">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <Star className="w-8 h-8 text-amber-500 hover:fill-amber-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-konekt-black dark:text-white mb-3">
                Your Review
              </label>
              <textarea
                placeholder="Share your experience with this mentor..."
                rows={4}
                className="w-full px-4 py-3 bg-konekt-cream dark:bg-white/5 border-2 border-konekt-black/10 dark:border-white/10 rounded-xl text-konekt-black dark:text-white placeholder:text-konekt-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-konekt-green resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                Submit Review
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-6 py-3 bg-konekt-cream dark:bg-white/10 text-konekt-black dark:text-white font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
