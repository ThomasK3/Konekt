'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProjects, mockUsers } from '@/lib/mock-data';
import { Users, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/feed" className="text-2xl font-bold text-konekt-black hover:text-konekt-green transition-colors">
            Konekt
          </Link>
          <Link href="/projects/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nový projekt
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-konekt-black mb-2">Projekty</h1>
          <p className="text-konekt-black/60">Objevuj projekty a připoj se k týmu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => {
            const owner = mockUsers.find((u) => u.id === project.ownerId);
            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-konekt-black">{project.name}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.stage === 'idea'
                          ? 'bg-konekt-pink/20 text-konekt-pink'
                          : project.stage === 'mvp'
                          ? 'bg-konekt-green/20 text-konekt-green'
                          : 'bg-konekt-black/20 text-konekt-black'
                      }`}
                    >
                      {project.stage === 'idea' ? 'Idea' : project.stage === 'mvp' ? 'MVP' : 'Launched'}
                    </span>
                  </div>

                  <p className="text-sm text-konekt-black/60 mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-konekt-cream text-xs text-konekt-black/70 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-2 py-1 text-xs text-konekt-black/50">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Looking for */}
                  {project.lookingFor.length > 0 && (
                    <div className="mb-4 p-3 bg-konekt-pink/10 rounded-lg">
                      <p className="text-xs font-medium text-konekt-pink mb-1.5">Hledáme:</p>
                      <div className="space-y-1">
                        {project.lookingFor.slice(0, 2).map((role, idx) => (
                          <div key={idx} className="text-xs text-konekt-black/70">
                            • {role.role} ({role.count}x)
                          </div>
                        ))}
                        {project.lookingFor.length > 2 && (
                          <div className="text-xs text-konekt-black/50">
                            +{project.lookingFor.length - 2} dalších
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Team */}
                  <div className="flex items-center gap-2 text-sm text-konekt-black/60 pt-3 border-t border-konekt-black/10">
                    <Users className="w-4 h-4" />
                    <span>{project.teamMembers.length} členů týmu</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
