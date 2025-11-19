'use client';

import { useState } from 'react';
import { PersonCard } from '@/components/feed/PersonCard';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { mockUsers, mockProjects, mockEvents } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import { Bell, Search, Home, Briefcase, Users2, Calendar, MessageCircle, Settings, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type FilterType = 'all' | 'people' | 'projects' | 'events';

export default function FeedPage() {
  const user = useUserStore((state) => state.user);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Combine users, projects, and events for "all" view
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
      case 'events':
        return []; // Events shown separately
      default:
        return allItems;
    }
  })();

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/feed" className="text-2xl font-bold text-konekt-black">
              Konekt
            </Link>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
                <Search className="w-5 h-5 text-konekt-black/60" />
              </button>
              <Link href="/notifications">
                <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-konekt-black/60" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-konekt-pink rounded-full" />
                </button>
              </Link>
              {user && (
                <Link href={`/profile/${user.username}`}>
                  <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold cursor-pointer hover:opacity-80 transition-opacity">
                    {user.name.charAt(0)}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0 sticky top-24 self-start">
            <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
              <div className="p-4 border-b border-konekt-black/10">
                <h2 className="font-bold text-konekt-black">Navigace</h2>
              </div>

              <nav className="p-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeFilter === 'all'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Feed</span>
                </button>

                <button
                  onClick={() => setActiveFilter('people')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeFilter === 'people'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Users2 className="w-5 h-5" />
                  <span>Lidé</span>
                  <span className="ml-auto text-xs bg-konekt-black/10 px-2 py-1 rounded-full">
                    {mockUsers.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveFilter('projects')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 ${
                    activeFilter === 'projects'
                      ? 'bg-konekt-green text-konekt-white'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Projekty</span>
                  <span className="ml-auto text-xs bg-konekt-black/10 px-2 py-1 rounded-full">
                    {mockProjects.length}
                  </span>
                </button>

                <Link href="/events">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black">
                    <Calendar className="w-5 h-5" />
                    <span>Eventy</span>
                    <span className="ml-auto text-xs bg-konekt-pink/20 text-konekt-pink px-2 py-1 rounded-full">
                      {mockEvents.filter(e => e.status !== 'completed').length}
                    </span>
                  </button>
                </Link>

                <Link href="/messages">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black">
                    <MessageCircle className="w-5 h-5" />
                    <span>Zprávy</span>
                    <span className="ml-auto text-xs bg-konekt-pink px-2 py-1 rounded-full text-konekt-white">
                      3
                    </span>
                  </button>
                </Link>
              </nav>

              <div className="p-2 border-t border-konekt-black/10">
                <Link href="/dashboard">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black">
                    <TrendingUp className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                </Link>

                <Link href="/settings">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black">
                    <Settings className="w-5 h-5" />
                    <span>Nastavení</span>
                  </button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-konekt-black mb-2">
                {activeFilter === 'all' && 'Objevuj'}
                {activeFilter === 'people' && 'Lidé'}
                {activeFilter === 'projects' && 'Projekty'}
                {activeFilter === 'events' && 'Eventy'}
              </h1>
              <p className="text-konekt-black/60">
                {activeFilter === 'all' && 'Objevuj lidi, projekty a příležitosti v české startup komunitě'}
                {activeFilter === 'people' && 'Najdi spolupracovníky, co-foundery a mentory'}
                {activeFilter === 'projects' && 'Prozkoumej projekty a najdi své místo'}
                {activeFilter === 'events' && 'Události, workshopy a hackathony'}
              </p>
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

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-konekt-black/5 rounded-full flex items-center justify-center">
                  {activeFilter === 'people' && <Users2 className="w-8 h-8 text-konekt-black/20" />}
                  {activeFilter === 'projects' && <Briefcase className="w-8 h-8 text-konekt-black/20" />}
                  {activeFilter === 'events' && <Calendar className="w-8 h-8 text-konekt-black/20" />}
                </div>
                <h3 className="text-xl font-semibold text-konekt-black mb-2">
                  Zatím tu nic není
                </h3>
                <p className="text-konekt-black/60">
                  Zkuste jiný filtr nebo se vraťte později
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
