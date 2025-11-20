import type { User, Channel, Post, Mentor, MentorPost, Project, Badge, Message, Conversation, Event, EventMaterial } from '@/types';

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

// Mock Users (students) - rozšířeno o galerie
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
    mainImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    ],
    location: 'Praha',
    isOnline: true,
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
    mainImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    ],
    location: 'Praha',
    isOnline: false,
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
    mainImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop',
    ],
    location: 'Brno',
    isOnline: true,
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
    mainImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    ],
    location: 'Brno',
    isOnline: true,
  },
  // Nové profily pro bohatší feed
  {
    id: 'user5',
    name: 'Tomáš Novotný',
    username: 'tomas-novotny',
    email: 'tomas@example.com',
    school: 'UK Praha',
    skills: ['Blockchain', 'Solidity', 'Web3', 'Smart Contracts'],
    bio: 'Blockchain developer. Pracuji na DeFi projektech a chci změnit finance.',
    role: 'student',
    lookingFor: ['Web3 Team', 'Co-founder'],
    availability: {
      hoursPerWeek: 30,
      isPaid: false,
    },
    badges: [mockBadges[2]],
    projectIds: ['proj5'],
    mainImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    ],
    location: 'Praha',
    isOnline: false,
  },
  {
    id: 'user6',
    name: 'Barbora Malá',
    username: 'barbora-mala',
    email: 'barbora@example.com',
    school: 'VŠE',
    skills: ['Business Development', 'Sales', 'Pitching', 'Partnerships'],
    bio: 'Startup enthusiast. Chci budovat business side tech projektů.',
    role: 'student',
    lookingFor: ['Tech Co-founder', 'Product Team'],
    availability: {
      hoursPerWeek: 20,
      isPaid: true,
    },
    badges: [mockBadges[0], mockBadges[1]],
    projectIds: ['proj6'],
    mainImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    ],
    location: 'Praha',
    isOnline: true,
  },
  {
    id: 'user7',
    name: 'Filip Král',
    username: 'filip-kral',
    email: 'filip@example.com',
    school: 'VUT Brno',
    skills: ['Mobile Dev', 'Flutter', 'React Native', 'iOS'],
    bio: 'Mobile-first developer. Vytvářím appky, které lidi používají každý den.',
    role: 'student',
    lookingFor: ['Backend Developer', 'Designer'],
    availability: {
      hoursPerWeek: 15,
      isPaid: false,
    },
    badges: [mockBadges[0]],
    projectIds: [],
    mainImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=300&fit=crop',
    ],
    location: 'Brno',
    isOnline: true,
  },
  {
    id: 'user8',
    name: 'Anna Černá',
    username: 'anna-cerna',
    email: 'anna@example.com',
    school: 'ČVUT',
    skills: ['Data Analytics', 'SQL', 'Tableau', 'Python'],
    bio: 'Data analyst. Pomáhám startupům dělat rozhodnutí založená na datech.',
    role: 'student',
    lookingFor: ['Startup s data-driven kulturou'],
    availability: {
      hoursPerWeek: 10,
      isPaid: true,
    },
    badges: [mockBadges[1]],
    projectIds: [],
    mainImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    ],
    location: 'Praha',
    isOnline: false,
  },
];

