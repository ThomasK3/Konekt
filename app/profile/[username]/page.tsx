'use client';

import { use } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockUsers, mockProjects, mockBadges } from '@/lib/mock-data';
import { Clock, DollarSign, MessageCircle, MapPin, Brain } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MBTIBadge,
  BigFiveBars,
  StrengthsTags,
  SocialIntegrations,
  WorkPreferencesCard,
} from '@/components/profile/PersonalityComponents';
import { BadgeCollection } from '@/components/profile/BadgeCollection';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const router = useRouter();
  const { username } = use(params);

  // Find user by username
  const user = mockUsers.find((u) => u.username === username);

  if (!user) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-konekt-black mb-4">404</h1>
          <p className="text-konekt-black/60 mb-6">Uživatel nenalezen</p>
          <Button onClick={() => router.push('/feed')}>Zpět na Feed</Button>
        </div>
      </div>
    );
  }

  // Get user's projects
  const userProjects = mockProjects.filter((p) => user.projectIds.includes(p.id));

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Header */}
      <header className="bg-konekt-white border-b-2 border-konekt-black/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/feed" className="text-2xl font-bold text-konekt-black hover:text-konekt-green transition-colors">
            Konekt
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-konekt-green flex items-center justify-center text-konekt-white text-3xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-konekt-black mb-1">{user.name}</h1>
                  <div className="flex items-center gap-2 text-konekt-black/60 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{user.school}</span>
                  </div>
                  <p className="text-konekt-black/70">{user.bio}</p>
                </div>
              </div>

              {/* Badges Preview (Quick icons) */}
              {user.badges.length > 0 && (
                <div className="flex items-center gap-2 mb-6 pb-6 border-b-2 border-konekt-black/10">
                  <span className="text-sm text-konekt-black/60 mr-2">Odznaky:</span>
                  {user.badges.slice(0, 5).map((badge) => (
                    <div
                      key={badge.id}
                      className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                  {user.badges.length > 5 && (
                    <span className="text-sm text-konekt-black/40">+{user.badges.length - 5}</span>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Poslat zprávu
                </Button>
                <Button variant="outline" className="flex-1">
                  Uložit
                </Button>
              </div>
            </Card>

            {/* Skills */}
            <Card>
              <h2 className="text-xl font-bold text-konekt-black mb-4">Dovednosti</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-konekt-green text-konekt-white rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Projects */}
            <Card>
              <h2 className="text-xl font-bold text-konekt-black mb-4">Projekty ({userProjects.length})</h2>
              <div className="space-y-4">
                {userProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block p-4 bg-konekt-cream rounded-xl hover:bg-konekt-cream/70 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-konekt-black">{project.name}</h3>
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
                    <p className="text-sm text-konekt-black/60 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-konekt-white text-xs text-konekt-black/70 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="px-2 py-1 text-xs text-konekt-black/50">
                          +{project.stack.length - 3} více
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
                {userProjects.length === 0 && (
                  <p className="text-konekt-black/40 text-center py-8">Zatím žádné projekty</p>
                )}
              </div>
            </Card>

            {/* Achievement Badges Collection */}
            {user.badges.length > 0 && (
              <Card>
                <BadgeCollection
                  badges={user.badges}
                  allBadges={mockBadges}
                  showProgress={true}
                />
              </Card>
            )}

            {/* Integrace & Osobnost */}
            {(user.mbti || user.bigFive || user.strengthsFinder || user.socialIntegrations || user.workPreferences) && (
              <Card>
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="w-6 h-6 text-konekt-green" />
                  <h2 className="text-xl font-bold text-konekt-black">Integrace & Osobnost</h2>
                </div>

                <div className="space-y-4">
                  {/* MBTI */}
                  {user.mbti && <MBTIBadge mbti={user.mbti} />}

                  {/* Big Five */}
                  {user.bigFive && <BigFiveBars bigFive={user.bigFive} />}

                  {/* StrengthsFinder */}
                  {user.strengthsFinder && <StrengthsTags strengthsFinder={user.strengthsFinder} />}

                  {/* Social Integrations */}
                  {user.socialIntegrations && user.socialIntegrations.length > 0 && (
                    <SocialIntegrations integrations={user.socialIntegrations} />
                  )}

                  {/* Work Preferences */}
                  {user.workPreferences && <WorkPreferencesCard preferences={user.workPreferences} />}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Co hledá */}
            <Card>
              <h3 className="text-lg font-bold text-konekt-black mb-3">Co hledám</h3>
              {user.lookingFor.length > 0 ? (
                <div className="space-y-2">
                  {user.lookingFor.map((role) => (
                    <div
                      key={role}
                      className="px-3 py-2 bg-konekt-pink/10 text-konekt-pink rounded-lg text-sm font-medium"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-konekt-black/40 text-sm">Nic konkrétního</p>
              )}
            </Card>

            {/* Dostupnost */}
            <Card>
              <h3 className="text-lg font-bold text-konekt-black mb-3">Dostupnost</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-konekt-green" />
                  <span className="text-konekt-black/70">
                    {user.availability.hoursPerWeek} hodin/týden
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="w-5 h-5 text-konekt-green" />
                  <span className="text-konekt-black/70">
                    {user.availability.isPaid ? 'Placená spolupráce' : 'Projekt / Zkušenosti'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Video (if available) */}
            {user.videoUrl && (
              <Card>
                <h3 className="text-lg font-bold text-konekt-black mb-3">Video představení</h3>
                <div className="aspect-video bg-konekt-black/5 rounded-lg flex items-center justify-center">
                  <span className="text-konekt-black/40">Video player</span>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
