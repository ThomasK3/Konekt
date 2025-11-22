export type ResourceType = 'guide' | 'tutorial' | 'template' | 'tool' | 'article' | 'video' | 'case-study' | 'checklist';
export type ResourceCategory = 'startup' | 'business' | 'fundraising' | 'marketing' | 'tech' | 'design' | 'data' | 'team' | 'legal' | 'expansion' | 'tools' | 'learning';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
export type ResourceStatus = 'published' | 'under-review' | 'draft';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  tags: string[];
  language: string[];
  difficulty: DifficultyLevel;

  author: {
    id: string;
    name: string;
    avatar: string;
  };

  content?: string; // Markdown content
  externalUrl?: string; // For external resources
  fileUrl?: string; // For downloadable files

  coverImage: string;
  readTime?: number; // Minutes
  watchTime?: number; // Minutes for videos

  createdAt: Date;
  updatedAt: Date;
  status: ResourceStatus;

  stats: {
    views: number;
    saves: number;
    upvotes: number;
    rating: number;
    ratingCount: number;
    commentCount: number;
  };

  featured: boolean;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;

  author: {
    id: string;
    name: string;
    avatar: string;
  };

  isOfficial: boolean; // Created by Konekt team

  sections: {
    title: string;
    resourceIds: string[];
  }[];

  createdAt: Date;
  updatedAt: Date;

  stats: {
    resourceCount: number;
    saves: number;
    rating: number;
    ratingCount: number;
  };
}

export interface ResourceComment {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies?: ResourceComment[];
}

// Categories with metadata
export const categories = [
  { id: 'startup', label: 'Startup Basics', icon: '🚀', count: 145 },
  { id: 'business', label: 'Business & Strategy', icon: '💼', count: 234 },
  { id: 'fundraising', label: 'Fundraising', icon: '💰', count: 89 },
  { id: 'marketing', label: 'Marketing & Growth', icon: '📈', count: 178 },
  { id: 'tech', label: 'Technology & Development', icon: '💻', count: 267 },
  { id: 'design', label: 'Design & UX', icon: '🎨', count: 123 },
  { id: 'data', label: 'Data & Analytics', icon: '📊', count: 56 },
  { id: 'team', label: 'Team & HR', icon: '👥', count: 98 },
  { id: 'legal', label: 'Legal & Compliance', icon: '📝', count: 67 },
  { id: 'expansion', label: 'International Expansion', icon: '🌍', count: 45 },
  { id: 'tools', label: 'Tools & Resources', icon: '🛠️', count: 345 },
  { id: 'learning', label: 'Learning & Education', icon: '📚', count: 189 }
];

