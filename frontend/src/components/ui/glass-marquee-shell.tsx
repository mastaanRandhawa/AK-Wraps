import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
}

function MarqueeRow({
  items,
  duration,
  reverse,
  size,
}: {
  items: string[];
  duration: number;
  reverse?: boolean;
  size: "sm" | "md" | "lg";
}) {
  const track = [...items, ...items];

  const sizeClass = {
    sm: "type-marquee-sm",
    md: "type-marquee-md",
    lg: "type-marquee-lg",
  }[size];

  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-12 sm:gap-20 motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={cn(
              "shrink-0 select-none font-sans font-light uppercase tracking-[0.22em] text-white/[0.16] sm:text-white/[0.18]",
              sizeClass,
            )}
          >
            {item}
            <span
              className="ml-12 text-white/[0.08] sm:ml-20"
              aria-hidden="true"
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function TextMarquee({
  items,
  className,
  duration = 100,
  reverse = false,
  size = "md",
}: TextMarqueeProps) {
  if (items.length === 0) return null;

  const rowA = (
    <MarqueeRow items={items} duration={duration} reverse={reverse} size={size} />
  );
  const rowB = (
    <MarqueeRow
      items={[...items].reverse()}
      duration={duration + 20}
      reverse={!reverse}
      size={size}
    />
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-6 bottom-6 flex flex-col justify-between overflow-hidden sm:top-10 sm:bottom-10",
        className,
      )}
      aria-hidden="true"
    >
      {rowA}
      {rowB}
    </div>
  );
}

interface GlassMarqueeShellProps {
  children: ReactNode;
  tone?: "default" | "elevated" | "muted";
  /** Softer edge fades when a photo marquee sits behind content */
  backdrop?: "default" | "images";
  className?: string;
  contentClassName?: string;
  minHeight?: string;
  marquee?: ReactNode;
}

const toneFade = {
  default: {
    horizontal: "from-black via-transparent to-black",
    vertical: "from-black/90 via-transparent to-black/90",
  },
  elevated: {
    horizontal: "from-surface via-transparent to-surface",
    vertical: "from-surface/85 via-transparent to-surface/85",
  },
  muted: {
    horizontal: "from-surface-elevated via-transparent to-surface-elevated",
    vertical:
      "from-surface-elevated/85 via-transparent to-surface-elevated/85",
  },
};

const imageBackdropFade = {
  default: {
    horizontal: "from-black/90 via-black/10 to-black/90",
    vertical: "from-black/75 via-transparent to-black/75",
  },
  elevated: {
    horizontal: "from-surface via-surface/20 to-surface",
    vertical: "from-surface via-surface/55 to-surface",
  },
  muted: {
    horizontal:
      "from-surface-elevated/95 via-surface-elevated/5 to-surface-elevated/95",
    vertical:
      "from-surface-elevated/70 via-transparent to-surface-elevated/70",
  },
};

/** Frosted glass panel with optional marquee layer behind content */
export function GlassMarqueeShell({
  children,
  tone = "muted",
  backdrop = "default",
  className,
  contentClassName,
  minHeight = "min-h-[480px] sm:min-h-[540px]",
  marquee,
}: GlassMarqueeShellProps) {
  const fade =
    backdrop === "images" ? imageBackdropFade[tone] : toneFade[tone];

  return (
    <div
      className={cn(
        "relative overflow-hidden px-1 py-10 sm:px-4 sm:py-16 md:py-20",
        minHeight,
        className,
      )}
    >
      {marquee}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r",
          fade.horizontal,
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b",
          fade.vertical,
        )}
        aria-hidden="true"
      />

      {backdrop === "images" && (
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.55)_45%,transparent_78%)]"
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "relative z-10 mx-auto my-6 max-w-3xl sm:my-10 md:my-12",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
