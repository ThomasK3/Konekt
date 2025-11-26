'use client';

import { useState } from 'react';
import { mockUsers } from '@/lib/mock-data';
import { Search, X, Users2, MapPin } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useUserStore } from '@/lib/store';
import Link from 'next/link';

export default function PeoplePage() {
  const { user: currentUser } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const allSkills = Array.from(new Set(mockUsers.flatMap((u) => u.skills))).sort();

  const filteredUsers = mockUsers.filter((user) => {
    if (currentUser && user.id === currentUser.id) return false;

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

    return true;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
  };

  const hasActiveFilters = searchQuery || selectedSkills.length > 0;

  return (
    <AppLayout>
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside className="w-72 flex-shrink-0 space-y-4">
          {/* Search */}
          <div
            className="rounded-2xl border p-4"
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: '#27272a',
            }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#a1a1aa' }} />
              <input
                type="text"
                placeholder="Hledat lidi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#242424',
                  borderColor: '#27272a',
                  color: '#e4e4e7',
                }}
              />
            </div>
          </div>

          {/* Skills Filter */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: '#27272a',
            }}
          >
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#27272a' }}>
              <h3 className="font-semibold" style={{ color: '#e4e4e7' }}>Skills</h3>
              {selectedSkills.length > 0 && (
                <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#6366f1', color: 'white' }}>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors`}
                    style={
                      selectedSkills.includes(skill)
                        ? { backgroundColor: '#6366f1', color: 'white' }
                        : { color: '#a1a1aa' }
                    }
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full rounded-2xl border p-4 font-medium transition-colors flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: '#27272a',
                color: '#a1a1aa',
              }}
            >
              <X className="w-5 h-5" />
              Vymazat filtry
            </button>
          )}
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight mb-2" style={{ color: '#e4e4e7' }}>
              Lidé
            </h1>
            <p style={{ color: '#a1a1aa' }}>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'člověk' : 'lidí'} nalezeno
            </p>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredUsers.map((person) => (
              <Link key={person.id} href={`/profile/${person.username}`}>
                <div
                  className="p-6 rounded-xl border hover:shadow-xl transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderColor: '#27272a',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#c872a4] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {person.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold" style={{ color: '#e4e4e7' }}>
                          {person.name}
                        </h3>
                        {person.isOnline && (
                          <span className="w-2 h-2 bg-[#4a6953] rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <p className="text-sm mb-2" style={{ color: '#a1a1aa' }}>
                        {person.school}
                      </p>
                      <p className="text-sm mb-3 line-clamp-2" style={{ color: '#a1a1aa' }}>
                        {person.bio}
                      </p>
                      {person.location && (
                        <div className="flex items-center gap-1 text-sm mb-3" style={{ color: '#a1a1aa' }}>
                          <MapPin className="w-4 h-4" />
                          <span>{person.location}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {person.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}
                          >
                            {skill}
                          </span>
                        ))}
                        {person.skills.length > 4 && (
                          <span className="px-2 py-1 rounded text-xs" style={{ color: '#a1a1aa' }}>
                            +{person.skills.length - 4} více
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#242424' }}>
                <Users2 className="w-8 h-8" style={{ color: '#52525b' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#e4e4e7' }}>
                Žádní lidé nenalezeni
              </h3>
              <p className="mb-4" style={{ color: '#a1a1aa' }}>
                Zkuste upravit své filtry nebo vyhledávací dotaz
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors"
                  style={{ backgroundColor: '#6366f1', color: 'white' }}
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
