'use client';

import { motion } from 'framer-motion';
import { Hash, Plus, Users, BookOpen, FolderOpen, Settings, LogOut } from 'lucide-react';
import { eventChannels } from '@/lib/event-space-data';

interface EventSpaceLeftSidebarProps {
  selectedView: string;
  selectedChannel: string | null;
  onViewChange: (view: string) => void;
  onChannelChange: (channelId: string) => void;
  eventName: string;
  memberCount: number;
  onlineCount: number;
}

export const EventSpaceLeftSidebar = ({
  selectedView,
  selectedChannel,
  onViewChange,
  onChannelChange,
  eventName,
  memberCount,
  onlineCount,
}: EventSpaceLeftSidebarProps) => {
  const isChannelActive = (channelId: string) => selectedView === 'discussions' && selectedChannel === channelId;

  return (
    <aside className="w-64 bg-[#141414] h-screen sticky top-0 flex flex-col border-r border-white/5">
      {/* Event Header */}
      <div className="p-4 border-b border-white/5">
        <h2 className="text-white font-bold text-lg mb-1">{eventName}</h2>
        <div className="text-xs text-white/60">
          {memberCount} members • <span className="text-green-400">{onlineCount} online 🟢</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {/* Overview Section */}
        <div className="mb-4">
          <div className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
            🏠 Overview
          </div>
          <button
            onClick={() => onViewChange('overview')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedView === 'overview'
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onViewChange('about')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedView === 'about'
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            About Event
          </button>
          <button
            onClick={() => onViewChange('agenda')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedView === 'agenda'
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            Agenda
          </button>
        </div>

        {/* Discussions Section */}
        <div className="mb-4">
          <div className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
            💬 Discussions
          </div>
          {eventChannels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => {
                onViewChange('discussions');
                onChannelChange(channel.id);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                isChannelActive(channel.id)
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                <span>{channel.name}</span>
              </div>
              {channel.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                  {channel.unreadCount}
                </span>
              )}
            </button>
          ))}
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/50 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create channel</span>
          </button>
        </div>

        {/* Workshops Section */}
        <div className="mb-4">
          <div className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
            🎓 Workshops
          </div>
          <button
            onClick={() => onViewChange('workshops')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedView === 'workshops'
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            All Workshops
          </button>
        </div>

        {/* Resources Section */}
        <div className="mb-4">
          <div className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
            📚 Resources
          </div>
          <button
            onClick={() => onViewChange('resources')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedView === 'resources'
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>All Materials</span>
            </div>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            Photos & Videos
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            Useful Links
          </button>
        </div>

        {/* People Section */}
        <div className="mb-4">
          <div className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
            👥 People
          </div>
          <button
            onClick={() => onViewChange('people')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedView === 'people'
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>All Attendees</span>
            </div>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            Speakers
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            Organizers
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/50 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Invite someone</span>
          </button>
        </div>

        {/* Settings Section */}
        <div className="pt-4 border-t border-white/5">
          <div className="px-2 py-1 text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
            ⚙️ Settings
          </div>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Leave Space</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
