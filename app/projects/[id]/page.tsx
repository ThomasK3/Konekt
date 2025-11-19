'use client';

import { use } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProjects, mockUsers } from '@/lib/mock-data';
import { Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-konekt-black mb-4">404</h1>
          <p className="text-konekt-black/60 mb-6">Projekt nenalezen</p>
          <Button onClick={() => router.push('/projects')}>Zpět na projekty</Button>
        </div>
      </div>
    );
  }

  const owner = mockUsers.find((u) => u.id === project.ownerId);

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/projects" className="text-2xl font-bold text-konekt-black hover:text-konekt-green transition-colors">
            Konekt
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-konekt-black mb-3">{project.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-konekt-black/60">
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
                      <span>{project.teamMembers.length} členů</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    project.stage === 'idea'
                      ? 'bg-konekt-pink/20 text-konekt-pink'
                      : project.stage === 'mvp'
                      ? 'bg-konekt-green/20 text-konekt-green'
                      : 'bg-konekt-black/20 text-konekt-black'
                  }`}
                >
                  {project.stage === 'idea' ? '💡 Idea' : project.stage === 'mvp' ? '🚀 MVP' : '✨ Launched'}
                </span>
              </div>

              <p className="text-konekt-black/70 leading-relaxed mb-6">{project.description}</p>

              <div className="flex gap-3">
                <Button className="flex-1">
                  Mám zájem se připojit
                </Button>
                <Button variant="outline">Uložit</Button>
              </div>
            </Card>

            {/* Tech Stack */}
            <Card>
              <h2 className="text-xl font-bold text-konekt-black mb-4">Tech Stack</h2>
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
            </Card>

            {/* Team Members */}
            <Card>
              <h2 className="text-xl font-bold text-konekt-black mb-4">Tým ({project.teamMembers.length})</h2>
              <div className="space-y-3">
                {project.teamMembers.map((member) => (
                  <Link
                    key={member.id}
                    href={`/profile/${member.username}`}
                    className="flex items-center gap-3 p-3 bg-konekt-cream rounded-lg hover:bg-konekt-cream/70 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-konekt-black">{member.name}</div>
                      <div className="text-sm text-konekt-black/60">
                        {member.id === project.ownerId && '👑 Founder • '}
                        {member.school}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-konekt-white text-xs text-konekt-black/60 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Founder */}
            {owner && (
              <Card>
                <h3 className="text-lg font-bold text-konekt-black mb-3">Founder</h3>
                <Link
                  href={`/profile/${owner.username}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-konekt-pink flex items-center justify-center text-konekt-white font-semibold">
                    {owner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-konekt-black">{owner.name}</div>
                    <div className="text-sm text-konekt-black/60">{owner.school}</div>
                  </div>
                </Link>
              </Card>
            )}

            {/* Looking For */}
            {project.lookingFor.length > 0 && (
              <Card>
                <h3 className="text-lg font-bold text-konekt-black mb-3">Hledáme do týmu</h3>
                <div className="space-y-3">
                  {project.lookingFor.map((role, idx) => (
                    <div key={idx} className="p-3 bg-konekt-pink/10 rounded-lg">
                      <div className="font-semibold text-konekt-pink mb-1">
                        {role.role} ({role.count}x)
                      </div>
                      {role.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-konekt-white text-xs text-konekt-black/60 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
