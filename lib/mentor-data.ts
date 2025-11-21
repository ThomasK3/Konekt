export type ExpertiseArea = 'technology' | 'design' | 'marketing' | 'business' | 'product' | 'fundraising';
export type SessionType = 'intro' | 'focused' | 'package';
export type SessionStatus = 'upcoming' | 'completed' | 'cancelled';
export type BookingStatus = 'pending' | 'accepted' | 'declined';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  languages: string[];
  photo: string;
  coverPhoto: string;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  isAvailable: boolean;
  nextAvailable?: string;

  // About
  bio: string;
  canHelpWith: string[];

  // Background
  experience: {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string;
  }[];

  education: {
    school: string;
    degree: string;
    period: string;
  }[];

  // Expertise
  primarySkills: {
    name: string;
    rating: number;
    description: string;
    yearsExperience: number;
    projectsCompleted: number;
  }[];

  secondarySkills: {
    name: string;
    rating: number;
    description: string;
  }[];

  industries: string[];
  tools: string[];

  // Achievements
  achievements: string[];

  // Social
  social: {
    linkedin?: string;
    twitter?: string;
    blog?: string;
    website?: string;
  };

  // Availability
  sessionTypes: {
    type: SessionType;
    duration: number;
    price?: number;
    description: string;
  }[];

  availability: {
    dayOfWeek: number; // 0-6
    slots: string[]; // e.g., ["14:00", "15:30"]
  }[];

  maxSessionsPerWeek: number;
  bufferMinutes: number;

  // Content
  posts?: {
    id: string;
    title: string;
    type: 'article' | 'video';
    content: string;
    postedAt: Date;
    readTime?: number;
    watchTime?: number;
    views: number;
    likes: number;
    comments: number;
  }[];

  speaking?: {
    event: string;
    title: string;
    date: Date;
  }[];
}

export interface Review {
  id: string;
  mentorId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  sessionTopic: string;
  sessionDuration: number;
  createdAt: Date;
  helpfulCount: number;
}

export interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorPhoto: string;
  mentorTitle: string;
  menteeId: string;
  menteeName: string;
  menteePhoto: string;

  type: SessionType;
  duration: number;
  scheduledAt: Date;
  status: SessionStatus;

  topic: string;
  background?: string;
  format: 'video' | 'phone' | 'in-person';
  meetingLink?: string;

  prepNotes?: string;
  review?: {
    rating: number;
    comment: string;
  };
}

export interface BookingRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  menteeName: string;
  menteePhoto: string;

  requestedDate: Date;
  requestedTime: string;
  topic: string;
  background?: string;

  status: BookingStatus;
  createdAt: Date;
}