// Mock Projects - rozšířeno o galerie
export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: 'StudyBuddy AI',
    description: 'AI asistent pro studenty, který pomáhá s učením pomocí personalizovaných quizů a vysvětlení. Automaticky generuje otázky z přednášek a učebnic.',
    stack: ['Next.js', 'OpenAI API', 'Python', 'FastAPI'],
    stage: 'mvp',
    category: 'EdTech',
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
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'proj2',
    name: 'GreenCommute',
    description: 'Platforma pro sdílení jízd mezi studenty. Snižujeme emise a náklady na dopravu do školy. Gamifikace + odměny za eko-friendly rozhodnutí.',
    stack: ['React Native', 'Firebase', 'Google Maps API'],
    stage: 'idea',
    category: 'CleanTech',
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
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'proj3',
    name: 'EventMatch',
    description: 'Networkingová app pro akce jako BeNextOne. Matchuje lidi podle zájmů před akcí, aby věděli, s kým si povídat.',
    stack: ['Flutter', 'Supabase', 'TypeScript'],
    stage: 'idea',
    category: 'Social',
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
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'proj4',
    name: 'SkillSwap',
    description: 'P2P platforma pro výměnu skills mezi studenty. Nauč někoho programovat, získej lekci němčiny. Bez peněz, jen skills.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC'],
    stage: 'launched',
    category: 'EdTech',
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
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'proj5',
    name: 'CryptoLearn',
    description: 'Vzdělávací platforma pro blockchain a Web3. Interaktivní kurzy s praktickými projekty.',
    stack: ['Next.js', 'Solidity', 'Hardhat', 'Ethers.js'],
    stage: 'mvp',
    category: 'EdTech',
    lookingFor: [
      {
        role: 'Content Creator',
        skills: ['Writing', 'Video Production'],
        count: 1,
      },
    ],
    teamMembers: [mockUsers[4]],
    ownerId: 'user5',
    createdAt: new Date('2024-11-05'),
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=300&fit=crop',
    ],
  },
  {
    id: 'proj6',
    name: 'LocalMarket',
    description: 'Marketplace pro lokální farmáře a producenty. Čerstvé produkty přímo od výrobců.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    stage: 'idea',
    category: 'E-commerce',
    lookingFor: [
      {
        role: 'Full-stack Developer',
        skills: ['React', 'Node.js', 'MongoDB'],
        count: 2,
      },
    ],
    teamMembers: [mockUsers[5]],
    ownerId: 'user6',
    createdAt: new Date('2024-11-14'),
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=400&h=300&fit=crop',
    ],
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