// Mock Resources
export const resources: Resource[] = [
  {
    id: 'res1',
    title: 'Complete Guide to Starting a Startup in Czech Republic',
    description: 'Everything from incorporation to first customer. Comprehensive guide covering legal setup, funding, team building, and go-to-market strategy.',
    type: 'guide',
    category: 'startup',
    tags: ['incorporation', 'legal', 'founding', 'czech-republic', 's.r.o.'],
    language: ['Czech', 'English'],
    difficulty: 'beginner',

    author: {
      id: 'user1',
      name: 'Eva Novotná',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },

    content: `# Complete Guide to Starting a Startup in Czech Republic

Starting a startup in the Czech Republic? This comprehensive guide will walk you through every step from legal incorporation to acquiring your first customers.

## Table of Contents

1. [Legal Setup & Incorporation](#legal-setup)
2. [Funding Options](#funding)
3. [Building Your Team](#team)
4. [Go-to-Market Strategy](#gtm)
5. [Common Pitfalls](#pitfalls)

## 1. Legal Setup & Incorporation {#legal-setup}

The most common legal structure for Czech startups is **s.r.o. (společnost s ručením omezeným)** - equivalent to LLC in the US.

### Requirements for s.r.o.:
- Minimum capital: 1 Kč (yes, just one crown!)
- At least one founder
- Czech registered address
- Trade license (živnostenský list)

### Step-by-Step Process:

1. **Choose a unique company name**
   - Check availability at [or.justice.cz](https://or.justice.cz)
   - Name must end with "s.r.o."

2. **Prepare founding documents**
   - Articles of Association (Společenská smlouva)
   - List of shareholders
   - Proof of capital deposit

3. **Notarize documents**
   - Required for Articles of Association
   - Cost: approximately 2,000-5,000 Kč

4. **Register with Companies Register**
   - Online via notary or in person
   - Processing time: 5-10 business days
   - Fee: 6,000 Kč

5. **Obtain trade license**
   - Register at Trade Licensing Office (Živnostenský úřad)
   - Free of charge
   - Can be done online

> 💡 **Pro Tip**: Use services like [Firmify.cz](https://firmify.cz) or [Startuply.cz](https://startuply.cz) to streamline the process. They handle everything for around 10,000 Kč.

## 2. Funding Options {#funding}

Czech startups have several funding options:

### Bootstrap
- Self-funded from personal savings
- Revenue from early customers
- **Pros**: Full control, no dilution
- **Cons**: Limited resources, slower growth

### Grants
- **CzechInvest**: Up to 25M Kč for R&D projects
- **OP PIK**: EU structural funds
- **Technology Agency (TAČR)**: Research grants

### Angel Investors
- Typical investment: 500k - 5M Kč
- Active angels: Jan Barta, Pavel Baudiš, Aleš Smrčka
- Czech Business Angels Network

### VC Funds
Top Czech/CEE VCs:
- **Tensor VC**: Seed to Series A (€500k-€5M)
- **Presto Ventures**: Pre-seed to Seed
- **Credo Ventures**: Series A+
- **Kaya VC**: Seed stage
- **Orbit Capital**: Pre-seed

### Accelerators
- **Startup Yard**: 3-month program, €30k investment
- **StartupLab**: Affiliated with UniCredit
- **Rockaway Ventures**: Corporate accelerator

## 3. Building Your Team {#team}

### Hiring Developers in CZ

Average salaries (2024):
- Junior Developer: 40-60k CZK/month
- Mid-level Developer: 60-100k CZK/month
- Senior Developer: 100-150k CZK/month
- Tech Lead: 150k+ CZK/month

Where to hire:
- **StartupJobs.cz**: Best for startup-focused candidates
- **LinkedIn**: Professional network
- **Czechitas**: Coding bootcamp for women
- **Hackathons**: BeNextOne, HackPrague

### Employment Contracts

Two main options:

1. **Employment Contract (Pracovní smlouva)**
   - Full benefits, vacation, health insurance
   - Employer costs: ~134% of gross salary
   - Notice period: 2 months minimum

2. **Trade License (Živnostenský list / OSVČ)**
   - Contractor relationship
   - Lower overhead for company
   - Less protection for worker

> ⚠️ **Warning**: Misclassifying employees as contractors can lead to significant fines. Consult with lawyer.

## 4. Go-to-Market Strategy {#gtm}

### For B2B SaaS:

1. **Define ICP (Ideal Customer Profile)**
   - Company size
   - Industry
   - Pain points
   - Budget

2. **Start with outbound**
   - LinkedIn outreach
   - Cold email campaigns
   - Czech trade associations

3. **Build inbound pipeline**
   - SEO-optimized content
   - Case studies in Czech
   - Free tools/calculators

4. **Leverage local events**
   - Startup Weekend Prague
   - BeNextOne
   - WebExpo
   - Festup

### For B2C:

1. **Social media first**
   - Instagram for lifestyle products
   - Facebook groups for communities
   - TikTok for Gen Z

2. **Influencer partnerships**
   - Micro-influencers (10k-100k followers)
   - Czech influencers are very accessible
   - Cost: 5k-50k CZK per post

3. **PR in Czech media**
   - Lupa.cz (tech)
   - StartupJobs.cz blog
   - E15 / Forbes Czech

## 5. Common Pitfalls {#pitfalls}

### ❌ Don't:
- Skip legal setup to "move fast"
- Ignore Czech labor laws
- Forget about VAT registration
- Underestimate bureaucracy timelines
- Neglect Czech-language content

### ✅ Do:
- Get a good accountant (5-10k CZK/month)
- Learn basic Czech business terms
- Network at Czech startup events
- Join startup communities (Startup Grind Prague)
- Use local banking (Fio, Air Bank for startups)

## Resources

- [Business Center Prague](https://www.businessinfo.cz/en/)
- [CzechInvest](https://www.czechinvest.org/en)
- [Startup Guide Prague](https://startupguide.com/prague)
- [Legal Templates](https://www.epravo.cz)

## Conclusion

Starting a startup in the Czech Republic is easier than ever. With the right preparation and local knowledge, you can navigate the process smoothly and focus on building your product.

**Good luck! 🚀**

---

*Last updated: November 2024*
*Questions? Comment below or reach out to [email@konekt.cz](mailto:email@konekt.cz)*`,

    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=675&fit=crop',
    readTime: 60,

    createdAt: new Date('2024-11-10'),
    updatedAt: new Date('2024-11-19'),
    status: 'published',

    stats: {
      views: 5634,
      saves: 1234,
      upvotes: 456,
      rating: 4.9,
      ratingCount: 234,
      commentCount: 45
    },

    featured: true
  },

  {
    id: 'res2',
    title: 'Ultimate Fundraising Guide for Czech Startups',
    description: 'Comprehensive overview of all funding sources available to Czech startups in 2024. From grants to VCs, learn what works.',
    type: 'guide',
    category: 'fundraising',
    tags: ['vc', 'angels', 'grants', 'pitching', 'investment'],
    language: ['Czech', 'English'],
    difficulty: 'intermediate',

    author: {
      id: 'mentor1',
      name: 'Eva Novotná',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },

    externalUrl: 'https://example.com/fundraising-guide',

    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop',
    readTime: 45,

    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-18'),
    status: 'published',

    stats: {
      views: 3456,
      saves: 789,
      upvotes: 234,
      rating: 5.0,
      ratingCount: 156,
      commentCount: 34
    },

    featured: true
  },

  {
    id: 'res3',
    title: 'Pitch Deck Template (Prusa-style)',
    description: 'Professional pitch deck template based on successful Czech startups. Includes Figma file and PDF examples.',
    type: 'template',
    category: 'fundraising',
    tags: ['pitch-deck', 'template', 'figma', 'presentation', 'investors'],
    language: ['English'],
    difficulty: 'all-levels',

    author: {
      id: 'mentor3',
      name: 'Jana Kolářová',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },

    fileUrl: '/downloads/pitch-deck-template.fig',

    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=675&fit=crop',

    createdAt: new Date('2024-11-12'),
    updatedAt: new Date('2024-11-12'),
    status: 'published',

    stats: {
      views: 2345,
      saves: 567,
      upvotes: 189,
      rating: 4.8,
      ratingCount: 89,
      commentCount: 23
    },

    featured: true
  },

  {
    id: 'res4',
    title: '50 AI Tools Every Founder Should Know in 2024',
    description: 'Curated list of AI tools for startups. From content generation to code assistance, save 20+ hours per week.',
    type: 'article',
    category: 'tools',
    tags: ['ai', 'tools', 'productivity', 'automation', 'chatgpt'],
    language: ['Czech', 'English'],
    difficulty: 'all-levels',

    author: {
      id: 'mentor2',
      name: 'Petr Svoboda',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },

    content: `# 50 AI Tools Every Founder Should Know in 2024

AI is transforming how we build startups. Here's a curated list of 50+ tools that can save you 20+ hours per week.

## Content Creation (10 tools)

### 1. ChatGPT
- **Use case**: Writing, brainstorming, coding
- **Price**: Free / $20/month Pro
- **Why**: Most versatile AI assistant
- [Try it →](https://chat.openai.com)

### 2. Copy.ai
- **Use case**: Marketing copy, ads, emails
- **Price**: Free plan / $49/month
- **Why**: Specifically trained for marketing
- [Try it →](https://copy.ai)

[... continues with 48 more tools ...]`,

    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop',
    readTime: 15,

    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-16'),
    status: 'published',

    stats: {
      views: 4567,
      saves: 1012,
      upvotes: 345,
      rating: 4.7,
      ratingCount: 178,
      commentCount: 56
    },

    featured: false
  },

  {
    id: 'res5',
    title: 'How to Build an MVP in 4 Weeks (Video Course)',
    description: 'Step-by-step video tutorial series on building a minimum viable product fast. Includes code examples and templates.',
    type: 'video',
    category: 'tech',
    tags: ['mvp', 'development', 'lean', 'product', 'tutorial'],
    language: ['English'],
    difficulty: 'intermediate',

    author: {
      id: 'mentor4',
      name: 'Martin Novák',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },

    externalUrl: 'https://youtube.com/playlist?list=example',

    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=675&fit=crop',
    watchTime: 240, // 4 hours total

    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-08'),
    status: 'published',

    stats: {
      views: 3234,
      saves: 678,
      upvotes: 234,
      rating: 5.0,
      ratingCount: 123,
      commentCount: 45
    },

    featured: false
  },

  {
    id: 'res6',
    title: 'Growth Marketing Playbook 2024',
    description: 'Complete playbook for growth marketing. Includes 50+ tactics, templates, and case studies from successful Czech startups.',
    type: 'guide',
    category: 'marketing',
    tags: ['growth', 'marketing', 'acquisition', 'tactics', 'playbook'],
    language: ['English'],
    difficulty: 'intermediate',

    author: {
      id: 'mentor1',
      name: 'Eva Novotná',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },

    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop',
    readTime: 90,

    createdAt: new Date('2024-10-25'),
    updatedAt: new Date('2024-11-10'),
    status: 'published',

    stats: {
      views: 2890,
      saves: 567,
      upvotes: 189,
      rating: 4.8,
      ratingCount: 145,
      commentCount: 38
    },

    featured: false
  },

  {
    id: 'res7',
    title: 'Shareholder Agreement Template (CZ/EN)',
    description: 'Lawyer-approved shareholder agreement template for Czech s.r.o. Bilingual version with explanations.',
    type: 'template',
    category: 'legal',
    tags: ['legal', 'shareholders', 'contract', 'template', 's.r.o.'],
    language: ['Czech', 'English'],
    difficulty: 'intermediate',

    author: {
      id: 'user3',
      name: 'JUDr. Karel Novák',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },

    fileUrl: '/downloads/shareholder-agreement.docx',

    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop',

    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-01'),
    status: 'published',

    stats: {
      views: 1890,
      saves: 456,
      upvotes: 123,
      rating: 4.9,
      ratingCount: 67,
      commentCount: 12
    },

    featured: false
  },

  {
    id: 'res8',
    title: 'Tech Stack for Modern Startups 2024',
    description: 'Recommended technology stack for building modern web applications. Includes comparison charts and setup guides.',
    type: 'guide',
    category: 'tech',
    tags: ['tech-stack', 'development', 'architecture', 'tools', 'framework'],
    language: ['English'],
    difficulty: 'intermediate',

    author: {
      id: 'mentor4',
      name: 'Martin Novák',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },

    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop',
    readTime: 35,

    createdAt: new Date('2024-10-30'),
    updatedAt: new Date('2024-11-12'),
    status: 'published',

    stats: {
      views: 3567,
      saves: 789,
      upvotes: 267,
      rating: 4.7,
      ratingCount: 156,
      commentCount: 67
    },

    featured: false
  }
];

