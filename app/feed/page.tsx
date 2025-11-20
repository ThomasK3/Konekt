'use client';

import { useState } from 'react';
import { PersonCard } from '@/components/feed/PersonCard';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { MentorPostCard } from '@/components/feed/MentorPost';
import { ComposeMessageModal } from '@/components/ui/ComposeMessageModal';
import { mockUsers, mockProjects, mockMentors, mockMentorPosts } from '@/lib/mock-data';
import { Home, GraduationCap, Rocket, Search } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import type { Mentor } from '@/types';

type MainTab = 'network' | 'mentors' | 'projects';
type MentorTab = 'following' | 'foryou';

export default function FeedPage() {
  const [mainTab, setMainTab] = useState<MainTab>('network');
  const [mentorTab, setMentorTab] = useState<MentorTab>('foryou');
  const [followingMentors, setFollowingMentors] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Network mix of people and projects
  const allItems = [
    ...mockUsers.map((u) => ({ type: 'person' as const, data: u, id: u.id })),
    ...mockProjects.map((p) => ({ type: 'project' as const, data: p, id: p.id })),
  ].sort(() => Math.random() - 0.5);

  // Mentor posts with mentor data
  const mentorPostsWithData = mockMentorPosts
    .map((post) => ({
      post,
      mentor: mockMentors.find((m) => m.id === post.mentorId)!,
    }))
    .filter((item) => item.mentor);

  // Filter mentor posts based on tab
  const filteredMentorPosts = (() => {
    if (mentorTab === 'following') {
      return mentorPostsWithData.filter((item) =>
        followingMentors.includes(item.mentor.id)
      );
    }
    return mentorPostsWithData; // For You - show all, sorted by newest/popular
  })();

  const handleFollow = (mentorId: string) => {
    setFollowingMentors((prev) =>
      prev.includes(mentorId) ? prev.filter((id) => id !== mentorId) : [...prev, mentorId]
    );
  };

  const handleMessage = (mentorId: string) => {
    const mentor = mockMentors.find((m) => m.id === mentorId);
    if (mentor) {
      setSelectedMentor(mentor);
      setIsMessageModalOpen(true);
    }
  };

  const handleSendMessage = (mentorId: string, subject: string, message: string) => {
    console.log('Sending message:', { mentorId, subject, message });
    // TODO: Implement actual message sending
  };

  return (
    <AppLayout>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-konekt-black mb-2">Feed</h1>
        <p className="text-konekt-black/60">
          Objevuj lidi, sleduj mentory a najdi zajímavé projekty
        </p>
      </div>

      {/* Main Tabs - Network / Mentoři / Projekty */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setMainTab('network')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
            mainTab === 'network'
              ? 'bg-konekt-green text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          <Home className="w-5 h-5" />
          Network
        </button>
        <button
          onClick={() => setMainTab('mentors')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
            mainTab === 'mentors'
              ? 'bg-konekt-green text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          Mentoři
        </button>
        <button
          onClick={() => setMainTab('projects')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
            mainTab === 'projects'
              ? 'bg-konekt-green text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          <Rocket className="w-5 h-5" />
          Projekty
        </button>
      </div>

      {/* NETWORK TAB - Mix of people and projects */}
      {mainTab === 'network' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {allItems.map((item) => {
            if (item.type === 'person') {
              return <PersonCard key={item.id} person={item.data} />;
            } else {
              return <ProjectCardSreality key={item.id} project={item.data} />;
            }
          })}
        </div>
      )}

      {/* MENTORS TAB - Mentor Feed */}
      {mainTab === 'mentors' && (
        <div>
          {/* Mentor Sub-tabs */}
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setMentorTab('foryou')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                mentorTab === 'foryou'
                  ? 'bg-konekt-black text-konekt-white'
                  : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
              }`}
            >
              Pro vás
            </button>
            <button
              onClick={() => setMentorTab('following')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                mentorTab === 'following'
                  ? 'bg-konekt-black text-konekt-white'
                  : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
              }`}
            >
              Sleduji {followingMentors.length > 0 && `(${followingMentors.length})`}
            </button>
          </div>

          {/* Mentor Posts */}
          {filteredMentorPosts.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {filteredMentorPosts.map(({ post, mentor }) => (
                <MentorPostCard
                  key={post.id}
                  post={post}
                  mentor={mentor}
                  isFollowing={followingMentors.includes(mentor.id)}
                  onFollow={handleFollow}
                  onMessage={handleMessage}
                />
              ))}
            </div>
          ) : (
            // Empty State - Following tab with no mentors
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-konekt-green/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-konekt-green" />
              </div>
              <h3 className="text-2xl font-bold text-konekt-black mb-3">
                Zatím nesleduješ žádné mentory
              </h3>
              <p className="text-konekt-black/60 mb-6">
                Projdi doporučení v &quot;Pro vás&quot; a začni sledovat mentory, kteří tě zaujmou!
              </p>
              <button
                onClick={() => setMentorTab('foryou')}
                className="px-6 py-3 bg-konekt-green text-konekt-white rounded-xl font-medium hover:bg-konekt-green/90 transition-colors"
              >
                Prozkoumat mentory
              </button>
            </div>
          )}
        </div>
      )}

      {/* PROJECTS TAB - Just projects */}
      {mainTab === 'projects' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCardSreality key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Compose Message Modal */}
      {selectedMentor && (
        <ComposeMessageModal
          mentor={selectedMentor}
          isOpen={isMessageModalOpen}
          onClose={() => {
            setIsMessageModalOpen(false);
            setSelectedMentor(null);
          }}
          onSend={handleSendMessage}
        />
      )}
    </AppLayout>
  );
}
