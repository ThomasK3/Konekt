'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent, eventCategoryConfig } from '@/lib/calendar-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onDayClick: (date: Date, dayEvents: CalendarEvent[]) => void;
}

export const MonthView = ({ events, selectedDate, onDateChange, onDayClick }: MonthViewProps) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Start from Monday

  const days: Date[] = [];
  const currentDate = new Date(startDate);

  // Generate 6 weeks (42 days) to fill the calendar grid
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(23, 59, 59, 999);
      date.setHours(0, 0, 0, 0);
      return date >= eventStart && date <= eventEnd;
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === month;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="bg-konekt-white rounded-2xl border-2 border-konekt-black/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-konekt-black/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-konekt-black">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-konekt-cream hover:bg-konekt-green/10 text-konekt-black rounded-lg text-sm font-medium transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-konekt-cream rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-konekt-black" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-konekt-cream rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-konekt-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-konekt-black/50 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            const dayEvents = getEventsForDay(date);
            const today = isToday(date);
            const currentMonth = isCurrentMonth(date);

            return (
              <motion.button
                key={index}
                onClick={() => onDayClick(date, dayEvents)}
                className={`min-h-[100px] p-2 rounded-xl border-2 transition-all hover:border-konekt-green/50 hover:shadow-md ${
                  today
                    ? 'border-konekt-green bg-konekt-green/5'
                    : currentMonth
                    ? 'border-konekt-black/10 bg-konekt-cream/50'
                    : 'border-konekt-black/5 bg-konekt-cream/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      today
                        ? 'text-konekt-green'
                        : currentMonth
                        ? 'text-konekt-black'
                        : 'text-konekt-black/30'
                    }`}
                  >
                    {date.getDate()}
                    {today && (
                      <span className="ml-1 text-xs px-1.5 py-0.5 bg-konekt-green text-white rounded">
                        📌
                      </span>
                    )}
                  </div>

                  {/* Event Indicators */}
                  {dayEvents.length > 0 && (
                    <div className="flex-1 flex flex-col gap-1">
                      {dayEvents.slice(0, 2).map((event) => {
                        const config = eventCategoryConfig[event.category];
                        return (
                          <div
                            key={event.id}
                            className={`text-[10px] px-1.5 py-1 ${config.color} text-white rounded truncate text-left`}
                            title={event.name}
                          >
                            {config.icon} {event.name}
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-konekt-black/60 font-medium">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-konekt-black/10 bg-konekt-cream/30">
        <div className="flex flex-wrap gap-3 text-xs">
          {Object.entries(eventCategoryConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${config.color}`} />
              <span className="text-konekt-black/70">{config.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