// Mock Messages
export const mockMessages: Message[] = [
  // Conversation 1: with Lucie (about EventMatch project)
  {
    id: 'msg1',
    conversationId: 'conv1',
    senderId: 'user2',
    content: 'Ahoj! Viděla jsem tvůj profil a myslím, že bychom mohli spolupracovat na EventMatch. Máš zájem?',
    createdAt: new Date('2024-11-18T10:00:00'),
    isRead: true,
  },
  {
    id: 'msg2',
    conversationId: 'conv1',
    senderId: 'user1', // current user
    content: 'Ahoj Lucie! Určitě, to zní skvěle. EventMatch vypadá super, už jsem si to prohlížel. Kdy bys měla čas na call?',
    createdAt: new Date('2024-11-18T10:15:00'),
    isRead: true,
  },
  {
    id: 'msg3',
    conversationId: 'conv1',
    senderId: 'user2',
    content: 'Co takhle ve čtvrtek odpoledne? Můžeme si projít tech stack a co všechno potřebujeme vybudovat.',
    createdAt: new Date('2024-11-18T14:30:00'),
    isRead: false,
  },

  // Conversation 2: with Martin (about StudyBuddy AI)
  {
    id: 'msg4',
    conversationId: 'conv2',
    senderId: 'user3',
    content: 'Sup! Díky za add do StudyBuddy týmu. Kdy startujeme s backendem?',
    createdAt: new Date('2024-11-17T16:00:00'),
    isRead: true,
  },
  {
    id: 'msg5',
    conversationId: 'conv2',
    senderId: 'user1',
    content: 'Hej! Můžeme začít hned. Posílám ti Notion s roadmapou a API specs.',
    createdAt: new Date('2024-11-17T16:10:00'),
    isRead: true,
    attachments: [
      {
        type: 'link',
        url: 'https://notion.so/studybuddy',
        name: 'StudyBuddy Roadmap',
      },
    ],
  },
  {
    id: 'msg6',
    conversationId: 'conv2',
    senderId: 'user3',
    content: 'Super, díky! Mrknu na to dnes večer.',
    createdAt: new Date('2024-11-17T16:15:00'),
    isRead: true,
  },

  // Conversation 3: with Karolína (design collaboration)
  {
    id: 'msg7',
    conversationId: 'conv3',
    senderId: 'user1',
    content: 'Ahoj Karolíno! Potřeboval bych pomoct s designem pro GreenCommute. Měla bys čas?',
    createdAt: new Date('2024-11-16T11:00:00'),
    isRead: true,
  },
  {
    id: 'msg8',
    conversationId: 'conv3',
    senderId: 'user4',
    content: 'Ahoj! Samozřejmě, to zní jako cool projekt. Pošli mi víc detailů.',
    createdAt: new Date('2024-11-16T11:30:00'),
    isRead: true,
  },
  {
    id: 'msg9',
    conversationId: 'conv3',
    senderId: 'user1',
    content: 'Je to platforma pro carpooling mezi studenty. Potřebujeme UI/UX pro onboarding a hlavní feed.',
    createdAt: new Date('2024-11-16T12:00:00'),
    isRead: true,
  },

  // Conversation 4: with Barbora (business development)
  {
    id: 'msg10',
    conversationId: 'conv4',
    senderId: 'user6',
    content: 'Hej! Poznali jsme se na BeNextOne. Chtěla bych s tebou probrat možnost spolupráce na business stránce tvých projektů.',
    createdAt: new Date('2024-11-15T14:00:00'),
    isRead: true,
  },
  {
    id: 'msg11',
    conversationId: 'conv4',
    senderId: 'user1',
    content: 'Ahoj Barbaro! Jasně, pamatuju si tě. To by bylo skvělý, právě potřebuju pomoct s pitch deckem.',
    createdAt: new Date('2024-11-15T15:00:00'),
    isRead: true,
  },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [mockUsers[1]], // Lucie
    lastMessage: mockMessages[2],
    unreadCount: 1,
    context: {
      type: 'project',
      name: 'EventMatch',
      id: 'proj3',
    },
    createdAt: new Date('2024-11-18T10:00:00'),
    updatedAt: new Date('2024-11-18T14:30:00'),
  },
  {
    id: 'conv2',
    participants: [mockUsers[2]], // Martin
    lastMessage: mockMessages[5],
    unreadCount: 0,
    context: {
      type: 'project',
      name: 'StudyBuddy AI',
      id: 'proj1',
    },
    createdAt: new Date('2024-11-17T16:00:00'),
    updatedAt: new Date('2024-11-17T16:15:00'),
  },
  {
    id: 'conv3',
    participants: [mockUsers[3]], // Karolína
    lastMessage: mockMessages[8],
    unreadCount: 0,
    context: {
      type: 'project',
      name: 'GreenCommute',
      id: 'proj2',
    },
    createdAt: new Date('2024-11-16T11:00:00'),
    updatedAt: new Date('2024-11-16T12:00:00'),
  },
  {
    id: 'conv4',
    participants: [mockUsers[5]], // Barbora
    lastMessage: mockMessages[10],
    unreadCount: 0,
    context: {
      type: 'event',
      name: 'BeNextOne 2024',
      id: 'event1',
    },
    createdAt: new Date('2024-11-15T14:00:00'),
    updatedAt: new Date('2024-11-15T15:00:00'),
  },
];