// Mock Collections
export const collections: Collection[] = [
  {
    id: 'col1',
    title: 'Startup Essentials',
    description: 'Everything you need to launch a startup in Czech Republic. From legal setup to first customer.',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&fit=crop',

    author: {
      id: 'konekt',
      name: 'Konekt Team',
      avatar: '/logo.png'
    },

    isOfficial: true,

    sections: [
      {
        title: 'Legal & Incorporation',
        resourceIds: ['res1', 'res7']
      },
      {
        title: 'Funding & Fundraising',
        resourceIds: ['res2', 'res3']
      },
      {
        title: 'Product Development',
        resourceIds: ['res5', 'res8']
      },
      {
        title: 'Marketing & Growth',
        resourceIds: ['res6']
      }
    ],

    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-11-15'),

    stats: {
      resourceCount: 7,
      saves: 1234,
      rating: 4.9,
      ratingCount: 234
    }
  },

  {
    id: 'col2',
    title: 'Fundraising Master Guide',
    description: 'Complete guide to fundraising for Czech startups. From pitch deck to term sheet negotiation.',
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=675&fit=crop',

    author: {
      id: 'mentor1',
      name: 'Eva Novotná',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },

    isOfficial: false,

    sections: [
      {
        title: 'Preparation',
        resourceIds: ['res2', 'res3']
      },
      {
        title: 'Pitch & Present',
        resourceIds: ['res3']
      }
    ],

    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-11-10'),

    stats: {
      resourceCount: 3,
      saves: 567,
      rating: 5.0,
      ratingCount: 156
    }
  },

  {
    id: 'col3',
    title: "Developer's Tech Stack 2024",
    description: 'Curated collection of tools, frameworks, and resources for building modern web applications.',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop',

    author: {
      id: 'mentor4',
      name: 'Martin Novák',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },

    isOfficial: false,

    sections: [
      {
        title: 'Getting Started',
        resourceIds: ['res5', 'res8']
      },
      {
        title: 'AI Tools',
        resourceIds: ['res4']
      }
    ],

    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-12'),

    stats: {
      resourceCount: 3,
      saves: 456,
      rating: 4.8,
      ratingCount: 89
    }
  }
];

