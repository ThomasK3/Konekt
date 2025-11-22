'use client';

import { motion } from 'framer-motion';
import { mockActivityFeed } from '@/lib/social-proof-data';
import { useEffect, useState } from 'react';

export const LiveActivityTicker = () => {
  const [activities, setActivities] = useState(mockActivityFeed);

  // Rotate activities every 5 seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        const rotated = [...prev];
        const first = rotated.shift();
        if (first) rotated.push(first);
        return rotated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate for seamless loop
  const duplicatedActivities = [...activities, ...activities];

  return (
    <div className="bg-gradient-to-r from-konekt-green/20 via-konekt-pink/20 to-konekt-green/20 border-b border-white/10 overflow-hidden">
      <motion.div
        className="flex gap-8 py-3 px-4"
        animate={{
          x: [0, -50 * activities.length],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedActivities.map((activity, index) => (
          <div
            key={`${activity.id}-${index}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/90 cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-lg">{activity.icon}</span>
            <span>
              <strong>{activity.user}</strong> {activity.action}
            </span>
            {index < duplicatedActivities.length - 1 && (
              <span className="text-white/30 mx-2">•</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
