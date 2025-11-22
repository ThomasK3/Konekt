import type { Level, Achievement, DailyChallenge, UserGamification } from '@/types';

// ============================================
// LEVEL CALCULATION
// ============================================

export const calculateLevel = (xp: number): Level => {
  // 100 XP per level, exponential growth
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForCurrentLevel = (level - 1) * (level - 1) * 100;
  const xpForNextLevel = level * level * 100;
  const xpToNextLevel = xpForNextLevel - xp;

  const title = getLevelTitle(level);

  return {
    level,
    xp,
    xpToNextLevel,
    title,
  };
};

export const getLevelTitle = (level: number): string => {
  if (level === 1) return 'Newbie';
  if (level <= 3) return 'Beginner';
  if (level <= 5) return 'Rising Star';
  if (level <= 10) return 'Pro Networker';
  if (level <= 15) return 'Elite Connector';
  if (level <= 20) return 'Community Leader';
  if (level <= 30) return 'Legend';
  return 'Godmode';
};

// ============================================
// XP SOURCES
// ============================================

export const XP_REWARDS = {
  COMPLETE_PROFILE: 50,
  FIRST_CONNECTION: 20,
  SEND_MESSAGE: 5,
  CREATE_PROJECT: 30,
  JOIN_EVENT: 25,
  DAILY_LOGIN: 10,
  ADD_SKILL: 15,
  UPLOAD_VIDEO: 40,
  FOLLOW_MENTOR: 10,
  LIKE_POST: 2,
  COMMENT_POST: 5,
  SHARE_POST: 8,
  PROFILE_VIEW: 3,
  COMPLETE_DAILY_CHALLENGE: 0, // Reward is in the challenge itself
};

// ============================================
// ACHIEVEMENTS DEFINITION
// ============================================

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'early-adopter',
    title: '🚀 Early Adopter',
    description: 'Jeden z prvních 100 uživatelů Konektu',
    icon: '🚀',
    rarity: 'legendary',
    unlocked: false,
    xpReward: 100,
  },
  {
    id: 'first-connection',
    title: '🤝 První Spojení',
    description: 'Získej své první spojení',
    icon: '🤝',
    rarity: 'common',
    unlocked: false,
    target: 1,
    xpReward: 20,
  },
  {
    id: 'super-connector',
    title: '🌟 Super Connector',
    description: 'Získej 10+ spojení',
    icon: '🌟',
    rarity: 'rare',
    unlocked: false,
    target: 10,
    xpReward: 50,
  },
  {
    id: 'network-master',
    title: '👑 Network Master',
    description: 'Získej 50+ spojení',
    icon: '👑',
    rarity: 'epic',
    unlocked: false,
    target: 50,
    xpReward: 150,
  },
  {
    id: 'conversation-starter',
    title: '💬 Conversation Starter',
    description: 'Pošli 10+ zpráv',
    icon: '💬',
    rarity: 'common',
    unlocked: false,
    target: 10,
    xpReward: 20,
  },
  {
    id: 'active-chatter',
    title: '🗣️ Konverzační Král',
    description: 'Pošli 50+ zpráv',
    icon: '🗣️',
    rarity: 'rare',
    unlocked: false,
    target: 50,
    xpReward: 50,
  },
  {
    id: 'chat-legend',
    title: '💎 Chat Legend',
    description: 'Pošli 200+ zpráv',
    icon: '💎',
    rarity: 'epic',
    unlocked: false,
    target: 200,
    xpReward: 150,
  },
  {
    id: 'project-creator',
    title: '🛠️ Project Creator',
    description: 'Vytvoř svůj první projekt',
    icon: '🛠️',
    rarity: 'common',
    unlocked: false,
    target: 1,
    xpReward: 30,
  },
  {
    id: 'project-launcher',
    title: '🚀 Project Launcher',
    description: 'Vytvoř 3+ projekty',
    icon: '🚀',
    rarity: 'rare',
    unlocked: false,
    target: 3,
    xpReward: 75,
  },
  {
    id: 'serial-entrepreneur',
    title: '💼 Serial Entrepreneur',
    description: 'Vytvoř 10+ projektů',
    icon: '💼',
    rarity: 'epic',
    unlocked: false,
    target: 10,
    xpReward: 200,
  },
  {
    id: 'event-newbie',
    title: '🎪 Event Newbie',
    description: 'Účastni se svého prvního eventu',
    icon: '🎪',
    rarity: 'common',
    unlocked: false,
    target: 1,
    xpReward: 25,
  },
  {
    id: 'event-hopper',
    title: '🎉 Event Hopper',
    description: 'Účastni se 5+ eventů',
    icon: '🎉',
    rarity: 'rare',
    unlocked: false,
    target: 5,
    xpReward: 100,
  },
  {
    id: 'event-legend',
    title: '🏆 Event Legend',
    description: 'Účastni se 15+ eventů',
    icon: '🏆',
    rarity: 'epic',
    unlocked: false,
    target: 15,
    xpReward: 250,
  },
  {
    id: 'week-warrior',
    title: '🔥 Week Warrior',
    description: '7denní login streak',
    icon: '🔥',
    rarity: 'rare',
    unlocked: false,
    target: 7,
    xpReward: 50,
  },
  {
    id: 'month-master',
    title: '⚡ Month Master',
    description: '30denní login streak',
    icon: '⚡',
    rarity: 'epic',
    unlocked: false,
    target: 30,
    xpReward: 200,
  },
  {
    id: 'year-legend',
    title: '🌟 Year Legend',
    description: '365denní login streak',
    icon: '🌟',
    rarity: 'legendary',
    unlocked: false,
    target: 365,
    xpReward: 1000,
  },
  {
    id: 'profile-complete',
    title: '✅ Profile Complete',
    description: 'Vyplň 100% svého profilu',
    icon: '✅',
    rarity: 'common',
    unlocked: false,
    xpReward: 50,
  },
  {
    id: 'skill-master',
    title: '🎓 Skill Master',
    description: 'Přidej 10+ skills',
    icon: '🎓',
    rarity: 'rare',
    unlocked: false,
    target: 10,
    xpReward: 40,
  },
  {
    id: 'video-star',
    title: '🎬 Video Star',
    description: 'Nahraj video na svůj profil',
    icon: '🎬',
    rarity: 'rare',
    unlocked: false,
    xpReward: 60,
  },
  {
    id: 'mentor-follower',
    title: '🎓 Mentor Follower',
    description: 'Sleduj 5+ mentorů',
    icon: '🎓',
    rarity: 'common',
    unlocked: false,
    target: 5,
    xpReward: 30,
  },
];

