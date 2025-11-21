export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Availability {
  hoursPerWeek: number;
  isPaid: boolean;
}

export interface MBTIPersonality {
  type: string; // e.g., "ENFP"
  name: string; // e.g., "The Campaigner"
  description: string;
}

export interface BigFivePersonality {
  openness: number; // 0-100
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface StrengthsFinder {
  strengths: string[]; // Top 5 strengths
}

export interface SocialIntegration {
  platform: 'linkedin' | 'github' | 'twitter' | 'portfolio';
  username?: string;
  url: string;
  isConnected: boolean;
  metadata?: {
    repositories?: number;
    followers?: number;
    jobTitle?: string;
  };
}

export interface WorkPreferences {
  timezone: string;
  communicationPreferences: ('slack' | 'email' | 'whatsapp' | 'discord')[];
  workHours: 'morning' | 'night' | 'flexible';
  workStyle: 'remote' | 'hybrid' | 'office';
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  school: string;
  skills: string[];
  bio: string;
  videoUrl?: string;
  avatar?: string;
  mainImage?: string;
  gallery?: string[];
  location?: string;
  isOnline?: boolean;
  role: 'student' | 'mentor';
  lookingFor: string[];
  availability: Availability;
  badges: Badge[];
  projectIds: string[];
  // Personality & Integrations
  mbti?: MBTIPersonality;
  bigFive?: BigFivePersonality;
  strengthsFinder?: StrengthsFinder;
  socialIntegrations?: SocialIntegration[];
  workPreferences?: WorkPreferences;
  // Gamification
  gamification?: UserGamification;
}

export interface Channel {
  id: string;
  name: string;
  event: string;
  description: string;
  memberCount: number;
  image?: string;
  color: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  channel: Channel;
  createdAt: Date;
  likes: number;
  comments: number;
  image?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  bio: string;
  avatar?: string;
  connectionReason?: string;
  isVerified?: boolean;
  followers?: number;
  location?: string;
}

export interface MentorPost {
  id: string;
  mentorId: string;
  type: 'text' | 'article' | 'video' | 'ama' | 'job';
  title?: string;
  content: string;
  media?: {
    type: 'image' | 'video' | 'link';
    url: string;
    thumbnail?: string;
    linkPreview?: {
      title: string;
      description: string;
      image?: string;
    };
  };
  createdAt: Date;
  likes: number;
  comments: number;
  shares: number;
  tags?: string[];
}

export interface ProjectRole {
  role: string;
  skills: string[];
  count: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  stage: 'idea' | 'mvp' | 'launched';
  lookingFor: ProjectRole[];
  teamMembers: User[];
  ownerId: string;
  createdAt: Date;
  image?: string;
  gallery?: string[];
  category?: string;
  videoUrl?: string;
}

export interface RegistrationData {
  step: number;
  name: string;
  email: string;
  school: string;
  skills: string[];
  bio: string;
  videoUrl?: string;
  lookingFor: string[];
  availability: Availability;
}

export interface EventMaterial {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  type: 'presentation' | 'document' | 'video' | 'link' | 'image';
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  category?: string;
  thumbnail?: string;
}

export interface EventAnalytics {
  totalAttendees: number;
  checkedIn: number;
  connectionsMode: number;
  messagesExchanged: number;
  materialsDownloaded: number;
  projectsCreated: number;
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  endDate?: Date;
  location: string;
  description: string;
  category: 'hackathon' | 'networking' | 'workshop' | 'conference' | 'meetup';
  organizers: string[]; // User IDs
  attendees: string[]; // User IDs
  maxAttendees?: number;
  image?: string;
  gallery?: string[];
  agenda?: {
    time: string;
    title: string;
    description?: string;
    speaker?: string;
  }[];
  materials?: EventMaterial[];
  analytics?: EventAnalytics;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationDeadline?: Date;
  tags?: string[];
  website?: string;
  isPublic: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  attachments?: {
    type: 'file' | 'image' | 'link';
    url: string;
    name: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  context?: {
    type: 'event' | 'project' | 'discovery';
    name: string;
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// GAMIFICATION SYSTEM
// ============================================

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  target?: number;
  xpReward: number;
}

export interface Level {
  level: number;
  xp: number;
  xpToNextLevel: number;
  title: string; // "Newbie", "Rising Star", "Pro Networker", etc.
}

export interface Streak {
  current: number;
  longest: number;
  lastLoginDate: string; // YYYY-MM-DD
  loginHistory: string[]; // Array of YYYY-MM-DD dates
}

export interface DailyChallenge {
  id: string;
  task: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
  expiresAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  change?: number; // +/- position change from yesterday
}

export interface UserGamification {
  xp: number;
  level: Level;
  achievements: Achievement[];
  streak: Streak;
  dailyChallenges: DailyChallenge[];
  stats: {
    connectionsCount: number;
    messagesSent: number;
    projectsCreated: number;
    eventsAttended: number;
    profileViews: number;
  };
}
