export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * Sharper deceleration than EASE_PREMIUM — the long, cinematic settle used for
 * hero push-ins and masked text reveals.
 */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  instant: 0.2,
  fast: 0.35,
  medium: 0.5,
  slow: 0.7,
  cinematic: 1.1,
} as const;

/** Timing for the masked line/word reveals in RevealText. */
export const REVEAL = {
  /** Seconds between consecutive words. */
  wordStagger: 0.055,
  /** Seconds between consecutive lines. */
  lineStagger: 0.12,
  duration: 0.95,
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
