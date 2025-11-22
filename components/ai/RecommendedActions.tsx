'use client';

import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { staggerItem } from '@/lib/animations';

interface Action {
  title: string;
  description: string;
  action: string;
  actionLabel: string;
  icon: string;
}

interface RecommendedActionsProps {
  actions: Action[];
}

export const RecommendedActions = ({ actions }: RecommendedActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-konekt-white to-konekt-cream rounded-2xl border-2 border-konekt-black/10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-konekt-pink to-konekt-green rounded-lg">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-konekt-black">🎯 Today&apos;s Recommendations</h3>
          <p className="text-xs text-konekt-black/60">Powered by smart matching</p>
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="p-4 bg-konekt-white rounded-xl border border-konekt-black/10 hover:border-konekt-pink/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="text-2xl flex-shrink-0">{action.icon}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-konekt-black mb-1">{action.title}</h4>
                <p className="text-xs text-konekt-black/60 leading-relaxed">{action.description}</p>

                {/* Action Button */}
                <Link href={action.action}>
                  <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-konekt-pink to-konekt-green text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                    {action.actionLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
