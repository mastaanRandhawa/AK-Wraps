import { Link } from "react-router-dom";
import { CinematicMedia } from "@/components/ui/cinematic-media";
import { RevealFade, RevealText } from "@/components/ui/reveal-text";
import { Button } from "@/components/ui/button";
import { GoogleRatingBadge } from "@/components/hero/HeroSocialProof";
import { images } from "@/content/images";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
}

interface CinematicBandProps {
  eyebrow?: string;
  /** Display lines — each gets its own mask row in the reveal. */
  titleLines: readonly string[];
  /** Index of the line rendered in the brand accent. */
  accentLine?: number;
  description?: string;
  stats?: readonly Stat[];
  cta?: { text: string; href: string };
  image?: string;
  imageFallback?: string;
  showRating?: boolean;
  className?: string;
  id?: string;
}

const defaultStats: readonly Stat[] = [
  { value: "500+", label: "Vehicles transformed" },
  { value: "10yr", label: "Premium film warranties" },
  { value: "1", label: "Studio, no outsourcing" },
];

/**
 * Full-bleed statement section: shop imagery pushed in behind a bold headline
 * that reveals word by word as the band scrolls into view. The same treatment
 * as the hero, scaled down for use between content sections.
 */
export function CinematicBand({
  eyebrow = "The Delta studio",
  titleLines,
  accentLine,
  description,
  stats = defaultStats,
  cta = { text: "Book Appointment", href: routes.contact },
  image = images.pageHeroAbout,
  imageFallback = images.heroSupraFallback,
  showRating = true,
  className,
  id,
}: CinematicBandProps) {
  return (
    <section
      id={id}
      data-nav-background="dark"
      className={cn(
        "relative isolate overflow-hidden bg-black section-padding",
        className,
      )}
    >
      <CinematicMedia
        image={image}
        imageFallback={imageFallback}
        zoom
        parallax
        parallaxAmount="10%"
        intensity="band"
        glow
      />

      <div className="relative z-10 mx-auto max-w-7xl container-padding">
        <RevealFade className="flex items-center gap-4">
          <span className="h-px w-10 bg-accent" />
          <span className="type-label text-white/70">{eyebrow}</span>
        </RevealFade>

        <RevealText
          as="h2"
          text={titleLines}
          accentLines={accentLine === undefined ? undefined : [accentLine]}
          delay={0.12}
          className="type-section mt-6 max-w-4xl font-bold text-white"
        />

        {description && (
          <RevealFade delay={0.45} className="mt-7 max-w-xl">
            <p className="type-small leading-relaxed text-white/70">{description}</p>
          </RevealFade>
        )}

        {stats.length > 0 && (
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3 sm:gap-6">
            {stats.map((stat, i) => (
              <RevealFade key={stat.label} delay={0.55 + i * 0.1}>
                <p className="type-stat font-display font-bold text-white">
                  {stat.value}
                </p>
                <p className="type-label mt-3 text-white/45">{stat.label}</p>
              </RevealFade>
            ))}
          </div>
        )}

        <RevealFade
          delay={0.9}
          className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
        >
          <Button size="lg" asChild>
            {cta.href.startsWith("http") || cta.href.startsWith("tel:") ? (
              <a href={cta.href}>{cta.text}</a>
            ) : (
              <Link to={cta.href}>{cta.text}</Link>
            )}
          </Button>
          {showRating && <GoogleRatingBadge />}
        </RevealFade>
      </div>

      <div className="fade-divider absolute inset-x-0 bottom-0 z-10" aria-hidden="true" />
    </section>
  );
}