// Mock Event Materials
export const mockEventMaterials: EventMaterial[] = [
  {
    id: 'mat1',
    eventId: 'event1',
    title: 'Pitch Deck Template',
    description: 'Oficiální šablona pro pitch prezentace',
    type: 'presentation',
    url: 'https://docs.google.com/presentation/d/example1',
    uploadedBy: 'organizer1',
    uploadedAt: new Date('2024-11-10T09:00:00'),
    category: 'Templates',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
  },
  {
    id: 'mat2',
    eventId: 'event1',
    title: 'Startup Legal Basics',
    description: 'Právní základy pro začínající startupisty',
    type: 'document',
    url: 'https://drive.google.com/file/d/example2',
    uploadedBy: 'organizer1',
    uploadedAt: new Date('2024-11-12T14:00:00'),
    category: 'Legal',
  },
  {
    id: 'mat3',
    eventId: 'event1',
    title: 'Opening Keynote - Future of Czech Startups',
    description: 'Záznam úvodní keynote od Petra Bárty',
    type: 'video',
    url: 'https://youtube.com/watch?v=example3',
    uploadedBy: 'organizer1',
    uploadedAt: new Date('2024-11-19T10:30:00'),
    category: 'Recordings',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
  },
  {
    id: 'mat4',
    eventId: 'event2',
    title: 'Fundraising Workshop Slides',
    description: 'Materiály z workshopu o získávání investic',
    type: 'presentation',
    url: 'https://docs.google.com/presentation/d/example4',
    uploadedBy: 'organizer2',
    uploadedAt: new Date('2024-11-05T16:00:00'),
    category: 'Workshops',
  },
  {
    id: 'mat5',
    eventId: 'event3',
    title: 'AI Product Development Guide',
    description: 'Kompletní guide pro vývoj AI produktů',
    type: 'document',
    url: 'https://notion.so/ai-product-guide',
    uploadedBy: 'organizer3',
    uploadedAt: new Date('2024-10-20T11:00:00'),
    category: 'Guides',
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event1',
    name: 'BeNextOne 2024',
    date: new Date('2024-11-19T09:00:00'),
    endDate: new Date('2024-11-20T18:00:00'),
    location: 'Prague Congress Centre',
    description: 'Největší startupový hackathon v České republice. 48 hodin intenzivního budování projektů, networkingu s investory a mentoringu od top founderů.',
    category: 'hackathon',
    organizers: ['organizer1'],
    attendees: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7'],
    maxAttendees: 200,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
    ],
    agenda: [
      { time: '09:00', title: 'Check-in & Breakfast', description: 'Registrace účastníků a networking snídaně' },
      { time: '10:00', title: 'Opening Keynote', description: 'Future of Czech Startups', speaker: 'Petr Bárta' },
      { time: '11:00', title: 'Team Formation', description: 'Pitching ideas a tvorba týmů' },
      { time: '12:00', title: 'Hacking Begins', description: 'Start 48hodinového hackathonu' },
      { time: '18:00', title: 'Mentor Sessions', description: '1:1 mentoring s industry experty' },
    ],
    materials: mockEventMaterials.filter((m) => m.eventId === 'event1'),
    analytics: {
      totalAttendees: 187,
      checkedIn: 172,
      connectionsMode: 423,
      messagesExchanged: 1247,
      materialsDownloaded: 356,
      projectsCreated: 42,
    },
    status: 'ongoing',
    registrationDeadline: new Date('2024-11-15T23:59:59'),
    tags: ['hackathon', 'startup', 'AI', 'networking'],
    website: 'https://benextone.cz',
    isPublic: true,
  },
  {
    id: 'event2',
    name: 'StartupGrind Prague',
    date: new Date('2024-12-05T18:00:00'),
    endDate: new Date('2024-12-05T21:00:00'),
    location: 'Impact Hub Prague, Karlín',
    description: 'Měsíční networking event pro startup komunitu v Praze. Tento měsíc s keynote od CEO úspěšného SaaS startupu.',
    category: 'networking',
    organizers: ['organizer2'],
    attendees: ['user1', 'user3', 'user5'],
    maxAttendees: 80,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
    ],
    agenda: [
      { time: '18:00', title: 'Doors Open', description: 'Networking & drinks' },
      { time: '19:00', title: 'Keynote: Scaling SaaS in CEE', speaker: 'Jana Nováková, CEO Productboard' },
      { time: '20:00', title: 'Fireside Chat & Q&A' },
      { time: '20:45', title: 'Open Networking' },
    ],
    materials: mockEventMaterials.filter((m) => m.eventId === 'event2'),
    analytics: {
      totalAttendees: 67,
      checkedIn: 0,
      connectionsMode: 0,
      messagesExchanged: 0,
      materialsDownloaded: 0,
      projectsCreated: 0,
    },
    status: 'upcoming',
    registrationDeadline: new Date('2024-12-04T23:59:59'),
    tags: ['networking', 'SaaS', 'scaling'],
    website: 'https://startupgrind.cz',
    isPublic: true,
  },
  {
    id: 'event3',
    name: 'AI Workshop Series',
    date: new Date('2024-10-15T14:00:00'),
    endDate: new Date('2024-10-15T17:00:00'),
    location: 'ČVUT FIT, Praha',
    description: 'Praktický workshop zaměřený na vývoj AI aplikací s využitím moderních LLM modelů a frameworků.',
    category: 'workshop',
    organizers: ['organizer3'],
    attendees: ['user2', 'user4', 'user6'],
    maxAttendees: 30,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    ],
    agenda: [
      { time: '14:00', title: 'Introduction to LLMs', speaker: 'Dr. Martin Dvořák' },
      { time: '14:45', title: 'Hands-on: Building with OpenAI API' },
      { time: '15:45', title: 'Break' },
      { time: '16:00', title: 'Advanced Prompting Techniques' },
      { time: '16:45', title: 'Q&A & Project Ideas' },
    ],
    materials: mockEventMaterials.filter((m) => m.eventId === 'event3'),
    analytics: {
      totalAttendees: 28,
      checkedIn: 28,
      connectionsMode: 45,
      messagesExchanged: 89,
      materialsDownloaded: 67,
      projectsCreated: 8,
    },
    status: 'completed',
    registrationDeadline: new Date('2024-10-14T23:59:59'),
    tags: ['AI', 'workshop', 'LLM', 'technical'],
    isPublic: true,
  },
  {
    id: 'event4',
    name: 'Czech Founders Meetup',
    date: new Date('2024-11-28T17:30:00'),
    endDate: new Date('2024-11-28T20:00:00'),
    location: 'Node5, Smíchov',
    description: 'Neformální setkání českých founderů pro výměnu zkušeností, problémů a best practices.',
    category: 'meetup',
    organizers: ['organizer1'],
    attendees: ['user1', 'user7'],
    maxAttendees: 40,
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=600&fit=crop',
    agenda: [
      { time: '17:30', title: 'Arrivals & Coffee' },
      { time: '18:00', title: 'Roundtable: Biggest Challenges Right Now' },
      { time: '19:00', title: 'Pizza & Open Discussion' },
    ],
    analytics: {
      totalAttendees: 0,
      checkedIn: 0,
      connectionsMode: 0,
      messagesExchanged: 0,
      materialsDownloaded: 0,
      projectsCreated: 0,
    },
    status: 'upcoming',
    registrationDeadline: new Date('2024-11-27T23:59:59'),
    tags: ['founders', 'meetup', 'casual'],
    isPublic: false,
  },
];

