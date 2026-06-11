import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "elevated" | "muted" | "cinematic";
  containerClassName?: string;
  fullWidth?: boolean;
}

export function Section({
  children,
  className,
  id,
  variant = "default",
  containerClassName,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-nav-background="dark"
      className={cn(
        "relative section-padding [content-visibility:auto] [contain-intrinsic-size:auto_500px]",
        variant === "default" && "bg-black",
        variant === "elevated" && "bg-surface",
        variant === "muted" && "bg-surface-elevated",
        variant === "cinematic" && "bg-black",
        className,
      )}
    >
      <div
        className={cn(
          fullWidth ? "w-full" : "mx-auto max-w-7xl container-padding",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  titleBold,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title?: string;
  titleMuted?: string;
  titleBold?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const hasSplitTitle = titleMuted && titleBold;

  return (
    <div
      className={cn(
        "mb-[var(--spacing-heading-gap)] sm:mb-16 md:mb-20 lg:mb-28",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && <p className="type-label mb-6">{eyebrow}</p>}
      {hasSplitTitle ? (
        <h2 className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          <span className="type-section heading-split-muted block">
            {titleMuted}
          </span>
          <span className="type-section heading-split-bold mt-1 block">
            {titleBold}
          </span>
        </h2>
      ) : title ? (
        <h2
          className={cn(
            "type-section max-w-3xl font-bold text-white",
            align === "center" && "mx-auto",
          )}
        >
          {title}
        </h2>
      ) : null}
      {description && (
        <p
          className={cn(
            "type-small mt-5 max-w-lg sm:mt-6",
            align === "center" && "mx-auto",
            "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
