import type { User, Channel, Post, Mentor } from '@/types';

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

const mentor1: User = {
  id: '1',
  name: 'Jan Novák',
  email: 'jan@example.com',
  school: 'ČVUT',
  skills: ['TypeScript', 'React', 'Next.js'],
  bio: 'Lead Developer @ Rohlík.cz',
  role: 'mentor',
};

const mentor2: User = {
  id: '2',
  name: 'Petra Svobodová',
  email: 'petra@example.com',
  school: 'VŠE',
  skills: ['Product Management', 'SaaS'],
  bio: 'Product Manager @ Mews Systems',
  role: 'mentor',
};

const mentor3: User = {
  id: '3',
  name: 'Tomáš Dvořák',
  email: 'tomas@example.com',
  school: 'MU',
  skills: ['Marketing', 'Growth'],
  bio: 'Growth Lead @ Kiwi.com',
  role: 'mentor',
};

export const mockPosts: Post[] = [
  {
    id: '1',
    author: mentor1,
    content: '🚀 Hledáte svou první práci v tech? Dám vám 3 tipy, které mi fungovaly:\n\n1. Portfolio > CV - Postavte reálný projekt\n2. Networkujte aktivně - 70% pracovních nabídek je skrytých\n3. Buďte vidět - GitHub, Twitter, meetupy\n\nKdo chce vědět víc, napište mi!',
    channel: mockChannels[0],
    createdAt: new Date('2024-11-18'),
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    author: mentor2,
    content: 'Včera jsem měla mentoring call s 5 studenty z BeNextOne. Energie a nadšení byly neuvěřitelné! 💪\n\nNejčastější otázka: "Jak se stát Product Managerem?"\n\nMůj odpověď: Začněte s vlastním produktem. I když je malý. Naučíte se víc než z jakéhokoli kurzu.',
    channel: mockChannels[0],
    createdAt: new Date('2024-11-17'),
    likes: 38,
    comments: 12,
  },
  {
    id: '3',
    author: mentor3,
    content: 'Pro všechny z Startup Jobs Fair:\n\nNabízím 30min mentoring callů zdarma pro prvních 10 lidí, kteří mi napíší.\n\nMůžeme probrat:\n✅ Kariérní směřování\n✅ CV a LinkedIn optimalizace\n✅ Jak oslovit zaměstnavatele\n\nPište! 🎯',
    channel: mockChannels[3],
    createdAt: new Date('2024-11-16'),
    likes: 56,
    comments: 23,
  },
];
