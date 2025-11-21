import { mockUsers } from './mock-data';

export type EventCategory = 'conference' | 'workshop' | 'networking' | 'online' | 'social' | 'competition' | 'meetup';
export type EventStatus = 'going' | 'interested' | 'not_going' | 'none';

export interface CalendarEvent {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  location: string;
  isOnline: boolean;
  coverImage: string;
  attendeeCount: number;
  interestedCount: number;
  yourStatus: EventStatus;
  networkAttending: number; // How many from your network are going
  featured: boolean;
  isMultiDay: boolean;
  agenda?: EventAgendaItem[];
  organizer: {
    name: string;
    logo: string;
  };
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description?: string;
  type: 'keynote' | 'workshop' | 'panel' | 'networking' | 'break' | 'social';
  enrolled?: boolean;
}

export const calendarEvents: CalendarEvent[] = [
  // November Events
  {
    id: 'event1',
    name: 'BeNextOne 2024',
    description: 'Největší studentská startup konference v ČR',
    category: 'conference',
    startDate: new Date('2024-11-15T09:00:00'),
    endDate: new Date('2024-11-16T18:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    attendeeCount: 250,
    interestedCount: 89,
    yourStatus: 'going',
    networkAttending: 23,
    featured: true,
    isMultiDay: true,
    organizer: {
      name: 'BeNextOne',
      logo: '🎪',
    },
    agenda: [
      {
        time: '09:00 - 10:00',
        title: 'Registration & Breakfast',
        type: 'networking',
      },
      {
        time: '10:00 - 11:30',
        title: 'Keynote: AI in Czech Startups',
        description: 'Main stage presentation',
        type: 'keynote',
      },
      {
        time: '11:45 - 13:00',
        title: 'Workshop: AI Tools for Startups',
        description: 'Hands-on workshop',
        type: 'workshop',
        enrolled: true,
      },
      {
        time: '13:00 - 14:00',
        title: 'Lunch & Networking',
        type: 'break',
      },
      {
        time: '14:00 - 15:30',
        title: 'Workshop: Pitch Deck Mastery',
        type: 'workshop',
      },
      {
        time: '15:45 - 17:00',
        title: 'Panel Discussion: Funding in 2024',
        type: 'panel',
      },
      {
        time: '17:00 - 18:00',
        title: 'After Party',
        type: 'social',
      },
    ],
  },
  {
    id: 'event-nov-23',
    name: 'AI Tools for Startups Workshop',
    description: 'Praktický workshop o AI nástrojích',
    category: 'workshop',
    startDate: new Date('2024-11-23T18:00:00'),
    endDate: new Date('2024-11-23T20:00:00'),
    location: 'Online (Zoom)',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    attendeeCount: 85,
    interestedCount: 134,
    yourStatus: 'interested',
    networkAttending: 7,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'AI Prague',
      logo: '🤖',
    },
  },
  {
    id: 'event-nov-29',
    name: 'Prague Startup Networking Night',
    description: 'Neformální setkání startup komunity',
    category: 'networking',
    startDate: new Date('2024-11-29T18:30:00'),
    endDate: new Date('2024-11-29T21:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    attendeeCount: 45,
    interestedCount: 23,
    yourStatus: 'none',
    networkAttending: 8,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Startup Prague',
      logo: '💼',
    },
  },

  // December Events
  {
    id: 'event-dec-5',
    name: 'Coffee & Code Meetup',
    description: 'Ranní setkání developerů',
    category: 'social',
    startDate: new Date('2024-12-05T08:00:00'),
    endDate: new Date('2024-12-05T10:00:00'),
    location: 'Kavárna Manifesto',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    attendeeCount: 15,
    interestedCount: 8,
    yourStatus: 'none',
    networkAttending: 3,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'DevMeetup',
      logo: '☕',
    },
  },
  {
    id: 'event-dec-12',
    name: 'Tech Meetup Prague',
    description: 'Měsíční tech meetup',
    category: 'meetup',
    startDate: new Date('2024-12-12T18:00:00'),
    endDate: new Date('2024-12-12T21:00:00'),
    location: 'Node5',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
    attendeeCount: 67,
    interestedCount: 34,
    yourStatus: 'interested',
    networkAttending: 12,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Tech Prague',
      logo: '💻',
    },
  },
  {
    id: 'event-dec-20',
    name: 'Startup Pitch Competition',
    description: 'Soutěž o nejlepší pitch',
    category: 'competition',
    startDate: new Date('2024-12-20T16:00:00'),
    endDate: new Date('2024-12-20T20:00:00'),
    location: 'Impact Hub Brno',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1559223607-a43c990e512f?w=800',
    attendeeCount: 120,
    interestedCount: 56,
    yourStatus: 'none',
    networkAttending: 5,
    featured: true,
    isMultiDay: false,
    organizer: {
      name: 'StartupYard',
      logo: '🏆',
    },
  },

  // January 2025 Events
  {
    id: 'event-jan-10',
    name: 'New Year Networking Brunch',
    description: 'Novoroční networking',
    category: 'networking',
    startDate: new Date('2025-01-10T10:00:00'),
    endDate: new Date('2025-01-10T13:00:00'),
    location: 'Hub Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
    attendeeCount: 35,
    interestedCount: 42,
    yourStatus: 'none',
    networkAttending: 6,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Hub Hub',
      logo: '🥂',
    },
  },
  {
    id: 'event-jan-18',
    name: 'Web3 & Blockchain Workshop',
    description: 'Úvod do Web3 a blockchainu',
    category: 'workshop',
    startDate: new Date('2025-01-18T14:00:00'),
    endDate: new Date('2025-01-18T18:00:00'),
    location: 'Online',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    attendeeCount: 156,
    interestedCount: 203,
    yourStatus: 'interested',
    networkAttending: 9,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'CryptoHub',
      logo: '₿',
    },
  },
  {
    id: 'event-jan-25',
    name: 'Founders Friday',
    description: 'Setkání founderů',
    category: 'meetup',
    startDate: new Date('2025-01-25T17:00:00'),
    endDate: new Date('2025-01-25T20:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
    attendeeCount: 28,
    interestedCount: 19,
    yourStatus: 'none',
    networkAttending: 4,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Founders Club',
      logo: '👔',
    },
  },

  // February 2025 Events
  {
    id: 'event-feb-7',
    name: 'Design Systems Workshop',
    description: 'Naučte se vytvářet design systémy',
    category: 'workshop',
    startDate: new Date('2025-02-07T09:00:00'),
    endDate: new Date('2025-02-07T17:00:00'),
    location: 'Designblok Praha',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    attendeeCount: 45,
    interestedCount: 67,
    yourStatus: 'none',
    networkAttending: 11,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Design Matters',
      logo: '🎨',
    },
  },
  {
    id: 'event-feb-14',
    name: 'Valentine\'s Startup Speed Dating',
    description: 'Najdi si co-foundera!',
    category: 'social',
    startDate: new Date('2025-02-14T18:00:00'),
    endDate: new Date('2025-02-14T21:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
    attendeeCount: 52,
    interestedCount: 38,
    yourStatus: 'interested',
    networkAttending: 14,
    featured: true,
    isMultiDay: false,
    organizer: {
      name: 'Startup Dating',
      logo: '💕',
    },
  },
  {
    id: 'event-feb-20',
    name: 'Product Management Masterclass',
    description: 'Jak být skvělý PM',
    category: 'workshop',
    startDate: new Date('2025-02-20T10:00:00'),
    endDate: new Date('2025-02-20T16:00:00'),
    location: 'Online',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    attendeeCount: 189,
    interestedCount: 245,
    yourStatus: 'none',
    networkAttending: 18,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'PM School',
      logo: '📊',
    },
  },

  // March 2025 Events
  {
    id: 'event-festup',
    name: 'Festup 2025',
    description: 'Největší startup festival ve střední Evropě',
    category: 'conference',
    startDate: new Date('2025-03-15T09:00:00'),
    endDate: new Date('2025-03-16T19:00:00'),
    location: 'Brno Exhibition Centre',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    attendeeCount: 1200,
    interestedCount: 456,
    yourStatus: 'interested',
    networkAttending: 47,
    featured: true,
    isMultiDay: true,
    organizer: {
      name: 'Festup',
      logo: '🎉',
    },
  },
  {
    id: 'event-mar-22',
    name: 'Growth Hacking Workshop',
    description: 'Jak růst rychle a efektivně',
    category: 'workshop',
    startDate: new Date('2025-03-22T13:00:00'),
    endDate: new Date('2025-03-22T18:00:00'),
    location: 'Node5 Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    attendeeCount: 78,
    interestedCount: 92,
    yourStatus: 'none',
    networkAttending: 15,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Growth Academy',
      logo: '📈',
    },
  },
  {
    id: 'event-mar-28',
    name: 'Women in Tech Meetup',
    description: 'Setkání žen v tech',
    category: 'meetup',
    startDate: new Date('2025-03-28T17:30:00'),
    endDate: new Date('2025-03-28T20:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    attendeeCount: 42,
    interestedCount: 31,
    yourStatus: 'none',
    networkAttending: 8,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'WomenTech',
      logo: '👩‍💻',
    },
  },

  // April 2025 Events
  {
    id: 'event-apr-5',
    name: 'Startup Funding 101',
    description: 'Jak získat investici',
    category: 'workshop',
    startDate: new Date('2025-04-05T10:00:00'),
    endDate: new Date('2025-04-05T13:00:00'),
    location: 'Online',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=800',
    attendeeCount: 234,
    interestedCount: 312,
    yourStatus: 'interested',
    networkAttending: 21,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Startup Finance',
      logo: '💰',
    },
  },
  {
    id: 'event-apr-12',
    name: 'Hackathon Prague 2025',
    description: '48 hodinový hackathon',
    category: 'competition',
    startDate: new Date('2025-04-12T18:00:00'),
    endDate: new Date('2025-04-14T18:00:00'),
    location: 'Czech Technical University',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    attendeeCount: 156,
    interestedCount: 89,
    yourStatus: 'none',
    networkAttending: 19,
    featured: true,
    isMultiDay: true,
    organizer: {
      name: 'HackPrague',
      logo: '⚡',
    },
  },
  {
    id: 'event-apr-18',
    name: 'UX/UI Design Sprint',
    description: 'Týdenní design sprint',
    category: 'workshop',
    startDate: new Date('2025-04-18T09:00:00'),
    endDate: new Date('2025-04-18T17:00:00'),
    location: 'Designblok Praha',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800',
    attendeeCount: 32,
    interestedCount: 45,
    yourStatus: 'none',
    networkAttending: 7,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'UX Prague',
      logo: '🎯',
    },
  },
  {
    id: 'event-apr-25',
    name: 'Startup Office Hours',
    description: 'Poraď se s experty',
    category: 'meetup',
    startDate: new Date('2025-04-25T14:00:00'),
    endDate: new Date('2025-04-25T18:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800',
    attendeeCount: 24,
    interestedCount: 18,
    yourStatus: 'none',
    networkAttending: 4,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Mentor Network',
      logo: '🎓',
    },
  },

  // May 2025 Events
  {
    id: 'event-dny-ai',
    name: 'Dny AI 2025',
    description: 'Konference o umělé inteligenci',
    category: 'conference',
    startDate: new Date('2025-05-20T09:00:00'),
    endDate: new Date('2025-05-21T18:00:00'),
    location: 'Forum Karlín, Praha',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    attendeeCount: 850,
    interestedCount: 412,
    yourStatus: 'interested',
    networkAttending: 34,
    featured: true,
    isMultiDay: true,
    organizer: {
      name: 'AI Czech',
      logo: '🤖',
    },
  },
  {
    id: 'event-may-10',
    name: 'Marketing for Startups',
    description: 'Jak dělat marketing s malým rozpočtem',
    category: 'workshop',
    startDate: new Date('2025-05-10T10:00:00'),
    endDate: new Date('2025-05-10T15:00:00'),
    location: 'Online',
    isOnline: true,
    coverImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800',
    attendeeCount: 167,
    interestedCount: 198,
    yourStatus: 'none',
    networkAttending: 13,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Marketing Lab',
      logo: '📱',
    },
  },
  {
    id: 'event-may-30',
    name: 'Startup BBQ & Beers',
    description: 'Letní grilování startup komunity',
    category: 'social',
    startDate: new Date('2025-05-30T16:00:00'),
    endDate: new Date('2025-05-30T22:00:00'),
    location: 'Náplavka Praha',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    attendeeCount: 89,
    interestedCount: 67,
    yourStatus: 'interested',
    networkAttending: 22,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Startup Community',
      logo: '🍺',
    },
  },

  // June 2025 Events
  {
    id: 'event-jun-7',
    name: 'Product-Market Fit Workshop',
    description: 'Jak najít product-market fit',
    category: 'workshop',
    startDate: new Date('2025-06-07T09:00:00'),
    endDate: new Date('2025-06-07T17:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    attendeeCount: 56,
    interestedCount: 72,
    yourStatus: 'none',
    networkAttending: 10,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'PMF Academy',
      logo: '🎯',
    },
  },
  {
    id: 'event-jun-14',
    name: 'SaaS Summit Prague',
    description: 'Konference o SaaS businessu',
    category: 'conference',
    startDate: new Date('2025-06-14T09:00:00'),
    endDate: new Date('2025-06-14T18:00:00'),
    location: 'Hilton Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    attendeeCount: 320,
    interestedCount: 178,
    yourStatus: 'none',
    networkAttending: 16,
    featured: true,
    isMultiDay: false,
    organizer: {
      name: 'SaaS Europe',
      logo: '☁️',
    },
  },
  {
    id: 'event-jun-21',
    name: 'Crypto & Blockchain Meetup',
    description: 'Měsíční crypto meetup',
    category: 'meetup',
    startDate: new Date('2025-06-21T18:00:00'),
    endDate: new Date('2025-06-21T21:00:00'),
    location: 'Node5 Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
    attendeeCount: 47,
    interestedCount: 38,
    yourStatus: 'none',
    networkAttending: 6,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Crypto Prague',
      logo: '₿',
    },
  },
  {
    id: 'event-jun-28',
    name: 'End of School Startup Party',
    description: 'Oslava konce školního roku',
    category: 'social',
    startDate: new Date('2025-06-28T19:00:00'),
    endDate: new Date('2025-06-29T02:00:00'),
    location: 'Cross Club Praha',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    attendeeCount: 156,
    interestedCount: 201,
    yourStatus: 'interested',
    networkAttending: 38,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Student Hub',
      logo: '🎊',
    },
  },

  // July 2025 Events
  {
    id: 'event-jul-5',
    name: 'Summer Startup Bootcamp',
    description: 'Týdenní intenzivní bootcamp',
    category: 'workshop',
    startDate: new Date('2025-07-05T09:00:00'),
    endDate: new Date('2025-07-11T18:00:00'),
    location: 'Impact Hub Prague',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    attendeeCount: 24,
    interestedCount: 45,
    yourStatus: 'none',
    networkAttending: 5,
    featured: true,
    isMultiDay: true,
    organizer: {
      name: 'Bootcamp Academy',
      logo: '⛺',
    },
  },
  {
    id: 'event-jul-19',
    name: 'Tech Picnic in the Park',
    description: 'Letní piknik tech komunity',
    category: 'social',
    startDate: new Date('2025-07-19T14:00:00'),
    endDate: new Date('2025-07-19T19:00:00'),
    location: 'Stromovka Park',
    isOnline: false,
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
    attendeeCount: 67,
    interestedCount: 54,
    yourStatus: 'none',
    networkAttending: 12,
    featured: false,
    isMultiDay: false,
    organizer: {
      name: 'Tech Community',
      logo: '🌳',
    },
  },
];

