'use client';

import { useState } from 'react';
import { PersonCard } from '@/components/feed/PersonCard';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { mockUsers, mockProjects } from '@/lib/mock-data';
import AppLayout from '@/components/layout/AppLayout';

type FilterType = 'all' | 'people' | 'projects';

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const allItems = [
    ...mockUsers.map((u) => ({ type: 'person' as const, data: u, id: u.id })),
    ...mockProjects.map((p) => ({ type: 'project' as const, data: p, id: p.id })),
  ].sort(() => Math.random() - 0.5);

  const filteredItems = (() => {
    switch (activeFilter) {
      case 'people':
        return mockUsers.map((u) => ({ type: 'person' as const, data: u, id: u.id }));
      case 'projects':
        return mockProjects.map((p) => ({ type: 'project' as const, data: p, id: p.id }));
      default:
        return allItems;
    }
  })();

  return (
    <AppLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-konekt-black mb-2">Objevuj</h1>
        <p className="text-konekt-black/60">
          Objevuj lidi, projekty a příležitosti v české startup komunitě
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          Vše
        </button>
        <button
          onClick={() => setActiveFilter('people')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'people'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          Lidé ({mockUsers.length})
        </button>
        <button
          onClick={() => setActiveFilter('projects')}
          className={`px-5 py-2.5 rounded-full font-medium transition-all ${
            activeFilter === 'projects'
              ? 'bg-konekt-black text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          Projekty ({mockProjects.length})
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          if (item.type === 'person') {
            return <PersonCard key={item.id} person={item.data} />;
          } else {
            return <ProjectCardSreality key={item.id} project={item.data} />;
          }
        })}
      </div>
    </AppLayout>
  );
}
