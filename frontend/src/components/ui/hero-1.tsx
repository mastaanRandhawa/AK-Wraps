import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { NAVBAR_OFFSET } from "@/config/layout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";

interface CallToAction {
  text: string;
  href: string;
  variant: "primary" | "secondary";
}

interface HeroLandingProps {
  title: string;
  description: string;
  callToActions?: CallToAction[];
  titleSize?: "small" | "medium" | "large";
  backgroundImage?: string;
  backgroundImageFallback?: string;
  backgroundImageClassName?: string;
  compact?: boolean;
  className?: string;
  showScrollIndicator?: boolean;
}

const defaultProps: Partial<HeroLandingProps> = {
  titleSize: "large",
  showScrollIndicator: true,
};

export function HeroLanding(props: HeroLandingProps) {
  const {
    title,
    description,
    callToActions,
    titleSize,
    backgroundImage,
    backgroundImageFallback,
    backgroundImageClassName,
    compact = false,
    className,
    showScrollIndicator = true,
  } = { ...defaultProps, ...props };

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case "small":
        return "type-display-sm";
      case "medium":
        return "type-display-md";
      case "large":
      default:
        return "type-display";
    }
  };

  const renderCallToAction = (cta: CallToAction, index: number) => {
    const isExternal = cta.href.startsWith("http");
    const variant = cta.variant === "primary" ? "default" : "secondary";
    const size = compact ? "default" : "lg";

    if (isExternal) {
      return (
        <Button key={index} variant={variant} size={size} asChild>
          <a href={cta.href}>{cta.text}</a>
        </Button>
      );
    }

    return (
      <Button key={index} variant={variant} size={size} asChild>
        <Link to={cta.href}>{cta.text}</Link>
      </Button>
    );
  };

  return (
    <div
      data-nav-background="dark"
      className={cn(
        "relative w-full overflow-hidden bg-black",
        compact ? "min-h-[40vh] sm:min-h-[45vh]" : "min-h-screen",
        className,
      )}
      style={{ paddingTop: NAVBAR_OFFSET }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {backgroundImage && (
          <SafeImage
            src={backgroundImage}
            fallback={backgroundImageFallback}
            alt=""
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center opacity-60",
              backgroundImageClassName,
            )}
            loading="eager"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div
        className={cn(
          "relative z-10 flex flex-col justify-end px-5 sm:px-8 lg:px-12",
          compact
            ? "min-h-[calc(40vh-var(--navbar-offset))] pb-12 sm:min-h-[calc(45vh-var(--navbar-offset))] sm:pb-16"
            : "min-h-[calc(100vh-var(--navbar-offset))] pb-20 sm:pb-28 md:pb-32",
        )}
      >
        <div className="mx-auto w-full max-w-6xl animate-page-enter">
          <div className="max-w-2xl">
            <p className="editorial-label mb-8">Premium Automotive Detailing</p>
            <h1
              className={cn(
                getTitleSizeClasses(),
                "font-serif font-medium leading-[1.02] tracking-tight text-white",
              )}
            >
              {title}
            </h1>
            <p className="type-body-sm mt-6 max-w-md tracking-wide text-white/50 sm:mt-8">
              {description}
            </p>

            {callToActions && callToActions.length > 0 && (
              <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
                {callToActions.map((cta, index) =>
                  renderCallToAction(cta, index),
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {!compact && showScrollIndicator && (
        <div
          className="absolute inset-x-0 bottom-8 z-10 mt-10 flex flex-col items-center gap-3 sm:bottom-10 sm:mt-0"
          aria-hidden="true"
        >
          <span className="editorial-label">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-scroll-bounce text-white/40" />
        </div>
      )}
    </div>
  );
}
