import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { usePageVisible } from "@/hooks/use-page-visible";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
}

export function Marquee({
  children,
  className,
  reverse = false,
  duration = 28,
}: MarqueeProps) {
  const pageVisible = usePageVisible();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (pageVisible) {
      track.style.animationPlayState = "running";
    } else {
      track.style.animationPlayState = "paused";
    }
  }, [pageVisible]);

  const animationName = reverse ? "marquee-reverse" : "marquee";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        ref={trackRef}
        data-marquee-track
        className={cn(
          "flex w-max shrink-0 items-center will-change-transform",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={
          {
            "--marquee-duration": `${duration}s`,
            animation: `${animationName} ${duration}s linear infinite`,
            animationPlayState: pageVisible ? "running" : "paused",
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
