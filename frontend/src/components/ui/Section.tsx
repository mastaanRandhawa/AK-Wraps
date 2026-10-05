import type { ReactNode } from "react";
import { RevealFade, RevealText } from "@/components/ui/reveal-text";
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
        "relative section-padding",
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
        "mb-[var(--spacing-heading-gap)] sm:mb-14 md:mb-20 lg:mb-28",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <RevealFade
          className={cn(
            "mb-6 flex items-center gap-4",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-accent" />
          <span className="type-label">{eyebrow}</span>
        </RevealFade>
      )}
      {hasSplitTitle ? (
        // Two rows with distinct weights, so each gets its own reveal pass.
        <h2 className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          <RevealText
            text={titleMuted}
            delay={0.05}
            className="type-section heading-split-muted block"
          />
          <RevealText
            text={titleBold}
            delay={0.18}
            className="type-section heading-split-bold mt-1 block"
          />
        </h2>
      ) : title ? (
        <RevealText
          as="h2"
          text={title}
          delay={0.05}
          className={cn(
            "type-section max-w-3xl font-bold text-white",
            align === "center" && "mx-auto",
          )}
        />
      ) : null}
      {description && (
        <RevealFade
          delay={0.3}
          className={cn(
            "mt-5 max-w-lg sm:mt-6",
            align === "center" && "mx-auto",
          )}
        >
          <p className="type-small text-muted-foreground">{description}</p>
        </RevealFade>
      )}
    </div>
  );
}
