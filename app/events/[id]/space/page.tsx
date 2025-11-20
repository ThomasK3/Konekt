'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockEvents, mockUsers, mockEventMaterials } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Download,
  FileText,
  Video,
  Link as LinkIcon,
  Image as ImageIcon,
  MessageSquare,
  Filter,
  Search,
  Send,
} from 'lucide-react';
import Link from 'next/link';

type TabType = 'prehled' | 'networking' | 'materialy' | 'diskuze';

export default function EventSpacePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>('prehled');
  const [networkingFilters, setNetworkingFilters] = useState({
    role: 'all',
    skills: '',
    lookingFor: 'all',
  });
  const [messageInput, setMessageInput] = useState('');

  // Find event
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-konekt-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-konekt-black mb-4">404</h1>
          <p className="text-konekt-black/60 mb-6">Event nenalezen</p>
          <Button onClick={() => router.push('/events')}>Zpět na Eventy</Button>
        </div>
      </div>
    );
  }

  // Get attendees
  const attendees = mockUsers.filter((u) => event.attendees.includes(u.id));

  // Filter attendees for networking tab
  const filteredAttendees = attendees.filter((user) => {
    if (networkingFilters.role !== 'all' && user.role !== networkingFilters.role) return false;
    if (
      networkingFilters.skills &&
      !user.skills.some((skill) =>
        skill.toLowerCase().includes(networkingFilters.skills.toLowerCase())
      )
    )
      return false;
    if (
      networkingFilters.lookingFor !== 'all' &&
      !user.lookingFor.some((lf) =>
        lf.toLowerCase().includes(networkingFilters.lookingFor.toLowerCase())
      )
    )
      return false;
    return true;
  });

  // Get event materials
  const materials = event.materials || [];

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'presentation':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'link':
        return <LinkIcon className="w-5 h-5" />;
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <Card>
        <div className="flex items-start gap-6">
          {/* Event Icon */}
          <div className="w-20 h-20 bg-konekt-green rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            {event.category === 'hackathon'
              ? '🚀'
              : event.category === 'networking'
              ? '🎉'
              : event.category === 'workshop'
              ? '🤖'
              : event.category === 'meetup'
              ? '💼'
              : '📅'}
          </div>

          {/* Event Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-konekt-black mb-2">{event.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-konekt-black/60 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{event.date.toLocaleDateString('cs-CZ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{event.attendees.length} účastníků</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-konekt-green/10 text-konekt-green rounded-lg font-medium">
              <div className="w-2 h-2 bg-konekt-green rounded-full animate-pulse" />
              {event.status === 'ongoing'
                ? 'Probíhá'
                : event.status === 'upcoming'
                ? 'Připravuje se'
                : 'Ukončeno'}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
        <div className="flex border-b border-konekt-black/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('prehled')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'prehled'
                ? 'bg-konekt-green text-konekt-white'
                : 'text-konekt-black/70 hover:bg-konekt-cream'
            }`}
          >
            📋 Přehled
          </button>
          <button
            onClick={() => setActiveTab('networking')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'networking'
                ? 'bg-konekt-green text-konekt-white'
                : 'text-konekt-black/70 hover:bg-konekt-cream'
            }`}
          >
            👥 Networking ({attendees.length})
          </button>
          <button
            onClick={() => setActiveTab('materialy')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'materialy'
                ? 'bg-konekt-green text-konekt-white'
                : 'text-konekt-black/70 hover:bg-konekt-cream'
            }`}
          >
            📚 Materiály ({materials.length})
          </button>
          <button
            onClick={() => setActiveTab('diskuze')}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'diskuze'
                ? 'bg-konekt-green text-konekt-white'
                : 'text-konekt-black/70 hover:bg-konekt-cream'
            }`}
          >
            💬 Diskuze
          </button>
        </div>

        <div className="p-6">
          {/* PŘEHLED TAB */}
          {activeTab === 'prehled' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-konekt-black mb-3">O eventu</h2>
                <p className="text-konekt-black/70">{event.description}</p>
              </div>

              {/* Agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-konekt-black mb-4">Program</h2>
                  <div className="space-y-3">
                    {event.agenda.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 bg-konekt-cream rounded-xl hover:bg-konekt-cream/70 transition-colors"
                      >
                        <div className="flex items-center gap-2 text-konekt-green font-bold min-w-[80px]">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-konekt-black mb-1">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-konekt-black/60">{item.description}</p>
                          )}
                          {item.speaker && (
                            <p className="text-sm text-konekt-green mt-1">🎤 {item.speaker}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics */}
              {event.analytics && (
                <div>
                  <h2 className="text-xl font-bold text-konekt-black mb-4">Statistiky</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-konekt-cream rounded-xl">
                      <div className="text-2xl font-bold text-konekt-black">
                        {event.analytics.checkedIn}
                      </div>
                      <div className="text-sm text-konekt-black/60">Check-iny</div>
                    </div>
                    <div className="p-4 bg-konekt-cream rounded-xl">
                      <div className="text-2xl font-bold text-konekt-black">
                        {event.analytics.connectionsMode}
                      </div>
                      <div className="text-sm text-konekt-black/60">Nová spojení</div>
                    </div>
                    <div className="p-4 bg-konekt-cream rounded-xl">
                      <div className="text-2xl font-bold text-konekt-black">
                        {event.analytics.messagesExchanged}
                      </div>
                      <div className="text-sm text-konekt-black/60">Zpráv vyměněno</div>
                    </div>
                    <div className="p-4 bg-konekt-cream rounded-xl">
                      <div className="text-2xl font-bold text-konekt-black">
                        {event.analytics.materialsDownloaded}
                      </div>
                      <div className="text-sm text-konekt-black/60">Stažení materiálů</div>
                    </div>
                    <div className="p-4 bg-konekt-cream rounded-xl">
                      <div className="text-2xl font-bold text-konekt-black">
                        {event.analytics.projectsCreated}
                      </div>
                      <div className="text-sm text-konekt-black/60">Nové projekty</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NETWORKING TAB */}
          {activeTab === 'networking' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 p-4 bg-konekt-cream rounded-xl">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-konekt-black/60" />
                  <span className="font-medium text-konekt-black">Filtry:</span>
                </div>

                <select
                  value={networkingFilters.role}
                  onChange={(e) =>
                    setNetworkingFilters({ ...networkingFilters, role: e.target.value })
                  }
                  className="px-3 py-2 bg-konekt-white border-2 border-konekt-black/10 rounded-lg text-sm font-medium"
                >
                  <option value="all">Všechny role</option>
                  <option value="student">Studenti</option>
                  <option value="mentor">Mentoři</option>
                </select>

                <input
                  type="text"
                  placeholder="Hledej skill..."
                  value={networkingFilters.skills}
                  onChange={(e) =>
                    setNetworkingFilters({ ...networkingFilters, skills: e.target.value })
                  }
                  className="px-3 py-2 bg-konekt-white border-2 border-konekt-black/10 rounded-lg text-sm flex-1 min-w-[200px]"
                />

                <select
                  value={networkingFilters.lookingFor}
                  onChange={(e) =>
                    setNetworkingFilters({ ...networkingFilters, lookingFor: e.target.value })
                  }
                  className="px-3 py-2 bg-konekt-white border-2 border-konekt-black/10 rounded-lg text-sm font-medium"
                >
                  <option value="all">Co hledají</option>
                  <option value="co-founder">Co-founder</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </div>

              {/* User Cards (Sreality style) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAttendees.map((user) => (
                  <Link
                    key={user.id}
                    href={`/profile/${user.username}`}
                    className="block bg-konekt-white border-2 border-konekt-black/10 rounded-xl overflow-hidden hover:border-konekt-green transition-all hover:shadow-lg group"
                  >
                    {/* User Image */}
                    <div className="h-48 bg-gradient-to-br from-konekt-green to-konekt-pink flex items-center justify-center text-6xl text-konekt-white font-bold">
                      {user.name.charAt(0)}
                    </div>

                    {/* User Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-konekt-black group-hover:text-konekt-green transition-colors">
                            {user.name}
                          </h3>
                          <p className="text-sm text-konekt-black/60">{user.school}</p>
                        </div>
                        {user.isOnline && (
                          <div className="w-3 h-3 bg-konekt-green rounded-full" title="Online" />
                        )}
                      </div>

                      <p className="text-sm text-konekt-black/70 mb-3 line-clamp-2">{user.bio}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {user.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-konekt-cream text-xs text-konekt-black/70 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {user.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs text-konekt-black/50">
                            +{user.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Looking For */}
                      {user.lookingFor.length > 0 && (
                        <div className="pt-3 border-t border-konekt-black/10">
                          <p className="text-xs text-konekt-black/50 mb-1">Hledá:</p>
                          <div className="flex flex-wrap gap-1">
                            {user.lookingFor.slice(0, 2).map((lf) => (
                              <span
                                key={lf}
                                className="px-2 py-1 bg-konekt-pink/10 text-konekt-pink text-xs font-medium rounded"
                              >
                                {lf}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {filteredAttendees.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-konekt-black/40">Žádní uživatelé nenalezeni s těmito filtry</p>
                </div>
              )}
            </div>
          )}

          {/* MATERIÁLY TAB */}
          {activeTab === 'materialy' && (
            <div className="space-y-4">
              {materials.length > 0 ? (
                materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-start gap-4 p-4 bg-konekt-cream rounded-xl hover:bg-konekt-cream/70 transition-colors"
                  >
                    <div className="w-12 h-12 bg-konekt-green text-konekt-white rounded-lg flex items-center justify-center flex-shrink-0">
                      {getMaterialIcon(material.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-konekt-black mb-1">{material.title}</h3>
                      {material.description && (
                        <p className="text-sm text-konekt-black/60 mb-2">{material.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-konekt-black/50">
                        <span>{material.uploadedAt.toLocaleDateString('cs-CZ')}</span>
                        {material.category && (
                          <span className="px-2 py-1 bg-konekt-white rounded">
                            {material.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Stáhnout
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-konekt-black/20 mx-auto mb-4" />
                  <p className="text-konekt-black/40">Zatím žádné materiály</p>
                </div>
              )}
            </div>
          )}

          {/* DISKUZE TAB */}
          {activeTab === 'diskuze' && (
            <div className="space-y-4">
              {/* Messages Area */}
              <div className="h-[500px] overflow-y-auto space-y-4 p-4 bg-konekt-cream rounded-xl">
                {/* Sample Messages */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-konekt-green rounded-full flex items-center justify-center text-konekt-white font-bold flex-shrink-0">
                    J
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-konekt-black">Jakub Procházka</span>
                      <span className="text-xs text-konekt-black/40">
                        {new Date().toLocaleTimeString('cs-CZ', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-konekt-black/80">
                      Ahoj všichni! Super event, díky organizátorům! 🎉
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-konekt-pink rounded-full flex items-center justify-center text-konekt-white font-bold flex-shrink-0">
                    L
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-konekt-black">Lucie Nováková</span>
                      <span className="text-xs text-konekt-black/40">
                        {new Date().toLocaleTimeString('cs-CZ', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-konekt-black/80">
                      Souhlasím! Hledá někdo marketingového co-foundera? Mám zájem se zapojit!
                    </p>
                  </div>
                </div>

                <div className="text-center py-4">
                  <p className="text-xs text-konekt-black/40">
                    💡 Real-time chat bude dostupný brzy
                  </p>
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Napiš zprávu do event channelu..."
                  className="flex-1 px-4 py-3 bg-konekt-cream border-2 border-konekt-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-konekt-green focus:border-transparent"
                />
                <Button className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Odeslat
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
