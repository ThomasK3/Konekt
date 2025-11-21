import { subDays, format, startOfWeek, addDays } from 'date-fns';

// ============================================
// TIME-SERIES DATA GENERATION
// ============================================

/**
 * Generate activity data for heatmap (GitHub-style)
 * Returns 365 days of activity data
 */
export const generateActivityHeatmap = (userId: string) => {
  const data: { date: string; count: number; day: number }[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = subDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayOfWeek = date.getDay();

    // Generate realistic activity patterns
    let count = 0;

    // Weekend: lower activity
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
    } else {
      // Weekdays: higher activity with occasional spikes
      if (Math.random() > 0.2) {
        count = Math.floor(Math.random() * 8) + 1;
      }

      // Event days (simulate hackathons/meetups)
      if (Math.random() > 0.95) {
        count = Math.floor(Math.random() * 15) + 10;
      }
    }

    data.push({
      date: dateStr,
      count,
      day: dayOfWeek,
    });
  }

  return data;
};

/**
 * Generate connection growth over time
 */
export const generateConnectionGrowth = (finalCount: number) => {
  const data: { date: string; connections: number; newConnections?: number }[] = [];
  const today = new Date();
  const startDate = subDays(today, 90); // Last 90 days

  let currentConnections = Math.max(1, finalCount - Math.floor(Math.random() * 20) - 10);

  for (let i = 0; i <= 90; i++) {
    const date = addDays(startDate, i);
    const dateStr = format(date, 'yyyy-MM-dd');

    // Gradual growth with occasional spikes (events)
    let growth = 0;
    if (Math.random() > 0.85) {
      // Event spike
      growth = Math.floor(Math.random() * 5) + 2;
    } else if (Math.random() > 0.7) {
      // Regular growth
      growth = Math.floor(Math.random() * 2);
    }

    currentConnections += growth;
    currentConnections = Math.min(currentConnections, finalCount);

    data.push({
      date: dateStr,
      connections: currentConnections,
      newConnections: growth > 0 ? growth : undefined,
    });
  }

  return data;
};

/**
 * Generate skills radar chart data
 */
export interface SkillRadarData {
  skill: string;
  userScore: number;
  communityAvg: number;
}

export const generateSkillsRadar = (userSkills: string[]): SkillRadarData[] => {
  const topSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'Design', 'Marketing'];

  return topSkills.map((skill) => {
    const hasSkill = userSkills.includes(skill);
    return {
      skill,
      userScore: hasSkill ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40),
      communityAvg: Math.floor(Math.random() * 20) + 50,
    };
  });
};

/**
 * Generate engagement score breakdown
 */
export interface EngagementBreakdown {
  category: string;
  value: number;
  color: string;
}

export const generateEngagementScore = (stats: {
  messagesSent: number;
  connectionsCount: number;
  projectsCreated: number;
}) => {
  const messageScore = Math.min(40, (stats.messagesSent / 200) * 40);
  const connectionScore = Math.min(30, (stats.connectionsCount / 50) * 30);
  const projectScore = Math.min(30, (stats.projectsCreated / 10) * 30);

  const totalScore = Math.round(messageScore + connectionScore + projectScore);

  const breakdown: EngagementBreakdown[] = [
    { category: 'Messages', value: Math.round(messageScore), color: '#c872a4' },
    { category: 'Connections', value: Math.round(connectionScore), color: '#4a6953' },
    { category: 'Projects', value: Math.round(projectScore), color: '#f59e0b' },
  ];

  return {
    totalScore,
    breakdown,
  };
};

// ============================================
// EVENT ANALYTICS
// ============================================

/**
 * Generate attendance over time (during event)
 */
export const generateEventAttendance = (totalAttendees: number) => {
  const data: { time: string; checkins: number; cumulative: number }[] = [];
  const startHour = 9; // 9 AM
  const endHour = 18; // 6 PM

  let cumulative = 0;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let quarter = 0; quarter < 4; quarter++) {
      const minute = quarter * 15;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      let checkins = 0;

      // Peak times: 9-10 AM (arrival), 1-2 PM (after lunch)
      if ((hour === 9 && quarter >= 0) || (hour === 10 && quarter === 0)) {
        checkins = Math.floor(Math.random() * (totalAttendees * 0.15)) + 5;
      } else if (hour === 13 && quarter >= 2) {
        checkins = Math.floor(Math.random() * (totalAttendees * 0.08)) + 2;
      } else if (hour >= 11 && hour <= 16) {
        checkins = Math.floor(Math.random() * 3);
      }

      cumulative = Math.min(cumulative + checkins, totalAttendees);

      data.push({ time, checkins, cumulative });
    }
  }

  return data;
};

/**
 * Generate channel engagement (messages per channel)
 */
