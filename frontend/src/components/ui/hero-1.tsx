import { Link } from "react-router-dom";
import { HeroWave } from "@/components/ui/dynamic-wave-canvas-background";
import { NAVBAR_OFFSET } from "@/config/layout";
import type { HeroGradient } from "@/config/hero-gradients";
import { homeHeroGradient } from "@/config/hero-gradients";
import { cn } from "@/lib/utils";

export interface AnnouncementBanner {
  text: string;
  linkText: string;
  linkHref: string;
}

export interface CallToAction {
  text: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroLandingProps {
  title: string;
  description: string;
  announcementBanner?: AnnouncementBanner;
  callToActions?: CallToAction[];
  titleSize?: "small" | "medium" | "large";
  backgroundImage?: string;
  gradient?: HeroGradient;
  compact?: boolean;
  className?: string;
}

const defaultProps: Partial<HeroLandingProps> = {
  titleSize: "large",
};

export function HeroLanding(props: HeroLandingProps) {
  const {
    title,
    description,
    announcementBanner,
    callToActions,
    titleSize,
    backgroundImage,
    gradient = homeHeroGradient,
    compact = false,
    className,
  } = { ...defaultProps, ...props };

  const textOnDark = true;

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case "small":
        return "text-3xl sm:text-4xl md:text-5xl";
      case "medium":
        return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl";
      case "large":
      default:
        return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl";
    }
  };

  const renderCallToAction = (cta: CallToAction, index: number) => {
    const isExternal = cta.href.startsWith("http");

    if (cta.variant === "primary") {
      const className =
        "rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-gold/90 sm:px-7 sm:py-3 sm:text-base";
      return isExternal ? (
        <a key={index} href={cta.href} className={className}>
          {cta.text}
        </a>
      ) : (
        <Link key={index} to={cta.href} className={className}>
          {cta.text}
        </Link>
      );
    }

    const className = cn(
      "text-sm font-semibold transition-colors sm:text-base",
      textOnDark
        ? "text-warm-white/90 hover:text-warm-white"
        : "text-charcoal/80 hover:text-charcoal",
    );
    return isExternal ? (
      <a key={index} href={cta.href} className={className}>
        {cta.text} <span aria-hidden="true">→</span>
      </a>
    ) : (
      <Link key={index} to={cta.href} className={className}>
        {cta.text} <span aria-hidden="true">→</span>
      </Link>
    );
  };

  const HeroLink = ({
    href,
    children,
    className: cls,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  };

  return (
    <div
      data-nav-background="dark"
      className={cn(
        "relative w-full overflow-hidden bg-charcoal",
        compact ? "min-h-[42vh] sm:min-h-[44vh]" : "min-h-[85vh] sm:min-h-screen",
        className,
      )}
      style={{ paddingTop: NAVBAR_OFFSET }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <HeroWave accentRgb={gradient.accentRgb} />
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-overlay"
            loading="lazy"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: [
              `linear-gradient(155deg, ${gradient.from}${compact ? "66" : "38"} 0%, transparent 40%, ${gradient.to}f2 100%)`,
              gradient.wash
                ? `linear-gradient(to top, ${gradient.wash}e8 0%, ${gradient.wash}40 50%, transparent 85%)`
                : "linear-gradient(to top, rgba(31,31,31,0.85) 0%, transparent 55%)",
            ].join(", "),
          }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 isolate flex flex-col justify-center px-4 sm:px-6 lg:px-8",
          compact
            ? "min-h-[calc(42vh-var(--navbar-offset))] py-14 sm:min-h-[calc(44vh-var(--navbar-offset))] sm:py-16"
            : "min-h-[calc(85vh-var(--navbar-offset))] py-20 sm:min-h-[calc(100vh-var(--navbar-offset))] sm:py-24",
        )}
      >
        <div className="mx-auto w-full max-w-5xl">
          {announcementBanner && (
            <div className="mb-6 flex justify-center sm:mb-8">
              <div
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-xs ring-1 transition-all sm:px-4 sm:text-sm",
                  textOnDark
                    ? "text-warm-white/90 ring-warm-white/30 hover:ring-gold"
                    : "text-muted-foreground ring-border hover:ring-gold",
                )}
              >
                {announcementBanner.text}{" "}
                <HeroLink
                  href={announcementBanner.linkHref}
                  className="font-semibold text-sky-blue-light hover:text-sky-blue-light/80"
                >
                  {announcementBanner.linkText} →
                </HeroLink>
              </div>
            </div>
          )}

          <div className="text-center">
            <h1
              className={cn(
                getTitleSizeClasses(),
                "font-serif font-medium leading-[1.05] tracking-tight text-balance",
                textOnDark ? "text-warm-white" : "text-charcoal",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:mt-6 sm:text-lg md:text-xl",
                textOnDark ? "text-warm-white/85" : "text-muted-foreground",
              )}
            >
              {description}
            </p>

            {callToActions && callToActions.length > 0 && (
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                {callToActions.map((cta, index) =>
                  renderCallToAction(cta, index),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
