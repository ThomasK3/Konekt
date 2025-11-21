'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockEvents } from '@/lib/mock-data';
import { EventSpaceLeftSidebar } from '@/components/event-space/EventSpaceLeftSidebar';
import { EventSpaceRightSidebar } from '@/components/event-space/EventSpaceRightSidebar';
import { OverviewView } from '@/components/event-space/OverviewView';
import { DiscussionsView } from '@/components/event-space/DiscussionsView';

export default function EventSpacePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const event = mockEvents.find((e) => e.id === id);

  const [selectedView, setSelectedView] = useState('overview');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-white/60 mb-6">Event not found</p>
          <button
            onClick={() => router.push('/events')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Left Sidebar */}
      <EventSpaceLeftSidebar
        selectedView={selectedView}
        selectedChannel={selectedChannel}
        onViewChange={setSelectedView}
        onChannelChange={setSelectedChannel}
        eventName={event.name}
        memberCount={event.attendees.length}
        onlineCount={Math.floor(event.attendees.length * 0.62)}
      />

      {/* Center Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        {selectedView === 'overview' && <OverviewView />}
        {selectedView === 'discussions' && selectedChannel && (
          <DiscussionsView channelId={selectedChannel} />
        )}
        {selectedView === 'workshops' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎓 Workshops</h2>
            <p className="text-white/60">Workshop view coming soon...</p>
          </div>
        )}
        {selectedView === 'resources' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">📚 Resources</h2>
            <p className="text-white/60">Resources view coming soon...</p>
          </div>
        )}
        {selectedView === 'people' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">👥 People</h2>
            <p className="text-white/60">People view coming soon...</p>
          </div>
        )}
        {selectedView === 'about' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">About Event</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80">{event.description}</p>
            </div>
          </div>
        )}
        {selectedView === 'agenda' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">📅 Agenda</h2>
            <p className="text-white/60">Agenda view coming soon...</p>
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <EventSpaceRightSidebar
        eventName={event.name}
        eventDate={new Date(event.date).toLocaleDateString('cs-CZ', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        eventLocation={event.location}
        memberCount={event.attendees.length}
        onlineCount={Math.floor(event.attendees.length * 0.62)}
        activeDiscussionsCount={12}
      />
    </div>
  );
}
