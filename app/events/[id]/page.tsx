'use client';

import { use } from 'react';
import { mockEvents, mockUsers, mockEventMaterials } from '@/lib/mock-data';
import { useUserStore } from '@/lib/store';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Download,
  FileText,
  Presentation,
  Video,
  Link as LinkIcon,
  Image as ImageIcon,
  MessageCircle,
  TrendingUp,
  UserPlus,
  FileCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const categoryEmojis = {
  hackathon: '💻',
  networking: '🤝',
  workshop: '🎓',
  conference: '🎤',
  meetup: '☕',
};

const materialIcons = {
  presentation: Presentation,
  document: FileText,
  video: Video,
  link: LinkIcon,
  image: ImageIcon,
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user } = useUserStore();

  const event = mockEvents.find((e) => e.id === resolvedParams.id);

  if (!event) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-konekt-black mb-2">Událost nenalezena</h1>
          <Link href="/events">
            <Button>Zpět na události</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOrganizer = user && event.organizers.includes(user.id);
  const isAttendee = user && event.attendees.includes(user.id);

  // Get attendees who are also users (for networking recommendations)
  const attendeeUsers = mockUsers.filter((u) => event.attendees.includes(u.id));

  // Networking recommendations: people with similar skills
  const recommendations = attendeeUsers
    .filter((attendee) => {
      if (!user) return false;
      if (attendee.id === user.id) return false;
      // Find people with at least 1 overlapping skill
      const overlappingSkills = attendee.skills.filter((skill) =>
        user.skills.includes(skill)
      );
      return overlappingSkills.length > 0;
    })
    .slice(0, 4);

  const formatDate = (date: Date, endDate?: Date) => {
    const dateStr = date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    if (endDate) {
      const endDateStr = endDate.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
      });
      return `${dateStr} - ${endDateStr}`;
    }

    return dateStr;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-konekt-cream">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-konekt-black/80 via-konekt-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-konekt-white/90 rounded-full text-sm font-semibold">
                {categoryEmojis[event.category]} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              {event.status === 'ongoing' && (
                <span className="px-4 py-2 bg-konekt-green text-konekt-white rounded-full text-sm font-semibold animate-pulse">
                  🔴 LIVE
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold text-konekt-white mb-4">{event.name}</h1>
            <div className="flex flex-wrap gap-6 text-konekt-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{formatDate(event.date, event.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{formatTime(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>
                  {event.attendees.length}
                  {event.maxAttendees && ` / ${event.maxAttendees}`} účastníků
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-konekt-white rounded-2xl p-8 border-2 border-konekt-black/10">
              <h2 className="text-2xl font-bold text-konekt-black mb-4">O události</h2>
              <p className="text-konekt-black/80 leading-relaxed">{event.description}</p>
            </div>

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="bg-konekt-white rounded-2xl p-8 border-2 border-konekt-black/10">
                <h2 className="text-2xl font-bold text-konekt-black mb-6">Program</h2>
                <div className="space-y-4">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-konekt-black/10 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-20">
                        <span className="text-sm font-bold text-konekt-pink">{item.time}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-konekt-black mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-konekt-black/70 mb-1">{item.description}</p>
                        )}
                        {item.speaker && (
                          <p className="text-sm text-konekt-green font-medium">
                            🎤 {item.speaker}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materials */}
            {event.materials && event.materials.length > 0 && (
              <div className="bg-konekt-white rounded-2xl p-8 border-2 border-konekt-black/10">
                <h2 className="text-2xl font-bold text-konekt-black mb-6">Materiály</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.materials.map((material) => {
                    const Icon = materialIcons[material.type];
                    return (
                      <a
                        key={material.id}
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 p-4 bg-konekt-cream hover:bg-konekt-green/10 border-2 border-konekt-black/10 hover:border-konekt-green/30 rounded-xl transition-all group"
                      >
                        {material.thumbnail ? (
                          <img
                            src={material.thumbnail}
                            alt={material.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-konekt-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-8 h-8 text-konekt-pink" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-konekt-black mb-1 line-clamp-1 group-hover:text-konekt-green transition-colors">
                            {material.title}
                          </h3>
                          {material.description && (
                            <p className="text-xs text-konekt-black/60 line-clamp-2 mb-1">
                              {material.description}
                            </p>
                          )}
                          {material.category && (
                            <span className="inline-block px-2 py-0.5 bg-konekt-pink/10 text-konekt-pink rounded text-xs font-medium">
                              {material.category}
                            </span>
                          )}
                        </div>
                        <Download className="w-5 h-5 text-konekt-black/40 group-hover:text-konekt-green transition-colors flex-shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Networking Recommendations */}
            {isAttendee && recommendations.length > 0 && (
              <div className="bg-konekt-white rounded-2xl p-8 border-2 border-konekt-black/10">
                <h2 className="text-2xl font-bold text-konekt-black mb-2">
                  Doporučení pro networking
                </h2>
                <p className="text-sm text-konekt-black/60 mb-6">
                  Účastníci s podobnými skills jako ty
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((person) => {
                    const overlappingSkills = person.skills.filter((skill) =>
                      user?.skills.includes(skill)
                    );
                    return (
                      <div
                        key={person.id}
                        className="flex gap-4 p-4 bg-konekt-cream hover:bg-konekt-green/5 border-2 border-konekt-black/10 hover:border-konekt-green/30 rounded-xl transition-all group"
                      >
                        <img
                          src={person.avatar || person.mainImage}
                          alt={person.name}
                          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-konekt-black mb-1">{person.name}</h3>
                          <p className="text-xs text-konekt-black/60 mb-2 line-clamp-1">{person.school}</p>
                          <div className="flex flex-wrap gap-1">
                            {overlappingSkills.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 bg-konekt-green/10 text-konekt-green rounded text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {overlappingSkills.length > 2 && (
                              <span className="px-2 py-0.5 bg-konekt-black/5 text-konekt-black/60 rounded text-xs">
                                +{overlappingSkills.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link href={`/profile/${person.username}`}>
                          <button className="p-2 hover:bg-konekt-green hover:text-konekt-white rounded-lg transition-colors">
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Organizer Analytics Dashboard */}
            {isOrganizer && event.analytics && (
              <div className="bg-gradient-to-br from-konekt-green to-konekt-green/80 rounded-2xl p-8 text-konekt-white">
                <h2 className="text-2xl font-bold mb-2">📊 Analytics Dashboard</h2>
                <p className="text-konekt-white/80 mb-6">Pouze pro organizátory</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-konekt-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Registrace</span>
                    </div>
                    <p className="text-3xl font-bold">{event.analytics.totalAttendees}</p>
                    <p className="text-xs text-konekt-white/70 mt-1">
                      {event.maxAttendees && `z ${event.maxAttendees} míst`}
                    </p>
                  </div>

                  <div className="bg-konekt-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="w-5 h-5" />
                      <span className="text-sm font-medium">Check-in</span>
                    </div>
                    <p className="text-3xl font-bold">{event.analytics.checkedIn}</p>
                    <p className="text-xs text-konekt-white/70 mt-1">
                      {((event.analytics.checkedIn / event.analytics.totalAttendees) * 100).toFixed(0)}% účastníků
                    </p>
                  </div>

                  <div className="bg-konekt-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserPlus className="w-5 h-5" />
                      <span className="text-sm font-medium">Connections</span>
                    </div>
                    <p className="text-3xl font-bold">{event.analytics.connectionsMode}</p>
                    <p className="text-xs text-konekt-white/70 mt-1">nová spojení</p>
                  </div>

                  <div className="bg-konekt-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Zprávy</span>
                    </div>
                    <p className="text-3xl font-bold">{event.analytics.messagesExchanged}</p>
                    <p className="text-xs text-konekt-white/70 mt-1">vyměněných zpráv</p>
                  </div>

                  <div className="bg-konekt-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="w-5 h-5" />
                      <span className="text-sm font-medium">Materiály</span>
                    </div>
                    <p className="text-3xl font-bold">{event.analytics.materialsDownloaded}</p>
                    <p className="text-xs text-konekt-white/70 mt-1">stažení</p>
                  </div>

                  <div className="bg-konekt-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="text-sm font-medium">Projekty</span>
                    </div>
                    <p className="text-3xl font-bold">{event.analytics.projectsCreated}</p>
                    <p className="text-xs text-konekt-white/70 mt-1">nových projektů</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-konekt-white rounded-2xl p-6 border-2 border-konekt-black/10 sticky top-24">
              {event.status === 'upcoming' && !isAttendee && (
                <Button className="w-full mb-4" size="lg">
                  Registrovat se
                </Button>
              )}

              {event.status === 'ongoing' && isAttendee && (
                <Button className="w-full mb-4 bg-konekt-green hover:bg-konekt-green/90" size="lg">
                  🔴 Vstoupit na událost
                </Button>
              )}

              {event.status === 'completed' && (
                <div className="mb-4 p-4 bg-konekt-black/5 rounded-xl text-center">
                  <p className="text-sm font-medium text-konekt-black/60">Událost skončila</p>
                </div>
              )}

              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full p-3 border-2 border-konekt-black/10 rounded-xl hover:bg-konekt-cream transition-colors text-konekt-black font-medium"
                >
                  Oficiální web
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-konekt-black/10">
                  <h3 className="text-sm font-semibold text-konekt-black/60 mb-3">Tagy</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-konekt-cream rounded-full text-xs font-medium text-konekt-black/70"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
