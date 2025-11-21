'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, fastStaggerContainer, fastStaggerItem } from '@/lib/animations';
import { PersonCard } from '@/components/feed/PersonCard';
import { MatchCard } from '@/components/ai/MatchCard';
import { ProfileCard3D } from '@/components/3d/ProfileCard3D';
import { FlipProfileCard } from '@/components/3d/FlipProfileCard';
import { GlassProfileCard } from '@/components/3d/GlassProfileCard';
import { mockUsers } from '@/lib/mock-data';
import { Search, X, TrendingUp, ChevronDown, ChevronUp, Layers, Box, Glasses, Sparkles } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useUserStore } from '@/lib/store';
import { calculateMatch } from '@/lib/ai-matching';
import { GrowingSkillsChart } from '@/components/analytics/GrowingSkillsChart';
import { SoughtRolesChart } from '@/components/analytics/SoughtRolesChart';
import { IndustriesTreemap } from '@/components/analytics/IndustriesTreemap';
import {
  generateGrowingSkills,
  generateSoughtRoles,
  generateActiveIndustries,
} from '@/lib/analytics-mock';

type CardStyle = 'ai-match' | '3d-tilt' | 'flip' | 'glass';

export default function PeoplePage() {
  const { user: currentUser } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showTrends, setShowTrends] = useState(true);
  const [cardStyle, setCardStyle] = useState<CardStyle>('3d-tilt');

  const allSkills = Array.from(new Set(mockUsers.flatMap((u) => u.skills))).sort();
  const allLocations = Array.from(
    new Set(mockUsers.map((u) => u.location).filter(Boolean) as string[])
  ).sort();

  const filteredUsers = mockUsers.filter((user) => {
    if (currentUser && user.id === currentUser.id) return false; // Exclude current user

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query) ||
        user.skills.some((skill) => skill.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    if (selectedSkills.length > 0) {
      const hasSkill = selectedSkills.some((skill) => user.skills.includes(skill));
      if (!hasSkill) return false;
    }

    if (selectedLocations.length > 0) {
      if (!user.location || !selectedLocations.includes(user.location)) return false;
    }

    if (showOnlineOnly && !user.isOnline) return false;

    return true;
  });

  // Calculate match scores for AI-powered matching
  const usersWithMatches = currentUser
    ? filteredUsers.map((user) => ({
        user,
        matchResult: calculateMatch(currentUser, user),
      }))
    : filteredUsers.map((user) => ({ user, matchResult: null }));

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setSelectedLocations([]);
    setShowOnlineOnly(false);
  };

  const hasActiveFilters =
    searchQuery || selectedSkills.length > 0 || selectedLocations.length > 0 || showOnlineOnly;

  return (
    <AppLayout>
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className="w-72 flex-shrink-0 space-y-4">
          {/* Search */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-konekt-black/40" />
              <input
                type="text"
                placeholder="Hledat lidi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
              />
            </div>
          </div>

          {/* Online Filter */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-5 h-5 rounded accent-konekt-green"
              />
              <span className="font-medium text-konekt-black">Pouze online</span>
            </label>
          </div>

          {/* Skills Filter */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
            <div className="p-4 border-b border-konekt-black/10 flex items-center justify-between">
              <h3 className="font-bold text-konekt-black">Skills</h3>
              {selectedSkills.length > 0 && (
                <span className="text-xs bg-konekt-green text-konekt-white px-2 py-1 rounded-full">
                  {selectedSkills.length}
                </span>
              )}
            </div>
            <div className="p-3 max-h-64 overflow-y-auto">
              <div className="space-y-1">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-konekt-green text-konekt-white font-medium'
                        : 'hover:bg-konekt-cream text-konekt-black/70'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
            <div className="p-4 border-b border-konekt-black/10 flex items-center justify-between">
              <h3 className="font-bold text-konekt-black">Lokace</h3>
              {selectedLocations.length > 0 && (
                <span className="text-xs bg-konekt-green text-konekt-white px-2 py-1 rounded-full">
                  {selectedLocations.length}
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="space-y-1">
                {allLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => toggleLocation(location)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedLocations.includes(location)
                        ? 'bg-konekt-green text-konekt-white font-medium'
                        : 'hover:bg-konekt-cream text-konekt-black/70'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full bg-konekt-white border-2 border-konekt-black/10 rounded-2xl p-4 font-medium text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Vymazat filtry
            </button>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <motion.div
            className="mb-6"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            exit={fadeInUp.exit}
          >
            <div>
              <h1 className="text-3xl font-bold text-konekt-black mb-2">Lidé</h1>
              <p className="text-konekt-black/60">
                {filteredUsers.length} {filteredUsers.length === 1 ? 'člověk' : 'lidí'} nalezeno
              </p>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-konekt-green text-konekt-white rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button onClick={() => toggleSkill(skill)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedLocations.map((location) => (
                  <span
                    key={location}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-konekt-pink text-konekt-white rounded-full text-sm font-medium"
                  >
                    {location}
                    <button onClick={() => toggleLocation(location)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {showOnlineOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-konekt-green/20 text-konekt-green border border-konekt-green/30 rounded-full text-sm font-medium">
                    Online pouze
                    <button onClick={() => setShowOnlineOnly(false)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Market Intelligence Trends */}
          <motion.div
            className="mb-8"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            exit={fadeInUp.exit}
          >
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
              <button
                onClick={() => setShowTrends(!showTrends)}
                className="w-full p-6 flex items-center justify-between hover:bg-konekt-cream/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-konekt-pink" />
                  <h2 className="text-2xl font-bold text-konekt-black">📈 Market Intelligence</h2>
                </div>
                {showTrends ? (
                  <ChevronUp className="w-6 h-6 text-konekt-black/40" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-konekt-black/40" />
                )}
              </button>

              {showTrends && (
                <div className="p-6 pt-0 space-y-6">
                  {/* Growing Skills & Sought Roles */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 bg-konekt-cream rounded-2xl">
                      <h3 className="text-lg font-bold text-konekt-black mb-4">
                        Top Growing Skills
                      </h3>
                      <GrowingSkillsChart data={generateGrowingSkills()} />
                    </div>

                    <div className="p-6 bg-konekt-cream rounded-2xl">
                      <h3 className="text-lg font-bold text-konekt-black mb-4">
                        Most Sought-After Roles
                      </h3>
                      <SoughtRolesChart data={generateSoughtRoles()} />
                    </div>
                  </div>

                  {/* Active Industries */}
                  <div className="p-6 bg-konekt-cream rounded-2xl">
                    <h3 className="text-lg font-bold text-konekt-black mb-4">
                      Active Industries
                    </h3>
                    <IndustriesTreemap data={generateActiveIndustries()} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Card Style Selector - Above Grid */}
          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-konekt-white p-1.5 rounded-2xl border-2 border-konekt-black/10 shadow-lg">
              <button
                onClick={() => setCardStyle('ai-match')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  cardStyle === 'ai-match'
                    ? 'bg-gradient-to-r from-konekt-green to-konekt-pink text-white shadow-lg scale-105'
                    : 'text-konekt-black/60 hover:text-konekt-black hover:bg-konekt-cream'
                }`}
                title="AI Match Cards"
              >
                <Sparkles className="w-4 h-4" />
                AI Match
              </button>
              <button
                onClick={() => setCardStyle('3d-tilt')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  cardStyle === '3d-tilt'
                    ? 'bg-gradient-to-r from-konekt-green to-konekt-pink text-white shadow-lg scale-105'
                    : 'text-konekt-black/60 hover:text-konekt-black hover:bg-konekt-cream'
                }`}
                title="3D Tilt Effect"
              >
                <Box className="w-4 h-4" />
                3D Tilt
              </button>
              <button
                onClick={() => setCardStyle('flip')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  cardStyle === 'flip'
                    ? 'bg-gradient-to-r from-konekt-green to-konekt-pink text-white shadow-lg scale-105'
                    : 'text-konekt-black/60 hover:text-konekt-black hover:bg-konekt-cream'
                }`}
                title="Flip Cards"
              >
                <Layers className="w-4 h-4" />
                Flip
              </button>
              <button
                onClick={() => setCardStyle('glass')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  cardStyle === 'glass'
                    ? 'bg-gradient-to-r from-konekt-green to-konekt-pink text-white shadow-lg scale-105'
                    : 'text-konekt-black/60 hover:text-konekt-black hover:bg-konekt-cream'
                }`}
                title="Glassmorphism"
              >
                <Glasses className="w-4 h-4" />
                Glass
              </button>
            </div>
          </div>

          {/* People Grid */}
          <motion.div
            className={`grid gap-6 ${
              cardStyle === 'glass'
                ? 'grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 bg-gradient-to-br from-konekt-green via-konekt-pink to-konekt-green p-6 rounded-2xl'
                : 'grid-cols-1 xl:grid-cols-2'
            }`}
            variants={fastStaggerContainer}
            initial="initial"
            animate="animate"
          >
            {usersWithMatches.map(({ user: person, matchResult }) => (
              <motion.div key={person.id} variants={fastStaggerItem}>
                {cardStyle === 'ai-match' && matchResult ? (
                  <MatchCard user={person} matchResult={matchResult} />
                ) : cardStyle === '3d-tilt' ? (
                  <ProfileCard3D
                    user={person}
                    matchScore={matchResult?.matchScore}
                    variant={matchResult && matchResult.matchScore >= 85 ? 'premium' : 'holographic'}
                  />
                ) : cardStyle === 'flip' ? (
                  <FlipProfileCard user={person} />
                ) : cardStyle === 'glass' ? (
                  <GlassProfileCard user={person} matchScore={matchResult?.matchScore} />
                ) : (
                  <PersonCard person={person} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-konekt-black/5 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-konekt-black/20" />
              </div>
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                Žádní lidé nenalezeni
              </h3>
              <p className="text-konekt-black/60 mb-4">
                Zkuste upravit své filtry nebo vyhledávací dotaz
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-konekt-green text-konekt-white rounded-xl font-medium hover:bg-konekt-green/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                  Vymazat filtry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
