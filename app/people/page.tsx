'use client';

import { useState } from 'react';
import { PersonCard } from '@/components/feed/PersonCard';
import { mockUsers } from '@/lib/mock-data';
import { Search, Filter, X } from 'lucide-react';
import Link from 'next/link';

export default function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Get unique skills and locations
  const allSkills = Array.from(new Set(mockUsers.flatMap((u) => u.skills))).sort();
  const allLocations = Array.from(
    new Set(mockUsers.map((u) => u.location).filter(Boolean) as string[])
  ).sort();

  // Filter users
  const filteredUsers = mockUsers.filter((user) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query) ||
        user.skills.some((skill) => skill.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      const hasSkill = selectedSkills.some((skill) => user.skills.includes(skill));
      if (!hasSkill) return false;
    }

    // Location filter
    if (selectedLocations.length > 0) {
      if (!user.location || !selectedLocations.includes(user.location)) return false;
    }

    // Online filter
    if (showOnlineOnly && !user.isOnline) return false;

    return true;
  });

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
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/feed" className="text-2xl font-bold text-konekt-black">
              Konekt
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-80 flex-shrink-0 sticky top-24 self-start space-y-4">
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
          <main className="flex-1">
            {/* Header */}
            <div className="mb-6 flex items-end justify-between">
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
            </div>

            {/* People Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredUsers.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>

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
          </main>
        </div>
      </div>
    </div>
  );
}
