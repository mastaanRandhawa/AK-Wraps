import { useEffect, useRef, useState, type RefObject } from "react";

interface UseInViewOptions {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
  /** Report visible immediately and skip observation (used for on-mount reveals). */
  disabled?: boolean;
}

/**
 * Tracks whether an element has scrolled into view. Returns `[ref, inView]`.
 *
 * Mirrors the observer behaviour in MotionReveal, including the initial
 * bounding-box check — IntersectionObserver can miss elements that are already
 * on screen when the first frame has zero height.
 */
export function useInView<T extends HTMLElement>({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.01,
  disabled = false,
}: UseInViewOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      if (once) observer.disconnect();
    }

    return () => observer.disconnect();
  }, [once, rootMargin, threshold, disabled]);

  return [ref, inView];
}