// Mock Mentors (verified professionals)
export const mockMentors: Mentor[] = [
  {
    id: 'mentor1',
    name: 'Jana Nováková',
    role: 'Product Manager',
    company: 'Avast',
    expertise: ['Product Management', 'User Research', 'Agile', 'B2B SaaS'],
    bio: 'Senior PM @ Avast. 8+ let ve vývoji produktů. Pomáhám začínajícím PM najít správný směr.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    isVerified: true,
    followers: 1234,
    location: 'Praha',
  },
  {
    id: 'mentor2',
    name: 'Petr Kočka',
    role: 'Tech Lead',
    company: 'Productboard',
    expertise: ['React', 'TypeScript', 'System Architecture', 'Team Leadership'],
    bio: 'Stavím scalable webové aplikace 10+ let. Ex-Skype, ex-Google. Rád sdílím best practices.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    isVerified: true,
    followers: 2156,
    location: 'Praha',
  },
  {
    id: 'mentor3',
    name: 'Karolína Vrbová',
    role: 'Head of Marketing',
    company: 'Rohlik.cz',
    expertise: ['Growth Marketing', 'SEO', 'Content Strategy', 'Performance Marketing'],
    bio: 'Vedla marketingové týmy v 3 unicornech. Specializuji se na early-stage growth.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    isVerified: true,
    followers: 987,
    location: 'Praha',
  },
  {
    id: 'mentor4',
    name: 'Tomáš Bárta',
    role: 'Founder & CEO',
    company: 'Rossum',
    expertise: ['Fundraising', 'AI/ML Products', 'B2B Sales', 'Company Building'],
    bio: 'Zakladatel Rossum (Series B, $100M valuace). Rád pomáhám začínajícím founderům s fundraisingem.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    isVerified: true,
    followers: 3421,
    location: 'Praha',
  },
  {
    id: 'mentor5',
    name: 'Lucie Maršálková',
    role: 'Senior UX Designer',
    company: 'Figma',
    expertise: ['UX Design', 'Design Systems', 'User Research', 'Prototyping'],
    bio: 'Design v Figma. Dříve Meta & Airbnb. Mentoring pro mladé designery.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    isVerified: true,
    followers: 1567,
    location: 'Remote',
  },
  {
    id: 'mentor6',
    name: 'Martin Dvořák',
    role: 'VC Partner',
    company: 'Credo Ventures',
    expertise: ['Venture Capital', 'Pitch Deck Review', 'Business Model', 'Market Analysis'],
    bio: 'VC investor @ Credo. Pomáhám startupům připravit se na fundraising a pitch.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    isVerified: true,
    followers: 2890,
    location: 'Praha',
  },
];

