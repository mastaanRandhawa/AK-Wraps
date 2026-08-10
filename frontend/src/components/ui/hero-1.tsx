import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { NAVBAR_OFFSET } from "@/config/layout";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { EASE_EXPO } from "@/lib/motion";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { Button } from "@/components/ui/button";
import { CinematicMedia } from "@/components/ui/cinematic-media";
import { RevealFade, RevealText } from "@/components/ui/reveal-text";
import {
  GoogleRatingBadge,
  HeroTestimonial,
} from "@/components/hero/HeroSocialProof";

interface CallToAction {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

interface HeroLandingProps {
  title: string;
  /** Explicit display lines for the reveal. Falls back to `title` as one line. */
  titleLines?: readonly string[];
  /** Index within `titleLines` rendered in the brand accent. */
  accentLine?: number;
  description?: string;
  badge?: string;
  callToActions?: CallToAction[];
  titleSize?: "small" | "medium" | "large";
  backgroundImage?: string;
  backgroundImageFallback?: string;
  backgroundVideo?: string;
  backgroundVideoWebm?: string;
  videoPoster?: string;
  /** Google rating + rotating testimonial over the media. */
  showSocialProof?: boolean;
  compact?: boolean;
  className?: string;
  align?: "bottom" | "center";
}

/**
 * Reveal timeline (seconds). One continuous cascade from the eyebrow down to
 * the scroll cue, timed to land just after the background push-in settles.
 */
const T = {
  rail: 0.15,
  eyebrow: 0.28,
  title: 0.42,
  description: 0.95,
  actions: 1.08,
  rating: 1.2,
  testimonial: 1.32,
  scrollCue: 1.55,
} as const;

export function HeroLanding({
  title,
  titleLines,
  accentLine,
  description,
  badge,
  callToActions,
  titleSize = "large",
  backgroundImage,
  backgroundImageFallback,
  backgroundVideo,
  backgroundVideoWebm,
  videoPoster,
  showSocialProof = false,
  compact = false,
  className,
  align = "bottom",
}: HeroLandingProps) {
  const prefersMotion = usePrefersMotion();
  const titleClass = titleSize === "large" ? "type-hero" : "type-page";
  const lines = titleLines?.length ? titleLines : [title];
  const primaryCta = callToActions?.[0];

  return (
    <div
      data-nav-background="dark"
      className={cn(
        "relative w-full overflow-hidden bg-black",
        compact ? "min-h-[45vh] sm:min-h-[50vh]" : "min-h-[100svh]",
        className,
      )}
      style={{ paddingTop: NAVBAR_OFFSET }}
    >
      <CinematicMedia
        image={backgroundImage}
        imageFallback={backgroundImageFallback}
        video={backgroundVideo}
        videoWebm={backgroundVideoWebm}
        poster={videoPoster}
        zoom={!compact}
        parallax={!compact}
        glow={!compact}
        intensity={compact ? "band" : "hero"}
      />

      {/* Editorial top rail — only has room on the full-height home hero. */}
      {!compact && (
        <RevealFade
          immediate
          delay={T.rail}
          y={0}
          className="absolute inset-x-0 top-[calc(var(--navbar-offset)+2rem)] z-10 hidden md:block"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="type-label flex items-center justify-between text-white/40">
              <span>Delta, British Columbia</span>
              <span className="fade-divider mx-8 flex-1" />
              <span>Est. {site.name}</span>
            </div>
          </div>
        </RevealFade>
      )}

      <div
        className={cn(
          "relative z-10 flex flex-col px-5 sm:px-8 lg:px-12",
          align === "bottom"
            ? compact
              ? "min-h-[calc(45vh-var(--navbar-offset))] justify-end pb-12 sm:min-h-[calc(50vh-var(--navbar-offset))] sm:pb-16"
              : "min-h-[calc(100svh-var(--navbar-offset))] justify-end pb-14 sm:pb-20 md:pb-24"
            : "min-h-[calc(45vh-var(--navbar-offset))] justify-center py-16",
        )}
      >
        <div className="mx-auto w-full max-w-7xl">
          {compact ? (
            <div className="max-w-3xl">
              {badge && (
                <RevealFade immediate delay={T.eyebrow} className="type-label mb-4 text-white/70">
                  {badge}
                </RevealFade>
              )}
              <RevealText
                as="h1"
                immediate
                text={lines}
                delay={T.title}
                className={cn(titleClass, "font-bold text-white")}
              />
              {description && (
                <RevealFade immediate delay={T.description} className="mt-4 max-w-lg">
                  <p className="type-small text-muted-foreground">{description}</p>
                </RevealFade>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-5 xl:gap-x-10">
                {badge && (
                  <RevealFade
                    immediate
                    delay={T.eyebrow}
                    className="flex items-center gap-4 lg:col-span-7"
                  >
                    <span className="h-px w-10 bg-accent" />
                    <span className="type-label font-bold text-white/80">{badge}</span>
                  </RevealFade>
                )}

                <RevealText
                  as="h1"
                  immediate
                  text={lines}
                  accentLines={accentLine === undefined ? undefined : [accentLine]}
                  delay={T.title}
                  className={cn(
                    titleClass,
                    "max-w-[22ch] font-bold text-white sm:max-w-[26ch] lg:col-span-7 lg:row-start-2 lg:max-w-none lg:self-end",
                  )}
                />

                <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-end lg:text-right">
                  {description && (
                    <RevealFade immediate delay={T.description}>
                      <p className="type-hero-sub leading-relaxed font-normal text-white/85">
                        {description}
                      </p>
                    </RevealFade>
                  )}

                  <RevealFade immediate delay={T.actions}>
                    <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-5 lg:justify-end">
                      {primaryCta && (
                        <Button
                          variant={
                            primaryCta.variant === "ghost"
                              ? "ghost"
                              : primaryCta.variant === "primary"
                                ? "default"
                                : "secondary"
                          }
                          size="lg"
                          className="shrink-0"
                          asChild
                        >
                          {primaryCta.href.startsWith("http") ||
                          primaryCta.href.startsWith("tel:") ? (
                            <a href={primaryCta.href}>{primaryCta.text}</a>
                          ) : (
                            <Link to={primaryCta.href}>{primaryCta.text}</Link>
                          )}
                        </Button>
                      )}

                      <a
                        href={`tel:${site.phone.replace(/\D/g, "")}`}
                        className="type-small group/phone inline-flex min-h-[44px] shrink-0 items-center gap-2.5 font-medium whitespace-nowrap text-white transition-opacity hover:opacity-80"
                      >
                        <Phone
                          className="h-4 w-4 shrink-0 text-white/35 transition-all duration-700 group-hover/phone:text-accent group-hover/phone:drop-shadow-[0_0_6px_rgba(227,6,19,0.85)]"
                          strokeWidth={2}
                          fill="currentColor"
                        />
                        {site.phone}
                      </a>
                    </div>
                  </RevealFade>
                </div>
              </div>

              {showSocialProof && (
                <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:mt-12 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10">
                  <RevealFade
                    immediate
                    delay={T.rating}
                    className="lg:col-span-5 lg:self-center"
                  >
                    <GoogleRatingBadge />
                  </RevealFade>

                  <RevealFade immediate delay={T.testimonial} className="lg:col-span-6 lg:col-start-7">
                    <HeroTestimonial />
                  </RevealFade>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {!compact && (
        <>
          {/* Hidden on mobile — the social-proof row already reaches the
              bottom of the viewport there and the cue would sit on top of it. */}
          <motion.div
            className="absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex"
            initial={prefersMotion ? { opacity: 0 } : false}
            animate={prefersMotion ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: T.scrollCue, ease: EASE_EXPO }}
            aria-hidden="true"
          >
            <span className="type-label flex flex-col items-center gap-2 text-white/30">
              Scroll
              <motion.span
                className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
                animate={prefersMotion ? { scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] } : undefined}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.div>

          <div
            className="fade-divider absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[min(100%,56rem)]"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
