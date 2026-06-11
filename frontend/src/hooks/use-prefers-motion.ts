import { useSyncExternalStore } from "react";

const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_MQ);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return !window.matchMedia(REDUCED_MOTION_MQ).matches;
}

function getServerSnapshot() {
  return true;
}

/** Returns true when motion animations should run. */
export function usePrefersMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
