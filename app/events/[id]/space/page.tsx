'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockEvents, mockUsers, mockEventMaterials } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
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
  Send,
  Hash,
  Volume2,
  Search,
  Settings,
  Bell,
  Pin,
  Zap,
  Trophy,
  Target,
  MessageSquare,
  ThumbsUp,
  Share2,
  CheckCircle,
  Circle,
  Play,
  ExternalLink,
  Briefcase,
  UserPlus,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

type ChannelCategory = 'text' | 'workshop' | 'networking' | 'resources';

interface Channel {
  id: string;
  name: string;
  type: ChannelCategory;
  icon?: string;
  isLocked?: boolean;
  description?: string;
}

type ChannelId =
  | 'announcements'
  | 'general-chat'
  | 'random'
  | 'workshop-1'
  | 'workshop-2'
  | 'find-cofounder'
  | 'tech-talk'
  | 'investors'
  | 'materials'
  | 'recordings'
  | 'job-board'
  | 'speed-networking'
  | 'live-schedule'
  | 'photo-gallery';

export default function EventSpacePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeChannel, setActiveChannel] = useState<ChannelId>('general-chat');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [speedMatchActive, setSpeedMatchActive] = useState(false);

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
  const onlineUsers = attendees.filter((u) => u.isOnline);

  // Define channels
  const channels: Channel[] = [
    // Main channels
    { id: 'announcements', name: 'announcements', type: 'text', icon: '📢' },
    { id: 'general-chat', name: 'general-chat', type: 'text', icon: '💬' },
    { id: 'random', name: 'random', type: 'text', icon: '🎲' },

    // Workshop channels
    { id: 'workshop-1', name: 'workshop-1-ai', type: 'workshop', icon: '🤖' },
    { id: 'workshop-2', name: 'workshop-2-product', type: 'workshop', icon: '📱' },

    // Networking channels
    { id: 'find-cofounder', name: 'find-cofounder', type: 'networking', icon: '🤝' },
    { id: 'tech-talk', name: 'tech-talk', type: 'networking', icon: '💻' },
    { id: 'investors', name: 'investors', type: 'networking', icon: '💰' },

    // Resources
    { id: 'materials', name: 'materials', type: 'resources', icon: '📚' },
    { id: 'recordings', name: 'recordings', type: 'resources', icon: '🎥' },
    { id: 'job-board', name: 'job-board', type: 'resources', icon: '💼' },
  ];

  const getChannelsByType = (type: ChannelCategory) =>
    channels.filter((ch) => ch.type === type);

  // Get materials
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

  // Sample messages for general chat
  const sampleMessages = [
    {
      id: '1',
      author: 'Jakub Procházka',
      avatar: 'J',
      color: 'bg-konekt-green',
      content: 'Ahoj všichni! Super event, díky organizátorům! 🎉',
      timestamp: new Date(),
    },
    {
      id: '2',
      author: 'Lucie Nováková',
      avatar: 'L',
      color: 'bg-konekt-pink',
      content: 'Souhlasím! Hledá někdo marketingového co-foundera? Mám zájem se zapojit!',
      timestamp: new Date(),
    },
    {
      id: '3',
      author: 'Petr Svoboda',
      avatar: 'P',
      color: 'bg-konekt-green',
      content: 'Workshop o AI byl skvělý! Už se těším na další session. Má někdo poznámky?',
      timestamp: new Date(),
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-konekt-cream">
      {/* Event Header */}
      <div className="bg-konekt-white border-b-2 border-konekt-black/10 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Event Icon */}
            <div className="w-12 h-12 bg-konekt-green rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
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
            <div>
              <h1 className="text-xl font-bold text-konekt-black">{event.name}</h1>
              <div className="flex items-center gap-3 text-xs text-konekt-black/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{event.date.toLocaleDateString('cs-CZ')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{attendees.length} účastníků</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-konekt-green/10 text-konekt-green rounded-md font-medium">
                  <div className="w-1.5 h-1.5 bg-konekt-green rounded-full animate-pulse" />
                  {event.status === 'ongoing'
                    ? 'Probíhá'
                    : event.status === 'upcoming'
                    ? 'Připravuje se'
                    : 'Ukončeno'}
                </div>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-konekt-black/60" />
            </button>
            <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
              <Search className="w-5 h-5 text-konekt-black/60" />
            </button>
            <button className="p-2 hover:bg-konekt-cream rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-konekt-black/60" />
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR - Channels */}
        <div className="w-64 bg-konekt-white border-r-2 border-konekt-black/10 flex-shrink-0 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Main Channels */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <Hash className="w-4 h-4 text-konekt-black/40" />
                <h3 className="text-xs font-bold text-konekt-black/60 uppercase tracking-wide">
                  Event Channels
                </h3>
              </div>
              <div className="space-y-1">
                {getChannelsByType('text').map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id as ChannelId)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      activeChannel === channel.id
                        ? 'bg-konekt-green/10 text-konekt-green font-medium'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <span className="text-sm">{channel.icon}</span>
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Workshop Channels */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <Volume2 className="w-4 h-4 text-konekt-black/40" />
                <h3 className="text-xs font-bold text-konekt-black/60 uppercase tracking-wide">
                  Workshops
                </h3>
              </div>
              <div className="space-y-1">
                {getChannelsByType('workshop').map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id as ChannelId)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      activeChannel === channel.id
                        ? 'bg-konekt-green/10 text-konekt-green font-medium'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <span className="text-sm">{channel.icon}</span>
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Networking Channels */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <Users className="w-4 h-4 text-konekt-black/40" />
                <h3 className="text-xs font-bold text-konekt-black/60 uppercase tracking-wide">
                  Networking
                </h3>
              </div>
              <div className="space-y-1">
                {getChannelsByType('networking').map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id as ChannelId)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      activeChannel === channel.id
                        ? 'bg-konekt-pink/10 text-konekt-pink font-medium'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <span className="text-sm">{channel.icon}</span>
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <FileText className="w-4 h-4 text-konekt-black/40" />
                <h3 className="text-xs font-bold text-konekt-black/60 uppercase tracking-wide">
                  Zdroje
                </h3>
              </div>
              <div className="space-y-1">
                {getChannelsByType('resources').map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id as ChannelId)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      activeChannel === channel.id
                        ? 'bg-konekt-green/10 text-konekt-green font-medium'
                        : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                    }`}
                  >
                    <span className="text-sm">{channel.icon}</span>
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Features */}
            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <Sparkles className="w-4 h-4 text-konekt-black/40" />
                <h3 className="text-xs font-bold text-konekt-black/60 uppercase tracking-wide">
                  Features
                </h3>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveChannel('speed-networking')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeChannel === 'speed-networking'
                      ? 'bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 text-konekt-green font-medium'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Speed Match</span>
                </button>
                <button
                  onClick={() => setActiveChannel('live-schedule')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeChannel === 'live-schedule'
                      ? 'bg-konekt-green/10 text-konekt-green font-medium'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Live Schedule</span>
                </button>
                <button
                  onClick={() => setActiveChannel('photo-gallery')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeChannel === 'photo-gallery'
                      ? 'bg-konekt-green/10 text-konekt-green font-medium'
                      : 'text-konekt-black/70 hover:bg-konekt-cream hover:text-konekt-black'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm">Photo Gallery</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col bg-konekt-cream overflow-hidden">
          {/* Channel Header */}
          <div className="bg-konekt-white border-b-2 border-konekt-black/10 px-6 py-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-konekt-black/60" />
                <h2 className="font-bold text-konekt-black">{activeChannel}</h2>
                {activeChannel === 'announcements' && (
                  <Pin className="w-4 h-4 text-konekt-green" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-konekt-black/60">
                <Users className="w-4 h-4" />
                <span>{onlineUsers.length} online</span>
              </div>
            </div>
          </div>

          {/* Channel Content */}
          <div className="flex-1 overflow-y-auto">
            {/* GENERAL CHAT & TEXT CHANNELS */}
            {(activeChannel === 'general-chat' ||
              activeChannel === 'random' ||
              activeChannel === 'announcements') && (
              <div className="p-6 space-y-4">
                {activeChannel === 'announcements' && (
                  <div className="p-4 bg-konekt-green/10 border-2 border-konekt-green/30 rounded-xl mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-konekt-green rounded-full flex items-center justify-center text-konekt-white flex-shrink-0">
                        📢
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-konekt-black">Organizátoři</span>
                          <span className="text-xs text-konekt-black/40">
                            {new Date().toLocaleTimeString('cs-CZ', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <Pin className="w-3 h-3 text-konekt-green" />
                        </div>
                        <p className="text-konekt-black font-medium mb-2">
                          🎉 Vítejte na {event.name}!
                        </p>
                        <p className="text-sm text-konekt-black/70">
                          Děkujeme, že jste tu! Nezapomeňte se podívat do #general-chat pro diskuzi,
                          navštivte workshop channely a využijte Speed Match pro rychlý networking.
                          Přejeme příjemný zážitek! 🚀
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {sampleMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 hover:bg-konekt-white/50 p-3 rounded-lg transition-colors">
                    <div className={`w-10 h-10 ${msg.color} rounded-full flex items-center justify-center text-konekt-white font-bold flex-shrink-0`}>
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-konekt-black">{msg.author}</span>
                        <span className="text-xs text-konekt-black/40">
                          {msg.timestamp.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-konekt-black/80">{msg.content}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="flex items-center gap-1 text-xs text-konekt-black/40 hover:text-konekt-green transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>2</span>
                        </button>
                        <button className="text-xs text-konekt-black/40 hover:text-konekt-green transition-colors">
                          Odpovědět
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center py-8">
                  <p className="text-xs text-konekt-black/40">
                    💡 Real-time chat bude dostupný brzy
                  </p>
                </div>
              </div>
            )}

            {/* SPEED NETWORKING */}
            {activeChannel === 'speed-networking' && (
              <div className="p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Header */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                      ⚡
                    </div>
                    <h2 className="text-2xl font-bold text-konekt-black mb-2">Speed Networking</h2>
                    <p className="text-konekt-black/60">
                      Poznej 3 lidi za 15 minut. Každý dostal 5 minut na networking!
                    </p>
                  </div>

                  {/* How it works */}
                  <div className="p-6 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
                    <h3 className="font-bold text-konekt-black mb-4">🎯 Jak to funguje:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <p className="text-sm text-konekt-black/80">
                            Klikni na &quot;Začít Speed Match&quot; a systém tě spojí s 3 účastníky
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-sm text-konekt-black/80">
                            Máš 5 minut na quick chat s každou osobou
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-konekt-green text-konekt-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <p className="text-sm text-konekt-black/80">
                            Po chatu zvol &quot;Connect&quot; nebo &quot;Skip&quot; pro pokračování
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-konekt-cream rounded-xl text-center">
                      <div className="text-2xl font-bold text-konekt-black">47</div>
                      <div className="text-xs text-konekt-black/60">Aktivních matchů</div>
                    </div>
                    <div className="p-4 bg-konekt-cream rounded-xl text-center">
                      <div className="text-2xl font-bold text-konekt-black">152</div>
                      <div className="text-xs text-konekt-black/60">Spojení vytvořeno</div>
                    </div>
                    <div className="p-4 bg-konekt-cream rounded-xl text-center">
                      <div className="text-2xl font-bold text-konekt-black">5:00</div>
                      <div className="text-xs text-konekt-black/60">Průměrný čas</div>
                    </div>
                  </div>

                  {/* Start Button */}
                  {!speedMatchActive ? (
                    <Button
                      onClick={() => setSpeedMatchActive(true)}
                      className="w-full py-6 text-lg font-bold flex items-center justify-center gap-3"
                    >
                      <Zap className="w-6 h-6" />
                      Začít Speed Match
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      {/* Active Match */}
                      <div className="p-6 bg-gradient-to-br from-konekt-green/10 to-konekt-pink/10 border-2 border-konekt-green rounded-xl">
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold text-konekt-green mb-2">4:32</div>
                          <div className="text-sm text-konekt-black/60">Zbývá do dalšího matche</div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-konekt-white rounded-xl">
                          <div className="w-16 h-16 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-2xl text-konekt-white font-bold">
                            J
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-konekt-black">Jakub Procházka</h4>
                            <p className="text-sm text-konekt-black/60">ČVUT FEL • React Developer</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="px-2 py-1 bg-konekt-cream text-xs text-konekt-black/70 rounded">
                                React
                              </span>
                              <span className="px-2 py-1 bg-konekt-cream text-xs text-konekt-black/70 rounded">
                                TypeScript
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <Button variant="outline" className="flex items-center justify-center gap-2">
                            Skip
                          </Button>
                          <Button className="flex items-center justify-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Connect
                          </Button>
                        </div>
                      </div>

                      <Button
                        onClick={() => setSpeedMatchActive(false)}
                        variant="outline"
                        className="w-full"
                      >
                        Ukončit Speed Match
                      </Button>
                    </div>
                  )}

                  {/* Recent Matches */}
                  <div>
                    <h3 className="font-bold text-konekt-black mb-3">🔥 Tvoje nedávné matche:</h3>
                    <div className="space-y-2">
                      {attendees.slice(0, 3).map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-3 p-3 bg-konekt-white rounded-lg border-2 border-konekt-black/10"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-konekt-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-konekt-black">{user.name}</div>
                            <div className="text-xs text-konekt-black/60">{user.school}</div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-konekt-green" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LIVE SCHEDULE */}
            {activeChannel === 'live-schedule' && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-konekt-black mb-2">📅 Live Schedule</h2>
                    <p className="text-konekt-black/60">
                      Program eventu s možností RSVP a přidání do kalendáře
                    </p>
                  </div>

                  {/* Now Playing */}
                  <div className="p-6 bg-gradient-to-br from-konekt-green/20 to-konekt-pink/20 border-2 border-konekt-green rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-konekt-green rounded-full animate-pulse" />
                      <span className="text-sm font-bold text-konekt-green uppercase">Právě probíhá</span>
                    </div>
                    <h3 className="text-xl font-bold text-konekt-black mb-2">
                      Workshop: AI v Produktovém Vývoji
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-konekt-black/70 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>18:00 - 19:30</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>23 účastníků</span>
                      </div>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Připojit se nyní
                    </Button>
                  </div>

                  {/* Schedule Timeline */}
                  {event.agenda && event.agenda.length > 0 && (
                    <div className="space-y-3">
                      {event.agenda.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10 hover:border-konekt-green/50 transition-all"
                        >
                          <div className="flex flex-col items-center gap-2 min-w-[80px]">
                            <div className="flex items-center gap-2 text-konekt-green font-bold">
                              <Clock className="w-4 h-4" />
                              {item.time}
                            </div>
                            <div className="flex-1 w-px bg-konekt-black/10" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-konekt-black mb-1">{item.title}</h3>
                            {item.description && (
                              <p className="text-sm text-konekt-black/60 mb-3">{item.description}</p>
                            )}
                            {item.speaker && (
                              <p className="text-sm text-konekt-green mb-3">🎤 {item.speaker}</p>
                            )}
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Calendar className="w-3 h-3 mr-1" />
                                RSVP
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Přidat do Google Calendar
                              </Button>
                              <div className="ml-auto flex items-center gap-1 text-xs text-konekt-black/60">
                                <Users className="w-3 h-3" />
                                <span>{Math.floor(Math.random() * 30) + 10} přihlášeno</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* MATERIALS */}
            {activeChannel === 'materials' && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-konekt-black mb-2">📚 Materiály</h2>
                    <p className="text-konekt-black/60">
                      Prezentace, dokumenty a další zdroje z eventu
                    </p>
                  </div>

                  {materials.length > 0 ? (
                    materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-start gap-4 p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10 hover:border-konekt-green/50 transition-all"
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
                              <span className="px-2 py-1 bg-konekt-cream rounded">
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
              </div>
            )}

            {/* PHOTO GALLERY */}
            {activeChannel === 'photo-gallery' && (
              <div className="p-6">
                <div className="max-w-6xl mx-auto space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-konekt-black mb-2">📸 Photo Gallery</h2>
                    <p className="text-konekt-black/60">
                      Zachycené momenty z eventu
                    </p>
                  </div>

                  {event.gallery && event.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.gallery.map((photo, idx) => (
                        <div
                          key={idx}
                          className="aspect-square bg-konekt-cream rounded-xl overflow-hidden border-2 border-konekt-black/10 hover:border-konekt-green transition-all cursor-pointer group"
                        >
                          <img
                            src={photo}
                            alt={`Event photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ImageIcon className="w-16 h-16 text-konekt-black/20 mx-auto mb-4" />
                      <p className="text-konekt-black/40">Zatím žádné fotky</p>
                      <p className="text-sm text-konekt-black/30 mt-2">
                        Fotky budou přidány během eventu
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* JOB BOARD */}
            {activeChannel === 'job-board' && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-konekt-black mb-2">💼 Job Board</h2>
                    <p className="text-konekt-black/60">
                      Pracovní příležitosti a stáže od účastníků
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-konekt-green rounded-lg flex items-center justify-center text-2xl">
                          💻
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-konekt-black">Frontend Developer</h3>
                            <span className="px-2 py-1 bg-konekt-green/10 text-konekt-green text-xs font-medium rounded">
                              Part-time
                            </span>
                          </div>
                          <p className="text-sm text-konekt-black/60 mb-2">
                            Hledáme React developera pro práci na startup projektu v AI oblasti
                          </p>
                          <div className="flex items-center gap-3 text-xs text-konekt-black/50">
                            <span>🏢 TechStartup s.r.o.</span>
                            <span>📍 Remote</span>
                            <span>💰 15-25K Kč/měsíc</span>
                          </div>
                        </div>
                        <Button size="sm">Zobrazit</Button>
                      </div>
                    </div>

                    <div className="p-4 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-konekt-pink rounded-lg flex items-center justify-center text-2xl">
                          🎨
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-konekt-black">UX/UI Designer</h3>
                            <span className="px-2 py-1 bg-konekt-pink/10 text-konekt-pink text-xs font-medium rounded">
                              Stáž
                            </span>
                          </div>
                          <p className="text-sm text-konekt-black/60 mb-2">
                            Stáž v designu produktu s možností přejít na full-time
                          </p>
                          <div className="flex items-center gap-3 text-xs text-konekt-black/50">
                            <span>🏢 DesignHub</span>
                            <span>📍 Praha 3</span>
                            <span>💰 12K Kč/měsíc</span>
                          </div>
                        </div>
                        <Button size="sm">Zobrazit</Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Přidat pracovní nabídku
                  </Button>
                </div>
              </div>
            )}

            {/* WORKSHOP CHANNELS */}
            {(activeChannel === 'workshop-1' || activeChannel === 'workshop-2') && (
              <div className="p-6 space-y-6">
                <div className="p-6 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
                  <h3 className="font-bold text-konekt-black mb-4">📝 Collaborative Notes</h3>
                  <div className="p-4 bg-konekt-cream rounded-lg min-h-[200px] mb-4">
                    <p className="text-sm text-konekt-black/60 italic">
                      Zde budou společné poznámky z workshopu...
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Editovat poznámky
                  </Button>
                </div>

                <div className="p-6 bg-konekt-white rounded-xl border-2 border-konekt-black/10">
                  <h3 className="font-bold text-konekt-black mb-4">❓ Q&A</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-konekt-cream rounded-lg">
                      <div className="flex items-start gap-3">
                        <button className="flex flex-col items-center gap-1">
                          <ThumbsUp className="w-4 h-4 text-konekt-green" />
                          <span className="text-xs font-bold">5</span>
                        </button>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-konekt-black mb-1">
                            Jak nejlépe použít AI pro analýzu user feedbacku?
                          </p>
                          <span className="text-xs text-konekt-black/40">Petr Svoboda</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    Přidat otázku
                  </Button>
                </div>
              </div>
            )}

            {/* NETWORKING CHANNELS */}
            {(activeChannel === 'find-cofounder' ||
              activeChannel === 'tech-talk' ||
              activeChannel === 'investors') && (
              <div className="p-6 space-y-4">
                <div className="p-4 bg-gradient-to-r from-konekt-pink/10 to-konekt-green/10 border-2 border-konekt-pink/30 rounded-xl">
                  <h3 className="font-bold text-konekt-black mb-2">
                    {activeChannel === 'find-cofounder' && '🤝 Hledáš co-foundera?'}
                    {activeChannel === 'tech-talk' && '💻 Tech diskuze'}
                    {activeChannel === 'investors' && '💰 Investoři a fundraising'}
                  </h3>
                  <p className="text-sm text-konekt-black/60">
                    {activeChannel === 'find-cofounder' && 'Tento channel je určen pro hledání spoluzakladatelů a týmu'}
                    {activeChannel === 'tech-talk' && 'Diskutuj o technologiích, stacku a best practices'}
                    {activeChannel === 'investors' && 'Networking s investory a rady k fundraisingu'}
                  </p>
                </div>

                {sampleMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 hover:bg-konekt-white/50 p-3 rounded-lg transition-colors">
                    <div className={`w-10 h-10 ${msg.color} rounded-full flex items-center justify-center text-konekt-white font-bold flex-shrink-0`}>
                      {msg.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-konekt-black">{msg.author}</span>
                        <span className="text-xs text-konekt-black/40">
                          {msg.timestamp.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-konekt-black/80">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Input (for chat channels) */}
          {(activeChannel === 'general-chat' ||
            activeChannel === 'random' ||
            activeChannel === 'find-cofounder' ||
            activeChannel === 'tech-talk' ||
            activeChannel === 'investors' ||
            activeChannel === 'workshop-1' ||
            activeChannel === 'workshop-2') && (
            <div className="bg-konekt-white border-t-2 border-konekt-black/10 p-4 flex-shrink-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={`Zpráva do #${activeChannel}`}
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

        {/* RIGHT SIDEBAR - Live Info */}
        <div className="w-80 bg-konekt-white border-l-2 border-konekt-black/10 flex-shrink-0 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Online Now */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-konekt-green rounded-full animate-pulse" />
                <h3 className="font-bold text-konekt-black uppercase text-xs tracking-wide">
                  Online teď ({onlineUsers.length})
                </h3>
              </div>
              <div className="space-y-2">
                {onlineUsers.slice(0, 8).map((user) => (
                  <Link
                    key={user.id}
                    href={`/profile/${user.username}`}
                    className="flex items-center gap-2 p-2 hover:bg-konekt-cream rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-konekt-white font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-konekt-green rounded-full border-2 border-konekt-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-konekt-black truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-konekt-black/50 truncate">
                        {user.role === 'student' ? '👨‍🎓' : '👨‍🏫'} {user.school}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {onlineUsers.length > 8 && (
                <button className="w-full text-center text-sm text-konekt-green hover:text-konekt-green/80 mt-2">
                  Zobrazit všech {onlineUsers.length}
                </button>
              )}
            </div>

            {/* Live Schedule - What's happening now */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-konekt-black/60" />
                <h3 className="font-bold text-konekt-black uppercase text-xs tracking-wide">
                  Právě teď
                </h3>
              </div>
              {event.agenda && event.agenda.length > 0 && (
                <div className="p-3 bg-konekt-green/10 border-2 border-konekt-green/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-konekt-green rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-konekt-green uppercase">Live</span>
                  </div>
                  <h4 className="font-bold text-konekt-black text-sm mb-1">
                    {event.agenda[0].title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-konekt-black/60 mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{event.agenda[0].time}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    <Play className="w-3 h-3 mr-1" />
                    Připojit se
                  </Button>
                </div>
              )}
              {event.agenda && event.agenda.length > 1 && (
                <div className="mt-3 space-y-2">
                  <div className="text-xs font-medium text-konekt-black/50 uppercase">
                    Dále:
                  </div>
                  {event.agenda.slice(1, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-konekt-cream rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-xs text-konekt-green font-bold mb-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                      <div className="text-sm text-konekt-black font-medium">
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Matches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-konekt-pink" />
                <h3 className="font-bold text-konekt-black uppercase text-xs tracking-wide">
                  Top Matches pro tebe
                </h3>
              </div>
              <div className="space-y-3">
                {attendees.slice(0, 3).map((user) => (
                  <div
                    key={user.id}
                    className="p-3 bg-gradient-to-br from-konekt-green/5 to-konekt-pink/5 border-2 border-konekt-pink/20 rounded-xl hover:border-konekt-pink/50 transition-all"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-full flex items-center justify-center text-konekt-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-konekt-black truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-konekt-black/50 truncate">
                          {user.school}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-konekt-pink">
                        {Math.floor(Math.random() * 30) + 70}%
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {user.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-konekt-cream text-xs text-konekt-black/70 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Poslat zprávu
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Leaderboard */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-konekt-green" />
                <h3 className="font-bold text-konekt-black uppercase text-xs tracking-wide">
                  Leaderboard
                </h3>
              </div>
              <div className="space-y-2">
                {attendees.slice(0, 5).map((user, idx) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 bg-konekt-cream rounded-lg"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0
                          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                          : idx === 1
                          ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                          : idx === 2
                          ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                          : 'bg-konekt-white text-konekt-black/60'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-konekt-black truncate">
                        {user.name}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-konekt-green">
                      {Math.floor(Math.random() * 500) + 100} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Challenges */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-konekt-pink" />
                <h3 className="font-bold text-konekt-black uppercase text-xs tracking-wide">
                  Event Challenges
                </h3>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-konekt-cream rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-konekt-green" />
                    <span className="text-sm font-medium text-konekt-black">
                      Zapojit se do workshopu
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-konekt-white rounded-full overflow-hidden">
                    <div className="h-full bg-konekt-green w-full" />
                  </div>
                  <div className="text-xs text-konekt-black/50 mt-1">+50 XP</div>
                </div>

                <div className="p-3 bg-konekt-cream rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="w-4 h-4 text-konekt-black/30" />
                    <span className="text-sm font-medium text-konekt-black">
                      Poznej 5 nových lidí
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-konekt-white rounded-full overflow-hidden">
                    <div className="h-full bg-konekt-pink w-3/5" />
                  </div>
                  <div className="text-xs text-konekt-black/50 mt-1">3/5 • +100 XP</div>
                </div>

                <div className="p-3 bg-konekt-cream rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className="w-4 h-4 text-konekt-black/30" />
                    <span className="text-sm font-medium text-konekt-black">
                      Napsat 10 zpráv v chatu
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-konekt-white rounded-full overflow-hidden">
                    <div className="h-full bg-konekt-pink w-1/5" />
                  </div>
                  <div className="text-xs text-konekt-black/50 mt-1">2/10 • +25 XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