// Mock Mentors
export const mentors: Mentor[] = [
  {
    id: 'mentor1',
    name: 'Eva Novotná',
    title: 'Marketing Lead',
    company: 'Y Soft',
    location: 'Praha',
    languages: ['Czech', 'English'],
    photo: 'https://i.pravatar.cc/400?img=5',
    coverPhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 45,
    sessionsCompleted: 156,
    isAvailable: true,
    nextAvailable: 'Wed, Nov 22',

    bio: "Hi! I'm Eva, Marketing Lead at Y Soft with 8+ years experience in B2B SaaS marketing. I love helping young founders think through their go-to-market strategy.\n\nI've been mentoring for 3 years and had the privilege to work with 40+ startups in Czech Republic.",

    canHelpWith: [
      'Go-to-market strategy',
      'Content marketing',
      'Growth hacking for B2B',
      'Building marketing teams',
      'Brand positioning'
    ],

    experience: [
      {
        title: 'Marketing Lead',
        company: 'Y Soft',
        period: '2019 - Present',
        location: 'Praha',
        description: 'Leading marketing for enterprise print management solutions. Grew MRR from 2M to 8M.'
      },
      {
        title: 'Growth Marketing Manager',
        company: 'Mews',
        period: '2016 - 2019',
        location: 'Praha',
        description: 'Early employee (#15). Built marketing from scratch.'
      }
    ],

    education: [
      {
        school: 'VŠE Prague',
        degree: 'Marketing & Management',
        period: '2012-2016'
      }
    ],

    primarySkills: [
      {
        name: 'Marketing Strategy',
        rating: 5,
        description: 'Go-to-market planning, positioning, messaging',
        yearsExperience: 15,
        projectsCompleted: 40
      },
      {
        name: 'Growth Marketing',
        rating: 5,
        description: 'Acquisition, conversion, retention, analytics',
        yearsExperience: 12,
        projectsCompleted: 30
      },
      {
        name: 'Content Marketing',
        rating: 5,
        description: 'Blog strategy, SEO, thought leadership',
        yearsExperience: 10,
        projectsCompleted: 50
      }
    ],

    secondarySkills: [
      {
        name: 'Fundraising & Pitch',
        rating: 4,
        description: 'Investor deck, messaging, storytelling'
      },
      {
        name: 'Team Building',
        rating: 4,
        description: 'Hiring, culture, management'
      }
    ],

    industries: ['B2B SaaS', 'Enterprise Software', 'PropTech', 'FinTech'],
    tools: ['HubSpot', 'Google Analytics', 'Mixpanel', 'Mailchimp', 'SEMrush', 'Ahrefs', 'Figma', 'Notion'],

    achievements: [
      'Marketing Professional of the Year 2023 (Czechia)',
      'Speaker at 15+ conferences (Festup, BeNextOne, etc.)',
      'Advisor to 3 VC-backed startups'
    ],

    social: {
      linkedin: 'linkedin.com/in/evanovotna',
      twitter: '@eva_marketing',
      blog: 'evanovotna.cz',
      website: 'ysoft.com'
    },

    sessionTypes: [
      {
        type: 'intro',
        duration: 30,
        price: 0,
        description: 'Get to know each other, discuss your goals'
      },
      {
        type: 'focused',
        duration: 60,
        description: 'Deep dive on specific challenge. Best for: Strategy, feedback, problem-solving'
      },
      {
        type: 'package',
        duration: 240,
        description: 'Monthly mentorship with ongoing support. Best for: Long-term guidance, accountability'
      }
    ],

    availability: [
      { dayOfWeek: 3, slots: ['14:00', '15:30', '17:00'] }, // Wednesday
      { dayOfWeek: 4, slots: ['10:00', '14:30'] }, // Thursday
      { dayOfWeek: 5, slots: ['09:00', '11:00', '15:00'] } // Friday
    ],

    maxSessionsPerWeek: 3,
    bufferMinutes: 30,

    posts: [
      {
        id: 'post1',
        title: 'Why Most B2B Startups Get Marketing Wrong',
        type: 'article',
        content: "Here's the uncomfortable truth: your product isn't bad, your marketing is. After working with 40+ startups...",
        postedAt: new Date('2024-11-18'),
        readTime: 5,
        views: 234,
        likes: 45,
        comments: 12
      }
    ],

    speaking: [
      {
        event: 'BeNextOne 2024',
        title: 'Growth Marketing for B2B',
        date: new Date('2024-11-15')
      }
    ]
  },

  {
    id: 'mentor2',
    name: 'Petr Svoboda',
    title: 'VC Partner',
    company: 'Tensor VC',
    location: 'Praha',
    languages: ['Czech', 'English'],
    photo: 'https://i.pravatar.cc/400?img=12',
    coverPhoto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    rating: 5.0,
    reviewCount: 67,
    sessionsCompleted: 203,
    isAvailable: true,
    nextAvailable: 'Fri, Nov 24',

    bio: "VC Partner at Tensor VC, focused on early-stage B2B SaaS companies in CEE. I've evaluated 500+ pitches and invested in 15 startups.\n\nI love helping founders understand the investor mindset and craft compelling narratives.",

    canHelpWith: [
      'Fundraising strategy',
      'Pitch deck feedback',
      'Investor relations',
      'Valuation & term sheets',
      'Business model validation'
    ],

    experience: [
      {
        title: 'Partner',
        company: 'Tensor VC',
        period: '2020 - Present',
        location: 'Praha',
        description: 'Leading early-stage investments in B2B SaaS. €50M fund. 15 portfolio companies.'
      },
      {
        title: 'Investment Manager',
        company: 'Credo Ventures',
        period: '2017 - 2020',
        location: 'Praha',
        description: 'Sourcing and evaluating early-stage opportunities across CEE.'
      }
    ],

    education: [
      {
        school: 'ČVUT Prague',
        degree: 'Computer Science',
        period: '2010-2015'
      }
    ],

    primarySkills: [
      {
        name: 'Fundraising Strategy',
        rating: 5,
        description: 'End-to-end fundraising, from deck to close',
        yearsExperience: 7,
        projectsCompleted: 50
      },
      {
        name: 'Pitch Coaching',
        rating: 5,
        description: 'Storytelling, slides, delivery',
        yearsExperience: 7,
        projectsCompleted: 200
      },
      {
        name: 'Business Model',
        rating: 5,
        description: 'Unit economics, pricing, market sizing',
        yearsExperience: 10,
        projectsCompleted: 100
      }
    ],

    secondarySkills: [
      {
        name: 'Strategy',
        rating: 5,
        description: 'Market entry, competitive positioning'
      }
    ],

    industries: ['B2B SaaS', 'FinTech', 'Enterprise Software', 'AI/ML'],
    tools: ['Notion', 'Miro', 'Pitch', 'Google Sheets'],

    achievements: [
      'Helped raise €100M+ total across portfolio',
      'Judge at Startup Awards 2023',
      'Lecturer at Prague Startup School'
    ],

    social: {
      linkedin: 'linkedin.com/in/petrsvoboda',
      twitter: '@petr_vc'
    },

    sessionTypes: [
      {
        type: 'intro',
        duration: 30,
        price: 0,
        description: 'Quick intro, pitch review'
      },
      {
        type: 'focused',
        duration: 60,
        description: 'Deep dive on fundraising strategy, deck feedback'
      }
    ],

    availability: [
      { dayOfWeek: 2, slots: ['16:00', '17:30'] }, // Tuesday
      { dayOfWeek: 5, slots: ['14:00', '15:30'] } // Friday
    ],

    maxSessionsPerWeek: 2,
    bufferMinutes: 30
  },

  {
    id: 'mentor3',
    name: 'Jana Kolářová',
    title: 'Senior Tech Lead',
    company: 'Avast',
    location: 'Praha',
    languages: ['Czech', 'English'],
    photo: 'https://i.pravatar.cc/400?img=47',
    coverPhoto: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 34,
    sessionsCompleted: 89,
    isAvailable: false,

    bio: "Tech Lead at Avast with 12+ years in software engineering. I specialize in building scalable systems and leading engineering teams.\n\nPassionate about helping junior/mid-level engineers level up their technical and leadership skills.",

    canHelpWith: [
      'System design & architecture',
      'Technical leadership',
      'Career growth in tech',
      'Code review & best practices',
      'Team management'
    ],

    experience: [
      {
        title: 'Senior Tech Lead',
        company: 'Avast',
        period: '2019 - Present',
        location: 'Praha',
        description: 'Leading platform team (15 engineers). Built microservices serving 400M users.'
      },
      {
        title: 'Senior Engineer',
        company: 'Socialbakers',
        period: '2015 - 2019',
        location: 'Praha',
        description: 'Full-stack development for social media analytics platform.'
      }
    ],

    education: [
      {
        school: 'ČVUT Prague',
        degree: 'Software Engineering',
        period: '2008-2013'
      }
    ],

    primarySkills: [
      {
        name: 'System Architecture',
        rating: 5,
        description: 'Microservices, scalability, distributed systems',
        yearsExperience: 12,
        projectsCompleted: 25
      },
      {
        name: 'Technical Leadership',
        rating: 5,
        description: 'Team building, mentoring, technical strategy',
        yearsExperience: 8,
        projectsCompleted: 15
      },
      {
        name: 'Backend Development',
        rating: 5,
        description: 'Node.js, Python, Go, databases',
        yearsExperience: 12,
        projectsCompleted: 50
      }
    ],

    secondarySkills: [
      {
        name: 'DevOps & Cloud',
        rating: 4,
        description: 'AWS, Docker, Kubernetes, CI/CD'
      }
    ],

    industries: ['Cybersecurity', 'B2B SaaS', 'Social Media'],
    tools: ['Node.js', 'Python', 'Go', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],

    achievements: [
      'Built platform serving 400M+ users',
      'Speaker at Node.js Prague meetup',
      'Mentored 20+ engineers to senior roles'
    ],

    social: {
      linkedin: 'linkedin.com/in/janakolarova',
      blog: 'janakolarova.dev'
    },

    sessionTypes: [
      {
        type: 'intro',
        duration: 30,
        price: 0,
        description: 'Get to know each other'
      },
      {
        type: 'focused',
        duration: 60,
        description: 'Technical deep dive, architecture review, career advice'
      }
    ],

    availability: [
      { dayOfWeek: 1, slots: ['18:00', '19:00'] }, // Monday evening
      { dayOfWeek: 3, slots: ['18:00'] } // Wednesday evening
    ],

    maxSessionsPerWeek: 2,
    bufferMinutes: 30
  },

  {
    id: 'mentor4',
    name: 'Martin Novák',
    title: 'Full-stack Developer',
    company: 'Mews Systems',
    location: 'Praha',
    languages: ['Czech', 'English'],
    photo: 'https://i.pravatar.cc/400?img=13',
    coverPhoto: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 23,
    sessionsCompleted: 67,
    isAvailable: true,
    nextAvailable: 'Mon, Nov 20',

    bio: "Full-stack developer at Mews with focus on React and Node.js. I help startups build their tech stack from scratch.\n\nLove working with early-stage founders on technical strategy and MVP development.",

    canHelpWith: [
      'React & modern frontend',
      'Node.js backend development',
      'Startup tech stack',
      'Team building for tech',
      'MVP development strategy'
    ],

    experience: [
      {
        title: 'Full-stack Developer',
        company: 'Mews Systems',
        period: '2020 - Present',
        location: 'Praha',
        description: 'Building hotel management software used by 5000+ properties.'
      }
    ],

    education: [
      {
        school: 'VUT Brno',
        degree: 'Computer Science',
        period: '2015-2020'
      }
    ],

    primarySkills: [
      {
        name: 'React Development',
        rating: 5,
        description: 'React, Next.js, TypeScript, state management',
        yearsExperience: 6,
        projectsCompleted: 30
      },
      {
        name: 'Node.js Backend',
        rating: 4,
        description: 'Express, APIs, databases, authentication',
        yearsExperience: 5,
        projectsCompleted: 25
      }
    ],

    secondarySkills: [
      {
        name: 'Startup Tech',
        rating: 4,
        description: 'Tech stack decisions, MVP planning'
      }
    ],

    industries: ['SaaS', 'PropTech'],
    tools: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],

    achievements: [
      'Built 10+ MVPs for startups',
      'Active contributor to open source'
    ],

    social: {
      linkedin: 'linkedin.com/in/martinnovak',
      twitter: '@martin_codes'
    },

    sessionTypes: [
      {
        type: 'intro',
        duration: 30,
        price: 0,
        description: 'Quick tech advice'
      },
      {
        type: 'focused',
        duration: 60,
        description: 'Code review, architecture, tech decisions'
      }
    ],

    availability: [
      { dayOfWeek: 1, slots: ['17:00', '18:30'] },
      { dayOfWeek: 3, slots: ['17:00'] }
    ],

    maxSessionsPerWeek: 3,
    bufferMinutes: 30
  },

  {
    id: 'mentor5',
    name: 'Lucie Svobodová',
    title: 'Product Designer',
    company: 'Productboard',
    location: 'Praha',
    languages: ['Czech', 'English'],
    photo: 'https://i.pravatar.cc/400?img=48',
    coverPhoto: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 45,
    sessionsCompleted: 112,
    isAvailable: true,
    nextAvailable: 'Thu, Nov 23',

    bio: "Product Designer at Productboard with 7+ years experience in UX/UI. I help startups create products users love.\n\nSpecialize in user research, design systems, and product thinking.",

    canHelpWith: [
      'UX/UI design',
      'Design systems',
      'User research',
      'Product thinking',
      'Figma best practices'
    ],

    experience: [
      {
        title: 'Product Designer',
        company: 'Productboard',
        period: '2019 - Present',
        location: 'Praha',
        description: 'Designing product management tools for 5000+ companies.'
      }
    ],

    education: [
      {
        school: 'UMPRUM Prague',
        degree: 'Graphic Design',
        period: '2012-2017'
      }
    ],

    primarySkills: [
      {
        name: 'UX/UI Design',
        rating: 5,
        description: 'User flows, wireframes, prototypes, visual design',
        yearsExperience: 7,
        projectsCompleted: 40
      },
      {
        name: 'Design Systems',
        rating: 5,
        description: 'Component libraries, design tokens, documentation',
        yearsExperience: 5,
        projectsCompleted: 10
      },
      {
        name: 'User Research',
        rating: 4,
        description: 'Interviews, usability testing, synthesis',
        yearsExperience: 6,
        projectsCompleted: 30
      }
    ],

    secondarySkills: [
      {
        name: 'Product Strategy',
        rating: 4,
        description: 'Roadmapping, prioritization, metrics'
      }
    ],

    industries: ['B2B SaaS', 'Consumer Apps'],
    tools: ['Figma', 'Miro', 'Notion', 'Maze', 'Hotjar'],

    achievements: [
      'Built design system used by 50+ designers',
      'Speaker at Design Night Prague'
    ],

    social: {
      linkedin: 'linkedin.com/in/luciesvobodova',
      twitter: '@lucie_design'
    },

    sessionTypes: [
      {
        type: 'intro',
        duration: 30,
        price: 0,
        description: 'Portfolio review, quick advice'
      },
      {
        type: 'focused',
        duration: 60,
        description: 'Design critique, UX strategy, career guidance'
      }
    ],

    availability: [
      { dayOfWeek: 2, slots: ['14:00', '16:00'] },
      { dayOfWeek: 4, slots: ['14:00', '15:30', '17:00'] }
    ],

    maxSessionsPerWeek: 3,
    bufferMinutes: 30
  }
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: 'review1',
    mentorId: 'mentor1',
    reviewerId: 'user1',
    reviewerName: 'Tomáš Novák',
    reviewerAvatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    comment: 'Eva completely changed how I think about marketing. In just one session, she helped me identify my target audience and craft messaging that actually resonates. Highly recommend!',
    sessionTopic: 'Go-to-market strategy',
    sessionDuration: 60,
    createdAt: new Date('2024-11-19'),
    helpfulCount: 12
  },
  {
    id: 'review2',
    mentorId: 'mentor1',
    reviewerId: 'user2',
    reviewerName: 'Jana Svobodová',
    reviewerAvatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    comment: 'Patient, insightful, and incredibly practical. Eva gave me a clear action plan I could implement immediately. Results: 3x website traffic in 30 days!',
    sessionTopic: 'Content marketing',
    sessionDuration: 60,
    createdAt: new Date('2024-11-14'),
    helpfulCount: 8
  },
  {
    id: 'review3',
    mentorId: 'mentor2',
    reviewerId: 'user3',
    reviewerName: 'Petr Dvořák',
    reviewerAvatar: 'https://i.pravatar.cc/150?img=14',
    rating: 5,
    comment: 'Petr helped me understand what VCs actually look for. His feedback on my pitch deck was invaluable - raised €500k two months later!',
    sessionTopic: 'Fundraising pitch',
    sessionDuration: 60,
    createdAt: new Date('2024-11-10'),
    helpfulCount: 15
  }
];

