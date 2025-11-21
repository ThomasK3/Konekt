'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageCircle, Download } from 'lucide-react';
import { eventWorkshops } from '@/lib/event-space-data';

export const OverviewView = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-2 border-indigo-600/30 rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-4">🎉 Welcome to BeNextOne 2024!</h1>
        <p className="text-white/80 mb-6">
          Thanks for joining our community! Here's how to get started:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="text-green-400 text-xl">✅</div>
            <div>
              <div className="text-white font-medium">Complete your profile</div>
              <div className="text-white/60 text-sm">Get discovered</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 text-xl">✅</div>
            <div>
              <div className="text-white font-medium">Browse attendees</div>
              <div className="text-white/60 text-sm">Find collaborators</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 text-xl">✅</div>
            <div>
              <div className="text-white font-medium">Join discussions</div>
              <div className="text-white/60 text-sm">Ask questions</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-green-400 text-xl">✅</div>
            <div>
              <div className="text-white font-medium">Download materials</div>
              <div className="text-white/60 text-sm">Keep learning</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">🔥 Quick Stats</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-1">250</div>
            <div className="text-white/60 text-sm">Members</div>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">156</div>
            <div className="text-white/60 text-sm">Online Today</div>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-1">89</div>
            <div className="text-white/60 text-sm">New Connects</div>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">1,234</div>
            <div className="text-white/60 text-sm">Messages</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Workshops */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-white mb-4">🎓 Recent Workshop Materials</h2>
        <div className="grid grid-cols-3 gap-4">
          {eventWorkshops.slice(0, 3).map((workshop) => (
            <div key={workshop.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden hover:border-indigo-600/50 transition-colors cursor-pointer group">
              <div className="relative aspect-video">
                <img src={workshop.thumbnail} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1 line-clamp-2">{workshop.title}</div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{workshop.materials[0].downloads} downloads</span>
                  <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors">
                    <Download className="w-3 h-3 inline mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
