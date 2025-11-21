import { User } from '@/types';

// ============================================
// AI MATCHING ENGINE (rule-based, feels smart)
// ============================================

interface MatchReason {
  type: 'skills' | 'looking-for' | 'event' | 'complementary' | 'mutual';
  description: string;
  icon: string;
}

export interface MatchResult {
  matchScore: number;
  reasons: MatchReason[];
  prediction: string;
  sharedSkills: string[];
  sharedLookingFor: string[];
  mutualConnections: number;
}

/**
 * Calculate match score and reasons between two users
 */
export const calculateMatch = (currentUser: User, targetUser: User): MatchResult => {
  const reasons: MatchReason[] = [];
  let score = 0;

  // 1. Shared Skills (20 points per skill, max 40)
  const sharedSkills = currentUser.skills.filter((skill) =>
    targetUser.skills.some((ts) => ts.toLowerCase() === skill.toLowerCase())
  );

  if (sharedSkills.length > 0) {
    const skillScore = Math.min(sharedSkills.length * 20, 40);
    score += skillScore;
    reasons.push({
      type: 'skills',
      icon: '✓',
      description: `Shared skills: ${sharedSkills.slice(0, 3).join(', ')}${
        sharedSkills.length > 3 ? ` (+${sharedSkills.length - 3} more)` : ''
      }`,
    });
  }

  // 2. Looking For Match (30 points)
  const sharedLookingFor = currentUser.lookingFor.filter((lf) =>
    targetUser.lookingFor.some((tlf) => tlf.toLowerCase() === lf.toLowerCase())
  );

  if (sharedLookingFor.length > 0) {
    score += 30;
    reasons.push({
      type: 'looking-for',
      icon: '✓',
      description: `Both looking for: ${sharedLookingFor[0]}`,
    });
  }

  // 3. Complementary Skills (25 points)
  // If one person is looking for skills the other has
  const currentUserNeeds = currentUser.lookingFor.filter((lf) =>
    targetUser.skills.some((ts) => ts.toLowerCase().includes(lf.toLowerCase()) || lf.toLowerCase().includes(ts.toLowerCase()))
  );

  const targetUserNeeds = targetUser.lookingFor.filter((lf) =>
    currentUser.skills.some((cs) => cs.toLowerCase().includes(lf.toLowerCase()) || lf.toLowerCase().includes(cs.toLowerCase()))
  );

  if (currentUserNeeds.length > 0 || targetUserNeeds.length > 0) {
    score += 25;
    if (currentUserNeeds.length > 0) {
      reasons.push({
        type: 'complementary',
        icon: '✓',
        description: `You need ${currentUserNeeds[0]}, they offer it`,
      });
    }
    if (targetUserNeeds.length > 0 && currentUserNeeds.length === 0) {
      reasons.push({
        type: 'complementary',
        icon: '✓',
        description: `They need skills you have`,
      });
    }
  }

  // 4. Attended Same Event (15 points)
  // This would need event data - mocked for now
  const attendedSameEvent = Math.random() > 0.7;
  if (attendedSameEvent) {
    score += 15;
    reasons.push({
      type: 'event',
      icon: '✓',
      description: 'Attended same event: BeNextOne 2024',
    });
  }

  // 5. Mutual Connections (5 points each, max 10)
  // This would need connections data - mocked for now
  const mutualConnections = Math.floor(Math.random() * 3);
  if (mutualConnections > 0) {
    score += Math.min(mutualConnections * 5, 10);
    reasons.push({
      type: 'mutual',
      icon: '✓',
      description: `${mutualConnections} mutual connection${mutualConnections > 1 ? 's' : ''}`,
    });
  }

  // Add random variance (±10) to make it feel more natural
  score += Math.floor(Math.random() * 21) - 10;
  score = Math.max(0, Math.min(100, score)); // Clamp to 0-100

  // Generate prediction based on score
  let prediction = '';
  if (score >= 70) {
    prediction = `🎯 ${score}% chance you'll collaborate successfully`;
  } else if (score >= 50) {
    prediction = `💡 ${score}% compatibility for potential collaboration`;
  }

  return {
    matchScore: score,
    reasons,
    prediction,
    sharedSkills,
    sharedLookingFor,
    mutualConnections,
  };
};

/**
 * Get skill suggestions based on existing skills
 */
