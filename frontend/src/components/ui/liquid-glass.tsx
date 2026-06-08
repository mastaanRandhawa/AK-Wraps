import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface GlassEffectProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** External link */
  href?: string;
  /** Internal React Router link */
  to?: string;
  target?: string;
  as?: "div" | "article" | "section";
  /** Frosted backdrop blur — blurs content behind the element (e.g. marquees) */
  variant?: "default" | "frosted";
}

const glassTransition =
  "transition-[border-color,background-color] duration-200 ease-out";

export function GlassEffect({
  children,
  className = "",
  style = {},
  href,
  to,
  target = "_blank",
  as: Tag = "div",
  variant = "default",
}: GlassEffectProps) {
  const isFrosted = variant === "frosted";

  const shellClassName = cn(
    "relative overflow-hidden text-white",
    glassTransition,
    isFrosted &&
      "border border-white/15 bg-[rgba(26,26,26,0.45)] backdrop-blur-2xl backdrop-saturate-150",
    className,
  );

  const shellStyle: CSSProperties = isFrosted
    ? {
        boxShadow:
          "0 8px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.04)",
        ...style,
      }
    : {
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        ...style,
      };

  const inner = isFrosted ? (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </>
  ) : (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-white/[0.04]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 border border-white/10"
        style={{
          boxShadow:
            "inset 1px 1px 0 rgba(255, 255, 255, 0.06), inset -1px -1px 0 rgba(255, 255, 255, 0.04)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-30">{children}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel="noopener noreferrer"
        className={cn(shellClassName, "block")}
        style={shellStyle}
      >
        {inner}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={cn(shellClassName, "block")} style={shellStyle}>
        {inner}
      </Link>
    );
  }

  return (
    <Tag className={shellClassName} style={shellStyle}>
      {inner}
    </Tag>
  );
}

/** SVG distortion filter — mount once near the app root */
export function GlassFilter() {
  return (
    <svg
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.004"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
