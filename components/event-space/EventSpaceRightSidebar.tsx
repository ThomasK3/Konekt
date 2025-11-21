'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users as UsersIcon, TrendingUp, MessageCircle, Upload, Link as LinkIcon, UserPlus } from 'lucide-react';
import { onlineUsers, recentActivity } from '@/lib/event-space-data';
import Link from 'next/link';

interface EventSpaceRightSidebarProps {
  eventName: string;
  eventDate: string;
  eventLocation: string;
  memberCount: number;
  onlineCount: number;
  activeDiscussionsCount: number;
}

export const EventSpaceRightSidebar = ({
  eventName,
  eventDate,
  eventLocation,
  memberCount,
  onlineCount,
  activeDiscussionsCount,
}: EventSpaceRightSidebarProps) => {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 1000 / 60);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <aside className="w-80 bg-[#141414] h-screen sticky top-0 overflow-y-auto border-l border-white/5">
      {/* Event Info */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Event Info
        </h3>
        <div className="space-y-3">
          <div>
            <div className="text-white font-bold text-lg mb-1">{eventName}</div>
            <div className="text-white/60 text-sm">{eventDate}</div>
            <div className="text-white/60 text-sm">{eventLocation}</div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3">
            <div className="text-center">
              <div className="text-white font-bold text-xl">{memberCount}</div>
              <div className="text-white/50 text-xs">Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold text-xl">{onlineCount}</div>
              <div className="text-white/50 text-xs">Online</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">{activeDiscussionsCount}</div>
              <div className="text-white/50 text-xs">Active</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Website</span>
            </button>
            <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors">
              Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Online Now */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
            Online Now ({onlineCount})
          </h3>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div className="space-y-2">
          {onlineUsers.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.username}`}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#141414]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate group-hover:text-indigo-400 transition-colors">
                  {user.name}
                </div>
                <div className="text-white/50 text-xs truncate">{user.school}</div>
              </div>
            </Link>
          ))}
          <button className="w-full text-sm text-indigo-400 hover:text-indigo-300 transition-colors py-2">
            +{onlineCount - onlineUsers.length} more online →
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const Icon =
              activity.type === 'message' ? MessageCircle :
              activity.type === 'upload' ? Upload :
              activity.type === 'connection' ? LinkIcon :
              UserPlus;

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3 h-3 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm">
                    {activity.type === 'connection' && activity.users ? (
                      <>
                        <span className="font-semibold">{activity.users[0].name}</span>
                        {' & '}
                        <span className="font-semibold">{activity.users[1]?.name}</span>
                        {' '}
                        <span className="text-white/60">{activity.description}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">{activity.user?.name}</span>
                        {' '}
                        <span className="text-white/60">{activity.description}</span>
                      </>
                    )}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">
                    {formatTime(activity.timestamp)}
                  </div>
                </div>
              </motion.div>
            );
          })}
          <button className="w-full text-sm text-indigo-400 hover:text-indigo-300 transition-colors py-2">
            View All Activity →
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Upcoming Events
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-semibold text-sm">Festup 2025</span>
            </div>
            <div className="text-white/60 text-xs mb-2">March 15-16, 2025</div>
            <button className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">
              Register Interest →
            </button>
          </div>

          <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-semibold text-sm">Dny AI</span>
            </div>
            <div className="text-white/60 text-xs mb-2">May 20-21, 2025</div>
            <button className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">
              Register Interest →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>Create Post</span>
          </button>
          <button className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />
            <span>Find Collaborators</span>
          </button>
          <button className="w-full px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>View My Stats</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
