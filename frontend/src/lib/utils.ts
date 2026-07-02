import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when a URL is a real destination (not an unset "#" placeholder). */
export function isLiveUrl(url?: string): url is string {
  return !!url && url !== "#";
}
