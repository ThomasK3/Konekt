// Animation variants for consistent animations across the app

// DRAMATIC fade-in effects
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },  // Increased from 20 to 40
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,  // Slowed down
      ease: [0.25, 0.1, 0.25, 1] as any  // Smooth easing
    }
  },
  exit: { opacity: 0, y: -40 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 }  // Slowed down
  },
  exit: { opacity: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.85 },  // More dramatic scale
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as any  // Bounce easing
    }
  },
  exit: { opacity: 0, scale: 0.85 }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 100 },  // Increased from 50
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any }
  },
  exit: { opacity: 0, x: -100 }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -100 },  // Increased from -50
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any }
  },
  exit: { opacity: 0, x: 100 }
};

// Stagger children animations - MORE VISIBLE
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,  // Increased from 0.1
      delayChildren: 0.2  // Added initial delay
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 30 },  // Increased from 20
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as any
    }
  }
};

// FASTER stagger for feeds/lists
export const fastStaggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const fastStaggerItem = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as any
    }
  }
};

// Hover effects - MORE NOTICEABLE
export const hoverScale = {
  scale: 1.03,  // Increased from 1.02
  y: -4,  // Add lift effect
  transition: {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1] as any  // Bounce
  }
};

export const hoverScaleBig = {
  scale: 1.05,
  y: -8,
  transition: {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1] as any
  }
};

export const hoverScaleSmall = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

export const tapScale = {
  scale: 0.96,  // More dramatic from 0.98
  transition: { duration: 0.15 }
};

// Loading animations
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Micro-interactions
export const heartPop = {
  scale: [1, 1.3, 1],
  transition: { duration: 0.3 }
};

export const bounce = {
  y: [0, -10, 0],
  transition: { duration: 0.5 }
};

export const shake = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.5 }
};

// Page transitions with custom easing
export const pageTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1] as any,
  duration: 0.3
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};
