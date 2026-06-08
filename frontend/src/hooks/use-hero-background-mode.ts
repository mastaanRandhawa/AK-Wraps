import { useEffect, useState } from "react";

/** Desktop breakpoint — beams shader fails on many PCs; use photo hero instead */
const DESKTOP_MQ = "(min-width: 1024px)";
const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

function computeMode(): HeroBackgroundMode {
  const isDesktop = window.matchMedia(DESKTOP_MQ).matches;
  const reducedMotion = window.matchMedia(REDUCED_MOTION_MQ).matches;

  if (isDesktop || reducedMotion || !detectWebGL()) {
    return "image";
  }

  return "beams";
}

type HeroBackgroundMode = "beams" | "image";

/**
 * Home hero background strategy:
 * - Desktop (≥1024px): static Supra photo (beams unreliable on PC)
 * - Mobile / tablet: animated beams when WebGL + motion are available
 * - Otherwise: Supra photo fallback
 *
 * Defaults to "image" before mount so desktop never flashes a broken shader.
 */
export function useHeroBackgroundMode(): HeroBackgroundMode {
  const [mode, setMode] = useState<HeroBackgroundMode>("image");

  useEffect(() => {
    setMode(computeMode());

    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const motionMq = window.matchMedia(REDUCED_MOTION_MQ);
    const onChange = () => setMode(computeMode());

    desktopMq.addEventListener("change", onChange);
    motionMq.addEventListener("change", onChange);

    return () => {
      desktopMq.removeEventListener("change", onChange);
      motionMq.removeEventListener("change", onChange);
    };
  }, []);

  return mode;
}
