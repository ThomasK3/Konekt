'use client';

import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Sparkles } from 'lucide-react';

export default function JobsPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-konekt-green to-konekt-pink rounded-2xl flex items-center justify-center">
            <BriefcaseBusiness className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Příležitosti</h1>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Prozkoumej pracovní nabídky, stáže a příležitosti ke spolupráci
            na zajímavých projektech. Najdi svou další velkou výzvu!
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#151515] rounded-xl text-white/60">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Coming Soon...</span>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
