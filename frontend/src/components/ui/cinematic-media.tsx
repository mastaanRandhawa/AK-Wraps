import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";

type Intensity = "hero" | "band" | "subtle";

interface CinematicMediaProps {
  image?: string;
  imageFallback?: string;
  /** When present (and playable) the video wins over `image`. */
  video?: string;
  videoWebm?: string;
  poster?: string;
  /** Slow push-in on mount, then a continuous Ken Burns drift. */
  zoom?: boolean;
  /** Vertical drift as the section scrolls past. */
  parallax?: boolean;
  /** How far the layer travels over the scroll range. */
  parallaxAmount?: string;
  /** How hard the overlays darken the media. */
  intensity?: Intensity;
  /** Soft brand-red bloom drifting behind the content. */
  glow?: boolean;
  className?: string;
}

/**
 * Full-bleed background media with the house cinematic treatment: a push-in on
 * mount, an ambient Ken Burns drift, scroll parallax, layered vignettes and
 * film grain. Falls back to a still image if the video can't play, and drops
 * every animation when the user prefers reduced motion.
 */
export function CinematicMedia({
  image,
  imageFallback,
  video,
  videoWebm,
  poster,
  zoom = true,
  parallax = false,
  parallaxAmount = "14%",
  intensity = "hero",
  glow = false,
  className,
}: CinematicMediaProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersMotion = usePrefersMotion();

  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", parallax && prefersMotion ? parallaxAmount : "0%"],
  );

  const showVideo = Boolean(video) && !videoFailed;
  const animateZoom = zoom && prefersMotion;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    el.play().catch(() => setVideoFailed(true));
  }, [showVideo]);

  // object-cover already fills the box; the extra scale hides the edges the
  // Ken Burns drift and parallax would otherwise expose.
  const mediaClass = cn(
    "absolute inset-0 h-full w-full object-cover object-center scale-105",
    animateZoom && "animate-ken-burns",
  );

  return (
    <div
      ref={layerRef}
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={animateZoom ? { scale: 1.22 } : false}
          animate={animateZoom ? { scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE_EXPO }}
        >
          {showVideo ? (
            <video
              ref={videoRef}
              className={mediaClass}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              onError={() => setVideoFailed(true)}
            >
              {videoWebm && <source src={videoWebm} type="video/webm" />}
              <source src={video} type="video/mp4" />
            </video>
          ) : image ? (
            <SafeImage
              src={image}
              fallback={imageFallback}
              alt=""
              className={mediaClass}
              loading="eager"
              fetchPriority="high"
            />
          ) : null}
        </motion.div>
      </motion.div>

      <Overlays intensity={intensity} />

      {glow && prefersMotion && (
        <div className="animate-glow-drift absolute top-1/3 -left-40 hidden h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[140px] sm:block" />
      )}

      <div className="grain absolute inset-0" />
    </div>
  );
}

function Overlays({ intensity }: { intensity: Intensity }) {
  if (intensity === "subtle") {
    return <div className="absolute inset-0 bg-black/55" />;
  }

  if (intensity === "band") {
    return (
      <>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
      </>
    );
  }

  return (
    <>
      {/* Off-centre vignette keeps the subject lit while the copy side goes dark.
          Tuned lighter than a typical hero stack — the shop footage is already
          low-key, and stacking three heavy layers crushed it to near-black. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_68%_18%,transparent_0%,rgba(0,0,0,0.32)_55%,rgba(0,0,0,0.88)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />
    </>
  );
}
