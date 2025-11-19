'use client';

import { ChannelsList } from '@/components/feed/ChannelsList';
import { PostCard } from '@/components/feed/PostCard';
import { MentorCard } from '@/components/feed/MentorCard';
import { mockChannels, mockPosts, mockMentors } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import { Bell, Search } from 'lucide-react';

export default function FeedPage() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-konekt-black">Konekt</h1>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
              <Search className="w-5 h-5 text-konekt-black/60" />
            </button>
            <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-konekt-black/60" />
            </button>
            <div className="w-10 h-10 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold">
              {user?.name.charAt(0) || 'U'}
            </div>
          </div>
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

          {/* Right Sidebar - Recommended Mentors */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <h2 className="text-lg font-bold text-konekt-black px-2">
                Doporučení mentoři
              </h2>
              {mockMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
