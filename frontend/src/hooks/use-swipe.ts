import { useRef, useCallback, type TouchEventHandler } from "react";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 40,
}: UseSwipeOptions) {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart: TouchEventHandler = useCallback((e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchStartY.current = e.touches[0]?.clientY ?? null;
  }, []);

  const onTouchEnd: TouchEventHandler = useCallback(
    (e) => {
      const startX = touchStartX.current;
      const startY = touchStartY.current;
      const endX = e.changedTouches[0]?.clientX;
      const endY = e.changedTouches[0]?.clientY;
      touchStartX.current = null;
      touchStartY.current = null;

      if (startX == null || startY == null || endX == null || endY == null) {
        return;
      }

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaY) > Math.abs(deltaX)) return;
      if (Math.abs(deltaX) < threshold) return;

      if (deltaX < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    },
    [onSwipeLeft, onSwipeRight, threshold],
  );

  return { onTouchStart, onTouchEnd };
}