// Helper functions
export function getEventsByMonth(year: number, month: number): CalendarEvent[] {
  return calendarEvents.filter((event) => {
    const eventDate = new Date(event.startDate);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

export function getUpcomingEvents(limit: number = 10): CalendarEvent[] {
  const now = new Date();
  return calendarEvents
    .filter((event) => event.startDate >= now)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, limit);
}

export function getUserEvents(): CalendarEvent[] {
  return calendarEvents.filter(
    (event) => event.yourStatus === 'going' || event.yourStatus === 'interested'
  );
}

export function getRecommendedEvents(): CalendarEvent[] {
  return calendarEvents
    .filter((event) => event.yourStatus === 'none' && event.networkAttending > 5)
    .sort((a, b) => b.networkAttending - a.networkAttending)
    .slice(0, 6);
}

export function getEventById(id: string): CalendarEvent | undefined {
  return calendarEvents.find((event) => event.id === id);
}

export const eventCategoryConfig = {
  conference: { label: 'Conference', icon: '🎪', color: 'bg-purple-500' },
  workshop: { label: 'Workshop', icon: '🎓', color: 'bg-blue-500' },
  networking: { label: 'Networking', icon: '💼', color: 'bg-green-500' },
  online: { label: 'Online', icon: '💻', color: 'bg-indigo-500' },
  social: { label: 'Social', icon: '🎉', color: 'bg-pink-500' },
  competition: { label: 'Competition', icon: '🏆', color: 'bg-yellow-500' },
  meetup: { label: 'Meetup', icon: '🤝', color: 'bg-teal-500' },
};
