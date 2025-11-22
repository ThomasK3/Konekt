'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import { mentors } from '@/lib/mentor-data';
import { Search, Star, Circle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

type SortBy = 'relevance' | 'rating' | 'most-booked';

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');

  // Featured mentors (top 3 by rating)
  const featuredMentors = [...mentors]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Filter and sort mentors
  let filteredMentors = mentors.filter(mentor => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.company.toLowerCase().includes(query) ||
        mentor.primarySkills.some(s => s.name.toLowerCase().includes(query)) ||
        mentor.industries.some(i => i.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // Expertise filter
    if (selectedExpertise !== 'all') {
      const matchesExpertise =
        mentor.primarySkills.some(s => s.name.toLowerCase().includes(selectedExpertise.toLowerCase())) ||
        mentor.industries.some(i => i.toLowerCase().includes(selectedExpertise.toLowerCase()));

      if (!matchesExpertise) return false;
    }

    // Availability filter
    if (selectedAvailability === 'available') {
      if (!mentor.isAvailable) return false;
    }

    return true;
  });

  // Sort
  if (sortBy === 'rating') {
    filteredMentors.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'most-booked') {
    filteredMentors.sort((a, b) => b.sessionsCompleted - a.sessionsCompleted);
  }

  const expertiseOptions = [
    { value: 'all', label: 'All' },
    { value: 'tech', label: 'Tech' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'fundraising', label: 'Fundraising' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available Now' }
  ];

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
          <GraduationCap className="w-10 h-10 text-konekt-green" />
          Find a Mentor
        </h1>
        <p className="text-white/70 text-lg max-w-3xl">
          Learn from experienced professionals in the Czech startup ecosystem. Book 1:1 sessions for personalized guidance.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 dark:border-white/10 p-6 mb-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 dark:text-white/40" />
          <input
            type="text"
            placeholder="Search by name, expertise, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border-2 border-white/10 dark:border-white/10 rounded-xl text-white placeholder:text-white/40 dark:placeholder:text-white/40 focus:outline-none focus:border-konekt-green"
          />
        </div>

        {/* Expertise */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
            Expertise
          </label>
          <div className="flex flex-wrap gap-2">
            {expertiseOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedExpertise(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedExpertise === option.value
                    ? 'bg-konekt-green text-white'
                    : 'bg-[#0a0a0a] text-white border-2 border-white/10 dark:border-white/10 hover:border-konekt-green'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Availability & Sort */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
              Availability
            </label>
            <div className="flex gap-2">
              {availabilityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedAvailability(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedAvailability === option.value
                      ? 'bg-konekt-green text-white'
                      : 'bg-[#0a0a0a] text-white border-2 border-white/10 dark:border-white/10 hover:border-konekt-green'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="w-full px-4 py-2 bg-[#0a0a0a] border-2 border-white/10 dark:border-white/10 rounded-lg text-white focus:outline-none focus:border-konekt-green"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rating</option>
              <option value="most-booked">Most Booked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Mentors */}
      {searchQuery === '' && selectedExpertise === 'all' && selectedAvailability === 'all' && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl font-bold text-white">Featured Mentors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                whileHover={{ y: -4 }}
                className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 dark:border-white/10 overflow-hidden hover:border-konekt-green hover:shadow-xl transition-all"
              >
                <Link href={`/mentors/${mentor.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-white/60 dark:text-white/60 mb-1">
                      {mentor.title}
                    </p>
                    <p className="text-sm text-white/50 dark:text-white/50 mb-4">
                      @ {mentor.company}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="font-bold">{mentor.rating}</span>
                      </div>
                      <span className="text-white/50 dark:text-white/50 text-sm">
                        ({mentor.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Circle
                        className={`w-2 h-2 ${
                          mentor.isAvailable
                            ? 'fill-green-500 text-green-500'
                            : 'fill-red-500 text-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium text-white">
                        {mentor.isAvailable ? 'Available' : 'Booked'}
                      </span>
                    </div>

                    <button className="w-full py-2 bg-konekt-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                      View Profile →
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Mentors Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {searchQuery || selectedExpertise !== 'all' || selectedAvailability !== 'all'
            ? `${filteredMentors.length} Mentors Found`
            : 'All Mentors'}
        </h2>

        {filteredMentors.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 dark:border-white/10 p-12 text-center">
            <GraduationCap className="w-16 h-16 text-white/20 dark:text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No mentors found
            </h3>
            <p className="text-white/60 dark:text-white/60">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                whileHover={{ y: -4 }}
                className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 dark:border-white/10 p-6 hover:border-konekt-green hover:shadow-xl transition-all"
              >
                <Link href={`/mentors/${mentor.id}`}>
                  <div className="flex gap-4 mb-4">
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {mentor.name}
                      </h3>
                      <p className="text-white/60 dark:text-white/60 text-sm mb-1">
                        {mentor.title}
                      </p>
                      <p className="text-white/50 dark:text-white/50 text-sm">
                        @ {mentor.company}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-bold text-white/50 dark:text-white/50 uppercase tracking-wider mb-2">
                      Expertise
                    </p>
                    <ul className="space-y-1">
                      {mentor.canHelpWith.slice(0, 3).map((skill, idx) => (
                        <li key={idx} className="text-sm text-white flex items-center gap-2">
                          <span className="text-konekt-green">•</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10 dark:border-white/10">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="font-bold">{mentor.rating}</span>
                    </div>
                    <span className="text-white/50 dark:text-white/50 text-sm">
                      ({mentor.reviewCount} sessions)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`w-2 h-2 ${
                          mentor.isAvailable
                            ? 'fill-green-500 text-green-500'
                            : 'fill-red-500 text-red-500'
                        }`}
                      />
                      <span className="text-sm text-white">
                        {mentor.isAvailable ? (
                          <>Next available: <span className="font-medium">{mentor.nextAvailable}</span></>
                        ) : (
                          <span className="text-red-500 font-medium">Fully Booked</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 bg-konekt-green/10 text-konekt-green font-bold rounded-lg hover:bg-konekt-green hover:text-white transition-all">
                    View Profile →
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