// Mock Mentor Posts (LinkedIn-style)
export const mockMentorPosts: MentorPost[] = [
  {
    id: 'post1',
    mentorId: 'mentor1',
    type: 'text',
    title: '💡 Jak udělat lepší product roadmap?',
    content: `Častý problém začínajících PM: roadmapa plná featuresů, ale bez jasné strategie.

Moje 5 pravidel pro roadmapu:

1️⃣ Začni "Proč", ne "Co" - každá feature musí mít jasný business důvod
2️⃣ Prioritizuj nemilosrdně - méně je více, focus je klíčový
3️⃣ Měř impact, ne output - zajímá nás hodnota, ne počet featuresů
4️⃣ Komunikuj trade-offy - co NEBUDEME dělat je stejně důležité
5️⃣ Nech prostor pro discovery - 20% času na exploraci

Co vám funguje v product planningu? 👇`,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ['product', 'roadmap', 'pm'],
  },
  {
    id: 'post2',
    mentorId: 'mentor2',
    type: 'article',
    title: '🏗️ System Design: Jak navrhnout scalable backend',
    content: `Napsal jsem nový článek o tom, jak přemýšlet o architektuře backendu pro scale.

Pokrývám:
• Database sharding strategie
• Caching layers (Redis, CDN)
• Load balancing patterns
• Asynchronní processing s queues
• Monitoring a observability

Článek obsahuje real-world příklady z Productboard, kde zpracováváme miliony requestů denně.`,
    media: {
      type: 'link',
      url: 'https://example.com/system-design-guide',
      linkPreview: {
        title: 'System Design Guide: Building Scalable Backends',
        description: 'A practical guide to designing systems that can handle millions of users',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',
      },
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 567,
    comments: 89,
    shares: 143,
    tags: ['engineering', 'architecture', 'backend'],
  },
  {
    id: 'post3',
    mentorId: 'mentor3',
    type: 'text',
    title: '📈 Early-stage marketing: Co dělat PŘED product-market fit',
    content: `Častá chyba: startupuje spustí PPC kampaně dřív, než mají PMF.

Co dělat MÍSTO toho:

✅ Content marketing - vzdělávej svou target audience
✅ Community building - najdi prvních 100 super fans
✅ SEO foundation - investuj do organic od začátku
✅ Product-led growth - ať produkt sám přivádí lidi
✅ Partnerships - spolupracuj s komplementárními produkty

❌ Paid ads před PMF = pálení peněz

Marketing začíná produktem, ne kampaněmi. First things first! 🚀`,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likes: 421,
    comments: 67,
    shares: 34,
    tags: ['marketing', 'growth', 'startup'],
  },
  {
    id: 'post4',
    mentorId: 'mentor4',
    type: 'ama',
    title: '🎤 AMA: Ask Me Anything o fundraisingu',
    content: `Čauky! V sobotu 14. prosince dělám AMA session o fundraisingu.

Můžete se ptát na cokoliv:
• Jak připravit pitch deck
• Due diligence process
• Term sheet negotiations
• Investor meetings best practices
• Red flags ve fundraisingu

📅 14.12. od 15:00
📍 Online (link pošlu den před)
🎟️ Free, ale registrace nutná

Registrace: konekt.cz/events/ama-fundraising

See you there! 🚀`,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    likes: 892,
    comments: 234,
    shares: 167,
    tags: ['ama', 'fundraising', 'event'],
  },
  {
    id: 'post5',
    mentorId: 'mentor5',
    type: 'video',
    title: '🎨 Design System 101: Od nuly k shipping',
    content: `Nahrála jsem nové video o tom, jak vytvořit design system od základů.

Ukážu vám náš process ve Figma:
• Atomic design principles
• Component library organizace
• Design tokens setup
• Documentation best practices
• Handoff pro developers

Video je 23 min, ale stojí to za to! Link v komentářích 👇`,
    media: {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 678,
    comments: 123,
    shares: 89,
    tags: ['design', 'figma', 'tutorial'],
  },
  {
    id: 'post6',
    mentorId: 'mentor6',
    type: 'job',
    title: '💼 Hledáme junior PM do našeho portfolio startupu',
    content: `Credo portfólio company hledá junior PM!

📍 Praha (hybrid)
💰 60-80k CZK/měsíc + equity
🚀 Fast-growing SaaS startup (Series A)

Co budeš dělat:
• Ownership nad jednou product areou
• User research & discovery
• Roadmap planning
• Cross-functional collaboration

Co hledáme:
• 1-2 roky experience (nebo super motivated junior)
• Technical background je plus
• Agile/Scrum experience
• Dobrá angličtina

Pošlete CV na careers@credoventures.com nebo mi napište!`,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 156,
    comments: 34,
    shares: 45,
    tags: ['job', 'hiring', 'product'],
  },
  {
    id: 'post7',
    mentorId: 'mentor1',
    type: 'text',
    title: '🎯 User research tip: Přestaňte se ptát "Líbil by se vám..."',
    content: `Nejčastější chyba v user interviews: Ptáte se na názory místo chování.

❌ "Líbil by se vám feature X?"
✅ "Kdy naposledy jste měli tento problém? Jak jste ho vyřešili?"

❌ "Používali byste tuto funkci?"
✅ "Popište mi váš typický workflow..."

❌ "Co by vám pomohlo?"
✅ "Jaký byl váš nejhorší zážitek s...?"

Users neví, co chtějí. Ale vědí, co dělají a proč. Focus na chování, ne opinions!

#productmanagement #userresearch #UX`,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    likes: 891,
    comments: 145,
    shares: 234,
    tags: ['research', 'ux', 'pm'],
  },
  {
    id: 'post8',
    mentorId: 'mentor3',
    type: 'text',
    title: '🔥 Growth hack: Jak jsme získali prvních 10k users za 3 měsíce',
    content: `Case study z našeho startupu před 2 lety:

Měli jsme produkt, $0 na marketing, a 3 měsíce na growth.

Co fungovalo:
1. Product Hunt launch (2.3k users první den)
2. Reddit communities (organic, no spam)
3. Free tier + viral referral program
4. Content marketing on Medium (SEO gold)
5. Cold email outreach s REAL value proposition

Co NEFUNGOVALO:
❌ Facebook ads (burnt $5k, 0 conversions)
❌ Influencer marketing
❌ Generic LinkedIn posts

Klíč: Najít kde vaši early adopters jsou, a přinést jim hodnotu tam.

Kde vy hledáte své first users? 👇`,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    likes: 1234,
    comments: 289,
    shares: 456,
    tags: ['growth', 'startup', 'marketing'],
  },
];
