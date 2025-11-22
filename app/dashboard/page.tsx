'use client';

import { useUserStore } from '@/lib/store';
import { mockEvents, mockProjects, mockConversations, mockUsers, mockMentors, mockMessages } from '@/lib/mock-data';
import {
  Users2,
  MessageCircle,
  Briefcase,
  Calendar,
  TrendingUp,
  ArrowRight,
  Zap,
  Plus,
  Search,
  Send,
  Eye,
  ThumbsUp,
  Clock,
  MapPin,
  Sparkles,
  Target,
  Rocket,
  GraduationCap,
  Bell,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import AppLayout from '@/components/layout/AppLayout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, hoverScale, tapScale } from '@/lib/animations';
import toast from 'react-hot-toast';
import { ActivityHeatmap } from '@/components/analytics/ActivityHeatmap';
import { ConnectionGrowthChart } from '@/components/analytics/ConnectionGrowthChart';
import { SkillsRadarChart } from '@/components/analytics/SkillsRadarChart';
import { EngagementScore } from '@/components/analytics/EngagementScore';
import {
  generateActivityHeatmap,
  generateConnectionGrowth,
  generateSkillsRadar,
  generateEngagementScore,
} from '@/lib/analytics-mock';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { ProgressChecklist } from '@/components/onboarding/ProgressChecklist';
import { useOnboarding } from '@/hooks/useOnboarding';
import { RecommendedActions } from '@/components/ai/RecommendedActions';
import { ProfileOptimization } from '@/components/ai/ProfileOptimization';
import { generateRecommendedActions, calculateProfileCompletion } from '@/lib/ai-matching';

export default function DashboardPage() {
  const { user } = useUserStore();
  const [greeting, setGreeting] = useState('');
  const [greetingEmoji, setGreetingEmoji] = useState('');
  const { showTour, completeTour, skipTour } = useOnboarding();

  // Dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Dobré ráno');
      setGreetingEmoji('☀️');
    } else if (hour < 18) {
      setGreeting('Dobrý den');
      setGreetingEmoji('🌤️');
    } else {
      setGreeting('Dobrý večer');
      setGreetingEmoji('🌙');
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pro zobrazení dashboardu se prosím přihlaste
          </h2>
          <Link href="/register">
            <Button>Registrace</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get user's data
  const userProjects = mockProjects.filter((p) => user.projectIds?.includes(p.id));
  const upcomingEvents = mockEvents
    .filter((e) => e.status === 'upcoming' && e.attendees.includes(user.id))
    .slice(0, 3);
  const liveEvents = mockEvents.filter((e) => e.status === 'ongoing' && e.attendees.includes(user.id));
  const userConversations = mockConversations.slice(0, 3);
  const unreadMessages = mockMessages.filter((m) => !m.isRead && m.senderId !== user.id).length;

  // Calculate matched people (simple algorithm based on shared skills)
  const matchedPeople = mockUsers
    .filter((u) => u.id !== user.id)
    .map((u) => {
      const sharedSkills = u.skills.filter((skill) =>
        user.skills.some((userSkill) => userSkill.toLowerCase().includes(skill.toLowerCase()))
      );
      const sharedLookingFor = u.lookingFor.filter((lf) =>
        user.lookingFor.some((userLf) => userLf.toLowerCase().includes(lf.toLowerCase()))
      );
      const matchScore = (sharedSkills.length * 20) + (sharedLookingFor.length * 30) + Math.random() * 20;
      return { ...u, matchScore: Math.min(Math.round(matchScore), 99), sharedSkills, sharedLookingFor };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Trending projects (mock - based on view count)
  const trendingProjects = mockProjects
    .filter((p) => !user.projectIds?.includes(p.id))
    .slice(0, 2);

  // Recommended mentor
  const recommendedMentor = mockMentors[0];

  // Current date formatting
  const today = new Date();
  const dateString = today.toLocaleDateString('cs-CZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeString = today.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });

  // Quick highlights
  const newMatchesCount = matchedPeople.length;
  const liveEventCount = liveEvents.length;

  // Stats calculations
  const totalConnections = 23 + Math.floor(Math.random() * 10);
  const totalMessages = 156 + unreadMessages;
  const totalProjects = userProjects.length;
  const totalEvents = mockEvents.filter((e) => e.attendees.includes(user.id)).length;

  // AI-powered features
  const recommendedActions = generateRecommendedActions(user, mockUsers);
  const profileCompletion = calculateProfileCompletion(user);

  return (
    <AppLayout>
      {/* Onboarding Tour */}
      <OnboardingTour run={showTour} onComplete={completeTour} onSkip={skipTour} />

      {/* HERO SECTION */}
      <motion.div
        className="mb-8 p-8 bg-[#1a1a1a] rounded-3xl border-2 border-white/10"
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        exit={fadeInUp.exit}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {greetingEmoji} {greeting}, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-white/70">
              {dateString.charAt(0).toUpperCase() + dateString.slice(1)} • {timeString}
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-2xl flex items-center justify-center text-3xl text-white font-bold">
            {user.name.charAt(0)}
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="flex flex-wrap gap-4">
          {newMatchesCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-konekt-green/10 text-konekt-green rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>{newMatchesCount} noví lidé tě matchují</span>
            </div>
          )}
          {unreadMessages > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-konekt-pink/10 text-konekt-pink rounded-full text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              <span>{unreadMessages} nové zprávy</span>
            </div>
          )}
          {liveEventCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-konekt-green/10 text-konekt-green rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-konekt-green rounded-full animate-pulse" />
              <span>{liveEvents[0].name} probíhá právě teď</span>
            </div>
          )}
          {upcomingEvents.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>{upcomingEvents[0].name} začíná brzy</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* QUICK STATS CARDS */}
      <motion.div
        data-tour="stats-cards"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Connections */}
        <Link href="/people">
          <motion.div
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={tapScale}
            className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-green hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-green/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-green/20 transition-colors">
                <Users2 className="w-6 h-6 text-konekt-green" />
              </div>
              <div className="flex items-center gap-1 text-konekt-green text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+3</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{totalConnections}</div>
            <div className="text-sm text-white/70">Spojení</div>
          </motion.div>
        </Link>

        {/* Messages */}
        <Link href="/messages">
          <motion.div
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={tapScale}
            className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-pink hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-pink/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-pink/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-konekt-pink" />
              </div>
              {unreadMessages > 0 && (
                <div className="px-2 py-1 bg-konekt-pink text-konekt-white text-xs font-bold rounded-full">
                  {unreadMessages} nové
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{totalMessages}</div>
            <div className="text-sm text-white/70">Zprávy</div>
          </motion.div>
        </Link>

        {/* Projects */}
        <Link href="/projects">
          <motion.div
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={tapScale}
            className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-green hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-green/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-green/20 transition-colors">
                <Briefcase className="w-6 h-6 text-konekt-green" />
              </div>
              {userProjects.some((p) => p.stage === 'mvp' || p.stage === 'launched') && (
                <div className="px-2 py-1 bg-konekt-green/10 text-konekt-green text-xs font-medium rounded-full">
                  {userProjects.filter((p) => p.stage === 'mvp' || p.stage === 'launched').length} aktivní
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{totalProjects}</div>
            <div className="text-sm text-white/70">Projekty</div>
          </motion.div>
        </Link>

        {/* Events */}
        <Link href="/events">
          <motion.div
            variants={staggerItem}
            whileHover={hoverScale}
            whileTap={tapScale}
            className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-pink hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-konekt-pink/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-pink/20 transition-colors">
                <Calendar className="w-6 h-6 text-konekt-pink" />
              </div>
              {liveEventCount > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-konekt-green/10 text-konekt-green text-xs font-medium rounded-full">
                  <div className="w-1.5 h-1.5 bg-konekt-green rounded-full animate-pulse" />
                  <span>{liveEventCount} live</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{totalEvents}</div>
            <div className="text-sm text-white/70">Eventy</div>
          </motion.div>
        </Link>
      </motion.div>

      {/* TWO COLUMN LAYOUT */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {/* LEFT COLUMN (70%) */}
        <div className="lg:col-span-2 space-y-8">
          {/* FOR YOU TODAY */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-konekt-green" />
              <h2 className="text-2xl font-bold text-white">Pro tebe dnes</h2>
            </div>

            {/* MATCHED PEOPLE */}
            <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-konekt-green" />
                  <h3 className="text-xl font-bold text-white">
                    {matchedPeople.length} noví lidé které musíš vidět
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {matchedPeople.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-start gap-4 p-4 bg-[#151515] rounded-xl hover:bg-[#151515]/70 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-konekt-white font-bold text-lg flex-shrink-0">
                      {person.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{person.name}</h4>
                        <span className="text-sm text-white/60">• {person.school}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-konekt-green">
                          Match: {person.matchScore}%
                        </span>
                        {person.sharedSkills.length > 0 && (
                          <span className="text-sm text-white/60">
                            • {person.sharedSkills.slice(0, 2).join(', ')}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {person.sharedSkills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-konekt-green/10 text-konekt-green text-xs font-medium rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Link href={`/profile/${person.username}`}>
                        <Button size="sm" variant="outline">
                          Zobrazit
                        </Button>
                      </Link>
                      <Link href="/messages">
                        <Button size="sm">
                          <Send className="w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/feed">
                <button className="w-full mt-4 py-3 text-konekt-green font-medium hover:bg-konekt-green/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <span>Zobrazit všechny matches</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* TRENDING PROJECTS */}
            <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-konekt-pink" />
                  <h3 className="text-xl font-bold text-white">Trendy projekty tento týden</h3>
                </div>
              </div>

              <div className="space-y-4">
                {trendingProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start gap-4 p-4 bg-[#151515] rounded-xl hover:bg-[#151515]/70 transition-colors"
                  >
                    <div className="w-12 h-12 bg-konekt-pink/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🚀
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1">{project.name}</h4>
                      <p className="text-sm text-white/70 mb-2 line-clamp-1">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{Math.floor(Math.random() * 300) + 100} views</span>
                        </div>
                        {project.lookingFor.length > 0 && (
                          <span>Hledají: {project.lookingFor[0].role}</span>
                        )}
                      </div>
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <Button size="sm" variant="outline">
                        Zobrazit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>

              <Link href="/projects">
                <button className="w-full mt-4 py-3 text-konekt-pink font-medium hover:bg-konekt-pink/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <span>Procházet projekty</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* MENTOR SPOTLIGHT */}
            <div className="p-6 bg-gradient-to-br from-konekt-green/5 to-konekt-pink/5 rounded-2xl border-2 border-konekt-green/20">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-konekt-green" />
                <h3 className="text-xl font-bold text-white">Doporučený mentor pro tebe</h3>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-2xl flex items-center justify-center text-konekt-white font-bold text-2xl flex-shrink-0">
                  {recommendedMentor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg mb-1">
                    {recommendedMentor.name}
                  </h4>
                  <p className="text-sm text-white/70 mb-2">
                    {recommendedMentor.role} @ {recommendedMentor.company}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recommendedMentor.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-konekt-green/10 text-konekt-green text-xs font-medium rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-white/80 italic mb-4">
                    &quot;{recommendedMentor.bio}&quot;
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Plus className="w-3 h-3 mr-1" />
                      Sledovat
                    </Button>
                    <Button size="sm">Rezervovat Call</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERSONAL ANALYTICS */}
          <div data-tour="analytics">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-konekt-pink" />
              <h2 className="text-2xl font-bold text-white">📊 Tvoje Statistiky</h2>
            </div>

            {user?.gamification && (
              <div className="space-y-6">
                {/* Activity Heatmap */}
                <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Aktivita za poslední rok</h3>
                  <ActivityHeatmap data={generateActivityHeatmap(user.id)} />
                </div>

                {/* Connection Growth & Skills Radar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Růst spojení</h3>
                    <ConnectionGrowthChart
                      data={generateConnectionGrowth(user.gamification.stats.connectionsCount)}
                      events={[
                        {
                          date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
                            .toLocaleDateString('en-CA')
                            .slice(5),
                          name: 'Hackathon',
                        },
                        {
                          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
                            .toLocaleDateString('en-CA')
                            .slice(5),
                          name: 'Networking',
                        },
                      ]}
                    />
                  </div>

                  <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Skills Distribution</h3>
                    <SkillsRadarChart data={generateSkillsRadar(user.skills)} />
                  </div>
                </div>

                {/* Engagement Score */}
                <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">Engagement Score</h3>
                  <EngagementScore
                    totalScore={generateEngagementScore(user.gamification.stats).totalScore}
                    breakdown={generateEngagementScore(user.gamification.stats).breakdown}
                  />
                </div>
              </div>
            )}
          </div>

          {/* YOUR PROJECTS */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-konekt-green" />
                <h2 className="text-2xl font-bold text-white">Tvoje Projekty</h2>
              </div>
            </div>

            <div className="space-y-4">
              {userProjects.length > 0 ? (
                userProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-green hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              project.stage === 'launched'
                                ? 'bg-konekt-green/10 text-konekt-green'
                                : project.stage === 'mvp'
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-konekt-black/5 text-white/60'
                            }`}
                          >
                            {project.stage === 'launched'
                              ? '🟢 Aktivní'
                              : project.stage === 'mvp'
                              ? '🔵 MVP'
                              : '💡 Nápad'}
                          </span>
                        </div>
                        <p className="text-sm text-white/70 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{Math.floor(Math.random() * 100) + 20} views tento týden</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{Math.floor(Math.random() * 10) + 1} nové reakce</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/projects/${project.id}`}>
                        <Button size="sm" variant="outline">
                          Upravit
                        </Button>
                      </Link>
                      <Link href={`/projects/${project.id}`}>
                        <Button size="sm">Zobrazit Profil</Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-konekt-black/20 text-center">
                  <Briefcase className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">Zatím nemáš žádné projekty</p>
                  <Link href="/projects/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Vytvořit první projekt
                    </Button>
                  </Link>
                </div>
              )}

              {userProjects.length > 0 && (
                <Link href="/projects/new">
                  <button className="w-full p-6 bg-[#1a1a1a] rounded-2xl border-2 border-dashed border-konekt-black/20 hover:border-konekt-green hover:bg-konekt-green/5 transition-all flex items-center justify-center gap-2 text-konekt-green font-medium">
                    <Plus className="w-5 h-5" />
                    <span>Vytvořit nový projekt</span>
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-konekt-pink" />
              <h2 className="text-2xl font-bold text-white">Rychlé akce</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/feed">
                <button className="w-full p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-green hover:shadow-lg transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-konekt-green/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-green/20 transition-colors">
                    <Search className="w-6 h-6 text-konekt-green" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Najít spolupracovníky</div>
                    <div className="text-sm text-white/70">Procházej profily</div>
                  </div>
                </button>
              </Link>

              <Link href="/messages">
                <button className="w-full p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-pink hover:shadow-lg transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-konekt-pink/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-pink/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-konekt-pink" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Nová zpráva</div>
                    <div className="text-sm text-white/70">Začni konverzaci</div>
                  </div>
                </button>
              </Link>

              <Link href="/projects/new">
                <button className="w-full p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-green hover:shadow-lg transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-konekt-green/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-green/20 transition-colors">
                    <Rocket className="w-6 h-6 text-konekt-green" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Přidat projekt</div>
                    <div className="text-sm text-white/70">Sdílej svůj nápad</div>
                  </div>
                </button>
              </Link>

              <Link href="/events">
                <button className="w-full p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10 hover:border-konekt-pink hover:shadow-lg transition-all flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-konekt-pink/10 rounded-xl flex items-center justify-center group-hover:bg-konekt-pink/20 transition-colors">
                    <Calendar className="w-6 h-6 text-konekt-pink" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Připojit se k eventu</div>
                    <div className="text-sm text-white/70">Objevuj akce</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (30%) */}
        <div className="space-y-6">
          {/* PROGRESS CHECKLIST */}
          <ProgressChecklist />

          {/* AI RECOMMENDED ACTIONS */}
          <RecommendedActions actions={recommendedActions} />

          {/* PROFILE OPTIMIZATION */}
          <ProfileOptimization
            percentage={profileCompletion.percentage}
            suggestions={profileCompletion.suggestions}
          />

          {/* UPCOMING CALENDAR */}
          <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-konekt-green" />
                <h3 className="font-bold text-white">Nadcházející</h3>
              </div>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => {
                  const eventDate = event.date;
                  const isToday =
                    eventDate.toDateString() === new Date().toDateString();
                  const isTomorrow =
                    eventDate.toDateString() ===
                    new Date(Date.now() + 86400000).toDateString();

                  return (
                    <div
                      key={event.id}
                      className="p-4 bg-[#151515] rounded-xl hover:bg-[#151515]/70 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {event.category === 'hackathon'
                            ? '🚀'
                            : event.category === 'networking'
                            ? '🎉'
                            : event.category === 'workshop'
                            ? '🎓'
                            : '📅'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-konekt-green mb-1">
                            {isToday
                              ? 'Dnes'
                              : isTomorrow
                              ? 'Zítra'
                              : eventDate.toLocaleDateString('cs-CZ', {
                                  day: 'numeric',
                                  month: 'numeric',
                                })}{' '}
                            • {eventDate.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="font-bold text-white text-sm mb-2 line-clamp-2">
                            {event.name}
                          </div>
                          <Link href={`/events/${event.id}/space`}>
                            <Button size="sm" className="w-full">
                              {event.status === 'ongoing' ? 'Připojit se' : 'Detail'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-white/40 text-center py-4">
                  Žádné nadcházející eventy
                </p>
              )}
            </div>

            <Link href="/events">
              <button className="w-full mt-4 py-2 text-konekt-green text-sm font-medium hover:bg-konekt-green/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>Zobrazit kalendář</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* RECENT CHATS */}
          <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-konekt-pink" />
                <h3 className="font-bold text-white">Nedávné konverzace</h3>
              </div>
            </div>

            <div className="space-y-3">
              {userConversations.map((conv) => {
                const otherUser = conv.participants[0];
                const hasUnread = conv.unreadCount > 0;

                return (
                  <Link key={conv.id} href="/messages">
                    <div className="flex items-center gap-3 p-3 bg-[#151515] rounded-lg hover:bg-[#151515]/70 transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-konekt-white font-bold">
                          {otherUser.name.charAt(0)}
                        </div>
                        {hasUnread && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-konekt-pink text-konekt-white text-xs font-bold rounded-full flex items-center justify-center">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm ${hasUnread ? 'font-bold' : 'font-medium'} text-white truncate`}>
                          {otherUser.name}
                        </div>
                        <div className="text-xs text-white/60 truncate">
                          {conv.lastMessage?.content || ''}
                        </div>
                      </div>
                      <div className="text-xs text-white/40">
                        {conv.lastMessage && (
                          <>
                            {new Date(conv.lastMessage.createdAt).toLocaleDateString('cs-CZ', {
                              hour: '2-digit',
                              minute: '2-digit',
                            }) === new Date().toLocaleDateString('cs-CZ', { hour: '2-digit', minute: '2-digit' })
                              ? new Date(conv.lastMessage.createdAt).toLocaleTimeString('cs-CZ', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : new Date(conv.lastMessage.createdAt).toLocaleDateString('cs-CZ') ===
                                new Date(Date.now() - 86400000).toLocaleDateString('cs-CZ')
                              ? 'včera'
                              : new Date(conv.lastMessage.createdAt).toLocaleDateString('cs-CZ', {
                                  day: 'numeric',
                                  month: 'numeric',
                                })}
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link href="/messages">
              <button className="w-full mt-4 py-2 text-konekt-pink text-sm font-medium hover:bg-konekt-pink/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>Zobrazit vše</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* YOUR EVENTS */}
          <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-konekt-green" />
                <h3 className="font-bold text-white">Tvoje Eventy</h3>
              </div>
            </div>

            <div className="space-y-3">
              {liveEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}/space`}>
                  <div className="p-4 bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-2 border-konekt-green/30 rounded-xl hover:border-konekt-green hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-konekt-green rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-konekt-green uppercase">Live</span>
                      <span className="text-xs text-white/60">
                        • {event.attendees.filter((id) => mockUsers.find((u) => u.id === id)?.isOnline).length} online
                      </span>
                    </div>
                    <div className="font-bold text-white mb-2">{event.name}</div>
                    <Button size="sm" className="w-full">
                      Otevřít
                    </Button>
                  </div>
                </Link>
              ))}

              {upcomingEvents.slice(0, 2).map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <div className="p-4 bg-[#151515] rounded-xl hover:bg-[#151515]/70 transition-colors">
                    <div className="text-2xl mb-2">
                      {event.category === 'hackathon'
                        ? '🚀'
                        : event.category === 'networking'
                        ? '🎉'
                        : event.category === 'workshop'
                        ? '🎓'
                        : '📅'}
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{event.name}</div>
                    <div className="text-xs text-white/60">
                      Za {Math.ceil((event.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dny
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/events">
              <button className="w-full mt-4 py-2 text-konekt-green text-sm font-medium hover:bg-konekt-green/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>Procházet eventy</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* MINI NOTIFICATIONS */}
          <div className="p-6 bg-[#1a1a1a] rounded-2xl border-2 border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-konekt-pink" />
                <h3 className="font-bold text-white">Notifikace</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-[#151515] rounded-lg">
                <div className="w-2 h-2 bg-konekt-pink rounded-full mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">Jana</span> ti poslala zprávu
                  </p>
                  <p className="text-xs text-white/40">před 2 min</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#151515] rounded-lg">
                <div className="w-2 h-2 bg-konekt-pink rounded-full mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">Petr</span> má zájem o tvůj projekt
                  </p>
                  <p className="text-xs text-white/40">před 1h</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#151515] rounded-lg">
                <div className="w-2 h-2 bg-konekt-black/20 rounded-full mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70">
                    Nový materiál v <span className="font-medium">BeNextOne</span>
                  </p>
                  <p className="text-xs text-white/40">včera</p>
                </div>
              </div>
            </div>

            <Link href="/notifications">
              <button className="w-full mt-4 py-2 text-konekt-pink text-sm font-medium hover:bg-konekt-pink/5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>Zobrazit vše</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