// Mock Comments
export const comments: ResourceComment[] = [
  {
    id: 'comment1',
    resourceId: 'res1',
    userId: 'user1',
    userName: 'Tomáš Novák',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    content: 'Great guide! One question about PETG temperature settings for s.r.o. incorporation - do I really only need 1 Kč capital?',
    createdAt: new Date('2024-11-17'),
    likes: 12,
    replies: [
      {
        id: 'comment1-reply1',
        resourceId: 'res1',
        userId: 'mentor1',
        userName: 'Eva Novotná',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        content: 'Yes! Since 2014, the minimum capital requirement for s.r.o. was reduced to just 1 Kč. However, in practice, most founders deposit at least 100,000 Kč for credibility.',
        createdAt: new Date('2024-11-18'),
        likes: 8
      }
    ]
  },
  {
    id: 'comment2',
    resourceId: 'res1',
    userId: 'user2',
    userName: 'Jana Svobodová',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    content: 'Super helpful! Used this guide to incorporate our startup last month. Everything worked exactly as described. Thanks!',
    createdAt: new Date('2024-11-15'),
    likes: 23
  }
];

// Helper functions
export function getResourceById(id: string): Resource | undefined {
  return resources.find(r => r.id === id);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return resources.filter(r => r.category === category && r.status === 'published');
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter(r => r.type === type && r.status === 'published');
}

