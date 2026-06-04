export type PageHeroKey = "about" | "services" | "gallery" | "contact";

export interface HeroGradient {
  /** Wave accent color */
  accentRgb: readonly [number, number, number];
  /** Top-left glow in overlay */
  from: string;
  /** Bottom depth in overlay */
  to: string;
  /** Charcoal wash tint (optional mood) */
  wash?: string;
}

/** Home — baltic blue accent on yale blue */
export const homeHeroGradient: HeroGradient = {
  accentRgb: [47, 102, 144],
  from: "#2f6690",
  to: "#16425b",
  wash: "#16425b",
};

/** Page heroes — distinct accents from the brand palette */
export const pageHeroGradients: Record<PageHeroKey, HeroGradient> = {
  about: {
    accentRgb: [58, 124, 165],
    from: "#3a7ca5",
    to: "#16425b",
    wash: "#1a4a66",
  },
  services: {
    accentRgb: [47, 102, 144],
    from: "#2f6690",
    to: "#16425b",
    wash: "#153a52",
  },
  gallery: {
    accentRgb: [129, 195, 215],
    from: "#81c3d7",
    to: "#16425b",
    wash: "#16425b",
  },
  contact: {
    accentRgb: [217, 220, 214],
    from: "#d9dcd6",
    to: "#16425b",
    wash: "#1a4a66",
  },
};