export const generateChannelEngagement = () => {
  const channels = [
    { name: 'general', messages: Math.floor(Math.random() * 200) + 100 },
    { name: 'tech-talk', messages: Math.floor(Math.random() * 150) + 80 },
    { name: 'design', messages: Math.floor(Math.random() * 100) + 50 },
    { name: 'random', messages: Math.floor(Math.random() * 180) + 90 },
    { name: 'networking', messages: Math.floor(Math.random() * 120) + 60 },
  ];

  return channels.sort((a, b) => b.messages - a.messages);
};

/**
 * Generate material downloads breakdown
 */
export const generateMaterialDownloads = () => {
  return [
    { type: 'Presentations', value: Math.floor(Math.random() * 100) + 50, color: '#c872a4' },
    { type: 'Documents', value: Math.floor(Math.random() * 80) + 40, color: '#4a6953' },
    { type: 'Code', value: Math.floor(Math.random() * 60) + 30, color: '#f59e0b' },
    { type: 'Videos', value: Math.floor(Math.random() * 40) + 20, color: '#3b82f6' },
  ];
};

/**
 * Generate post-event retention curve
 */
export const generateRetentionCurve = (initialAttendees: number) => {
  const data: { day: number; activeUsers: number; benchmark: number }[] = [];

  for (let day = 0; day <= 30; day++) {
    // User retention with natural decay
    const decayFactor = Math.exp(-day / 15); // Exponential decay
    const activeUsers = Math.floor(initialAttendees * decayFactor * (0.6 + Math.random() * 0.2));

    // Industry benchmark (slightly better)
    const benchmarkFactor = Math.exp(-day / 18);
    const benchmark = Math.floor(initialAttendees * benchmarkFactor * 0.7);

    data.push({ day, activeUsers, benchmark });
  }

  return data;
};

// ============================================
// MARKET INTELLIGENCE / TRENDS
// ============================================

/**
 * Generate top growing skills
 */
export const generateGrowingSkills = () => {
  const skills = [
    { skill: 'AI/ML', growth: 145, count: 89 },
    { skill: 'React', growth: 112, count: 156 },
    { skill: 'TypeScript', growth: 98, count: 134 },
    { skill: 'Python', growth: 87, count: 178 },
    { skill: 'Figma', growth: 76, count: 92 },
    { skill: 'Node.js', growth: 65, count: 128 },
    { skill: 'AWS', growth: 54, count: 67 },
    { skill: 'Flutter', growth: 43, count: 45 },
  ];

  return skills;
};

/**
 * Generate most sought-after roles
 */
export const generateSoughtRoles = () => {
  return [
    { role: 'Frontend Developer', count: 45, color: '#c872a4' },
    { role: 'Full-stack Developer', count: 38, color: '#4a6953' },
    { role: 'Designer', count: 28, color: '#f59e0b' },
    { role: 'Backend Developer', count: 25, color: '#3b82f6' },
    { role: 'Product Manager', count: 18, color: '#8b5cf6' },
    { role: 'Marketing', count: 12, color: '#ec4899' },
  ];
};

/**
 * Generate active industries (for treemap)
 */
export const generateActiveIndustries = () => {
  return [
    { name: 'SaaS', value: 45, color: '#c872a4' },
    { name: 'Fintech', value: 38, color: '#4a6953' },
    { name: 'E-commerce', value: 32, color: '#f59e0b' },
    { name: 'HealthTech', value: 28, color: '#3b82f6' },
    { name: 'EdTech', value: 24, color: '#8b5cf6' },
    { name: 'AI/ML', value: 22, color: '#10b981' },
    { name: 'Gaming', value: 18, color: '#ec4899' },
    { name: 'Other', value: 15, color: '#94a3b8' },
  ];
};

// ============================================
// PROFILE STATS
// ============================================

/**
 * Calculate response rate and time
 */
export const calculateResponseStats = (messagesSent: number) => {
  const responseRate = Math.min(95, 60 + Math.floor(Math.random() * 30));
  const avgResponseTimeHours = Math.max(0.5, 2 + Math.random() * 4);

  return {
    responseRate,
    avgResponseTime: avgResponseTimeHours,
  };
};

/**
 * Calculate active days in last 30
 */
export const calculateActiveDays = (streak: { current: number; loginHistory: string[] }) => {
  const last30Days = streak.loginHistory.slice(-30);
  return last30Days.length;
};

/**
 * Calculate collaboration success
 */
export const calculateCollaborationSuccess = (projectsCreated: number) => {
  const collaborativeProjects = Math.floor(projectsCreated * 0.6);
  const successRate = Math.min(90, 70 + Math.floor(Math.random() * 20));

  return {
    collaborativeProjects,
    successRate,
  };
};
