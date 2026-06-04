import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Page content behind the navbar: dark hero/footer vs light sections */
export type NavbarBackground = "dark" | "light";

const NAV_BG_SELECTOR = "[data-nav-background]";
const SAMPLE_RATIOS = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85];

function getNavbarZoneHeight(): number {
  const header = document.querySelector("[data-navbar-zone]");
  return header?.getBoundingClientRect().height ?? 76;
}

/** Multi-point hit test through the transparent navbar (immediate, no rAF delay). */
function sampleBackground(): NavbarBackground {
  const zone = getNavbarZoneHeight();
  const y = Math.round(zone * 0.55);
  let light = 0;

  for (const ratio of SAMPLE_RATIOS) {
    const x = Math.round(window.innerWidth * ratio);
    const hit = document.elementFromPoint(x, y);
    if (!hit || hit.closest("[data-navbar-zone]")) continue;

    const marker = hit.closest(NAV_BG_SELECTOR);
    if (marker?.getAttribute("data-nav-background") === "light") {
      light += 1;
    }
  }

  return light >= Math.ceil(SAMPLE_RATIOS.length / 2) ? "light" : "dark";
}

function computeFromRatios(
  ratios: Map<Element, { value: NavbarBackground; ratio: number }>,
): NavbarBackground {
  let lightScore = 0;
  let darkScore = 0;

  for (const { value, ratio } of ratios.values()) {
    if (ratio <= 0) continue;
    if (value === "light") lightScore += ratio;
    else darkScore += ratio;
  }

  if (lightScore === 0 && darkScore === 0) return "dark";
  return lightScore >= darkScore ? "light" : "dark";
}

/**
 * Detects whether the navbar sits over a dark or light surface.
 * Uses IntersectionObserver on the top viewport band + scroll sampling for instant updates.
 */
export function useNavbarBackground(): NavbarBackground {
  const [background, setBackground] = useState<NavbarBackground>("dark");
  const { pathname } = useLocation();

  useEffect(() => {
    const ratios = new Map<Element, { value: NavbarBackground; ratio: number }>();

    const apply = (next: NavbarBackground) => {
      setBackground((prev) => (prev === next ? prev : next));
    };

    const sync = () => apply(sampleBackground());

    const syncFromObserver = () => {
      const fromObserver = computeFromRatios(ratios);
      const fromSample = sampleBackground();
      apply(fromObserver !== fromSample ? fromSample : fromObserver);
    };

    let observer: IntersectionObserver | null = null;

    const mountObserver = () => {
      observer?.disconnect();

      const zone = getNavbarZoneHeight();
      const bottomInset = -(window.innerHeight - zone);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const value =
              entry.target.getAttribute("data-nav-background") === "light"
                ? "light"
                : "dark";
            ratios.set(entry.target, { value, ratio: entry.intersectionRatio });
          }
          syncFromObserver();
        },
        {
          root: null,
          rootMargin: `0px 0px ${bottomInset}px 0px`,
          threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
        },
      );

      document.querySelectorAll(NAV_BG_SELECTOR).forEach((el) => {
        observer!.observe(el);
      });
    };

    mountObserver();
    sync();

    const onScroll = () => sync();
    const onResize = () => {
      mountObserver();
      sync();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ratios.clear();
    };
  }, [pathname]);

  return background;
}
