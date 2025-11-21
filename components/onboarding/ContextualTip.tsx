'use client';

import { motion } from 'framer-motion';
import { X, Lightbulb, Sparkles, Target, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ContextualTipProps {
  type: 'project' | 'message' | 'filter' | 'event' | 'custom';
  title?: string;
  message?: string;
  onDismiss?: () => void;
  dismissible?: boolean;
}

const tipConfig = {
  project: {
    icon: <Sparkles className="w-5 h-5" />,
    title: '💡 První projekt? Super!',
    message: 'Přidej co hledáš do týmu a najdi spolupracovníky rychleji.',
    color: 'from-konekt-green/10 to-konekt-pink/10',
    borderColor: 'border-konekt-green/20',
  },
  message: {
    icon: <MessageCircle className="w-5 h-5" />,
    title: '✉️ Tip pro lepší response rate',
    message: 'Buď konkrétní! Napiš proč právě ta osoba a co můžeš nabídnout.',
    color: 'from-konekt-pink/10 to-blue-50',
    borderColor: 'border-konekt-pink/20',
  },
  filter: {
    icon: <Target className="w-5 h-5" />,
    title: '🎯 Power tip: Kombinuj filtry',
    message: 'Zkus kombinovat skills + lokaci + availability pro přesné výsledky.',
    color: 'from-blue-50 to-konekt-green/10',
    borderColor: 'border-blue-200',
  },
  event: {
    icon: <Sparkles className="w-5 h-5" />,
    title: '🎪 První event! Nice!',
    message: 'Networking eventy jsou best way jak rozšířit svoji síť. Enjoy!',
    color: 'from-konekt-green/10 to-amber-50',
    borderColor: 'border-konekt-green/20',
  },
  custom: {
    icon: <Lightbulb className="w-5 h-5" />,
    title: '',
    message: '',
    color: 'from-konekt-green/10 to-konekt-pink/10',
    borderColor: 'border-konekt-green/20',
  },
};

export const ContextualTip = ({
  type,
  title,
  message,
  onDismiss,
  dismissible = true,
}: ContextualTipProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const config = tipConfig[type];
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`p-4 bg-gradient-to-r ${config.color} border ${config.borderColor} rounded-xl`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-konekt-white rounded-lg flex items-center justify-center flex-shrink-0 text-konekt-green">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-konekt-black text-sm mb-1">{displayTitle}</h4>
          <p className="text-xs text-konekt-black/70">{displayMessage}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="w-6 h-6 flex items-center justify-center text-konekt-black/40 hover:text-konekt-black hover:bg-konekt-white rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Empty State with Tip
interface EmptyStateTipProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  tipMessage: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyStateTip = ({
  icon,
  title,
  message,
  tipMessage,
  action,
}: EmptyStateTipProps) => {
  return (
    <motion.div
      className="text-center py-12 px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-konekt-black/5 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-konekt-black mb-2">{title}</h3>
      <p className="text-konekt-black/60 mb-4">{message}</p>

      {/* Tip Box */}
      <div className="max-w-md mx-auto mb-6 p-4 bg-gradient-to-r from-konekt-green/10 to-konekt-pink/10 border border-konekt-green/20 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-konekt-white rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-konekt-green" />
          </div>
          <p className="text-sm text-konekt-black/80 text-left flex-1">{tipMessage}</p>
        </div>
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-konekt-green to-konekt-pink text-konekt-white rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
};
