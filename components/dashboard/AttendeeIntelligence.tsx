'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Mail,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  XCircle,
  MoreVertical,
  UserCheck,
  Star,
  Award,
  Zap,
  Eye,
} from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'checked-in' | 'registered' | 'no-show';
  registeredAt: Date;
  checkedInAt?: Date;
  engagementScore: number;
  connections: number;
  messagesSent: number;
  sessionsAttended: number;
  profileViews: number;
  tags: string[];
}

interface AttendeeIntelligenceProps {
  eventId: string;
  darkMode?: boolean;
}

export const AttendeeIntelligence = ({
  eventId,
  darkMode = true,
}: AttendeeIntelligenceProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'checked-in' | 'registered' | 'no-show'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'engagement' | 'connections'>('engagement');
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  // Mock attendee data with engagement scoring
  const mockAttendees: Attendee[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      status: 'checked-in',
      registeredAt: new Date('2024-01-15'),
      checkedInAt: new Date('2024-01-20T09:30:00'),
      engagementScore: 95,
      connections: 23,
      messagesSent: 45,
      sessionsAttended: 8,
      profileViews: 156,
      tags: ['VIP', 'Speaker'],
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
      status: 'checked-in',
      registeredAt: new Date('2024-01-16'),
      checkedInAt: new Date('2024-01-20T10:15:00'),
      engagementScore: 87,
      connections: 18,
      messagesSent: 34,
      sessionsAttended: 6,
      profileViews: 98,
      tags: ['Active'],
    },
    {
      id: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      status: 'checked-in',
      registeredAt: new Date('2024-01-14'),
      checkedInAt: new Date('2024-01-20T08:45:00'),
      engagementScore: 78,
      connections: 15,
      messagesSent: 28,
      sessionsAttended: 5,
      profileViews: 72,
      tags: ['Active'],
    },
    {
      id: '4',
      name: 'David Chen',
      email: 'david@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      status: 'registered',
      registeredAt: new Date('2024-01-18'),
      engagementScore: 45,
      connections: 5,
      messagesSent: 8,
      sessionsAttended: 2,
      profileViews: 23,
      tags: [],
    },
    {
      id: '5',
      name: 'Emma Davis',
      email: 'emma@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      status: 'checked-in',
      registeredAt: new Date('2024-01-17'),
      checkedInAt: new Date('2024-01-20T11:00:00'),
      engagementScore: 92,
      connections: 21,
      messagesSent: 39,
      sessionsAttended: 7,
      profileViews: 134,
      tags: ['VIP'],
    },
    {
      id: '6',
      name: 'Frank Miller',
      email: 'frank@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      status: 'no-show',
      registeredAt: new Date('2024-01-13'),
      engagementScore: 12,
      connections: 0,
      messagesSent: 0,
      sessionsAttended: 0,
      profileViews: 3,
      tags: [],
    },
  ];

  const filteredAttendees = mockAttendees
    .filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || a.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'engagement') return b.engagementScore - a.engagementScore;
      if (sortBy === 'connections') return b.connections - a.connections;
      return 0;
    });

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-400/20';
    if (score >= 60) return 'text-blue-400 bg-blue-400/20';
    if (score >= 40) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getEngagementLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Low';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'checked-in') return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (status === 'registered') return <Activity className="w-4 h-4 text-blue-400" />;
    return <XCircle className="w-4 h-4 text-red-400" />;
  };

  const cardBg = darkMode ? 'bg-[#151515]' : 'bg-white';
  const borderColor = darkMode ? 'border-white/10' : 'border-konekt-black/10';
  const hoverBg = darkMode ? 'hover:bg-[#1F1F1F]' : 'hover:bg-konekt-cream';
  const textMuted = darkMode ? 'text-white/60' : 'text-konekt-black/60';
  const inputBg = darkMode ? 'bg-[#0A0A0A]' : 'bg-konekt-cream';

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Attendee Intelligence</h2>
          <p className={`text-sm ${textMuted}`}>
            {filteredAttendees.length} of {mockAttendees.length} attendees
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 lg:flex-initial lg:w-64">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textMuted}`} />
            <input
              type="text"
              placeholder="Search attendees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 ${inputBg} border ${borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-konekt-green/50 transition-all`}
            />
          </div>

          {/* Filter Buttons */}
          <div className={`flex items-center gap-2 p-1 ${cardBg} border ${borderColor} rounded-lg`}>
            {(['all', 'checked-in', 'registered', 'no-show'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-konekt-green text-white'
                    : `${textMuted} hover:bg-white/5`
                }`}
              >
                {status === 'all' ? 'All' : status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={`px-4 py-2 ${inputBg} border ${borderColor} rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-konekt-green/50 transition-all`}
          >
            <option value="engagement">Sort by Engagement</option>
            <option value="connections">Sort by Connections</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* Export Button */}
          <button className={`px-4 py-2 border ${borderColor} rounded-lg font-medium ${hoverBg} transition-colors flex items-center gap-2`}>
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`${cardBg} border ${borderColor} rounded-2xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${inputBg} border-b ${borderColor}`}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Attendee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Connections
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Messages
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredAttendees.map((attendee, index) => (
                  <motion.tr
                    key={attendee.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.03 }}
                    className={`${hoverBg} transition-colors cursor-pointer`}
                    onClick={() => setSelectedAttendee(attendee)}
                  >
                    {/* Attendee Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={attendee.avatar}
                          alt={attendee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {attendee.name}
                            {attendee.tags.includes('VIP') && (
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            )}
                            {attendee.tags.includes('Speaker') && (
                              <Award className="w-4 h-4 text-purple-400" />
                            )}
                          </div>
                          <div className={`text-xs ${textMuted}`}>{attendee.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(attendee.status)}
                        <span className="text-sm capitalize">
                          {attendee.status.replace('-', ' ')}
                        </span>
                      </div>
                    </td>

                    {/* Engagement Score */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getEngagementColor(attendee.engagementScore)}`}>
                          {attendee.engagementScore}
                        </span>
                        <span className={`text-xs ${textMuted}`}>
                          {getEngagementLabel(attendee.engagementScore)}
                        </span>
                      </div>
                    </td>

                    {/* Connections */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-konekt-green" />
                        <span className="font-semibold">{attendee.connections}</span>
                      </div>
                    </td>

                    {/* Messages */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold">{attendee.messagesSent}</span>
                      </div>
                    </td>

                    {/* Sessions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold">{attendee.sessionsAttended}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Send message action
                          }}
                          className="p-2 hover:bg-konekt-green/20 rounded-lg transition-colors"
                          title="Send Message"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAttendee(attendee);
                          }}
                          className="p-2 hover:bg-blue-400/20 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // More actions
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Modal */}
      <AnimatePresence>
        {selectedAttendee && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelectedAttendee(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl ${cardBg} border ${borderColor} rounded-2xl p-8 z-50 max-h-[90vh] overflow-y-auto`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={selectedAttendee.avatar}
                  alt={selectedAttendee.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    {selectedAttendee.name}
                    {selectedAttendee.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-konekt-pink/20 text-konekt-pink rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </h3>
                  <p className={`${textMuted} mb-2`}>{selectedAttendee.email}</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedAttendee.status)}
                    <span className="text-sm capitalize">{selectedAttendee.status.replace('-', ' ')}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAttendee(null)}
                  className={`p-2 ${hoverBg} rounded-lg transition-colors`}
                >
                  ✕
                </button>
              </div>

              {/* Engagement Breakdown */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`${inputBg} border ${borderColor} rounded-xl p-4`}>
                  <div className={`text-sm ${textMuted} mb-1`}>Engagement Score</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-3xl font-bold ${getEngagementColor(selectedAttendee.engagementScore).split(' ')[0]}`}>
                      {selectedAttendee.engagementScore}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getEngagementColor(selectedAttendee.engagementScore)}`}>
                      {getEngagementLabel(selectedAttendee.engagementScore)}
                    </span>
                  </div>
                </div>

                <div className={`${inputBg} border ${borderColor} rounded-xl p-4`}>
                  <div className={`text-sm ${textMuted} mb-1`}>Profile Views</div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span className="text-3xl font-bold">{selectedAttendee.profileViews}</span>
                  </div>
                </div>

                <div className={`${inputBg} border ${borderColor} rounded-xl p-4`}>
                  <div className={`text-sm ${textMuted} mb-1`}>Connections Made</div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-konekt-green" />
                    <span className="text-3xl font-bold">{selectedAttendee.connections}</span>
                  </div>
                </div>

                <div className={`${inputBg} border ${borderColor} rounded-xl p-4`}>
                  <div className={`text-sm ${textMuted} mb-1`}>Messages Sent</div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-3xl font-bold">{selectedAttendee.messagesSent}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-bold mb-3">Activity Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-konekt-green/20 flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-4 h-4 text-konekt-green" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Registered for event</p>
                      <p className={`text-xs ${textMuted}`}>
                        {selectedAttendee.registeredAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {selectedAttendee.checkedInAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Checked in</p>
                        <p className={`text-xs ${textMuted}`}>
                          {selectedAttendee.checkedInAt.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Attended {selectedAttendee.sessionsAttended} sessions</p>
                      <p className={`text-xs ${textMuted}`}>Most recent: 2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                <button className="flex-1 px-4 py-3 bg-konekt-green text-white rounded-xl font-semibold hover:bg-konekt-green/90 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send Email
                </button>
                <button className={`flex-1 px-4 py-3 border ${borderColor} rounded-xl font-semibold ${hoverBg} transition-colors flex items-center justify-center gap-2`}>
                  <Download className="w-5 h-5" />
                  Export Data
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
