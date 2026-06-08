import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassEffect } from "@/components/ui/liquid-glass";
import { GlassMarqueeShell } from "@/components/ui/glass-marquee-shell";
import { ProductMarquee } from "@/components/ui/product-marquee";
import { usePageVisible } from "@/hooks/use-page-visible";
import { featuredServices } from "@/content/services";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

interface TestimonialsProps {
  items: Testimonial[];
}

const marqueeProducts = featuredServices.map((service) => ({
  id: service.id,
  title: service.title,
  image: service.image,
}));

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i < rating ? "fill-white text-white" : "fill-none text-white/15",
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const pageVisible = usePageVisible();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!pageVisible) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, pageVisible]);

  const current = items[index];

  return (
    <Section variant="elevated" id="testimonials" fullWidth>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by vehicle owners"
          align="center"
        />
        <MotionSection>
          <GlassMarqueeShell
            tone="elevated"
            backdrop="images"
            minHeight="min-h-[360px] sm:min-h-[420px]"
            contentClassName="my-4 max-w-2xl sm:my-8"
            marquee={
              <ProductMarquee
                products={marqueeProducts}
                duration={75}
                layout="split"
              />
            }
          >
            <GlassEffect
              key={current.id}
              as="article"
              variant="frosted"
              className="border-white/10 bg-[rgba(8,8,8,0.9)] px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:px-10 sm:py-14"
            >
              <StarRating rating={current.rating} />
              <blockquote className="type-quote mt-6 font-serif font-light text-white sm:mt-8">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <footer className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <p className="type-caption font-sans font-semibold uppercase text-white">
                  {current.author}
                </p>
                <p className="type-body-sm mt-2 font-light text-white/40">
                  {current.role}
                </p>
              </footer>
            </GlassEffect>
          </GlassMarqueeShell>

          <div className="relative z-20 mt-8 flex items-center justify-center gap-6 sm:mt-10 sm:gap-8">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black text-white/60 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <div className="flex gap-3">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-px transition-all duration-300",
                    i === index
                      ? "w-8 bg-white"
                      : "w-4 bg-white/20 hover:bg-white/40",
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center border border-white/20 bg-black text-white/60 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </MotionSection>
      </div>
    </Section>
  );
}
