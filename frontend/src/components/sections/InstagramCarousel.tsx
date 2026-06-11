import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Instagram } from "lucide-react";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { IconCircleButton } from "@/components/ui/icon-circle-button";
import { SafeImage } from "@/components/ui/safe-image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { useInstagramFeed } from "@/hooks/use-instagram-feed";
import { usePageVisible } from "@/hooks/use-page-visible";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface InstagramCarouselProps {
  /** Max posts to show (default: all fetched posts) */
  limit?: number;
  /** Hide section heading when embedded on gallery page */
  showHeading?: boolean;
  className?: string;
  id?: string;
}

function truncateCaption(caption: string, max = 140) {
  const trimmed = caption.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trimEnd()}…`;
}

export function InstagramCarousel({
  limit,
  showHeading = true,
  className,
  id,
}: InstagramCarouselProps) {
  const { posts, loading } = useInstagramFeed(limit);
  const [index, setIndex] = useState(0);
  const pageVisible = usePageVisible();
  const touchStartX = useRef<number | null>(null);

  const count = posts.length;
  const current = posts[index];

  const next = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (!pageVisible || count <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, pageVisible, count]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start == null || end == null) return;

    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <Section
      id={id}
      variant={showHeading ? "elevated" : "default"}
      className={className}
    >
      {showHeading && (
        <SectionHeading
          eyebrow="Instagram"
          title={`@${site.socialHandle}`}
          description="Latest projects and behind-the-scenes from our feed."
          align="center"
        />
      )}

      <MotionReveal variant="slideIn">
        {loading ? (
          <div className="mx-auto flex aspect-[4/5] max-w-3xl items-center justify-center border border-white/10 bg-black sm:aspect-[16/10]">
            <p className="type-body-sm text-white/40">Loading feed…</p>
          </div>
        ) : count === 0 ? (
          <div className="mx-auto flex max-w-3xl flex-col items-center border border-white/15 px-6 py-16 text-center sm:px-8 sm:py-24">
            <Instagram className="h-5 w-5 text-white/40" strokeWidth={1.5} />
            <h3 className="type-section mt-6 font-serif font-medium text-white sm:mt-8">
              @{site.socialHandle}
            </h3>
            <p className="type-body-sm mt-4 max-w-sm font-light text-white/45">
              Connect your Instagram account to show live posts here. See{" "}
              <code className="text-white/60">docs/INSTAGRAM_SETUP.md</code> in
              the repo for setup steps.
            </p>
            <Button variant="secondary" size="lg" className="mt-10" asChild>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Instagram
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div
              className="mx-auto max-w-4xl touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <a
                href={current.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden rounded-md border border-white/15 bg-black sm:aspect-[16/10]"
                aria-label="Open Instagram post"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <SafeImage
                      src={current.imageUrl}
                      alt={truncateCaption(current.caption, 80) || "Instagram post"}
                      className="h-full w-full object-cover brightness-[0.7] transition-[filter] duration-700 group-hover:brightness-100"
                      loading={index === 0 ? "eager" : "lazy"}
                      width={1200}
                      height={750}
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black via-black/70 to-transparent p-5 transition-transform duration-500 group-hover:translate-y-0 sm:p-8">
                  {current.caption ? (
                    <p className="type-body-sm max-w-2xl font-light text-white/85">
                      {truncateCaption(current.caption)}
                    </p>
                  ) : null}
                  <span className="type-caption mt-4 inline-flex items-center gap-2 font-sans font-medium uppercase text-white/40 transition-colors duration-700 group-hover:text-accent-red">
                    View post
                    <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            </div>

            {count > 1 && (
              <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-6 sm:mt-10 sm:gap-8">
                <IconCircleButton icon={ChevronLeft} label="Previous post" onClick={prev} />
                <div className="flex gap-3">
                  {posts.map((post, i) => (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={cn(
                        "h-px transition-all duration-300",
                        i === index
                          ? "w-8 bg-white"
                          : "w-4 bg-white/20 hover:bg-white/40",
                      )}
                      aria-label={`Go to post ${i + 1}`}
                    />
                  ))}
                </div>
                <IconCircleButton icon={ChevronRight} label="Next post" onClick={next} />
              </div>
            )}

            <div className="mt-10 text-center sm:mt-12">
              <Button variant="secondary" asChild>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  Follow @{site.socialHandle}
                </a>
              </Button>
            </div>
          </>
        )}
      </MotionReveal>
    </Section>
  );
}
