'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Users,
  MessageCircle,
  Clock,
  Target,
  Award,
  Activity,
  DollarSign,
  Download,
  Calendar,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Star,
  Heart,
  Share2,
  Eye,
  ThumbsUp,
} from 'lucide-react';

interface AnalyticsWarRoomProps {
  eventId: string;
  darkMode?: boolean;
}

type TabType = 'overview' | 'networking' | 'engagement' | 'content' | 'roi';

export const AnalyticsWarRoom = ({
  eventId,
  darkMode = true,
}: AnalyticsWarRoomProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const cardBg = darkMode ? 'bg-[#151515]' : 'bg-white';
  const borderColor = darkMode ? 'border-white/10' : 'border-konekt-black/10';
  const hoverBg = darkMode ? 'hover:bg-[#1F1F1F]' : 'hover:bg-konekt-cream';
  const textMuted = darkMode ? 'text-white/60' : 'text-konekt-black/60';
  const inputBg = darkMode ? 'bg-[#0A0A0A]' : 'bg-konekt-cream';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'networking', label: 'Networking', icon: Users },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'content', label: 'Content', icon: Eye },
    { id: 'roi', label: 'ROI', icon: DollarSign },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Analytics War Room</h2>
            <p className={`text-sm ${textMuted}`}>
              Deep dive into event performance
            </p>
          </div>
        </div>

        <button className={`px-4 py-2 border ${borderColor} rounded-lg font-medium ${hoverBg} transition-colors flex items-center gap-2`}>
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Tab Navigation */}
      <div className={`${cardBg} border ${borderColor} rounded-2xl p-2 flex gap-2 overflow-x-auto scrollbar-hide`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-konekt-green to-emerald-500 text-white shadow-lg'
                  : `${textMuted} ${hoverBg}`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && <OverviewTab cardBg={cardBg} borderColor={borderColor} textMuted={textMuted} inputBg={inputBg} />}
          {activeTab === 'networking' && <NetworkingTab cardBg={cardBg} borderColor={borderColor} textMuted={textMuted} inputBg={inputBg} />}
          {activeTab === 'engagement' && <EngagementTab cardBg={cardBg} borderColor={borderColor} textMuted={textMuted} inputBg={inputBg} />}
          {activeTab === 'content' && <ContentTab cardBg={cardBg} borderColor={borderColor} textMuted={textMuted} inputBg={inputBg} />}
          {activeTab === 'roi' && <ROITab cardBg={cardBg} borderColor={borderColor} textMuted={textMuted} inputBg={inputBg} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ========== OVERVIEW TAB ==========
const OverviewTab = ({ cardBg, borderColor, textMuted, inputBg }: any) => (
  <div className="space-y-6">
    {/* Key Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Registrations', value: '250', change: '+12%', icon: Users, color: 'text-blue-400' },
        { label: 'Check-in Rate', value: '93.6%', change: '+5.2%', icon: Target, color: 'text-green-400' },
        { label: 'Avg. Session Time', value: '4.2h', change: '+18m', icon: Clock, color: 'text-purple-400' },
        { label: 'Satisfaction Score', value: '4.8/5', change: '+0.3', icon: Star, color: 'text-yellow-400' },
      ].map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`${cardBg} border ${borderColor} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-xs font-bold text-green-400 px-2 py-1 bg-green-400/20 rounded-full">
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className={`text-sm ${textMuted}`}>{metric.label}</div>
          </motion.div>
        );
      })}
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Attendance Over Time */}
      <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-konekt-green" />
          Attendance Over Time
        </h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[65, 72, 58, 89, 95, 98, 93, 87, 92, 88, 90, 85].map((height, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-konekt-green to-emerald-400 rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/40">
          <span>9AM</span>
          <span>12PM</span>
          <span>3PM</span>
          <span>6PM</span>
        </div>
      </div>

      {/* Top Performing Sessions */}
      <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Top Performing Sessions
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Keynote: Future of AI', attendees: 234, rating: 4.9 },
            { name: 'Workshop: React Best Practices', attendees: 189, rating: 4.8 },
            { name: 'Panel: Startup Success Stories', attendees: 167, rating: 4.7 },
            { name: 'Networking Lunch', attendees: 245, rating: 4.6 },
            { name: 'Tech Demo: Latest Innovations', attendees: 145, rating: 4.8 },
          ].map((session, index) => (
            <div key={index} className={`p-3 ${inputBg} border ${borderColor} rounded-lg`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{session.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">{session.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className={`w-3 h-3 ${textMuted}`} />
                <span className={`text-xs ${textMuted}`}>{session.attendees} attendees</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-konekt-green"
                    style={{ width: `${(session.attendees / 250) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Demographic Breakdown */}
    <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-konekt-pink" />
        Attendee Demographics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Role Distribution */}
        <div>
          <h4 className={`text-sm font-semibold ${textMuted} mb-3`}>By Role</h4>
          <div className="space-y-2">
            {[
              { role: 'Students', count: 145, percentage: 58, color: 'bg-blue-400' },
              { role: 'Professionals', count: 65, percentage: 26, color: 'bg-purple-400' },
              { role: 'Entrepreneurs', count: 40, percentage: 16, color: 'bg-pink-400' },
            ].map((item) => (
              <div key={item.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.role}</span>
                  <span className="text-xs font-bold">{item.count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className={`text-sm font-semibold ${textMuted} mb-3`}>By Experience</h4>
          <div className="space-y-2">
            {[
              { level: 'Beginner', count: 92, percentage: 37, color: 'bg-green-400' },
              { level: 'Intermediate', count: 115, percentage: 46, color: 'bg-yellow-400' },
              { level: 'Advanced', count: 43, percentage: 17, color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.level}</span>
                  <span className="text-xs font-bold">{item.count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className={`text-sm font-semibold ${textMuted} mb-3`}>Top Cities</h4>
          <div className="space-y-2">
            {[
              { city: 'Prague', count: 128, percentage: 51 },
              { city: 'Brno', count: 67, percentage: 27 },
              { city: 'Ostrava', count: 34, percentage: 14 },
              { city: 'Other', count: 21, percentage: 8 },
            ].map((item) => (
              <div key={item.city}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{item.city}</span>
                  <span className="text-xs font-bold">{item.count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-konekt-green to-konekt-pink"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ========== NETWORKING TAB ==========
const NetworkingTab = ({ cardBg, borderColor, textMuted, inputBg }: any) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: 'Total Connections', value: '2,847', icon: Users, color: 'text-green-400' },
        { label: 'Avg per Person', value: '12.4', icon: TrendingUp, color: 'text-blue-400' },
        { label: 'Messages Sent', value: '5,234', icon: MessageCircle, color: 'text-purple-400' },
      ].map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
            <Icon className={`w-5 h-5 ${metric.color} mb-3`} />
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className={`text-sm ${textMuted}`}>{metric.label}</div>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Connection Graph */}
      <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
        <h3 className="text-lg font-bold mb-4">Connections Over Time</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[12, 28, 45, 67, 89, 124, 156, 187, 213, 234].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col gap-1">
              <motion.div
                className="w-full bg-gradient-to-t from-konekt-green to-emerald-400 rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${(height / 234) * 100}%` }}
                transition={{ delay: i * 0.05 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Connectors */}
      <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
        <h3 className="text-lg font-bold mb-4">Top Connectors</h3>
        <div className="space-y-3">
          {[
            { name: 'Alice Johnson', connections: 45, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
            { name: 'Bob Smith', connections: 38, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
            { name: 'Carol White', connections: 34, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
            { name: 'David Chen', connections: 29, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
          ].map((person, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 ${inputBg} border ${borderColor} rounded-lg`}>
              <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-sm">{person.name}</div>
                <div className={`text-xs ${textMuted}`}>{person.connections} connections</div>
              </div>
              <div className="text-2xl font-bold text-konekt-green">#{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ========== ENGAGEMENT TAB ==========
const EngagementTab = ({ cardBg, borderColor, textMuted, inputBg }: any) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Active Users', value: '156', icon: Activity, color: 'text-green-400' },
        { label: 'Avg Session Time', value: '4.2h', icon: Clock, color: 'text-blue-400' },
        { label: 'Interaction Rate', value: '87%', icon: Zap, color: 'text-yellow-400' },
        { label: 'Return Rate', value: '94%', icon: Heart, color: 'text-red-400' },
      ].map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
            <Icon className={`w-5 h-5 ${metric.color} mb-3`} />
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className={`text-sm ${textMuted}`}>{metric.label}</div>
          </div>
        );
      })}
    </div>

    <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
      <h3 className="text-lg font-bold mb-4">Engagement Heatmap (Hourly)</h3>
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: 144 }).map((_, i) => {
          const intensity = Math.random();
          return (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor: `rgba(74, 105, 83, ${intensity})`,
              }}
              title={`${Math.floor(i / 12)}:${(i % 12) * 5} - ${Math.floor(intensity * 100)}% active`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-white/40">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  </div>
);

// ========== CONTENT TAB ==========
const ContentTab = ({ cardBg, borderColor, textMuted, inputBg }: any) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: 'Total Views', value: '12.4k', icon: Eye, color: 'text-blue-400' },
        { label: 'Downloads', value: '3,245', icon: Download, color: 'text-green-400' },
        { label: 'Shares', value: '892', icon: Share2, color: 'text-purple-400' },
      ].map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
            <Icon className={`w-5 h-5 ${metric.color} mb-3`} />
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className={`text-sm ${textMuted}`}>{metric.label}</div>
          </div>
        );
      })}
    </div>

    <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
      <h3 className="text-lg font-bold mb-4">Most Popular Content</h3>
      <div className="space-y-3">
        {[
          { title: 'Event Schedule PDF', views: 2345, downloads: 1876, type: 'document' },
          { title: 'Keynote Presentation', views: 1987, downloads: 1234, type: 'presentation' },
          { title: 'Speaker Bios', views: 1654, downloads: 987, type: 'document' },
          { title: 'Networking Guide', views: 1432, downloads: 876, type: 'document' },
        ].map((content, index) => (
          <div key={index} className={`p-4 ${inputBg} border ${borderColor} rounded-lg`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{content.title}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${inputBg}`}>{content.type}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Eye className={`w-4 h-4 ${textMuted}`} />
                <span>{content.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className={`w-4 h-4 ${textMuted}`} />
                <span>{content.downloads.toLocaleString()} downloads</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ========== ROI TAB ==========
const ROITab = ({ cardBg, borderColor, textMuted, inputBg }: any) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Revenue', value: '$25,000', icon: DollarSign, color: 'text-green-400' },
        { label: 'Cost per Attendee', value: '$100', icon: Users, color: 'text-blue-400' },
        { label: 'ROI', value: '250%', icon: TrendingUp, color: 'text-purple-400' },
        { label: 'NPS Score', value: '72', icon: ThumbsUp, color: 'text-yellow-400' },
      ].map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
            <Icon className={`w-5 h-5 ${metric.color} mb-3`} />
            <div className="text-3xl font-bold mb-1">{metric.value}</div>
            <div className={`text-sm ${textMuted}`}>{metric.label}</div>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
        <h3 className="text-lg font-bold mb-4">Revenue Breakdown</h3>
        <div className="space-y-4">
          {[
            { source: 'Ticket Sales', amount: 15000, percentage: 60, color: 'bg-green-400' },
            { source: 'Sponsorships', amount: 7500, percentage: 30, color: 'bg-blue-400' },
            { source: 'Merchandise', amount: 2500, percentage: 10, color: 'bg-purple-400' },
          ].map((item) => (
            <div key={item.source}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{item.source}</span>
                <span className="text-lg font-bold">${item.amount.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
        <h3 className="text-lg font-bold mb-4">Value Generated</h3>
        <div className="space-y-3">
          {[
            { metric: 'New Business Leads', value: '45', icon: Target },
            { metric: 'Partnerships Formed', value: '12', icon: Users },
            { metric: 'Job Placements', value: '8', icon: Award },
            { metric: 'Projects Started', value: '23', icon: Zap },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.metric} className={`p-3 ${inputBg} border ${borderColor} rounded-lg flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-konekt-green" />
                  <span className="font-medium">{item.metric}</span>
                </div>
                <span className="text-2xl font-bold">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className={`${cardBg} border ${borderColor} rounded-2xl p-6`}>
      <h3 className="text-lg font-bold mb-4">Attendee Satisfaction</h3>
      <div className="space-y-4">
        {[
          { question: 'Overall Experience', rating: 4.8, responses: 234 },
          { question: 'Content Quality', rating: 4.7, responses: 228 },
          { question: 'Networking Opportunities', rating: 4.9, responses: 215 },
          { question: 'Venue & Logistics', rating: 4.6, responses: 241 },
          { question: 'Value for Money', rating: 4.5, responses: 198 },
        ].map((item) => (
          <div key={item.question}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{item.question}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold">{item.rating}</span>
                <span className={`text-xs ${textMuted}`}>({item.responses})</span>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                style={{ width: `${(item.rating / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
