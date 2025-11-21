'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TourStep {
  target: string;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  title?: string;
}

interface CustomTourProps {
  steps: TourStep[];
  run?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

export const CustomTour = ({ steps, run = true, onComplete, onSkip }: CustomTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(run);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const router = useRouter();

  useEffect(() => {
    setIsVisible(run);
    if (run) {
      setCurrentStep(0);
    }
  }, [run]);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      const step = steps[currentStep];
      if (!step) return;

      if (step.target === 'body' || step.placement === 'center') {
        setTooltipPosition({
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
        });
      } else {
        const element = document.querySelector(`[data-tour="${step.target}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const placement = step.placement || 'bottom';

          let top = 0;
          let left = 0;

          switch (placement) {
            case 'bottom':
              top = rect.bottom + window.scrollY + 20;
              left = rect.left + window.scrollX + rect.width / 2;
              break;
            case 'top':
              top = rect.top + window.scrollY - 20;
              left = rect.left + window.scrollX + rect.width / 2;
              break;
            case 'right':
              top = rect.top + window.scrollY + rect.height / 2;
              left = rect.right + window.scrollX + 20;
              break;
            case 'left':
              top = rect.top + window.scrollY + rect.height / 2;
              left = rect.left + window.scrollX - 20;
              break;
          }

          setTooltipPosition({ top, left });

          // Scroll element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, isVisible, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    if (onSkip) onSkip();
  };

  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const isCenter = step.target === 'body' || step.placement === 'center';

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/50 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleSkip}
        />
      </AnimatePresence>

      {/* Spotlight */}
      {!isCenter && (
        <div
          className="fixed z-[10000] pointer-events-none"
          style={{
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease',
          }}
        >
          {step.target && (() => {
            const element = document.querySelector(`[data-tour="${step.target}"]`);
            if (element) {
              const rect = element.getBoundingClientRect();
              return (
                <div
                  style={{
                    position: 'absolute',
                    top: rect.top + window.scrollY - 8,
                    left: rect.left + window.scrollX - 8,
                    width: rect.width + 16,
                    height: rect.height + 16,
                    borderRadius: '16px',
                  }}
                />
              );
            }
            return null;
          })()}
        </div>
      )}

      {/* Tooltip */}
      <motion.div
        className={`fixed z-[10001] ${
          isCenter ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''
        }`}
        style={
          isCenter
            ? {}
            : {
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
                transform: step.placement === 'right' || step.placement === 'left'
                  ? 'translateY(-50%)'
                  : 'translateX(-50%)',
              }
        }
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="bg-konekt-cream rounded-2xl p-6 shadow-2xl border-2 border-konekt-black/10 max-w-md">
          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-konekt-black/40 hover:text-konekt-black hover:bg-konekt-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="mb-6">{step.content}</div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-konekt-green'
                    : index < currentStep
                    ? 'bg-konekt-green/50'
                    : 'bg-konekt-black/10'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-konekt-black/60">
              {currentStep + 1} / {steps.length}
            </div>

            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-konekt-black hover:bg-konekt-white rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zpět
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gradient-to-r from-konekt-green to-konekt-pink text-konekt-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? 'Dokončit' : 'Další'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="w-full text-center text-xs text-konekt-black/40 hover:text-konekt-black mt-3 transition-colors"
          >
            Přeskočit tour
          </button>
        </div>
      </motion.div>
    </>
  );
};
