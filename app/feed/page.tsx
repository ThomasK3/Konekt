'use client';

import { useState } from 'react';
import { PersonCard } from '@/components/feed/PersonCard';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { mockUsers, mockProjects } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import { Bell, Search, Home, Briefcase, Users2, Award } from 'lucide-react';
import Link from 'next/link';

type FilterType = 'all' | 'people' | 'projects' | 'mentors';

export default function FeedPage() {
  const user = useUserStore((state) => state.user);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Combine users and projects for "all" view
  const allItems = [
    ...mockUsers.map((u) => ({ type: 'person' as const, data: u, id: u.id })),
    ...mockProjects.map((p) => ({ type: 'project' as const, data: p, id: p.id })),
  ].sort(() => Math.random() - 0.5); // Shuffle for mixed feed

  const filteredItems = (() => {
    switch (activeFilter) {
      case 'people':
        return mockUsers.map((u) => ({ type: 'person' as const, data: u, id: u.id }));
      case 'projects':
        return mockProjects.map((p) => ({ type: 'project' as const, data: p, id: p.id }));
      case 'mentors':
        return mockUsers.filter(u => u.role === 'mentor').map((u) => ({ type: 'person' as const, data: u, id: u.id }));
      default:
        return allItems;
    }
  })();

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/feed" className="text-2xl font-bold text-konekt-black">
              Konekt
            </Link>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
                <Search className="w-5 h-5 text-konekt-black/60" />
              </button>
              <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-konekt-black/60" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-konekt-pink rounded-full" />
              </button>
              {user && (
                <Link href={`/profile/${user.username}`}>
                  <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold cursor-pointer hover:opacity-80 transition-opacity">
                    {user.name.charAt(0)}
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2">
            <Link
              href="/feed"
              className="px-4 py-2 bg-konekt-green text-konekt-white rounded-lg font-medium flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Feed
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 hover:bg-konekt-cream rounded-lg font-medium flex items-center gap-2 text-konekt-black/70 hover:text-konekt-black transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              Projekty
            </Link>
            <button className="px-4 py-2 hover:bg-konekt-cream rounded-lg font-medium flex items-center gap-2 text-konekt-black/70 hover:text-konekt-black transition-colors">
              <Users2 className="w-4 h-4" />
              Lidé
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Toggle Filters */}
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-konekt-green text-konekt-white shadow-lg'
                : 'bg-konekt-white text-konekt-black/70 hover:text-konekt-black border-2 border-konekt-black/10'
            }`}
          >
            Vše
          </button>
          <button
            onClick={() => setActiveFilter('people')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeFilter === 'people'
                ? 'bg-konekt-green text-konekt-white shadow-lg'
                : 'bg-konekt-white text-konekt-black/70 hover:text-konekt-black border-2 border-konekt-black/10'
            }`}
          >
            <Users2 className="w-4 h-4" />
            Lidi ({mockUsers.length})
          </button>
          <button
            onClick={() => setActiveFilter('projects')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeFilter === 'projects'
                ? 'bg-konekt-green text-konekt-white shadow-lg'
                : 'bg-konekt-white text-konekt-black/70 hover:text-konekt-black border-2 border-konekt-black/10'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Projekty ({mockProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('mentors')}
            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
              activeFilter === 'mentors'
                ? 'bg-konekt-green text-konekt-white shadow-lg'
                : 'bg-konekt-white text-konekt-black/70 hover:text-konekt-black border-2 border-konekt-black/10'
            }`}
          >
            <Award className="w-4 h-4" />
            Mentoři
          </button>
        </div>

        {/* Sreality-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            if (item.type === 'person') {
              return <PersonCard key={`person-${item.id}`} person={item.data} />;
            } else {
              return <ProjectCardSreality key={`project-${item.id}`} project={item.data} />;
            }
          })}
        </div>

        {/* Load More (placeholder) */}
        {filteredItems.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-konekt-white hover:bg-konekt-green hover:text-konekt-white border-2 border-konekt-black/10 rounded-xl font-medium transition-all">
              Načíst další
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-konekt-black mb-2">Žádné výsledky</h3>
            <p className="text-konekt-black/60">Zkus změnit filtr nebo se vrať později</p>
          </div>
        )}
      </div>
    </div>
  );
}
