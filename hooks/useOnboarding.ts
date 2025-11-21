'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/store';

export const useOnboarding = () => {
  const { user } = useUserStore();
  const [hasCompletedTour, setHasCompletedTour] = useState(true);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Check localStorage for tour completion
    const tourCompleted = localStorage.getItem(`onboarding-tour-${user.id}`);
    const completed = tourCompleted === 'true';

    setHasCompletedTour(completed);

    // Auto-show tour for first-time users
    if (!completed) {
      // Small delay to let the page render
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const completeTour = () => {
    if (user) {
      localStorage.setItem(`onboarding-tour-${user.id}`, 'true');
      setHasCompletedTour(true);
      setShowTour(false);
    }
  };

  const skipTour = () => {
    if (user) {
      localStorage.setItem(`onboarding-tour-${user.id}`, 'true');
      setHasCompletedTour(true);
      setShowTour(false);
    }
  };

  const restartTour = () => {
    if (user) {
      localStorage.removeItem(`onboarding-tour-${user.id}`);
      setHasCompletedTour(false);
      setShowTour(true);
    }
  };

  // Track feature usage for contextual tips
  const trackFeatureUse = (feature: string) => {
    if (!user) return false;

    const key = `feature-used-${user.id}-${feature}`;
    const hasUsed = localStorage.getItem(key) === 'true';

    if (!hasUsed) {
      localStorage.setItem(key, 'true');
      return true; // First time using this feature
    }

    return false; // Not first time
  };

  return {
    hasCompletedTour,
    showTour,
    completeTour,
    skipTour,
    restartTour,
    trackFeatureUse,
  };
};
