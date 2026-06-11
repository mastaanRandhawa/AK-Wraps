import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { Phone } from "lucide-react";
import { NAVBAR_OFFSET } from "@/config/layout";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";

interface CallToAction {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

interface HeroLandingProps {
  title: string;
  description?: string;
  badge?: string;
  callToActions?: CallToAction[];
  titleSize?: "small" | "medium" | "large";
  backgroundImage?: string;
  backgroundImageFallback?: string;
  backgroundVideo?: string;
  videoPoster?: string;
  compact?: boolean;
  className?: string;
  align?: "bottom" | "center";
}

export function HeroLanding({
  title,
  description,
  badge,
  callToActions,
  titleSize = "large",
  backgroundImage,
  backgroundImageFallback,
  backgroundVideo,
  videoPoster,
  compact = false,
  className,
  align = "bottom",
}: HeroLandingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersMotion = usePrefersMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", prefersMotion && !compact ? "16%" : "0%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !backgroundVideo || videoFailed) return;
    video.play().catch(() => setVideoFailed(true));
  }, [backgroundVideo, videoFailed]);

  const titleClass =
    titleSize === "large" ? "type-hero" : "type-page";

  const primaryCta = callToActions?.[0];
  const showVideo = backgroundVideo && !videoFailed;

  return (
    <div
      ref={containerRef}
      data-nav-background="dark"
      className={cn(
        "relative w-full overflow-hidden bg-black",
        compact ? "min-h-[45vh] sm:min-h-[50vh]" : "min-h-screen",
        className,
      )}
      style={{ paddingTop: NAVBAR_OFFSET }}
    >
      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-0 w-screen max-w-none -translate-x-1/2"
        style={{ y: compact ? 0 : bgY, scale: compact ? 1 : bgScale }}
        aria-hidden="true"
      >
        {showVideo ? (
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center scale-105 sm:scale-[1.1] md:scale-[1.15]"
            autoPlay
            muted
            loop
            playsInline
            poster={videoPoster}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <SafeImage
            src={backgroundImage}
            fallback={backgroundImageFallback}
            alt=""
            className="absolute top-1/2 left-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center scale-105 sm:scale-[1.1] md:scale-[1.15]"
            loading="eager"
            fetchPriority="high"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent" />
      </motion.div>

      <div
        className={cn(
          "relative z-10 flex flex-col px-5 sm:px-8 lg:px-12",
          align === "bottom"
            ? compact
              ? "min-h-[calc(45vh-var(--navbar-offset))] justify-end pb-12 sm:min-h-[calc(50vh-var(--navbar-offset))] sm:pb-16"
              : "min-h-[calc(100dvh-var(--navbar-offset))] justify-end pb-10 sm:min-h-[calc(100vh-var(--navbar-offset))] sm:pb-20 md:pb-24"
            : "min-h-[calc(45vh-var(--navbar-offset))] justify-center py-16",
        )}
      >
        <div className="mx-auto w-full max-w-7xl">
          {compact ? (
            <div className="max-w-3xl">
              {badge && <p className="type-label mb-4 text-white/80">{badge}</p>}
              <h1 className={cn(titleClass, "font-bold text-white")}>{title}</h1>
              {description && (
                <p className="type-small mt-4 max-w-lg text-muted-foreground">{description}</p>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-5 xl:gap-x-10">
              {badge && (
                <p className="type-label font-bold text-white lg:col-span-7">
                  {badge}
                </p>
              )}

              <h1
                className={cn(
                  titleClass,
                  "max-w-[22ch] font-bold text-white sm:max-w-[26ch] lg:col-span-7 lg:row-start-2 lg:max-w-none lg:self-end",
                )}
              >
                {title}
              </h1>

              <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-end lg:text-right">
                {description && (
                  <p className="type-hero-sub font-normal leading-relaxed text-white/85">
                    {description}
                  </p>
                )}

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
                    className="type-small group/phone inline-flex shrink-0 min-h-[44px] items-center gap-2.5 whitespace-nowrap font-medium text-white transition-opacity hover:opacity-80"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-white/35 transition-all duration-700 group-hover/phone:text-accent group-hover/phone:drop-shadow-[0_0_6px_rgba(227,6,19,0.85)]"
                      strokeWidth={2}
                      fill="currentColor"
                    />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!compact && (
        <div
          className="fade-divider absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[min(100%,56rem)]"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
