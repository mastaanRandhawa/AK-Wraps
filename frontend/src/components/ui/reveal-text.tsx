import type { ElementType, ReactNode, Ref } from "react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { EASE_EXPO, REVEAL } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Elements this can render as. Each accepts a ref, which the observer needs. */
type RevealTag = "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";

/** The subset of props we pass through, so `Tag` typechecks past the cast. */
type RevealTagComponent = ElementType<{
  ref?: Ref<HTMLElement>;
  className?: string;
  "aria-label"?: string;
  children?: ReactNode;
}>;

interface RevealTextProps {
  /** A single string, or explicit lines that each get their own mask row. */
  text: string | readonly string[];
  as?: RevealTag;
  className?: string;
  /** Applied to every line row (e.g. a font-size or colour utility). */
  lineClassName?: string;
  /** "word" slides each word out separately; "line" moves whole lines. */
  by?: "word" | "line";
  /** Seconds before the first unit moves. */
  delay?: number;
  /** Seconds between consecutive units. Defaults to the REVEAL tokens. */
  stagger?: number;
  duration?: number;
  /** Animate on mount rather than waiting for the element to enter the viewport. */
  immediate?: boolean;
  /** Line indices rendered in the accent treatment. */
  accentLines?: readonly number[];
  accentClassName?: string;
}

/**
 * Headline text that rises into place from behind a mask, one word (or line) at
 * a time — the signature reveal used by the hero and every section heading.
 *
 * The visible spans are aria-hidden and the whole block carries an aria-label,
 * so assistive tech reads one clean string instead of fragmented words.
 * Falls back to plain static text when the user prefers reduced motion.
 */
export function RevealText({
  text,
  as = "span",
  className,
  lineClassName,
  by = "word",
  delay = 0,
  stagger,
  duration = REVEAL.duration,
  immediate = false,
  accentLines,
  accentClassName = "text-accent glow-accent",
}: RevealTextProps) {
  const Tag = as as RevealTagComponent;
  const prefersMotion = usePrefersMotion();
  const [ref, inView] = useInView<HTMLElement>({ disabled: immediate });

  const lines = typeof text === "string" ? [text] : [...text];
  const step = stagger ?? (by === "word" ? REVEAL.wordStagger : REVEAL.lineStagger);
  const isAccent = (i: number) => accentLines?.includes(i) ?? false;

  if (!prefersMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn("block", lineClassName, isAccent(i) && accentClassName)}
          >
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // Runs across all lines so the stagger keeps accelerating down the block.
  let unitIndex = 0;

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, lineIdx) => {
        const units = by === "word" ? line.split(" ") : [line];

        return (
          <span
            key={lineIdx}
            aria-hidden="true"
            className={cn("block", lineClassName, isAccent(lineIdx) && accentClassName)}
          >
            {units.map((unit, i) => {
              const order = unitIndex++;

              return (
                <Fragment key={i}>
                  <span className="reveal-mask">
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: "110%" }}
                      animate={{ y: immediate || inView ? "0%" : "110%" }}
                      transition={{
                        duration,
                        delay: delay + order * step,
                        ease: EASE_EXPO,
                      }}
                    >
                      {unit}
                    </motion.span>
                  </span>
                  {i < units.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

interface RevealFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Distance in px the content rises from. */
  y?: number;
  immediate?: boolean;
}

/**
 * The companion fade-and-rise for everything sitting around a RevealText —
 * eyebrows, body copy, buttons, review badges. Kept here so a hero can drive
 * one continuous stagger across headline and supporting content.
 */
export function RevealFade({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 16,
  immediate = false,
}: RevealFadeProps) {
  const prefersMotion = usePrefersMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ disabled: immediate });

  if (!prefersMotion) {
    return <div className={className}>{children}</div>;
  }

  const shown = immediate || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
