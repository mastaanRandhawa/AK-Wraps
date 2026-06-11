import { forwardRef, type KeyboardEvent, type ReactNode } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

interface MediaCardBaseProps {
  className?: string;
  children?: ReactNode;
}

interface PortfolioCardProps extends MediaCardBaseProps {
  variant: "portfolio";
  image: string;
  imageFallback?: string;
  alt: string;
  title: string;
  onClick?: () => void;
  brandLogo?: string;
  brandName?: string;
  services?: string[];
}

interface ServiceCardProps extends MediaCardBaseProps {
  variant: "service";
  image: string;
  imageFallback?: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  isActive?: boolean;
  onSelect?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

interface StatCardProps extends MediaCardBaseProps {
  variant: "stat";
  value: string;
  label: string;
  description?: string;
}

type MediaCardProps = PortfolioCardProps | ServiceCardProps | StatCardProps;

function handleServiceKeyDown(
  e: KeyboardEvent<HTMLElement>,
  onSelect?: () => void,
) {
  if (!onSelect) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onSelect();
  }
}

const ServiceMediaCard = forwardRef<HTMLElement, ServiceCardProps>(
  function ServiceMediaCard(
    {
      image,
      imageFallback,
      alt,
      label,
      title,
      description,
      isActive = false,
      onSelect,
      onHover,
      onLeave,
      className,
    },
    ref,
  ) {
    return (
      <article
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        onClick={onSelect}
        onKeyDown={(e) => handleServiceKeyDown(e, onSelect)}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        className={cn(
          "group w-[min(72vw,240px)] shrink-0 cursor-pointer snap-center overflow-hidden rounded-md border bg-black touch-manipulation sm:w-[280px] md:w-[300px] lg:w-[320px]",
          "headlight-border transition-opacity duration-500",
          isActive ? "headlight-on opacity-100" : "opacity-80",
          className,
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
          <SafeImage
            src={image}
            fallback={imageFallback}
            alt={alt}
            className="headlight-image h-full w-full object-cover"
          />
          <div className="headlight-overlay" aria-hidden="true" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="accent-dot" />
            <span
              className={cn(
                "type-card font-semibold uppercase transition-colors duration-700",
                isActive ? "text-white" : "text-white/50",
              )}
            >
              {label}
            </span>
          </div>
        </div>

        <div className="p-[var(--spacing-card-padding)]">
          <div className="flex gap-4">
            <span className="headlight-bar" />
            <div>
              <h3
                className={cn(
                  "type-card font-bold uppercase tracking-wider transition-colors duration-700",
                  isActive ? "text-white" : "text-white/70",
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "type-small mt-2 font-light transition-colors duration-700",
                  isActive ? "text-white/55" : "text-white/35",
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  },
);

export const MediaCard = forwardRef<HTMLElement, MediaCardProps>(
  function MediaCard(props, ref) {
  if (props.variant === "stat") {
    return (
      <div
        className={cn(
          "glass-panel flex h-full flex-col justify-between p-[var(--spacing-card-padding)]",
          props.className,
        )}
      >
        <p className="type-stat font-display font-medium tracking-tight text-white">
          {props.value}
        </p>
        <div className="mt-8 sm:mt-10">
          <p className="type-card font-sans font-semibold uppercase text-white">
            {props.label}
          </p>
          {props.description && (
            <p className="type-small mt-3 max-w-[200px] font-light text-muted-foreground">
              {props.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (props.variant === "portfolio") {
    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (!props.onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        props.onClick();
      }
    };

    return (
      <article
        role="button"
        tabIndex={0}
        onClick={props.onClick}
        onKeyDown={handleKeyDown}
        aria-label={`View ${props.alt} project`}
        className={cn(
          "group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
          props.className,
        )}
      >
        <SafeImage
          src={props.image}
          fallback={props.imageFallback}
          alt={props.alt}
          className="portfolio-image absolute inset-0 h-full w-full object-cover"
        />
        <div className="portfolio-overlay" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black/90" />

        {props.brandLogo && props.brandName && (
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
            <BrandLogo
              src={props.brandLogo}
              name={props.brandName}
              className="h-5 opacity-70 transition-opacity duration-700 group-hover:opacity-100 sm:h-6"
            />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="type-card rounded-pill border border-white/30 bg-black/50 px-5 py-2 font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            View Project
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
          <p className="type-card font-bold uppercase tracking-wider text-white/90 transition-colors duration-700 group-hover:text-white">
            {props.title}
          </p>
          {props.services && props.services.length > 0 && (
            <>
              <p className="type-card mt-2 font-semibold uppercase tracking-widest text-white/40 transition-colors duration-700 group-hover:text-white/65">
                Signature Touches
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 sm:mt-3">
                {props.services.map((service) => (
                  <li
                    key={service}
                    className="type-card flex items-center gap-1.5 font-medium uppercase text-white/70 transition-colors duration-700 group-hover:text-white"
                  >
                    <span className="accent-dot" />
                    {service}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {props.children}
      </article>
    );
  }

  return <ServiceMediaCard ref={ref} {...props} />;
},
);
