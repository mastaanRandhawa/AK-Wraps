import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeroWaveProps {
  className?: string;
  /** Accent RGB for flowing highlights (default: cerulean #3a7ca5) */
  accentRgb?: readonly [number, number, number];
}

/** Lower resolution on smaller screens = fewer pixels per frame */
function getRenderScale(): number {
  const w = window.innerWidth;
  if (w < 640) return 5;
  if (w < 1024) return 4;
  return 3;
}

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

const DEFAULT_ACCENT: readonly [number, number, number] = [58, 124, 165];

export const HeroWave = memo(function HeroWave({
  className,
  accentRgb = DEFAULT_ACCENT,
}: HeroWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let scale = getRenderScale();
    let width = 0;
    let height = 0;
    let imageData: ImageData;
    let data: Uint8ClampedArray;
    let animationId = 0;
    let lastFrameTime = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const SIN_TABLE = new Float32Array(1024);
    const COS_TABLE = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const angle = (i / 1024) * Math.PI * 2;
      SIN_TABLE[i] = Math.sin(angle);
      COS_TABLE[i] = Math.cos(angle);
    }

    const fastSin = (x: number) => {
      const index =
        Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
      return SIN_TABLE[index];
    };

    const fastCos = (x: number) => {
      const index =
        Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
      return COS_TABLE[index];
    };

    const resizeCanvas = () => {
      scale = getRenderScale();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      width = Math.max(1, Math.floor(canvas.width / scale));
      height = Math.max(1, Math.floor(canvas.height / scale));
      offscreen.width = width;
      offscreen.height = height;
      imageData = offCtx.createImageData(width, height);
      data = imageData.data;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 200);
    };

    const [accentR, accentG, accentB] = accentRgb;
    const accentTone = `rgb(${Math.round(accentR * 0.22)}, ${Math.round(accentG * 0.2)}, ${Math.round(accentB * 0.12)})`;

    const drawStaticBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#16425b");
      gradient.addColorStop(0.45, "#1a4a66");
      gradient.addColorStop(0.7, accentTone);
      gradient.addColorStop(1, "#16425b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );

    const onPageVisibility = () => {
      isPageVisible = !document.hidden;
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onPageVisibility);
    visibilityObserver.observe(container);
    resizeCanvas();

    const startTime = performance.now();

    const render = (now: number) => {
      animationId = requestAnimationFrame(render);

      if (prefersReducedMotion) {
        if (lastFrameTime === 0) drawStaticBackground();
        lastFrameTime = now;
        return;
      }

      if (!isVisible || !isPageVisible) return;
      if (now - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = now;

      const time = (now - startTime) * 0.001;
      const w = width;
      const h = height;

      for (let y = 0; y < h; y++) {
        const u_y_base = (2 * y - h) / h;
        for (let x = 0; x < w; x++) {
          const u_x = (2 * x - w) / h;
          const u_y = u_y_base;

          let a = 0;
          let d = 0;

          for (let i = 0; i < 4; i++) {
            a += fastCos(i - d + time * 0.5 - a * u_x);
            d += fastSin(i * u_y + a);
          }

          const wave = (fastSin(a) + fastCos(d)) * 0.5;
          const intensity = 0.3 + 0.4 * wave;
          const shimmer = 0.5 + 0.5 * fastSin(a * 1.5 + time * 0.2);
          const goldMix =
            (0.5 + 0.5 * wave) * shimmer +
            0.12 * fastCos(u_x + u_y + time * 0.3);

          const r =
            Math.max(0, Math.min(1, 0.04 + goldMix * (accentR / 255))) * intensity;
          const g =
            Math.max(0, Math.min(1, 0.04 + goldMix * (accentG / 255))) * intensity;
          const b =
            Math.max(0, Math.min(1, 0.03 + goldMix * (accentB / 255))) * intensity;

          const index = (y * w + x) << 2;
          data[index] = (r * 255) | 0;
          data[index + 1] = (g * 255) | 0;
          data[index + 2] = (b * 255) | 0;
          data[index + 3] = 255;
        }
      }

      offCtx.putImageData(imageData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(offscreen, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    };

    if (prefersReducedMotion) {
      drawStaticBackground();
    } else {
      animationId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onPageVisibility);
      visibilityObserver.disconnect();
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationId);
    };
  }, [accentRgb]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 h-full w-full [contain:strict]",
          className,
        )}
        aria-hidden="true"
      />
    </div>
  );
});

export default HeroWave;
