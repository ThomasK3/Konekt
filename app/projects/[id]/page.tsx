'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { mockProjects } from '@/lib/projects-data';
import { mockUsers } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import {
  Users, Calendar, Eye, Bookmark, Share2, Heart, MessageCircle,
  ExternalLink, Github, Figma, Globe, Video, Sparkles, TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ReactionsBar } from '@/components/projects/ReactionsBar';
import { ProjectUpdates } from '@/components/projects/ProjectUpdates';
import { CommentsSection } from '@/components/projects/CommentsSection';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const user = useUserStore((state) => state.user);

  const project = mockProjects.find((p) => p.id === id);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-konekt-black mb-4">404</h1>
          <p className="text-konekt-black/60 mb-6">Project not found</p>
          <Button onClick={() => router.push('/projects')}>Back to Projects</Button>
        </div>
      </div>
    );
  }

  const owner = mockUsers.find((u) => u.id === project.ownerId);

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-3xl font-bold text-konekt-black mt-8 mb-4">{line.slice(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold text-konekt-black mt-6 mb-3">{line.slice(3)}</h2>;
      } else if (line.startsWith('• ') || line.startsWith('- ')) {
        return <li key={i} className="ml-6 text-konekt-black/80 mb-1">{line.slice(2)}</li>;
      } else if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="mb-3 text-konekt-black/80">
            {parts.map((part, j) => (
              j % 2 === 0 ? part : <strong key={j} className="font-bold text-konekt-black">{part}</strong>
            ))}
          </p>
        );
      } else {
        return line ? <p key={i} className="mb-3 text-konekt-black/80">{line}</p> : <br key={i} />;
      }
    });
  };

  const stageConfig = {
    idea: { label: '💡 Idea', color: 'bg-purple-500/20 text-purple-700 border-purple-500/30' },
    development: { label: '🔨 Development', color: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
    beta: { label: '🚀 Beta', color: 'bg-konekt-green/20 text-konekt-green border-konekt-green/30' },
    launched: { label: '✨ Launched', color: 'bg-konekt-pink/20 text-konekt-pink border-konekt-pink/30' },
  };

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/projects')}
            className="text-konekt-black/60 hover:text-konekt-black transition-colors"
          >
            ← Back to Projects
          </button>
          <Link href="/" className="text-2xl font-bold text-konekt-black hover:text-konekt-green transition-colors">
            Konekt
          </Link>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Image/Video */}
            {(project.coverImage || project.coverVideo) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-video rounded-2xl overflow-hidden border-2 border-konekt-black/10"
              >
                {project.coverImage && (
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            )}

            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-konekt-black mb-3">{project.name}</h1>
                  <p className="text-xl text-konekt-black/70 mb-4">{project.oneLiner}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-konekt-black/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString('cs-CZ', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{project.teamMembers.length} members</span>
                    </div>
                    {project.stats && (
                      <>
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-4 h-4" />
                          <span>{project.stats.views} views</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Heart className="w-4 h-4" />
                          <span>{project.stats.reactions} reactions</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${stageConfig[project.stage].color}`}>
                    {stageConfig[project.stage].label}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                {project.lookingForHelp && (
                  <Button className="flex-1 bg-gradient-to-r from-konekt-green to-konekt-pink text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    I'm Interested
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setSaved(!saved)}
                  className={saved ? 'bg-konekt-green/10 border-konekt-green text-konekt-green' : ''}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLiked(!liked)}
                  className={liked ? 'bg-konekt-pink/10 border-konekt-pink text-konekt-pink' : ''}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
            >
              <div className="prose prose-lg max-w-none">
                {renderMarkdown(project.description)}
              </div>
            </motion.div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
              >
                <h2 className="text-2xl font-bold text-konekt-black mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((item) => (
                    <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden border-2 border-konekt-black/5 hover:border-konekt-green/50 transition-colors cursor-pointer group">
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full bg-konekt-black/5 flex items-center justify-center">
                          <Video className="w-12 h-12 text-konekt-black/30" />
                        </div>
                      )}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-konekt-black/80 to-transparent p-3">
                          <p className="text-white text-sm">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
            >
              <h2 className="text-2xl font-bold text-konekt-black mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-konekt-green text-konekt-white rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {project.links && Object.keys(project.links).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
              >
                <h2 className="text-2xl font-bold text-konekt-black mb-4">Links</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-konekt-cream rounded-xl hover:bg-konekt-green/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-konekt-green" />
                      <span className="font-medium text-konekt-black">Live Demo</span>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-konekt-cream rounded-xl hover:bg-konekt-green/10 transition-colors"
                    >
                      <Github className="w-5 h-5 text-konekt-black" />
                      <span className="font-medium text-konekt-black">GitHub</span>
                    </a>
                  )}
                  {project.links.figma && (
                    <a
                      href={project.links.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-konekt-cream rounded-xl hover:bg-konekt-green/10 transition-colors"
                    >
                      <Figma className="w-5 h-5 text-pink-500" />
                      <span className="font-medium text-konekt-black">Figma</span>
                    </a>
                  )}
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-konekt-cream rounded-xl hover:bg-konekt-green/10 transition-colors"
                    >
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-konekt-black">Website</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Team Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
            >
              <h2 className="text-2xl font-bold text-konekt-black mb-4">Team ({project.teamMembers.length})</h2>
              <div className="grid gap-3">
                {project.teamMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/profile/${member.username}`}
                    className="flex items-center gap-3 p-3 bg-konekt-cream rounded-lg hover:bg-konekt-cream/70 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-konekt-black group-hover:text-konekt-green transition-colors">
                        {member.name}
                        {member.id === project.ownerId && <span className="ml-2 text-xs">👑 Founder</span>}
                      </div>
                      <div className="text-sm text-konekt-black/60">{member.school}</div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-white text-xs text-konekt-black/60 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Project Updates */}
            {project.updates && project.updates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProjectUpdates projectId={project.id} />
              </motion.div>
            )}

            {/* Reactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReactionsBar projectId={project.id} />
            </motion.div>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CommentsSection projectId={project.id} allowComments={project.allowComments} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            {project.stats && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6 sticky top-24"
              >
                <h3 className="text-lg font-bold text-konekt-black mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-konekt-black/60">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Views</span>
                    </div>
                    <span className="font-bold text-konekt-black">{project.stats.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-konekt-black/60">
                      <Bookmark className="w-4 h-4" />
                      <span className="text-sm">Saves</span>
                    </div>
                    <span className="font-bold text-konekt-black">{project.stats.saves}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-konekt-black/60">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Reactions</span>
                    </div>
                    <span className="font-bold text-konekt-black">{project.stats.reactions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-konekt-black/60">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="font-bold text-konekt-black">{project.stats.comments}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Founder */}
            {owner && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
              >
                <h3 className="text-lg font-bold text-konekt-black mb-3">Founder</h3>
                <Link
                  href={`/profile/${owner.username}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-konekt-pink flex items-center justify-center text-konekt-white font-semibold">
                    {owner.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-konekt-black">{owner.name}</div>
                    <div className="text-sm text-konekt-black/60">{owner.school}</div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Looking For */}
            {project.lookingForHelp && project.lookingFor.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-2 border-konekt-green/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-konekt-green" />
                  <h3 className="text-lg font-bold text-konekt-black">Looking for Team</h3>
                </div>
                {project.collaborationMessage && (
                  <p className="text-sm text-konekt-black/70 mb-4">{project.collaborationMessage}</p>
                )}
                <div className="space-y-2">
                  {project.lookingFor.map((role, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg">
                      <div className="font-semibold text-konekt-pink mb-1">
                        {role.role} ({role.count}x)
                      </div>
                      {role.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-konekt-cream text-xs text-konekt-black/60 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-konekt-green to-konekt-pink text-white">
                  I'm Interested
                </Button>
              </motion.div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 p-6"
              >
                <h3 className="text-lg font-bold text-konekt-black mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-konekt-pink/20 text-konekt-pink rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