export function getFeaturedResources(): Resource[] {
  return resources.filter(r => r.featured && r.status === 'published').slice(0, 6);
}

export function getTrendingResources(): Resource[] {
  return [...resources]
    .filter(r => r.status === 'published')
    .sort((a, b) => b.stats.upvotes - a.stats.upvotes)
    .slice(0, 10);
}

export function getRecentResources(): Resource[] {
  return [...resources]
    .filter(r => r.status === 'published')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find(c => c.id === id);
}

export function getOfficialCollections(): Collection[] {
  return collections.filter(c => c.isOfficial);
}

export function getCommunityCollections(): Collection[] {
  return collections.filter(c => !c.isOfficial);
}

export function getCommentsByResource(resourceId: string): ResourceComment[] {
  return comments.filter(c => c.resourceId === resourceId);
}

export function searchResources(query: string, filters?: {
  type?: ResourceType[];
  category?: ResourceCategory[];
  language?: string[];
  difficulty?: DifficultyLevel[];
  minRating?: number;
}): Resource[] {
  let results = resources.filter(r => r.status === 'published');

  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(r =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery) ||
      r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Apply filters
  if (filters) {
    if (filters.type && filters.type.length > 0) {
      results = results.filter(r => filters.type!.includes(r.type));
    }

    if (filters.category && filters.category.length > 0) {
      results = results.filter(r => filters.category!.includes(r.category));
    }

    if (filters.language && filters.language.length > 0) {
      results = results.filter(r =>
        r.language.some(lang => filters.language!.includes(lang))
      );
    }

    if (filters.difficulty && filters.difficulty.length > 0) {
      results = results.filter(r => filters.difficulty!.includes(r.difficulty));
    }

    if (filters.minRating) {
      results = results.filter(r => r.stats.rating >= filters.minRating!);
    }
  }

  return results;
}

export function getResourcesInCollection(collectionId: string): Resource[] {
  const collection = getCollectionById(collectionId);
  if (!collection) return [];

  const allResourceIds = collection.sections.flatMap(s => s.resourceIds);
  return resources.filter(r => allResourceIds.includes(r.id));
}

// Stats
export function getLibraryStats() {
  return {
    totalResources: resources.filter(r => r.status === 'published').length,
    totalContributors: new Set(resources.map(r => r.author.id)).size,
    totalCollections: collections.length,
    totalCategories: categories.length
  };
}
