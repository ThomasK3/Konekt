'use client';

import { ChannelsList } from '@/components/feed/ChannelsList';
import { PostCard } from '@/components/feed/PostCard';
import { MentorCard } from '@/components/feed/MentorCard';
import { mockChannels, mockPosts, mockMentors, mockProjects, mockUsers } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import { Bell, Search, Briefcase, Users2, Home } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function FeedPage() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/feed" className="text-2xl font-bold text-konekt-black">Konekt</Link>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
                <Search className="w-5 h-5 text-konekt-black/60" />
              </button>
              <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-konekt-black/60" />
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
            <Link href="/feed" className="px-4 py-2 bg-konekt-green text-konekt-white rounded-lg font-medium flex items-center gap-2">
              <Home className="w-4 h-4" />
              Feed
            </Link>
            <Link href="/projects" className="px-4 py-2 hover:bg-konekt-cream rounded-lg font-medium flex items-center gap-2 text-konekt-black/70 hover:text-konekt-black transition-colors">
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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Channels */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <ChannelsList channels={mockChannels} />
            </div>
          </aside>

          {/* Center - Feed */}
          <main className="lg:col-span-6 space-y-6">
            <div className="bg-konekt-white rounded-xl border-2 border-konekt-black/10 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold">
                  {user?.name.charAt(0) || 'U'}
                </div>
                <button className="flex-1 text-left px-4 py-3 bg-konekt-cream rounded-lg text-konekt-black/60 hover:bg-konekt-cream/70 transition-colors">
                  Sdílej své myšlenky...
                </button>
              </div>
            </div>

            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </main>

          {/* Right Sidebar - Recommended Projects & People */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-6">
              {/* Hot Projects */}
              <div>
                <h2 className="text-lg font-bold text-konekt-black px-2 mb-4">
                  🔥 Aktuální projekty
                </h2>
                <div className="space-y-3">
                  {mockProjects.slice(0, 2).map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <Card hover className="!p-4">
                        <h3 className="font-bold text-konekt-black mb-1">{project.name}</h3>
                        <p className="text-xs text-konekt-black/60 mb-2 line-clamp-2">
                          {project.description}
                        </p>
                        {project.lookingFor.length > 0 && (
                          <div className="text-xs text-konekt-pink font-medium">
                            Hledá: {project.lookingFor[0].role}
                          </div>
                        )}
                      </Card>
                    </Link>
                  ))}
                </div>
                <Link href="/projects" className="block mt-3 px-2 text-sm text-konekt-green hover:underline">
                  Zobrazit všechny projekty →
                </Link>
              </div>

              {/* People looking for team */}
              <div>
                <h2 className="text-lg font-bold text-konekt-black px-2 mb-4">
                  👥 Hledají spolupráci
                </h2>
                <div className="space-y-3">
                  {mockUsers.slice(0, 2).map((person) => (
                    <Link key={person.id} href={`/profile/${person.username}`}>
                      <Card hover className="!p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold">
                            {person.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-konekt-black truncate">{person.name}</div>
                            <div className="text-xs text-konekt-black/60">{person.school}</div>
                          </div>
                        </div>
                        {person.lookingFor.length > 0 && (
                          <div className="text-xs text-konekt-pink">
                            Hledá: {person.lookingFor[0]}
                          </div>
                        )}
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
