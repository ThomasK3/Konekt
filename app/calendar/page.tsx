'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { MonthView } from '@/components/calendar/MonthView';
import { DayDetailModal } from '@/components/calendar/DayDetailModal';
import { UpcomingEventsSidebar } from '@/components/calendar/UpcomingEventsSidebar';
import { calendarEvents, CalendarEvent, getEventsByMonth, getUpcomingEvents } from '@/lib/calendar-data';
import { Calendar, List, Clock, Compass, Plus } from 'lucide-react';
import Link from 'next/link';

type ViewMode = 'month' | 'week' | 'day' | 'agenda';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);

  const currentMonthEvents = getEventsByMonth(
    selectedDate.getFullYear(),
    selectedDate.getMonth()
  );

  const upcomingEvents = getUpcomingEvents(20);

  const handleDayClick = (date: Date, events: CalendarEvent[]) => {
    setSelectedDayDate(date);
    setSelectedDayEvents(events);
    setIsDayModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">📅 Calendar</h1>
            <p className="text-white/60">
              Manage your events and discover new opportunities
            </p>
          </div>

          <Link href="/calendar/discover">
            <button className="px-4 py-2 bg-konekt-green hover:bg-konekt-green/90 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Discover Events
            </button>
          </Link>
        </div>

        {/* View Tabs */}
        <div className="bg-[#1a1a1a] rounded-xl border-2 border-white/10 p-2 flex gap-2">
          <button
            onClick={() => setViewMode('month')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              viewMode === 'month'
                ? 'bg-konekt-green text-white'
                : 'text-white/70 hover:bg-[#151515]'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Month</span>
          </button>

          <Link href="/calendar/agenda" className="flex-1">
            <button
              className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                viewMode === 'agenda'
                  ? 'bg-konekt-green text-white'
                  : 'text-white/70 hover:bg-[#151515]'
              }`}
            >
              <List className="w-5 h-5" />
              <span>Agenda</span>
            </button>
          </Link>

          <Link href="/calendar/discover" className="flex-1">
            <button className="w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-white/70 hover:bg-[#151515]">
              <Compass className="w-5 h-5" />
              <span>Discover</span>
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Calendar View */}
          <div className="flex-1">
            {viewMode === 'month' && (
              <MonthView
                events={calendarEvents}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onDayClick={handleDayClick}
              />
            )}
          </div>

          {/* Sidebar */}
          <UpcomingEventsSidebar events={upcomingEvents} />
        </div>
      </div>

      {/* Day Detail Modal */}
      <DayDetailModal
        date={selectedDayDate}
        events={selectedDayEvents}
        isOpen={isDayModalOpen}
        onClose={() => setIsDayModalOpen(false)}
      />
    </AppLayout>
  );
}
