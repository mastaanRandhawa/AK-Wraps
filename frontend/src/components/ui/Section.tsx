import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "elevated" | "muted";
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
        "relative py-16 sm:py-24 md:py-32 lg:py-40 [content-visibility:auto] [contain-intrinsic-size:auto_500px]",
        variant === "default" && "bg-black",
        variant === "elevated" && "bg-surface",
        variant === "muted" && "bg-surface-elevated",
        className,
      )}
    >
      <div
        className={cn(
          fullWidth ? "w-full" : "mx-auto max-w-6xl px-5 sm:px-8 lg:px-12",
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
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16 md:mb-24 lg:mb-28",
        align === "center" && "text-center",
      )}
    >
      {eyebrow && (
        <p className="editorial-label mb-6">{eyebrow}</p>
      )}
      <h2
        className={cn(
          "type-section max-w-3xl font-medium",
          align === "center" && "mx-auto",
          "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "type-body-sm mt-5 max-w-md tracking-wide sm:mt-6",
            align === "center" && "mx-auto",
            "text-white/45",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
