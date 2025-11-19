import type { User, Channel, Post, Mentor, Project, Badge } from '@/types';

// Badges
export const mockBadges: Badge[] = [
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Mezi prvními na platformě',
    icon: '🌟',
  },
  {
    id: 'active',
    name: 'Aktivní člen',
    description: '10+ příspěvků v komunitě',
    icon: '🔥',
  },
  {
    id: 'project-starter',
    name: 'Project Starter',
    description: 'Vytvořil 3+ projekty',
    icon: '🚀',
  },
];

// Mock Users (students)
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Jakub Procházka',
    username: 'jakub-prochazka',
    email: 'jakub@example.com',
    school: 'ČVUT',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
    bio: 'Full-stack developer s láskou k designu. Hledám co-foundera pro startup v AI.',
    role: 'student',
    lookingFor: ['Co-founder', 'Backend Developer'],
    availability: {
      hoursPerWeek: 20,
      isPaid: false,
    },
    badges: [mockBadges[0], mockBadges[1]],
    projectIds: ['proj1', 'proj2'],
  },
  {
    id: 'user2',
    name: 'Lucie Nováková',
    username: 'lucie-novakova',
    email: 'lucie@example.com',
    school: 'VŠE',
    skills: ['Marketing', 'Content', 'Social Media', 'Canva'],
    bio: 'Marketing enthusiast. Chci pomoct startupům růst a učit se při tom.',
    role: 'student',
    lookingFor: ['Marketing Team', 'Startup Co-founder'],
    availability: {
      hoursPerWeek: 15,
      isPaid: true,
    },
    badges: [mockBadges[0]],
    projectIds: ['proj3'],
  },
  {
    id: 'user3',
    name: 'Martin Svoboda',
    username: 'martin-svoboda',
    email: 'martin@example.com',
    school: 'MU Brno',
    skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
    bio: 'AI/ML engineer. Fascinuje mě, co můžeme postavit s moderní AI.',
    role: 'student',
    lookingFor: ['AI Project Team', 'Co-founder'],
    availability: {
      hoursPerWeek: 25,
      isPaid: false,
    },
    badges: [mockBadges[0], mockBadges[2]],
    projectIds: ['proj1'],
  },
  {
    id: 'user4',
    name: 'Karolína Dvořáková',
    username: 'karolina-dvorakova',
    email: 'karolina@example.com',
    school: 'VUT Brno',
    skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
    bio: 'Product designer. Miluji vytvářet produkty, které lidi opravdu chtějí používat.',
    role: 'student',
    lookingFor: ['Developer pro spolupráci', 'Startup Team'],
    availability: {
      hoursPerWeek: 10,
      isPaid: true,
    },
    badges: [mockBadges[0], mockBadges[1]],
    projectIds: ['proj2', 'proj4'],
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'StudyBuddy AI',
    description: 'AI asistent pro studenty, který pomáhá s učením pomocí personalizovaných quizů a vysvětlení. Automaticky generuje otázky z přednášek a učebnic.',
    stack: ['Next.js', 'OpenAI API', 'Python', 'FastAPI'],
    stage: 'mvp',
    lookingFor: [
      {
        role: 'Backend Developer',
        skills: ['Python', 'FastAPI', 'PostgreSQL'],
        count: 1,
      },
      {
        role: 'UI/UX Designer',
        skills: ['Figma', 'User Research'],
        count: 1,
      },
    ],
    teamMembers: [mockUsers[0], mockUsers[2]],
    ownerId: 'user1',
    createdAt: new Date('2024-11-10'),
  },
  {
    id: 'proj2',
    name: 'GreenCommute',
    description: 'Platforma pro sdílení jízd mezi studenty. Snižujeme emise a náklady na dopravu do školy. Gamifikace + odměny za eko-friendly rozhodnutí.',
    stack: ['React Native', 'Firebase', 'Google Maps API'],
    stage: 'idea',
    lookingFor: [
      {
        role: 'Mobile Developer',
        skills: ['React Native', 'TypeScript'],
        count: 2,
      },
      {
        role: 'Marketing',
        skills: ['Social Media', 'Growth Hacking'],
        count: 1,
      },
    ],
    teamMembers: [mockUsers[0], mockUsers[3]],
    ownerId: 'user1',
    createdAt: new Date('2024-11-15'),
  },
  {
    id: 'proj3',
    name: 'EventMatch',
    description: 'Networkingová app pro akce jako BeNextOne. Matchuje lidi podle zájmů před akcí, aby věděli, s kým si povídat.',
    stack: ['Flutter', 'Supabase', 'TypeScript'],
    stage: 'idea',
    lookingFor: [
      {
        role: 'Full-stack Developer',
        skills: ['Flutter', 'Supabase', 'API Design'],
        count: 1,
      },
      {
        role: 'Co-founder',
        skills: ['Business', 'Sales'],
        count: 1,
      },
    ],
    teamMembers: [mockUsers[1]],
    ownerId: 'user2',
    createdAt: new Date('2024-11-12'),
  },
  {
    id: 'proj4',
    name: 'SkillSwap',
    description: 'P2P platforma pro výměnu skills mezi studenty. Nauč někoho programovat, získej lekci němčiny. Bez peněz, jen skills.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC'],
    stage: 'launched',
    lookingFor: [
      {
        role: 'Growth Marketer',
        skills: ['SEO', 'Content Marketing'],
        count: 1,
      },
    ],
    teamMembers: [mockUsers[3]],
    ownerId: 'user4',
    createdAt: new Date('2024-10-20'),
  },
];

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Jan Novák',
    role: 'Lead Developer',
    company: 'Rohlík.cz',
    expertise: ['TypeScript', 'React', 'Next.js'],
    bio: 'Pomáhám studentům rozjet kariéru v tech',
    connectionReason: 'Sdílíte zájem o React',
  },
  {
    id: '2',
    name: 'Petra Svobodová',
    role: 'Product Manager',
    company: 'Mews Systems',
    expertise: ['Product Management', 'SaaS', 'Agile'],
    bio: 'Mentorka pro budoucí PM a produktové lidi',
    connectionReason: 'Z akce BeNextOne',
  },
];

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'BeNextOne',
    event: 'BeNextOne 2024',
    description: 'Největší studentská akce roku',
    memberCount: 234,
    color: '#4a6953',
  },
  {
    id: '2',
    name: 'Festup',
    event: 'Festup 2024',
    description: 'Festival pro studenty a startupy',
    memberCount: 189,
    color: '#c872a4',
  },
  {
    id: '3',
    name: 'Dny AI',
    event: 'Dny AI 2024',
    description: 'Konference o umělé inteligenci',
    memberCount: 156,
    color: '#4a6953',
  },
  {
    id: '4',
    name: 'Startup Jobs',
    event: 'Startup Jobs Fair 2024',
    description: 'Kariérní veletrh pro startupy',
    memberCount: 298,
    color: '#c872a4',
  },
];

