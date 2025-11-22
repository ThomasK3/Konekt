'use client';

import { motion } from 'framer-motion';
import { mockFOMOMessages } from '@/lib/social-proof-data';
import { useEffect, useState } from 'react';

interface FOMONotificationProps {
  context?: 'profile' | 'project' | 'event';
}

export const FOMONotification = ({ context = 'profile' }: FOMONotificationProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Show random FOMO message
    const randomMessage = mockFOMOMessages[Math.floor(Math.random() * mockFOMOMessages.length)];
    setMessage(randomMessage);
  }, []);

  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-konekt-pink/20 to-purple-500/20 border border-konekt-pink/30 rounded-xl p-3"
    >
      <p className="text-sm font-medium text-white/90">{message}</p>
    </motion.div>
  );
};
