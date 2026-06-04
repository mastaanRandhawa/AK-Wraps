import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { usePageVisible } from "@/hooks/use-page-visible";
import type { Testimonial } from "@/content/testimonials";

interface TestimonialsProps {
  items: Testimonial[];
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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, pageVisible]);

  const current = items[index];

  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        title="What our clients say"
        align="center"
      />
      <MotionSection>
        <div className="relative mx-auto max-w-3xl">
          <article className="rounded-2xl bg-warm-white px-8 py-12 shadow-sm md:px-16 md:py-16">
            <Quote className="h-10 w-10 text-cerulean/60" aria-hidden="true" />
            <blockquote
              key={current.id}
              className="mt-6 font-serif text-2xl leading-relaxed text-charcoal transition-opacity duration-300 md:text-3xl"
            >
              "{current.quote}"
            </blockquote>
            <footer className="mt-8">
              <p className="font-semibold text-charcoal">{current.author}</p>
              <p className="text-sm text-muted-foreground">{current.role}</p>
            </footer>
          </article>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-gray-soft p-2 transition-colors hover:bg-beige"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-baltic-blue" : "w-2 bg-gray-soft"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-gray-soft p-2 transition-colors hover:bg-beige"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </MotionSection>
    </Section>
  );
}