export const getSkillSuggestions = (currentSkills: string[]): string[] => {
  const skillRelations: Record<string, string[]> = {
    React: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
    TypeScript: ['React', 'Node.js', 'Express', 'Nest.js'],
    'Next.js': ['React', 'TypeScript', 'Vercel', 'API Design'],
    Python: ['Django', 'Flask', 'FastAPI', 'Data Science'],
    JavaScript: ['React', 'Node.js', 'TypeScript', 'Vue.js'],
    'Node.js': ['Express', 'TypeScript', 'MongoDB', 'PostgreSQL'],
    Design: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    Figma: ['Design', 'Prototyping', 'UI/UX', 'Design Systems'],
    Marketing: ['SEO', 'Content Writing', 'Analytics', 'Social Media'],
    SEO: ['Marketing', 'Content Writing', 'Google Analytics', 'Data Analysis'],
    'Product Management': ['Agile', 'User Research', 'Data Analysis', 'Strategy'],
    'Data Science': ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    AI: ['Machine Learning', 'Python', 'Deep Learning', 'Data Science'],
    'Machine Learning': ['Python', 'AI', 'TensorFlow', 'Data Science'],
  };

  const suggestions = new Set<string>();

  currentSkills.forEach((skill) => {
    const related = skillRelations[skill];
    if (related) {
      related.forEach((relatedSkill) => {
        if (!currentSkills.includes(relatedSkill)) {
          suggestions.add(relatedSkill);
        }
      });
    }
  });

  // Return up to 5 suggestions
  return Array.from(suggestions).slice(0, 5);
};

/**
 * Calculate profile completion percentage and suggestions
 */
export const calculateProfileCompletion = (
  user: User
): {
  percentage: number;
  suggestions: Array<{ action: string; impact: string }>;
} => {
  let completionScore = 0;
  const suggestions: Array<{ action: string; impact: string }> = [];

  // Bio (15 points)
  if (user.bio && user.bio.length > 50) {
    completionScore += 15;
  } else {
    suggestions.push({
      action: 'Write a detailed bio (50+ characters)',
      impact: '+15% visibility',
    });
  }

  // Skills (20 points)
  if (user.skills.length >= 5) {
    completionScore += 20;
  } else {
    suggestions.push({
      action: `Add ${5 - user.skills.length} more skill${5 - user.skills.length > 1 ? 's' : ''}`,
      impact: '+10% matches',
    });
  }

  // Looking For (20 points)
  if (user.lookingFor.length >= 2) {
    completionScore += 20;
  } else {
    suggestions.push({
      action: 'Describe what you\'re looking for',
      impact: '+12% connections',
    });
  }

  // Avatar (10 points)
  if (user.avatar) {
    completionScore += 10;
  } else {
    suggestions.push({
      action: 'Add profile photo',
      impact: '+8% trust',
    });
  }

  // Video (15 points)
  if ((user as any).hasVideo) {
    completionScore += 15;
  } else {
    suggestions.push({
      action: 'Add video presentation',
      impact: '+15% views',
    });
  }

  // Projects (10 points)
  if ((user as any).projectCount > 0) {
    completionScore += 10;
  } else {
    suggestions.push({
      action: 'Create your first project',
      impact: '+10% engagement',
    });
  }

  // Personality (5 points)
  if ((user as any).personality) {
    completionScore += 5;
  }

  // Availability (5 points)
  if ((user as any).availability) {
    completionScore += 5;
  }

  return {
    percentage: completionScore,
    suggestions: suggestions.slice(0, 3), // Return top 3 suggestions
  };
};

/**
 * Generate recommended actions for dashboard
 */
export const generateRecommendedActions = (
  currentUser: User,
  allUsers: User[]
): Array<{
  title: string;
  description: string;
  action: string;
  actionLabel: string;
  icon: string;
}> => {
  const actions = [];

  // 1. Message high-match user
  const otherUsers = allUsers.filter((u) => u.id !== currentUser.id);
  const matches = otherUsers.map((user) => ({
    user,
    match: calculateMatch(currentUser, user),
  }));
  matches.sort((a, b) => b.match.matchScore - a.match.matchScore);

  const topMatch = matches[0];
  if (topMatch && topMatch.match.matchScore >= 70) {
    actions.push({
      title: `Message ${topMatch.user.name}`,
      description: `${topMatch.match.matchScore}% match, ${topMatch.match.reasons[0]?.description || 'great fit'}`,
      action: `/profile/${topMatch.user.username}`,
      actionLabel: 'View Profile',
      icon: '💬',
    });
  }

  // 2. Join an event
  actions.push({
    title: 'Join Dny AI event',
    description: '12 people you know are attending',
    action: '/events',
    actionLabel: 'RSVP',
    icon: '📅',
  });

  // 3. Update/Create project
  const hasProjects = (currentUser as any).projectCount > 0;
  if (hasProjects) {
    actions.push({
      title: 'Update your project',
      description: '3 people viewed it this week, refresh description',
      action: '/projects',
      actionLabel: 'Edit Project',
      icon: '🚀',
    });
  } else {
    actions.push({
      title: 'Create your first project',
      description: 'Projects get 3x more profile views',
      action: '/projects',
      actionLabel: 'Start Project',
      icon: '🚀',
    });
  }

  return actions.slice(0, 3);
};
