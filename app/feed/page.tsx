'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, fastStaggerContainer, fastStaggerItem, hoverScale, tapScale } from '@/lib/animations';
import { PersonCard } from '@/components/feed/PersonCard';
import { ProjectCardSreality } from '@/components/feed/ProjectCardSreality';
import { MentorPostCard } from '@/components/feed/MentorPost';
import { ComposeMessageModal } from '@/components/ui/ComposeMessageModal';
import { PersonalizedFeedBanner } from '@/components/ai/PersonalizedFeedBanner';
import { mockUsers, mockProjects, mockMentors, mockMentorPosts } from '@/lib/mock-data';
import { Home, GraduationCap, Rocket, Search, Users, Filter, X } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useUserStore } from '@/lib/store';
import type { Mentor } from '@/types';

type MainTab = 'people' | 'mentors' | 'projects';
type MentorTab = 'following' | 'foryou';

export default function FeedPage() {
  const { user: currentUser } = useUserStore();
  const [mainTab, setMainTab] = useState<MainTab>('people');
  const [mentorTab, setMentorTab] = useState<MentorTab>('foryou');
  const [followingMentors, setFollowingMentors] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter states
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
  const [selectedProjectStage, setSelectedProjectStage] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  // Popular filters
  const popularSkills = ['React', 'Python', 'Design', 'Marketing', 'TypeScript', 'AI/ML'];
  const popularLookingFor = ['Co-founder', 'Developer', 'Designer', 'Marketing Team'];
  const projectStages = ['idea', 'mvp', 'launched'];
  const popularStack = ['React', 'Python', 'Node.js', 'TypeScript', 'AI/ML'];
  const popularExpertise = ['Product Management', 'React', 'Marketing', 'AI/ML', 'Leadership'];

  // Toggle filter
  const toggleFilter = (filter: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // Filter people based on search + filters
  const filteredPeople = mockUsers.filter((user) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.school.toLowerCase().includes(query) ||
        user.skills.some((skill) => skill.toLowerCase().includes(query)) ||
        user.bio.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      const hasMatchingSkill = selectedSkills.some((skill) =>
        user.skills.some((userSkill) => userSkill.toLowerCase().includes(skill.toLowerCase()))
      );
      if (!hasMatchingSkill) return false;
    }

    // Looking for filter
    if (selectedLookingFor.length > 0) {
      const hasMatchingLookingFor = selectedLookingFor.some((lf) =>
        user.lookingFor.some((userLf) => userLf.toLowerCase().includes(lf.toLowerCase()))
      );
      if (!hasMatchingLookingFor) return false;
    }

    return true;
  });

  // Filter projects based on search + filters
  const filteredProjects = mockProjects.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.lookingFor.some((role) => role.role.toLowerCase().includes(query)) ||
        (project.category && project.category.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Stage filter
    if (selectedProjectStage.length > 0) {
      if (!selectedProjectStage.includes(project.stage)) return false;
    }

    // Stack filter
    if (selectedStack.length > 0) {
      const hasMatchingStack = selectedStack.some((tech) =>
        project.stack.some((projectTech) => projectTech.toLowerCase().includes(tech.toLowerCase()))
      );
      if (!hasMatchingStack) return false;
    }

    return true;
  });

  // Mentor posts with mentor data
  const mentorPostsWithData = mockMentorPosts
    .map((post) => ({
      post,
      mentor: mockMentors.find((m) => m.id === post.mentorId)!,
    }))
    .filter((item) => item.mentor);

  // Filter mentor posts based on tab, search, and filters
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

    // Filter by expertise
    if (selectedExpertise.length > 0) {
      posts = posts.filter((item) =>
        selectedExpertise.some((exp) =>
          item.mentor.expertise.some((mentorExp) =>
            mentorExp.toLowerCase().includes(exp.toLowerCase())
          )
        )
      );
    }

    return posts;
  })();

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedLookingFor([]);
    setSelectedProjectStage([]);
    setSelectedStack([]);
    setSelectedExpertise([]);
  };

  const hasActiveFilters =
    selectedSkills.length > 0 ||
    selectedLookingFor.length > 0 ||
    selectedProjectStage.length > 0 ||
    selectedStack.length > 0 ||
    selectedExpertise.length > 0;

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
      <motion.div
        className="mb-6"
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        exit={fadeInUp.exit}
      >
        <h1 className="text-3xl font-bold text-konekt-black mb-2">Feed</h1>
        <p className="text-konekt-black/60">
          Objevuj lidi, sleduj mentory a najdi zajímavé projekty
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mb-6"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        exit={fadeIn.exit}
      >
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
      </motion.div>

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
          {/* Filters for People */}
          <div className="mb-6 space-y-4">
            {/* Skills Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-konekt-black/60" />
                <span className="text-sm font-medium text-konekt-black/70">Skills:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleFilter(skill, setSelectedSkills)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-konekt-green text-konekt-white'
                        : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-green'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Looking For Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-konekt-black/60" />
                <span className="text-sm font-medium text-konekt-black/70">Hledá:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularLookingFor.map((lf) => (
                  <button
                    key={lf}
                    onClick={() => toggleFilter(lf, setSelectedLookingFor)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedLookingFor.includes(lf)
                        ? 'bg-konekt-pink text-konekt-white'
                        : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-pink'
                    }`}
                  >
                    {lf}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-konekt-black/60 hover:text-konekt-black transition-colors"
              >
                <X className="w-4 h-4" />
                Vymazat všechny filtry
              </button>
            )}
          </div>

          {/* AI-Powered Personalized Banner */}
          {currentUser && (
            <PersonalizedFeedBanner
              currentUser={currentUser}
              selectedSkills={selectedSkills}
              selectedLookingFor={selectedLookingFor}
              hasActiveFilters={selectedSkills.length > 0 || selectedLookingFor.length > 0}
              contentType="people"
              resultCount={filteredPeople.length}
            />
          )}

          {filteredPeople.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
              variants={fastStaggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredPeople.map((person, index) => (
                <motion.div key={person.id} variants={fastStaggerItem}>
                  <PersonCard person={person} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 mx-auto mb-4 text-konekt-black/20" />
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                Žádní lidé nenalezeni
              </h3>
              <p className="text-konekt-black/60">
                Zkus změnit vyhledávací dotaz nebo filtry
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

          {/* Filters for Mentors */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-konekt-black/60" />
              <span className="text-sm font-medium text-konekt-black/70">Expertise:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularExpertise.map((exp) => (
                <button
                  key={exp}
                  onClick={() => toggleFilter(exp, setSelectedExpertise)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedExpertise.includes(exp)
                      ? 'bg-konekt-green text-konekt-white'
                      : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-green'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 mt-3 text-sm text-konekt-black/60 hover:text-konekt-black transition-colors"
              >
                <X className="w-4 h-4" />
                Vymazat všechny filtry
              </button>
            )}
          </div>

          {/* AI-Powered Personalized Banner */}
          {currentUser && (
            <PersonalizedFeedBanner
              currentUser={currentUser}
              selectedSkills={selectedExpertise}
              hasActiveFilters={selectedExpertise.length > 0}
              contentType="mentors"
              resultCount={filteredMentorPosts.length}
            />
          )}

          {/* Mentor Posts */}
          {filteredMentorPosts.length > 0 ? (
            <motion.div
              className="max-w-3xl mx-auto space-y-6"
              variants={fastStaggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredMentorPosts.map(({ post, mentor }) => (
                <motion.div key={post.id} variants={fastStaggerItem}>
                  <MentorPostCard
                    post={post}
                    mentor={mentor}
                    isFollowing={followingMentors.includes(mentor.id)}
                    onFollow={handleFollow}
                    onMessage={handleMessage}
                  />
                </motion.div>
              ))}
            </motion.div>
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
          {/* Filters for Projects */}
          <div className="mb-6 space-y-4">
            {/* Stage Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-konekt-black/60" />
                <span className="text-sm font-medium text-konekt-black/70">Stádium:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectStages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => toggleFilter(stage, setSelectedProjectStage)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                      selectedProjectStage.includes(stage)
                        ? 'bg-konekt-green text-konekt-white'
                        : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-green'
                    }`}
                  >
                    {stage === 'idea' ? 'Nápad' : stage === 'mvp' ? 'MVP' : 'Launched'}
                  </button>
                ))}
              </div>
            </div>

            {/* Stack Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-konekt-black/60" />
                <span className="text-sm font-medium text-konekt-black/70">Tech Stack:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularStack.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleFilter(tech, setSelectedStack)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedStack.includes(tech)
                        ? 'bg-konekt-pink text-konekt-white'
                        : 'bg-konekt-white text-konekt-black border-2 border-konekt-black/10 hover:border-konekt-pink'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-konekt-black/60 hover:text-konekt-black transition-colors"
              >
                <X className="w-4 h-4" />
                Vymazat všechny filtry
              </button>
            )}
          </div>

          {/* AI-Powered Personalized Banner */}
          {currentUser && (
            <PersonalizedFeedBanner
              currentUser={currentUser}
              selectedSkills={selectedStack}
              hasActiveFilters={selectedProjectStage.length > 0 || selectedStack.length > 0}
              contentType="projects"
              resultCount={filteredProjects.length}
            />
          )}

          {filteredProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6"
              variants={fastStaggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={fastStaggerItem}>
                  <ProjectCardSreality project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Rocket className="w-16 h-16 mx-auto mb-4 text-konekt-black/20" />
              <h3 className="text-xl font-semibold text-konekt-black mb-2">
                Žádné projekty nenalezeny
              </h3>
              <p className="text-konekt-black/60">
                Zkus změnit vyhledávací dotaz nebo filtry
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
