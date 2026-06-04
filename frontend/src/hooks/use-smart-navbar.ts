import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 8;
const TOP_OFFSET = 72;

/**
 * Hides the navbar while scrolling down; reveals it when scrolling up.
 * Always visible near the top of the page.
 */
export function useSmartNavbar(forceVisible = false): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (forceVisible) {
      setVisible(true);
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;

      if (scrollY <= TOP_OFFSET) {
        setVisible(true);
      } else if (delta > SCROLL_THRESHOLD) {
        setVisible(false);
      } else if (delta < -SCROLL_THRESHOLD) {
        setVisible(true);
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceVisible]);

  return forceVisible || visible;
}
