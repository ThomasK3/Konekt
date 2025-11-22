import type { UserGamification, Achievement, DailyChallenge } from '@/types';
import {
  ALL_ACHIEVEMENTS,
  calculateLevel,
  generateDailyChallenges,
  updateAchievementProgress,
} from './gamification';

/**
 * Generate realistic gamification data for a user
 */
export const generateUserGamification = (params: {
  connectionsCount: number;
  messagesSent: number;
  projectsCreated: number;
  eventsAttended: number;
  profileViews?: number;
  streakDays?: number;
  isEarlyAdopter?: boolean;
}): UserGamification => {
  const {
    connectionsCount,
    messagesSent,
    projectsCreated,
    eventsAttended,
    profileViews = Math.floor(Math.random() * 100) + 20,
    streakDays = Math.floor(Math.random() * 30) + 1,
    isEarlyAdopter = false,
  } = params;

  // Calculate total XP based on stats
  let totalXP = 0;
  totalXP += connectionsCount * 20; // First connection + 20 per connection
  totalXP += messagesSent * 5;
  totalXP += projectsCreated * 30;
  totalXP += eventsAttended * 25;
  totalXP += profileViews * 3;
  totalXP += streakDays * 10; // Daily logins
  totalXP += 50; // Profile complete
  if (isEarlyAdopter) totalXP += 100;

  // Calculate level
  const level = calculateLevel(totalXP);

  // Generate stats
  const stats = {
    connectionsCount,
    messagesSent,
    projectsCreated,
    eventsAttended,
    profileViews,
  };

  // Initialize achievements with progress
  let achievements: Achievement[] = ALL_ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: false,
    progress: achievement.target ? 0 : undefined,
  }));

  // Update achievement progress based on stats
  achievements = updateAchievementProgress(achievements, stats);

  // Unlock early adopter if applicable
  if (isEarlyAdopter) {
    achievements = achievements.map((a) =>
      a.id === 'early-adopter'
        ? { ...a, unlocked: true, unlockedAt: new Date('2024-11-01') }
        : a
    );
  }

  // Unlock profile complete
  achievements = achievements.map((a) =>
    a.id === 'profile-complete'
      ? { ...a, unlocked: true, unlockedAt: new Date('2024-11-05') }
      : a
  );

  // Generate streak
  const generateStreakHistory = (days: number) => {
    const history: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      history.push(date.toISOString().split('T')[0]);
    }
    return history;
  };

  const streak = {
    current: streakDays,
    longest: Math.max(streakDays, Math.floor(Math.random() * 50) + streakDays),
    lastLoginDate: new Date().toISOString().split('T')[0],
    loginHistory: generateStreakHistory(streakDays),
  };

  // Update streak achievements
  if (streakDays >= 7) {
    achievements = achievements.map((a) =>
      a.id === 'week-warrior'
        ? { ...a, unlocked: true, unlockedAt: new Date() }
        : a
    );
  }
  if (streakDays >= 30) {
    achievements = achievements.map((a) =>
      a.id === 'month-master'
        ? { ...a, unlocked: true, unlockedAt: new Date() }
        : a
    );
  }

  // Generate daily challenges with some progress
  const dailyChallenges = generateDailyChallenges(new Date()).map((challenge, index) => {
    // Randomly complete some challenges
    const completed = Math.random() > 0.5;
    return {
      ...challenge,
      progress: completed ? challenge.target : Math.floor(Math.random() * challenge.target),
      completed,
    };
  });

  return {
    xp: totalXP,
    level,
    achievements,
    streak,
    dailyChallenges,
    stats,
  };
};

/**
 * Pre-defined gamification data for mock users
 */
export const MOCK_USER_GAMIFICATION = {
  // user1 - Jakub Procházka (High performer, early adopter)
  user1: generateUserGamification({
    connectionsCount: 23,
    messagesSent: 156,
    projectsCreated: 3,
    eventsAttended: 5,
    profileViews: 89,
    streakDays: 12,
    isEarlyAdopter: true,
  }),

  // user2 - Anna Nováková (Active chatter)
  user2: generateUserGamification({
    connectionsCount: 15,
    messagesSent: 234,
    projectsCreated: 2,
    eventsAttended: 3,
    profileViews: 67,
    streakDays: 7,
    isEarlyAdopter: true,
  }),

  // user3 - Martin Svoboda (Project launcher)
  user3: generateUserGamification({
    connectionsCount: 18,
    messagesSent: 98,
    projectsCreated: 5,
    eventsAttended: 4,
    profileViews: 102,
    streakDays: 15,
    isEarlyAdopter: true,
  }),

  // user4 - Petra Horá (Event hopper)
  user4: generateUserGamification({
    connectionsCount: 31,
    messagesSent: 142,
    projectsCreated: 1,
    eventsAttended: 8,
    profileViews: 134,
    streakDays: 9,
    isEarlyAdopter: true,
  }),

  // user5 - Tomáš Novotný (Rising star)
  user5: generateUserGamification({
    connectionsCount: 12,
    messagesSent: 87,
    projectsCreated: 2,
    eventsAttended: 2,
    profileViews: 45,
    streakDays: 5,
    isEarlyAdopter: false,
  }),

  // user6 - Lucie Malá (Super connector)
  user6: generateUserGamification({
    connectionsCount: 45,
    messagesSent: 201,
    projectsCreated: 4,
    eventsAttended: 6,
    profileViews: 178,
    streakDays: 20,
    isEarlyAdopter: true,
  }),

  // user7 - David Černý (Newbie)
  user7: generateUserGamification({
    connectionsCount: 5,
    messagesSent: 23,
    projectsCreated: 1,
    eventsAttended: 1,
    profileViews: 12,
    streakDays: 3,
    isEarlyAdopter: false,
  }),

  // user8 - Karolína Dvořáková (Active all-rounder)
  user8: generateUserGamification({
    connectionsCount: 28,
    messagesSent: 167,
    projectsCreated: 3,
    eventsAttended: 5,
    profileViews: 95,
    streakDays: 11,
    isEarlyAdopter: true,
  }),
};
