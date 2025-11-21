'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEvents, mockUsers } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import {
  Users,
  Activity,
  MessageCircle,
  Star,
  TrendingUp,
  UserPlus,
  Send,
  Mail,
  QrCode,
  Download,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart3,
  Calendar,
  Target,
  Zap,
  Moon,
  Sun,
} from 'lucide-react';
import Link from 'next/link';
import { AttendeeIntelligence } from '@/components/dashboard/AttendeeIntelligence';
import { AnalyticsWarRoom } from '@/components/dashboard/AnalyticsWarRoom';

export default function EventManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { user } = useUserStore();
  const [darkMode, setDarkMode] = useState(true);

  const event = mockEvents.find((e) => e.id === resolvedParams.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-konekt-black mb-2">Event not found</h1>
          <Link href="/events">
            <button className="px-4 py-2 bg-konekt-green text-white rounded-lg">
              Back to Events
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isOrganizer = user && event.organizers.includes(user.id);

  if (!isOrganizer) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-konekt-pink mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-konekt-black mb-2">Access Denied</h1>
          <p className="text-konekt-black/60 mb-4">
            Only organizers can access this dashboard
          </p>
          <Link href={`/events/${event.id}`}>
            <button className="px-4 py-2 bg-konekt-green text-white rounded-lg">
              View Event Details
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock data for dashboard
  const liveStats = {
    checkedIn: { current: 234, total: 250, trend: '+12' },
    onlineNow: { count: 156, percentage: 62 },
    newConnections: { count: 89, trend: '+23' },
    messagesToday: { count: 3200, trend: '+450' },
    rating: { score: 4.8, total: 127 },
  };

  const activityFeed = [
    {
      id: '1',
      type: 'checkin',
      user: 'Alice Johnson',
      action: 'checked in',
      time: '2 min ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      id: '2',
      type: 'connection',
      user: 'Bob Smith',
      action: 'connected with Sarah Lee',
      time: '5 min ago',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    },
    {
      id: '3',
      type: 'rating',
      user: 'Carol White',
      action: 'rated event ⭐⭐⭐⭐⭐',
      time: '8 min ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    {
      id: '4',
      type: 'message',
      user: 'David Chen',
      action: 'sent a message in #general',
      time: '12 min ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    },
    {
      id: '5',
      type: 'checkin',
      user: 'Emma Davis',
      action: 'checked in',
      time: '15 min ago',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    },
  ];

  const bgClass = darkMode
    ? 'bg-[#0A0A0A] text-white'
    : 'bg-konekt-cream text-konekt-black';
  const cardBg = darkMode ? 'bg-[#151515]' : 'bg-white';
  const borderColor = darkMode ? 'border-white/10' : 'border-konekt-black/10';
  const hoverBg = darkMode ? 'hover:bg-[#1F1F1F]' : 'hover:bg-konekt-cream';
  const textMuted = darkMode ? 'text-white/60' : 'text-konekt-black/60';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${cardBg} border-b ${borderColor} backdrop-blur-xl bg-opacity-80`}>
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/events/${event.id}`}
                  className={`text-sm ${textMuted} hover:text-konekt-green transition-colors`}
                >
                  ← Back to Event
                </Link>
                <div className="w-px h-4 bg-white/10" />
                <h1 className="text-2xl font-bold">{event.name}</h1>
                {event.status === 'ongoing' && (
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold animate-pulse flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    LIVE
                  </span>
                )}
              </div>
              <p className={`text-sm ${textMuted} mt-1`}>
                Organizer Dashboard • {event.attendees.length} registered
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${borderColor} border ${hoverBg} transition-colors`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button className={`px-4 py-2 ${borderColor} border rounded-lg ${hoverBg} font-medium transition-colors flex items-center gap-2`}>
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-konekt-green text-white rounded-lg font-medium hover:bg-konekt-green/90 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* 🎛️ SECTION 1: MISSION CONTROL */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Mission Control</h2>
              <p className={`text-sm ${textMuted}`}>
                Real-time event overview • Auto-refreshing
              </p>
            </div>
          </div>

          {/* Live Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Checked In */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`${cardBg} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-konekt-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-5 h-5 text-konekt-green" />
                  <span className="text-xs font-bold text-konekt-green px-2 py-1 bg-konekt-green/20 rounded-full">
                    {liveStats.checkedIn.trend}
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1">
                  {liveStats.checkedIn.current}
                  <span className={`text-lg ${textMuted}`}>/{liveStats.checkedIn.total}</span>
                </div>
                <div className={`text-sm font-medium ${textMuted}`}>Checked In</div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-konekt-green to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(liveStats.checkedIn.current / liveStats.checkedIn.total) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Online Now */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`${cardBg} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <span className={`text-xs font-medium ${textMuted}`}>
                    {liveStats.onlineNow.percentage}%
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1">{liveStats.onlineNow.count}</div>
                <div className={`text-sm font-medium ${textMuted}`}>Online Now</div>
              </div>
            </motion.div>

            {/* New Connections */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`${cardBg} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-konekt-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <UserPlus className="w-5 h-5 text-konekt-pink" />
                  <span className="text-xs font-bold text-konekt-pink px-2 py-1 bg-konekt-pink/20 rounded-full">
                    {liveStats.newConnections.trend}
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1">{liveStats.newConnections.count}</div>
                <div className={`text-sm font-medium ${textMuted}`}>New Connections</div>
              </div>
            </motion.div>

            {/* Messages Today */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`${cardBg} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400 px-2 py-1 bg-blue-400/20 rounded-full">
                    {liveStats.messagesToday.trend}
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1">
                  {(liveStats.messagesToday.count / 1000).toFixed(1)}k
                </div>
                <div className={`text-sm font-medium ${textMuted}`}>Messages Today</div>
              </div>
            </motion.div>

            {/* Rating */}
            <motion.div
              whileHover={{ y: -2 }}
              className={`${cardBg} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className={`text-xs font-medium ${textMuted}`}>
                    {liveStats.rating.total} reviews
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1 flex items-baseline gap-1">
                  {liveStats.rating.score}
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
                <div className={`text-sm font-medium ${textMuted}`}>Average Rating</div>
              </div>
            </motion.div>
          </div>

          {/* Two Column Layout: Activity Feed + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <div className={`lg:col-span-2 ${cardBg} border ${borderColor} rounded-2xl p-6`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Live Activity Feed</h3>
                  <p className={`text-sm ${textMuted}`}>Real-time attendee actions</p>
                </div>
                <button className={`text-sm font-medium text-konekt-green hover:text-konekt-green/80 transition-colors`}>
                  View All →
                </button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide">
                <AnimatePresence>
                  {activityFeed.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-4 p-3 rounded-xl border ${borderColor} ${hoverBg} transition-colors`}
                    >
                      <img
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{activity.user}</span>{' '}
                          <span className={textMuted}>{activity.action}</span>
                        </p>
                        <p className={`text-xs ${textMuted}`}>{activity.time}</p>
                      </div>
                      {activity.type === 'checkin' && (
                        <CheckCircle className="w-5 h-5 text-konekt-green flex-shrink-0" />
                      )}
                      {activity.type === 'connection' && (
                        <UserPlus className="w-5 h-5 text-konekt-pink flex-shrink-0" />
                      )}
                      {activity.type === 'rating' && (
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                      )}
                      {activity.type === 'message' && (
                        <MessageCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-gradient-to-r from-konekt-green to-emerald-500 text-white rounded-xl font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Generate Check-in QR</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 ${borderColor} border rounded-xl font-semibold flex items-center gap-3 ${hoverBg} transition-colors`}
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Announcement</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 ${borderColor} border rounded-xl font-semibold flex items-center gap-3 ${hoverBg} transition-colors`}
                >
                  <Download className="w-5 h-5" />
                  <span>Export Attendees</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 ${borderColor} border rounded-xl font-semibold flex items-center gap-3 ${hoverBg} transition-colors`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>View Full Analytics</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 ${borderColor} border rounded-xl font-semibold flex items-center gap-3 ${hoverBg} transition-colors`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Event Settings</span>
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textMuted}`}>Check-in Rate</span>
                  <span className="text-sm font-bold">93.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textMuted}`}>Avg. Connections</span>
                  <span className="text-sm font-bold">12.4/person</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${textMuted}`}>Engagement Score</span>
                  <span className="text-sm font-bold text-konekt-green">A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 👥 SECTION 2: ATTENDEE INTELLIGENCE */}
        <div className="mb-12">
          <AttendeeIntelligence eventId={event.id} darkMode={darkMode} />
        </div>

        {/* 📊 SECTION 3: ANALYTICS WAR ROOM */}
        <div className="mb-12">
          <AnalyticsWarRoom eventId={event.id} darkMode={darkMode} />
        </div>

        {/* Coming Soon Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Content Management',
              icon: Calendar,
              description: 'Timeline editor & materials',
            },
            {
              title: 'Communication Hub',
              icon: Mail,
              description: 'Email campaigns & announcements',
            },
            {
              title: 'Team Collaboration',
              icon: Target,
              description: 'Member management & logs',
            },
            {
              title: 'Integrations',
              icon: Zap,
              description: 'Connect external services',
            },
          ].map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${cardBg} border ${borderColor} rounded-2xl p-6 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-konekt-pink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Icon className="w-8 h-8 text-konekt-green mb-4" />
                  <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                  <p className={`text-sm ${textMuted} mb-4`}>{section.description}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-konekt-pink">
                    <Sparkles className="w-4 h-4" />
                    Coming Soon
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
