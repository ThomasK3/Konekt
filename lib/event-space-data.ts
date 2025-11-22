import { mockUsers } from './mock-data';

export interface Channel {
  id: string;
  name: string;
  description: string;
  icon: string;
  unreadCount: number;
  messageCount: number;
}

export interface Message {
  id: string;
  channelId: string;
  authorId: string;
  author: typeof mockUsers[0];
  content: string;
  timestamp: Date;
  reactions: Array<{ emoji: string; count: number; users: string[] }>;
  replies?: Message[];
  isPinned?: boolean;
}

export interface WorkshopMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'document' | 'link';
  size?: string;
  url: string;
  downloads: number;
}

export interface Workshop {
  id: string;
  title: string;
  speaker: {
    name: string;
    title: string;
    avatar: string;
  };
  date: Date;
  duration: string;
  attendance: { current: number; capacity: number };
  rating: number;
  ratingCount: number;
  description: string;
  keyTakeaways: string[];
  chapters: Array<{ time: string; title: string }>;
  materials: WorkshopMaterial[];
  thumbnail: string;
  videoUrl: string;
}

export interface ActivityItem {
  id: string;
  type: 'message' | 'upload' | 'connection' | 'join';
  description: string;
  timestamp: Date;
  user?: typeof mockUsers[0];
  users?: typeof mockUsers;
}

// CHANNELS
export const eventChannels: Channel[] = [
  {
    id: 'general',
    name: 'general',
    description: 'General discussions about BeNextOne 2024',
    icon: '💬',
    unreadCount: 12,
    messageCount: 234,
  },
  {
    id: 'random',
    name: 'random',
    description: 'Off-topic conversations and fun',
    icon: '🎲',
    unreadCount: 0,
    messageCount: 89,
  },
  {
    id: 'job-opportunities',
    name: 'job-opportunities',
    description: 'Job postings and opportunities',
    icon: '💼',
    unreadCount: 3,
    messageCount: 45,
  },
  {
    id: 'collaboration',
    name: 'collaboration',
    description: 'Find project partners and collaborators',
    icon: '🤝',
    unreadCount: 0,
    messageCount: 67,
  },
];

// MESSAGES FOR #GENERAL
export const generalMessages: Message[] = [
  {
    id: 'msg1',
    channelId: 'general',
    authorId: mockUsers[0].id,
    author: mockUsers[0],
    content: 'Hey všichni! 👋 Hledám React developera do týmu. Stavíme AI tool pro designery. Kdo má zájem?',
    timestamp: new Date(Date.now() - 1000 * 60 * 35), // 35 min ago
    reactions: [
      { emoji: '❤️', count: 5, users: ['user2', 'user3', 'user4', 'user5', 'user6'] },
      { emoji: '💡', count: 2, users: ['user3', 'user4'] },
      { emoji: '👍', count: 8, users: ['user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9'] },
    ],
    replies: [
      {
        id: 'reply1-1',
        channelId: 'general',
        authorId: mockUsers[2].id,
        author: mockUsers[2],
        content: 'Zaujímá mě to! Můžu vidět více detailů?',
        timestamp: new Date(Date.now() - 1000 * 60 * 33),
        reactions: [{ emoji: '❤️', count: 2, users: ['user1', 'user4'] }],
      },
      {
        id: 'reply1-2',
        channelId: 'general',
        authorId: mockUsers[0].id,
        author: mockUsers[0],
        content: '@Petr Dvorak Jasně! Posílám ti DM 🚀',
        timestamp: new Date(Date.now() - 1000 * 60 * 31),
        reactions: [],
      },
      {
        id: 'reply1-3',
        channelId: 'general',
        authorId: mockUsers[3].id,
        author: mockUsers[3],
        content: 'Super projekt! Držím palce 💪',
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
        reactions: [{ emoji: '❤️', count: 1, users: ['user1'] }],
      },
    ],
  },
  {
    id: 'msg2',
    channelId: 'general',
    authorId: mockUsers[2].id,
    author: mockUsers[2],
    content: 'Někdo byl včera na after party? 🎉 Bylo to naprosto úžasný!',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    reactions: [
      { emoji: '🔥', count: 3, users: ['user1', 'user3', 'user4'] },
      { emoji: '😂', count: 5, users: ['user1', 'user3', 'user4', 'user5', 'user6'] },
    ],
    replies: [
      {
        id: 'reply2-1',
        channelId: 'general',
        authorId: mockUsers[4].id,
        author: mockUsers[4],
        content: 'Jo, super akce! Skvělý networking',
        timestamp: new Date(Date.now() - 1000 * 60 * 18),
        reactions: [],
      },
    ],
  },
  {
    id: 'msg3',
    channelId: 'general',
    authorId: mockUsers[3].id,
    author: mockUsers[3],
    content: '📢 Announcement: Workshop materials jsou uploaded! Najdete je v Resources → All Materials',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    reactions: [
      { emoji: '👍', count: 15, users: Array(15).fill('user').map((u, i) => u + i) },
      { emoji: '🎉', count: 8, users: Array(8).fill('user').map((u, i) => u + i) },
    ],
    isPinned: true,
    replies: [
      {
        id: 'reply3-1',
        channelId: 'general',
        authorId: mockUsers[1].id,
        author: mockUsers[1],
        content: 'Děkuji! Hned si stahuju 📚',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        reactions: [],
      },
      {
        id: 'reply3-2',
        channelId: 'general',
        authorId: mockUsers[5].id,
        author: mockUsers[5],
        content: 'Super, přesně co jsem hledal!',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        reactions: [],
      },
    ],
  },
  {
    id: 'msg4',
    channelId: 'general',
    authorId: mockUsers[1].id,
    author: mockUsers[1],
    content: 'Má někdo zkušenost s Next.js 15? Přemýšlím o upgradu našeho projektu.',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    reactions: [{ emoji: '🤔', count: 3, users: ['user2', 'user3', 'user4'] }],
    replies: [],
  },
  {
    id: 'msg5',
    channelId: 'general',
    authorId: mockUsers[4].id,
    author: mockUsers[4],
    content: 'Díky za včerejší workshop o AI tools! Jana byla skvělá speaker 👏',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    reactions: [
      { emoji: '👏', count: 12, users: Array(12).fill('user').map((u, i) => u + i) },
      { emoji: '❤️', count: 6, users: Array(6).fill('user').map((u, i) => u + i) },
    ],
    replies: [
      {
        id: 'reply5-1',
        channelId: 'general',
        authorId: mockUsers[2].id,
        author: mockUsers[2],
        content: 'Souhlasím! Skvělý content a praktické příklady',
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        reactions: [],
      },
    ],
  },
  {
    id: 'msg6',
    channelId: 'general',
    authorId: mockUsers[5].id,
    author: mockUsers[5],
    content: 'Je tady někdo z Brna? Byl bych rád za lokální networking 🍺',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    reactions: [{ emoji: '🍺', count: 4, users: ['user1', 'user2', 'user3', 'user4'] }],
    replies: [],
  },
];

