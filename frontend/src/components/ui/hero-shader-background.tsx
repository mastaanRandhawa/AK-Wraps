import {
  Component,
  Suspense,
  lazy,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const HeroBeamsCanvas = lazy(
  () => import("@/components/ui/hero-beams-canvas"),
);

function BeamsFallback() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-black via-[#111] to-[#2a2a2a]"
      aria-hidden="true"
    />
  );
}

function HeroFallbackImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-center opacity-60",
        className,
      )}
      loading="eager"
      fetchPriority="high"
    />
  );
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServer() {
  return false;
}

interface BeamsErrorBoundaryProps {
  children: ReactNode;
  fallbackImage?: string;
  fallbackImageClassName?: string;
}

interface BeamsErrorBoundaryState {
  hasError: boolean;
}

class BeamsErrorBoundary extends Component<
  BeamsErrorBoundaryProps,
  BeamsErrorBoundaryState
> {
  state: BeamsErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): BeamsErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError && this.props.fallbackImage) {
      return (
        <HeroFallbackImage
          src={this.props.fallbackImage}
          className={this.props.fallbackImageClassName}
        />
      );
    }

    if (this.state.hasError) {
      return <BeamsFallback />;
    }

    return this.props.children;
  }
}

interface HeroShaderBackgroundProps {
  className?: string;
  fallbackImage?: string;
  fallbackImageClassName?: string;
}

export function HeroShaderBackground({
  className,
  fallbackImage,
  fallbackImageClassName,
}: HeroShaderBackgroundProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  if (reducedMotion) {
    if (fallbackImage) {
      return (
        <HeroFallbackImage
          src={fallbackImage}
          className={cn(className, fallbackImageClassName)}
        />
      );
    }

    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-black via-[#111] to-[#2a2a2a]",
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
      <BeamsErrorBoundary
        fallbackImage={fallbackImage}
        fallbackImageClassName={fallbackImageClassName}
      >
        <Suspense
          fallback={
            fallbackImage ? (
              <HeroFallbackImage
                src={fallbackImage}
                className={fallbackImageClassName}
              />
            ) : (
              <BeamsFallback />
            )
          }
        >
          <HeroBeamsCanvas />
        </Suspense>
      </BeamsErrorBoundary>
    </div>
  );
}