// Mock Sessions
export const sessions: Session[] = [
  {
    id: 'session1',
    mentorId: 'mentor1',
    mentorName: 'Eva Novotná',
    mentorPhoto: 'https://i.pravatar.cc/400?img=5',
    mentorTitle: 'Marketing Lead @ Y Soft',
    menteeId: 'user1',
    menteeName: 'Tomáš Novák',
    menteePhoto: 'https://i.pravatar.cc/150?img=8',

    type: 'focused',
    duration: 60,
    scheduledAt: new Date('2024-11-22T14:00:00'),
    status: 'upcoming',

    topic: 'Go-to-market strategy',
    background: 'B2B SaaS product, technical founder, needs help with target audience definition, messaging and positioning, and first marketing channels to test.',
    format: 'video',
    meetingLink: 'https://zoom.us/j/123456789',

    prepNotes: 'B2B SaaS product, technical founder, needs help with messaging and first channels...'
  },
  {
    id: 'session2',
    mentorId: 'mentor1',
    mentorName: 'Eva Novotná',
    mentorPhoto: 'https://i.pravatar.cc/400?img=5',
    mentorTitle: 'Marketing Lead @ Y Soft',
    menteeId: 'user1',
    menteeName: 'Tomáš Novák',
    menteePhoto: 'https://i.pravatar.cc/150?img=8',

    type: 'focused',
    duration: 60,
    scheduledAt: new Date('2024-11-08T14:00:00'),
    status: 'completed',

    topic: 'Content marketing strategy',
    format: 'video'
  },
  {
    id: 'session3',
    mentorId: 'mentor2',
    mentorName: 'Petr Svoboda',
    mentorPhoto: 'https://i.pravatar.cc/400?img=12',
    mentorTitle: 'VC Partner @ Tensor VC',
    menteeId: 'user1',
    menteeName: 'Tomáš Novák',
    menteePhoto: 'https://i.pravatar.cc/150?img=8',

    type: 'focused',
    duration: 60,
    scheduledAt: new Date('2024-11-08T16:00:00'),
    status: 'completed',

    topic: 'Fundraising strategy',
    format: 'video',

    review: {
      rating: 5,
      comment: 'Excellent session! Petr helped me understand the investor mindset.'
    }
  }
];

