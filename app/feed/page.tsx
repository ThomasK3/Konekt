'use client';

import { useState } from 'react';
import { PersonCard } from '@/components/feed/PersonCard';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { MentorPostCard } from '@/components/feed/MentorPost';
import { ComposeMessageModal } from '@/components/ui/ComposeMessageModal';
import { mockUsers, mockProjects, mockMentors, mockMentorPosts } from '@/lib/mock-data';
import { Home, GraduationCap, Rocket, Search, Users } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import type { Mentor } from '@/types';

type MainTab = 'people' | 'mentors' | 'projects';
type MentorTab = 'following' | 'foryou';

export default function FeedPage() {
  const [mainTab, setMainTab] = useState<MainTab>('people');
  const [mentorTab, setMentorTab] = useState<MentorTab>('foryou');
  const [followingMentors, setFollowingMentors] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter people based on search
  const filteredPeople = mockUsers.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.school.toLowerCase().includes(query) ||
      user.skills.some((skill) => skill.toLowerCase().includes(query)) ||
      user.bio.toLowerCase().includes(query)
    );
  });

  // Filter projects based on search
  const filteredProjects = mockProjects.filter((project) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
      project.lookingFor.some((role) => role.role.toLowerCase().includes(query)) ||
      (project.category && project.category.toLowerCase().includes(query))
    );
  });

  // Mentor posts with mentor data
  const mentorPostsWithData = mockMentorPosts
    .map((post) => ({
      post,
      mentor: mockMentors.find((m) => m.id === post.mentorId)!,
    }))
    .filter((item) => item.mentor);

  // Filter mentor posts based on tab and search
  const filteredMentorPosts = (() => {
    let posts = mentorPostsWithData;

    // Filter by following
    if (mentorTab === 'following') {
      posts = posts.filter((item) => followingMentors.includes(item.mentor.id));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter((item) =>
        item.mentor.name.toLowerCase().includes(query) ||
        item.mentor.expertise.some((exp) => exp.toLowerCase().includes(query)) ||
        item.post.content.toLowerCase().includes(query) ||
        (item.post.title && item.post.title.toLowerCase().includes(query))
      );
    }

    return posts;
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

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-konekt-black/40" />
          <input
            type="text"
            placeholder="Hledej lidi, projekty, mentory, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-konekt-white border-2 border-konekt-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-konekt-black/40 hover:text-konekt-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs - Lidé / Mentoři / Projekty */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setMainTab('people')}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
            mainTab === 'people'
              ? 'bg-konekt-green text-konekt-white'
              : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-black/30'
          }`}
        >
          <Users className="w-5 h-5" />
          Lidé
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

      {/* PEOPLE TAB - Only people */}
      {mainTab === 'people' && (
        <div>
          {filteredPeople.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredPeople.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 mx-auto mb-4 text-konekt-black/20" />
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                Žádní lidé nenalezeni
              </h3>
              <p className="text-konekt-black/60">
                Zkus změnit vyhledávací dotaz nebo zkus později
              </p>
            </div>
          )}
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
        <div>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCardSreality key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Rocket className="w-16 h-16 mx-auto mb-4 text-konekt-black/20" />
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                Žádné projekty nenalezeny
              </h3>
              <p className="text-konekt-black/60">
                Zkus změnit vyhledávací dotaz nebo zkus později
              </p>
            </div>
          )}
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