// WORKSHOPS
export const eventWorkshops: Workshop[] = [
  {
    id: 'workshop1',
    title: 'AI Tools for Startups',
    speaker: {
      name: 'Jana Nováková',
      title: 'AI Lead @ Avast',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
    date: new Date('2024-11-15T10:00:00'),
    duration: '1:23:45',
    attendance: { current: 45, capacity: 50 },
    rating: 4.8,
    ratingCount: 42,
    description: 'Deep dive into practical AI tools every startup should know about. We\'ll cover ChatGPT, Midjourney, Notion AI, and more. Learn how to implement these tools to save 10+ hours per week on content creation, design, and automation.',
    keyTakeaways: [
      'AI can save 10h/week on content creation',
      'Top 5 tools: ChatGPT, Midjourney, Notion AI, Claude, Copy.ai',
      'Implementation tips for your startup',
      'Cost-benefit analysis of paid vs free tiers',
    ],
    chapters: [
      { time: '00:00', title: 'Introduction & Overview' },
      { time: '05:30', title: 'ChatGPT Deep Dive' },
      { time: '25:00', title: 'Visual AI Tools (Midjourney, DALL-E)' },
      { time: '45:00', title: 'Productivity AI (Notion, Claude)' },
      { time: '1:05:00', title: 'Q&A Session' },
    ],
    materials: [
      {
        id: 'mat1',
        name: 'AI_Tools_Workshop_Slides.pdf',
        type: 'pdf',
        size: '2.3 MB',
        url: '#',
        downloads: 67,
      },
      {
        id: 'mat2',
        name: 'Workshop_1_Recording.mp4',
        type: 'video',
        size: '456 MB',
        url: '#',
        downloads: 34,
      },
      {
        id: 'mat3',
        name: 'AI_Tools_Resource_List.md',
        type: 'document',
        size: '12 KB',
        url: '#',
        downloads: 89,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    videoUrl: '#',
  },
  {
    id: 'workshop2',
    title: 'Pitch Deck Mastery',
    speaker: {
      name: 'Petr Svoboda',
      title: 'VC Partner @ Kaya VC',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    },
    date: new Date('2024-11-15T14:00:00'),
    duration: '1:15:30',
    attendance: { current: 48, capacity: 50 },
    rating: 4.9,
    ratingCount: 38,
    description: 'Learn what VCs actually look for in pitch decks. We\'ll dissect successful decks, common mistakes, and give you a battle-tested template.',
    keyTakeaways: [
      'The 10-slide framework that works',
      'Common mistakes that kill your pitch',
      'How to tell your story compellingly',
      'Design tips for non-designers',
    ],
    chapters: [
      { time: '00:00', title: 'What VCs Look For' },
      { time: '15:00', title: 'The Perfect Structure' },
      { time: '35:00', title: 'Storytelling Techniques' },
      { time: '55:00', title: 'Design Best Practices' },
      { time: '1:05:00', title: 'Live Deck Reviews' },
    ],
    materials: [
      {
        id: 'mat4',
        name: 'Pitch_Deck_Template.pptx',
        type: 'pdf',
        size: '5.1 MB',
        url: '#',
        downloads: 89,
      },
      {
        id: 'mat5',
        name: 'Successful_Pitch_Examples.pdf',
        type: 'pdf',
        size: '8.2 MB',
        url: '#',
        downloads: 72,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    videoUrl: '#',
  },
  {
    id: 'workshop3',
    title: 'Growth Hacking 101',
    speaker: {
      name: 'Martin Kolář',
      title: 'Growth Lead @ Notino',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    },
    date: new Date('2024-11-16T10:00:00'),
    duration: '1:10:20',
    attendance: { current: 42, capacity: 50 },
    rating: 4.7,
    ratingCount: 35,
    description: 'From 0 to 10k users: practical growth hacking strategies that actually work. Real case studies, tools, and frameworks.',
    keyTakeaways: [
      'The North Star Metric framework',
      'Viral loops and referral systems',
      'Content marketing at scale',
      'Product-led growth tactics',
    ],
    chapters: [
      { time: '00:00', title: 'Growth Fundamentals' },
      { time: '20:00', title: 'Acquisition Channels' },
      { time: '40:00', title: 'Retention Strategies' },
      { time: '1:00:00', title: 'Case Studies' },
    ],
    materials: [
      {
        id: 'mat6',
        name: 'Growth_Hacking_Notes.md',
        type: 'document',
        size: '15 KB',
        url: '#',
        downloads: 54,
      },
      {
        id: 'mat7',
        name: 'Growth_Tools_List.pdf',
        type: 'pdf',
        size: '1.8 MB',
        url: '#',
        downloads: 61,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    videoUrl: '#',
  },
  {
    id: 'workshop4',
    title: 'Tech Stack for Startups',
    speaker: {
      name: 'Tomáš Procházka',
      title: 'CTO @ Rohlik.cz',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    },
    date: new Date('2024-11-16T14:00:00'),
    duration: '1:05:15',
    attendance: { current: 40, capacity: 50 },
    rating: 4.6,
    ratingCount: 32,
    description: 'Choosing the right tech stack can make or break your startup. Learn from someone who scaled to millions of users.',
    keyTakeaways: [
      'When to use Next.js vs React vs Vue',
      'Serverless vs traditional infrastructure',
      'Database choices: SQL vs NoSQL',
      'DevOps essentials for small teams',
    ],
    chapters: [
      { time: '00:00', title: 'Frontend Frameworks' },
      { time: '25:00', title: 'Backend Architecture' },
      { time: '45:00', title: 'Database Selection' },
      { time: '55:00', title: 'Deployment & Scaling' },
    ],
    materials: [
      {
        id: 'mat8',
        name: 'Tech_Stack_Decision_Matrix.pdf',
        type: 'pdf',
        size: '3.2 MB',
        url: '#',
        downloads: 48,
      },
    ],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    videoUrl: '#',
  },
];

// RECENT ACTIVITY
export const recentActivity: ActivityItem[] = [
  {
    id: 'act1',
    type: 'message',
    description: 'posted in #general',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    user: mockUsers[2],
  },
  {
    id: 'act2',
    type: 'upload',
    description: 'uploaded workshop materials',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: mockUsers[3],
  },
  {
    id: 'act3',
    type: 'connection',
    description: 'connected',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    users: [mockUsers[0], mockUsers[2]],
  },
  {
    id: 'act4',
    type: 'join',
    description: 'joined the space',
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    user: mockUsers[4],
  },
  {
    id: 'act5',
    type: 'message',
    description: 'posted in #job-opportunities',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    user: mockUsers[1],
  },
];

// ONLINE USERS (subset of mockUsers)
export const onlineUsers = mockUsers.slice(0, 6);
