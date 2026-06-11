import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE_PREMIUM, MOTION_VARIANTS } from "@/lib/motion";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { cn } from "@/lib/utils";

type MotionVariant = keyof typeof MOTION_VARIANTS;

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: MotionVariant;
  once?: boolean;
}

export const MotionReveal = memo(function MotionReveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  once = true,
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersMotion = usePrefersMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "-48px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  if (!prefersMotion) {
    return <div className={className}>{children}</div>;
  }

  const motionVariant = MOTION_VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={motionVariant}
      transition={{
        duration: DURATION.slow,
        delay: delay / 1000,
        ease: EASE_PREMIUM,
      }}
    >
      {children}
    </motion.div>
  );
});

/** @deprecated Use MotionReveal instead */
export const MotionSection = MotionReveal;
