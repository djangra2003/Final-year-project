import { Variants } from 'framer-motion';

// Fade up animation for elements
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Scale animation for cards and interactive elements
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  tap: {
    scale: 0.95
  }
};

// Stagger children animation
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Slide in animation for sections
export const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  }
};

// Bounce animation for buttons and interactive elements
export const bounceVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.9
  }
};

// Rotate animation for icons
export const rotateVariants: Variants = {
  hover: {
    rotate: 360,
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};