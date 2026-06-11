export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  instant: 0.2,
  fast: 0.35,
  medium: 0.5,
  slow: 0.7,
} as const;

export const MOTION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  maskReveal: {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  },
  slideIn: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
} as const;