// Mock Booking Requests
export const bookingRequests: BookingRequest[] = [
  {
    id: 'booking1',
    mentorId: 'mentor1',
    menteeId: 'user2',
    menteeName: 'Petr Dvořák',
    menteePhoto: 'https://i.pravatar.cc/150?img=14',

    requestedDate: new Date('2024-11-22'),
    requestedTime: '15:30',
    topic: 'Fundraising pitch feedback - need help with investor deck and messaging',
    background: 'B2B SaaS, pre-seed stage',

    status: 'pending',
    createdAt: new Date('2024-11-19T10:30:00')
  }
];

// Helper functions
export function getMentorById(id: string): Mentor | undefined {
  return mentors.find(m => m.id === id);
}

export function getMentorsByExpertise(expertise: string): Mentor[] {
  return mentors.filter(m =>
    m.primarySkills.some(s => s.name.toLowerCase().includes(expertise.toLowerCase())) ||
    m.industries.some(i => i.toLowerCase().includes(expertise.toLowerCase()))
  );
}

export function getAvailableMentors(): Mentor[] {
  return mentors.filter(m => m.isAvailable);
}

export function getReviewsByMentor(mentorId: string): Review[] {
  return reviews.filter(r => r.mentorId === mentorId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getSessionsByMentee(menteeId: string): Session[] {
  return sessions.filter(s => s.menteeId === menteeId).sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());
}

export function getUpcomingSessionsByMentee(menteeId: string): Session[] {
  return sessions.filter(s => s.menteeId === menteeId && s.status === 'upcoming').sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
}

export function getPastSessionsByMentee(menteeId: string): Session[] {
  return sessions.filter(s => s.menteeId === menteeId && s.status === 'completed').sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());
}

export function getSessionsByMentor(mentorId: string): Session[] {
  return sessions.filter(s => s.mentorId === mentorId).sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());
}

export function getUpcomingSessionsByMentor(mentorId: string): Session[] {
  return sessions.filter(s => s.mentorId === mentorId && s.status === 'upcoming').sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
}

export function getBookingRequestsByMentor(mentorId: string): BookingRequest[] {
  return bookingRequests.filter(b => b.mentorId === mentorId && b.status === 'pending').sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getRatingBreakdown(mentorId: string) {
  const mentorReviews = getReviewsByMentor(mentorId);
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  mentorReviews.forEach(review => {
    breakdown[review.rating as keyof typeof breakdown]++;
  });

  return breakdown;
}
