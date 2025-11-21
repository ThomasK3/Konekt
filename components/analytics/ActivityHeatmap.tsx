'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { format, getDay, startOfWeek, addDays } from 'date-fns';

interface ActivityData {
  date: string;
  count: number;
  day: number;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
}

export const ActivityHeatmap = ({ data }: ActivityHeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<ActivityData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Get color intensity based on count
  const getColor = (count: number) => {
    if (count === 0) return 'bg-konekt-black/5';
    if (count <= 2) return 'bg-konekt-green/20';
    if (count <= 5) return 'bg-konekt-green/40';
    if (count <= 8) return 'bg-konekt-green/60';
    if (count <= 12) return 'bg-konekt-green/80';
    return 'bg-konekt-green';
  };

  // Group data by weeks
  const weeks: ActivityData[][] = [];
  let currentWeek: ActivityData[] = [];

  // Find the first Sunday before our data starts
  const firstDate = new Date(data[0].date);
  const firstSunday = startOfWeek(firstDate, { weekStartsOn: 0 });

  // Pad beginning if needed
  const daysBeforeStart = Math.floor(
    (firstDate.getTime() - firstSunday.getTime()) / (1000 * 60 * 60 * 24)
  );

  for (let i = 0; i < daysBeforeStart; i++) {
    currentWeek.push({ date: '', count: -1, day: i });
  }

  // Add actual data
  data.forEach((item, index) => {
    currentWeek.push(item);

    // Start new week on Sunday (day 0)
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  // Pad end if needed
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: '', count: -1, day: currentWeek.length });
    }
    weeks.push(currentWeek);
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className="relative">
      {/* Day labels */}
      <div className="flex gap-1 mb-2 ml-8">
        <div className="w-3" /> {/* Spacer for day labels */}
        {dayLabels.map((label, i) => (
          <div key={i} className="w-3 text-xs text-konekt-black/40 text-center">
            {i % 2 === 1 ? label : ''}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        {/* Month labels (vertical) */}
        <div className="flex flex-col gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div key={day} className="w-6 h-3 text-xs text-konekt-black/60 flex items-center">
              {day % 2 === 1 ? dayLabels[day] : ''}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((cell, dayIndex) => {
                if (cell.count === -1) {
                  return <div key={dayIndex} className="w-3 h-3" />;
                }

                return (
                  <motion.div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${getColor(
                      cell.count
                    )} hover:ring-2 hover:ring-konekt-green hover:ring-offset-1`}
                    onMouseEnter={(e) => {
                      setHoveredCell(cell);
                      setMousePos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseMove={(e) => {
                      setMousePos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: weekIndex * 0.01 + dayIndex * 0.002 }}
                    whileHover={{ scale: 1.3 }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-konekt-black/60">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 2, 5, 8, 12].map((count) => (
            <div key={count} className={`w-3 h-3 rounded-sm ${getColor(count)}`} />
          ))}
        </div>
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hoveredCell && hoveredCell.date && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y - 40,
          }}
        >
          <motion.div
            className="bg-konekt-black text-konekt-white px-3 py-2 rounded-lg text-sm shadow-xl"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className="font-bold">
              {hoveredCell.count} {hoveredCell.count === 1 ? 'activity' : 'activities'}
            </div>
            <div className="text-xs text-konekt-white/70">
              {format(new Date(hoveredCell.date), 'MMM d, yyyy')}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