// ============================================
// DAILY CHALLENGES GENERATOR
// ============================================

export const generateDailyChallenges = (date: Date): DailyChallenge[] => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Random selection of 3 challenges each day
  const allChallenges: Omit<DailyChallenge, 'expiresAt' | 'progress' | 'completed'>[] = [
    {
      id: 'daily-send-messages',
      task: 'Pošli 3 zprávy',
      description: 'Komunikuj s jinými členy komunity',
      target: 3,
      xpReward: 15,
    },
    {
      id: 'daily-view-profiles',
      task: 'Prohlédni 5 profilů',
      description: 'Objevuj nové lidi v komunitě',
      target: 5,
      xpReward: 10,
    },
    {
      id: 'daily-add-skill',
      task: 'Přidej nový skill',
      description: 'Rozšiř svůj skill set',
      target: 1,
      xpReward: 20,
    },
    {
      id: 'daily-follow-mentor',
      task: 'Sleduj mentora',
      description: 'Začni sledovat mentora ze své oblasti',
      target: 1,
      xpReward: 15,
    },
    {
      id: 'daily-like-posts',
      task: 'Dej like 10 příspěvkům',
      description: 'Podpor ostatní členy komunity',
      target: 10,
      xpReward: 10,
    },
    {
      id: 'daily-make-connection',
      task: 'Získej nové spojení',
      description: 'Rozšiř svou síť kontaktů',
      target: 1,
      xpReward: 25,
    },
    {
      id: 'daily-update-profile',
      task: 'Uprav svůj profil',
      description: 'Aktualizuj svoje informace nebo bio',
      target: 1,
      xpReward: 15,
    },
  ];

  // Pick 3 random challenges
  const shuffled = [...allChallenges].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  return selected.map((challenge) => ({
    ...challenge,
    progress: 0,
    completed: false,
    expiresAt: endOfDay,
  }));
};

// ============================================
// STREAK HELPERS
// ============================================

export const isStreakActive = (streak: { lastLoginDate: string }): boolean => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  return streak.lastLoginDate === today || streak.lastLoginDate === yesterday;
};

export const updateStreak = (
  currentStreak: { current: number; longest: number; lastLoginDate: string; loginHistory: string[] }
): { current: number; longest: number; lastLoginDate: string; loginHistory: string[] } => {
  const today = new Date().toISOString().split('T')[0];

  // Already logged in today
  if (currentStreak.lastLoginDate === today) {
    return currentStreak;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const isConsecutive = currentStreak.lastLoginDate === yesterday;

  const newCurrent = isConsecutive ? currentStreak.current + 1 : 1;
  const newLongest = Math.max(currentStreak.longest, newCurrent);
  const newHistory = [...currentStreak.loginHistory, today];

  return {
    current: newCurrent,
    longest: newLongest,
    lastLoginDate: today,
    loginHistory: newHistory,
  };
};

// ============================================
// ACHIEVEMENT PROGRESS UPDATER
// ============================================

export const updateAchievementProgress = (
  achievements: Achievement[],
  stats: UserGamification['stats']
): Achievement[] => {
  return achievements.map((achievement) => {
    if (achievement.unlocked) return achievement;

    let progress = achievement.progress || 0;

    // Update progress based on achievement ID
    switch (achievement.id) {
      case 'first-connection':
      case 'super-connector':
      case 'network-master':
        progress = stats.connectionsCount;
        break;
      case 'conversation-starter':
      case 'active-chatter':
      case 'chat-legend':
        progress = stats.messagesSent;
        break;
      case 'project-creator':
      case 'project-launcher':
      case 'serial-entrepreneur':
        progress = stats.projectsCreated;
        break;
      case 'event-newbie':
      case 'event-hopper':
      case 'event-legend':
        progress = stats.eventsAttended;
        break;
    }

    const unlocked = achievement.target ? progress >= achievement.target : false;

    return {
      ...achievement,
      progress,
      unlocked,
      unlockedAt: unlocked && !achievement.unlockedAt ? new Date() : achievement.unlockedAt,
    };
  });
};

// ============================================
// RARITY COLORS
// ============================================

export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    case 'rare':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'epic':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'legendary':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getRarityGlow = (rarity: string): string => {
  switch (rarity) {
    case 'common':
      return 'shadow-gray-200';
    case 'rare':
      return 'shadow-blue-300';
    case 'epic':
      return 'shadow-purple-300';
    case 'legendary':
      return 'shadow-amber-300';
    default:
      return 'shadow-gray-200';
  }
};
