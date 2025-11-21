// Social Proof & FOMO Mock Data

export interface ActivityItem {
  id: string;
  type: 'join' | 'connect' | 'project' | 'event' | 'message';
  user: string;
  action: string;
  timestamp: Date;
  icon: string;
}

export interface SuccessStory {
  id: string;
  quote: string;
  author: string;
  title: string;
  event?: string;
  avatar: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  change?: number;
}

// Live Activity Feed
export const mockActivityFeed: ActivityItem[] = [
  { id: '1', type: 'join', user: 'Jana Nováková', action: 'just joined BeNextOne', timestamp: new Date(), icon: '🔥' },
  { id: '2', type: 'project', user: 'Petr Svoboda', action: 'started new project "AI Tool"', timestamp: new Date(), icon: '🚀' },
  { id: '3', type: 'connect', user: '3 people', action: 'connected in last 5 min', timestamp: new Date(), icon: '🤝' },
  { id: '4', type: 'event', user: 'Martin Novák', action: 'joined Festup community', timestamp: new Date(), icon: '🎪' },
  { id: '5', type: 'project', user: 'Kateřina Dvořáková', action: 'launched "EcoTracker"', timestamp: new Date(), icon: '🌱' },
  { id: '6', type: 'connect', user: 'Tomáš Procházka', action: 'found a co-founder', timestamp: new Date(), icon: '💚' },
  { id: '7', type: 'join', user: '12 new members', action: 'joined this week', timestamp: new Date(), icon: '🎉' },
  { id: '8', type: 'message', user: 'Lukáš Černý', action: 'sent 15 messages today', timestamp: new Date(), icon: '💬' },
  { id: '9', type: 'event', user: 'Startup Weekend', action: 'starting in 2 days', timestamp: new Date(), icon: '📅' },
  { id: '10', type: 'project', user: 'Anna Horáková', action: 'needs React developer', timestamp: new Date(), icon: '👨‍💻' },
];

// Success Stories
export const mockSuccessStories: SuccessStory[] = [
  {
    id: '1',
    quote: 'Našel jsem co-foundera během 2 týdnů! Konekt mi pomohl najít přesně toho pravého člověka s doplňujícími skills.',
    author: 'Jan Kovář',
    title: 'Founder @ AI Startup',
    event: 'BeNextOne 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  },
  {
    id: '2',
    quote: 'Za 3 měsíce jsem našla 2 klienty a skvělý tým. Konekt > LinkedIn!',
    author: 'Petra Nováková',
    title: 'UX Designer',
    event: 'Festup',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  {
    id: '3',
    quote: 'Díky Konektu jsem dostal práci v startup, který hledal právě moje skills. Nejlepší investice času!',
    author: 'Martin Svoboda',
    title: 'Full-stack Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
  {
    id: '4',
    quote: 'Konekt mi otevřel dveře do české startup scény. Poznal jsem desítky skvělých lidí a našel mentora.',
    author: 'Lucie Dvořáková',
    title: 'Product Manager',
    event: 'BeNextOne 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
];

// Testimonials for Landing
export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Našel jsem tech co-foundera během měsíce. Konekt > LinkedIn!',
    author: 'Petr Novotný',
    role: 'Founder',
    company: 'AI Startup',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    rating: 5,
  },
  {
    id: '2',
    quote: 'Konekt je jako Tinder pro profesionální networking. Fastest way to find the right people!',
    author: 'Jana Svobodová',
    role: 'UX Designer',
    company: 'Design Studio',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
  },
  {
    id: '3',
    quote: 'Byl jsem skeptický, ale během týdne jsem měl 10 relevant connections. Game changer!',
    author: 'Martin Černý',
    role: 'Developer',
    company: 'Tech Corp',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    rating: 5,
  },
  {
    id: '4',
    quote: 'Našla jsem zde svůj první freelance projekt. Komunita je neuvěřitelně supportive!',
    author: 'Kateřina Horáková',
    role: 'Content Writer',
    company: 'Freelance',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
  },
  {
    id: '5',
    quote: 'Konekt events jsou nejlepší networking events co jsem kdy navštívil. Quality over quantity!',
    author: 'Tomáš Dvořák',
    role: 'Product Manager',
    company: 'Startup Hub',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    rating: 5,
  },
  {
    id: '6',
    quote: 'Za 2 měsíce jsem našla investora pro můj projekt. Worth every minute!',
    author: 'Lucie Procházková',
    role: 'Founder',
    company: 'GreenTech',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    rating: 5,
  },
];

// Leaderboard Data
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Petr Novotný', score: 23, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', change: 2 },
  { rank: 2, name: 'Jana Králová', score: 19, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', change: -1 },
  { rank: 3, name: 'Martin Svoboda', score: 17, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', change: 1 },
  { rank: 4, name: 'Kateřina Dvořáková', score: 15, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', change: 0 },
  { rank: 5, name: 'Tomáš Novák', score: 14, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', change: 3 },
  { rank: 6, name: 'Lucie Horáková', score: 12, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', change: -2 },
  { rank: 7, name: 'Pavel Černý', score: 11, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', change: 1 },
  { rank: 8, name: 'Veronika Málková', score: 10, avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', change: 0 },
  { rank: 9, name: 'Jakub Procházka', score: 9, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', change: -1 },
  { rank: 10, name: 'Tereza Nová', score: 8, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', change: 2 },
];

// Real-time Stats Messages
export const mockStatsMessages = [
  { icon: '🎉', message: '23 new connections made today!' },
  { icon: '👥', message: '156 people online right now' },
  { icon: '🚀', message: '8 new projects added today' },
  { icon: '💬', message: '342 messages sent this hour' },
  { icon: '🎪', message: 'New event starting: Startup Weekend' },
  { icon: '💼', message: '5 companies posted job opportunities' },
  { icon: '🔥', message: 'Trending: React developers' },
  { icon: '⭐', message: '12 profiles got verified today' },
];

// FOMO Messages (for profiles/projects)
export const mockFOMOMessages = [
  '🔥 3 other people are viewing this profile right now',
  '⏰ This profile received 12 views in the last hour',
  '💡 5 people with similar skills connected with this person',
  '🎯 This profile is in the top 10% most viewed',
  '⚡ Typically responds within 2 hours',
  '🌟 Rising star - joined recently, high activity',
];

// Social Badges
export interface SocialBadge {
  id: string;
  icon: string;
  label: string;
  description: string;
  color: string;
}

export const socialBadges: SocialBadge[] = [
  { id: 'verified', icon: '✅', label: 'Verified', description: 'Email confirmed', color: 'text-blue-400' },
  { id: 'event-attendee', icon: '🎪', label: 'Event Attendee', description: 'Attended 3+ events', color: 'text-purple-400' },
  { id: 'top-connector', icon: '🏆', label: 'Top Connector', description: 'Top 10% networkers', color: 'text-yellow-400' },
  { id: 'active', icon: '🔥', label: 'Active This Week', description: 'Logged in this week', color: 'text-orange-400' },
  { id: 'quick-responder', icon: '⚡', label: 'Quick Responder', description: 'Responds <2h', color: 'text-green-400' },
  { id: 'rising-star', icon: '🌟', label: 'Rising Star', description: 'New, high activity', color: 'text-pink-400' },
  { id: 'founding-member', icon: '👑', label: 'Founding Member', description: 'Early user', color: 'text-konekt-green' },
];
