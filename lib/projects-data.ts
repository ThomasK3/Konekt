import { Project, ProjectUpdate, ProjectComment, ProjectMedia } from '@/types';
import { mockUsers } from './mock-data';

// Mock Project Data for Showcase System

export const mockProjectMedia: ProjectMedia[] = [
  {
    id: 'media1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    caption: 'Dashboard view',
  },
  {
    id: 'media2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    caption: 'Analytics screen',
  },
  {
    id: 'media3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    caption: 'Mobile responsive',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'DesignToCode AI',
    oneLiner: 'AI tool that converts Figma designs to React code in minutes',
    description: `# The Problem

Designers and developers spend countless hours converting Figma designs into production-ready code. Most automated tools produce messy, unusable output.

# Our Solution

DesignToCode uses advanced AI to understand design intent and generate clean, maintainable React components. Upload your Figma file and get pixel-perfect code in 5 minutes.

# Progress So Far

• Built MVP ✅
• 50 beta testers
• 90% accuracy rate
• Processing 100+ designs/day

# What's Next

- Mobile app support
- Real-time collaboration
- Integration with VS Code`,
    stage: 'beta',
    category: 'ai-ml',
    stack: ['React', 'Node.js', 'OpenAI', 'TypeScript', 'Tailwind CSS'],
    lookingFor: [
      { role: 'Frontend Developer', skills: ['React', 'TypeScript'], count: 1 },
      { role: 'Growth Marketer', skills: ['Marketing', 'SEO'], count: 1 },
    ],
    lookingForHelp: true,
    collaborationMessage: 'We need a frontend wizard to help build the dashboard and a growth expert to scale user acquisition.',
    teamMembers: [mockUsers[0], mockUsers[1]],
    ownerId: mockUsers[0].id,
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-11-15'),
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    gallery: mockProjectMedia,
    links: {
      demo: 'https://designtocode.ai',
      github: 'https://github.com/example/designtocode',
      figma: 'https://figma.com/@designtocode',
      website: 'https://designtocode.ai',
    },
    visibility: 'public',
    allowComments: true,
    stats: {
      views: 234,
      saves: 45,
      reactions: 89,
      comments: 24,
    },
    tags: ['AI', 'Design', 'Developer Tools'],
  },
  {
    id: 'proj2',
    name: 'MoodTracker',
    oneLiner: 'Daily mood tracking app with AI-powered insights',
    description: `# Why MoodTracker?

Mental health is important. MoodTracker helps you understand your emotional patterns through daily check-ins and AI analysis.

# Features

- Quick daily mood logging
- Trend analysis & insights
- Personalized recommendations
- Beautiful data visualizations

# The Journey

Launched 3 months ago with 1,000+ active users. Featured on Product Hunt (Top 5 of the day).`,
    stage: 'launched',
    category: 'mobile-app',
    stack: ['React Native', 'Firebase', 'TensorFlow', 'Expo'],
    lookingFor: [],
    lookingForHelp: false,
    teamMembers: [mockUsers[2]],
    ownerId: mockUsers[2].id,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-11-10'),
    coverImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200',
    links: {
      website: 'https://moodtracker.app',
      demo: 'https://moodtracker.app/demo',
    },
    visibility: 'public',
    allowComments: true,
    stats: {
      views: 1245,
      saves: 234,
      reactions: 456,
      comments: 45,
    },
    tags: ['Health', 'Mobile', 'AI'],
  },
  {
    id: 'proj3',
    name: 'VoiceNotes Pro',
    oneLiner: 'Voice-to-text note-taking with AI summarization',
    description: `# The Idea

Speak your thoughts, get organized notes instantly.

# What We're Building

- Real-time voice transcription
- AI-powered summarization
- Smart categorization
- Multi-language support

# Current Status

MVP in development. Looking for early testers!`,
    stage: 'idea',
    category: 'web-app',
    stack: ['Next.js', 'Whisper AI', 'Supabase'],
    lookingFor: [
      { role: 'Backend Developer', skills: ['Node.js', 'AI'], count: 1 },
    ],
    lookingForHelp: true,
    collaborationMessage: 'Need someone experienced with AI/ML and audio processing.',
    teamMembers: [mockUsers[3]],
    ownerId: mockUsers[3].id,
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-18'),
    coverImage: 'https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?w=1200',
    links: {},
    visibility: 'public',
    allowComments: true,
    stats: {
      views: 89,
      saves: 12,
      reactions: 23,
      comments: 8,
    },
    tags: ['Productivity', 'AI', 'Voice'],
  },
  {
    id: 'proj4',
    name: 'Startup Toolkit',
    oneLiner: 'Curated resources for early-stage startups',
    description: `# For Founders, By Founders

Everything you need to launch your startup in one place.

# What's Inside

- Legal templates
- Pitch deck examples
- Growth strategies
- Funding sources
- Community support`,
    stage: 'development',
    category: 'service',
    stack: ['Next.js', 'Notion API', 'Airtable'],
    lookingFor: [
      { role: 'Content Writer', skills: ['Writing', 'Marketing'], count: 1 },
    ],
    lookingForHelp: true,
    teamMembers: [mockUsers[4]],
    ownerId: mockUsers[4].id,
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-11-12'),
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200',
    links: {
      website: 'https://startuptoolkit.co',
    },
    visibility: 'public',
    allowComments: true,
    stats: {
      views: 156,
      saves: 34,
      reactions: 67,
      comments: 15,
    },
    tags: ['Resources', 'Startup', 'Education'],
  },
];

export const mockProjectUpdates: ProjectUpdate[] = [
  {
    id: 'update1',
    projectId: 'proj1',
    authorId: mockUsers[0].id,
    content: `🎉 **Launched beta version!**

50 users signed up in the first week. Our AI accuracy is at 90% - better than expected!

Next up: Mobile app support and real-time collaboration features.`,
    createdAt: new Date('2024-11-15'),
    reactions: 45,
    comments: 12,
  },
  {
    id: 'update2',
    projectId: 'proj1',
    authorId: mockUsers[0].id,
    content: `🛠️ **Built MVP**

Took 6 weeks from idea to working prototype. Learned a ton about AI model optimization.

Key lesson: Start simple, iterate fast!`,
    media: [mockProjectMedia[0]],
    createdAt: new Date('2024-10-28'),
    reactions: 32,
    comments: 8,
  },
];

export const mockProjectComments: ProjectComment[] = [
  {
    id: 'comment1',
    projectId: 'proj1',
    authorId: mockUsers[2].id,
    author: mockUsers[2],
    content: 'This is incredible! How does it handle responsive breakpoints?',
    createdAt: new Date('2024-11-19T14:30:00'),
    reactions: 5,
    replies: [
      {
        id: 'reply1',
        projectId: 'proj1',
        authorId: mockUsers[0].id,
        author: mockUsers[0],
        content: 'Great question! It analyzes Figma auto-layout constraints and generates responsive CSS.',
        createdAt: new Date('2024-11-19T15:00:00'),
        reactions: 3,
      },
    ],
  },
  {
    id: 'comment2',
    projectId: 'proj1',
    authorId: mockUsers[3].id,
    author: mockUsers[3],
    content: 'Would love to try this! Is beta access still available?',
    createdAt: new Date('2024-11-19T10:00:00'),
    reactions: 3,
  },
];
