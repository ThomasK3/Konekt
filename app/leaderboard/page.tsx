'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fastStaggerContainer, fastStaggerItem } from '@/lib/animations';
import AppLayout from '@/components/layout/AppLayout';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { mockUsers } from '@/lib/mock-data';
import { Trophy, Users, MessageCircle, Rocket, TrendingUp, Crown, Medal } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/lib/store';
import type { User } from '@/types';

type LeaderboardCategory = 'connections' | 'messages' | 'projects' | 'events' | 'xp';

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState<LeaderboardCategory>('xp');
  const { user: currentUser } = useUserStore();

  // Generate leaderboard data based on category
  const getLeaderboard = (category: LeaderboardCategory) => {
    let sortedUsers: User[] = [];

    switch (category) {
      case 'connections':
        sortedUsers = [...mockUsers].sort(
          (a, b) =>
            (b.gamification?.stats.connectionsCount || 0) -
            (a.gamification?.stats.connectionsCount || 0)
        );
        break;
      case 'messages':
        sortedUsers = [...mockUsers].sort(
          (a, b) =>
            (b.gamification?.stats.messagesSent || 0) - (a.gamification?.stats.messagesSent || 0)
        );
        break;
      case 'projects':
        sortedUsers = [...mockUsers].sort(
          (a, b) =>
            (b.gamification?.stats.projectsCreated || 0) -
            (a.gamification?.stats.projectsCreated || 0)
        );
        break;
      case 'events':
        sortedUsers = [...mockUsers].sort(
          (a, b) =>
            (b.gamification?.stats.eventsAttended || 0) -
            (a.gamification?.stats.eventsAttended || 0)
        );
        break;
      case 'xp':
        sortedUsers = [...mockUsers].sort(
          (a, b) => (b.gamification?.xp || 0) - (a.gamification?.xp || 0)
        );
        break;
    }

    return sortedUsers.slice(0, 100); // Top 100
  };

  const leaderboardData = getLeaderboard(activeCategory);
  const currentUserRank = leaderboardData.findIndex((u) => u.id === currentUser?.id) + 1;

  const getScore = (user: User) => {
    switch (activeCategory) {
      case 'connections':
        return user.gamification?.stats.connectionsCount || 0;
      case 'messages':
        return user.gamification?.stats.messagesSent || 0;
      case 'projects':
        return user.gamification?.stats.projectsCreated || 0;
      case 'events':
        return user.gamification?.stats.eventsAttended || 0;
      case 'xp':
        return user.gamification?.xp || 0;
    }
  };

  const categories = [
    {
      id: 'xp' as LeaderboardCategory,
      label: 'Total XP',
      icon: Trophy,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      id: 'connections' as LeaderboardCategory,
      label: 'Connections',
      icon: Users,
      color: 'text-konekt-green',
      bg: 'bg-konekt-green/10',
    },
    {
      id: 'messages' as LeaderboardCategory,
      label: 'Messages',
      icon: MessageCircle,
      color: 'text-konekt-pink',
      bg: 'bg-konekt-pink/10',
    },
    {
      id: 'projects' as LeaderboardCategory,
      label: 'Projects',
      icon: Rocket,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      id: 'events' as LeaderboardCategory,
      label: 'Events',
      icon: TrendingUp,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1)
      return <Crown className="w-6 h-6 text-amber-500" />;
    if (rank === 2)
      return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3)
      return <Medal className="w-6 h-6 text-amber-700" />;
    return null;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300';
    return 'bg-konekt-white border-konekt-black/10';
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-konekt-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-konekt-black">Leaderboard</h1>
            <p className="text-konekt-black/60">Nejlepší členové komunity</p>
          </div>
        </div>

        {/* Your Rank */}
        {currentUser && currentUserRank > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 rounded-xl border-2 border-konekt-green/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-konekt-black">#{currentUserRank}</div>
                <div>
                  <div className="font-bold text-konekt-black">Tvoje pozice</div>
                  <div className="text-sm text-konekt-black/60">
                    {getScore(currentUser).toLocaleString()}{' '}
                    {activeCategory === 'xp' ? 'XP' : categories.find((c) => c.id === activeCategory)?.label}
                  </div>
                </div>
              </div>
              {currentUser.gamification && (
                <LevelBadge level={currentUser.gamification.level} size="md" />
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                activeCategory === category.id
                  ? `${category.bg} ${category.color} border-2 border-current`
                  : 'bg-konekt-white text-konekt-black/60 border-2 border-konekt-black/10 hover:border-konekt-black/20'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Leaderboard List */}
      <motion.div
        className="space-y-3"
        variants={fastStaggerContainer}
        initial="initial"
        animate="animate"
      >
        {leaderboardData.map((user, index) => {
          const rank = index + 1;
          const score = getScore(user);
          const isCurrentUser = user.id === currentUser?.id;

          return (
            <motion.div key={user.id} variants={fastStaggerItem}>
              <Link href={`/profile/${user.username}`}>
                <div
                  className={`p-4 rounded-2xl border-2 transition-all hover:shadow-lg ${
                    isCurrentUser
                      ? 'bg-konekt-green/5 border-konekt-green/30 ring-2 ring-konekt-green/20'
                      : getRankBg(rank)
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-12 text-center">
                      {getRankIcon(rank) || (
                        <div className="text-2xl font-bold text-konekt-black/60">
                          {rank}
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.name}
                        className="w-14 h-14 rounded-full border-2 border-konekt-white object-cover"
                      />
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-konekt-green rounded-full border-2 border-konekt-white" />
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-konekt-black truncate">
                          {user.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 bg-konekt-green/20 text-konekt-green text-xs font-bold rounded-full">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-konekt-black/60 truncate">
                        {user.school}
                      </p>
                    </div>

                    {/* Level Badge */}
                    {user.gamification && (
                      <div className="hidden sm:block">
                        <LevelBadge level={user.gamification.level} size="sm" />
                      </div>
                    )}

                    {/* Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-konekt-black">
                        {score.toLocaleString()}
                      </div>
                      <div className="text-xs text-konekt-black/60">
                        {activeCategory === 'xp' ? 'XP' : activeCategory}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {leaderboardData.length === 0 && (
        <div className="text-center py-16">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-konekt-black/20" />
          <h3 className="text-xl font-semibold text-konekt-black mb-2">
            Žádná data zatím
          </h3>
          <p className="text-konekt-black/60">Leaderboard bude brzy aktivní!</p>
        </div>
      )}
    </AppLayout>
  );
}
