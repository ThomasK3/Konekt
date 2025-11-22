'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { mockStatsMessages } from '@/lib/social-proof-data';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const RealtimeStatsPopup = () => {
  const [currentMessage, setCurrentMessage] = useState<{ icon: string; message: string } | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Show first message after 3 seconds
    const initialTimer = setTimeout(() => {
      setCurrentMessage(mockStatsMessages[0]);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (currentMessage) {
      // Auto-dismiss after 5 seconds
      const dismissTimer = setTimeout(() => {
        setCurrentMessage(null);
      }, 5000);

      // Show next message after 35 seconds (5s show + 30s wait)
      const nextMessageTimer = setTimeout(() => {
        const nextIndex = (messageIndex + 1) % mockStatsMessages.length;
        setMessageIndex(nextIndex);
        setCurrentMessage(mockStatsMessages[nextIndex]);
      }, 35000);

      return () => {
        clearTimeout(dismissTimer);
        clearTimeout(nextMessageTimer);
      };
    }
  }, [currentMessage, messageIndex]);

  const handleDismiss = () => {
    setCurrentMessage(null);
  };

  return (
    <AnimatePresence>
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-[#151515] border-2 border-konekt-green/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{currentMessage.icon}</div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm leading-relaxed">
                  {currentMessage.message}
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
