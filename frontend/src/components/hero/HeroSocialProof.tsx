import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";
import { usePageVisible } from "@/hooks/use-page-visible";
import { site } from "@/config/site";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const ROTATE_MS = 7000;

function Star({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("flex-none", className)}
      aria-hidden="true"
    >
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}

/**
 * Aggregate Google rating with partially-filled stars. The fill is a clipped
 * overlay of the same row, so 4.9/5 renders as 98% of the row width rather
 * than rounding up to five solid stars.
 */
export function GoogleRatingBadge({ className }: { className?: string }) {
  const { score, count, url } = site.googleRating;
  const fillPercent = Math.max(0, Math.min(100, (score / 5) * 100));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${score} out of 5 from ${count} Google reviews · checked Sep 27, 2026`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="font-display text-lg leading-none font-semibold text-white">
        {score}
      </span>

      <span className="relative inline-flex" aria-hidden="true">
        <span className="flex w-max gap-0.5 text-white/15">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} />
          ))}
        </span>
        <span
          className="absolute inset-0 flex overflow-hidden"
          style={{ width: `${fillPercent}%` }}
        >
          <span className="flex w-max gap-0.5 text-[#f5b544]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </span>
        </span>
      </span>

      <span className="type-label text-white/55 transition-colors duration-300 group-hover:text-white">
        {count} Google reviews · checked Sep 27, 2026
      </span>
    </a>
  );
}

/**
 * A single testimonial cycling in place over the hero video, so real customer
 * words are visible above the fold without pushing the headline off screen.
 */
export function HeroTestimonial({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const pageVisible = usePageVisible();

  useEffect(() => {
    if (!pageVisible || testimonials.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATE_MS,
    );
    return () => clearInterval(timer);
  }, [pageVisible]);

  const current = testimonials[index];
  if (!current) return null;

  return (
    <div className={cn("relative min-h-[7.5rem] sm:min-h-[6.5rem]", className)}>
      <AnimatePresence mode="wait">
        <motion.figure
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: DURATION.medium, ease: EASE_PREMIUM }}
          className="border-l-2 border-accent/70 pl-4 sm:pl-5"
        >
          <blockquote className="type-small text-pretty text-white/85">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption className="type-label mt-3 text-white/45">
            <a href={current.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{current.author} · {current.role}</a>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </div>
  );
}
