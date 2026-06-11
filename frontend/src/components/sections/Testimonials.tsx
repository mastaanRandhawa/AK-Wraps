import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { IconCircleButton } from "@/components/ui/icon-circle-button";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SafeImage } from "@/components/ui/safe-image";
import { usePageVisible } from "@/hooks/use-page-visible";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

interface TestimonialsProps {
  items: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <Star
            className={cn(
              "h-4 w-4",
              i < rating ? "fill-accent text-accent drop-shadow-[0_0_6px_rgba(227,6,19,0.8)]" : "fill-none text-white/20",
            )}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const pageVisible = usePageVisible();

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  const next = useCallback(() => {
    goTo((index + 1) % items.length);
  }, [goTo, index, items.length]);

  const prev = useCallback(() => {
    goTo((index - 1 + items.length) % items.length);
  }, [goTo, index, items.length]);

  useEffect(() => {
    if (!pageVisible) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % items.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [pageVisible, items.length]);

  const current = items[index];

  return (
    <Section variant="default" id="testimonials" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true">
        <SafeImage
          src={images.ceramicCoating}
          alt=""
          className="h-full w-full object-cover blur-3xl"
        />
      </div>

      <div className="relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by owners"
          align="center"
        />
        <MotionReveal variant="fade">
          <div className="mx-auto max-w-4xl text-center">
            <StarRating rating={current.rating} />
            <div className="relative mt-10 min-h-[12rem] sm:mt-12 sm:min-h-[14rem]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={current.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                  transition={{ duration: DURATION.medium, ease: EASE_PREMIUM }}
                  className="type-quote font-display font-medium text-white"
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.footer
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-10 sm:mt-12"
              >
                <p className="type-caption font-bold uppercase tracking-widest text-white">
                  {current.author}
                </p>
                <p className="type-body-sm mt-2 font-light text-white/40">{current.role}</p>
              </motion.footer>
            </AnimatePresence>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8">
            <IconCircleButton icon={ChevronLeft} label="Previous testimonial" onClick={prev} />
            <div className="flex gap-2.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index
                      ? "w-8 bg-accent shadow-[0_0_10px_rgba(227,6,19,0.7)]"
                      : "w-2 bg-white/20 hover:bg-white/35",
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <IconCircleButton icon={ChevronRight} label="Next testimonial" onClick={next} />
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}