// Mock posts now from students about their projects
export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[0],
    content: '🚀 Právě jsme spustili MVP StudyBuddy AI! AI asistent, který ti pomůže s učením.\n\nStále hledáme:\n• Backend developera (Python/FastAPI)\n• UI/UX designera\n\nMáš zájem? Napiš mi! 💪',
    channel: mockChannels[2],
    createdAt: new Date('2024-11-18'),
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    author: mockUsers[1],
    content: 'Hledám co-foundera pro EventMatch - networkingovou app pro konference! 🎯\n\nPotřebuji někoho s tech backgroundem (Flutter/Supabase).\n\nKdo z vás byl na BeNextOne a cítil, že by appka na matchování pomohla? 👀',
    channel: mockChannels[0],
    createdAt: new Date('2024-11-17'),
    likes: 38,
    comments: 12,
  },
  {
    id: '3',
    author: mockUsers[3],
    content: 'SkillSwap just hit 100 users! 🎉\n\nBez jediné koruny na marketing. Pouze organicky přes BeNextOne a Festup.\n\nTeď hledáme growth marketera, kdo má chuť to dotáhnout dál. Kdo je in? 🚀',
    channel: mockChannels[0],
    createdAt: new Date('2024-11-16'),
    likes: 56,
    comments: 23,
  },
];
