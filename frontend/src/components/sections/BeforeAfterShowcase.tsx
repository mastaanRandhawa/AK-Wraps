import { useCallback, useRef, useState } from "react";
import { MotionSection } from "@/components/ui/motion-section";
import { SafeImage } from "@/components/ui/safe-image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { beforeAfter } from "@/content/gallery";
import { cn } from "@/lib/utils";

interface CompareSliderProps {
  before: string;
  after: string;
  label: string;
}

function CompareSlider({ before, after, label }: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    updatePosition(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
      <div
        ref={containerRef}
        className="group relative aspect-[16/9] cursor-ew-resize touch-none overflow-hidden border border-white/15 bg-surface select-none"
        role="slider"
        aria-label={`Before and after comparison: ${label}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <SafeImage
          src={after}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          loading="eager"
          width={1200}
          height={675}
        />
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <SafeImage
            src={before}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-90 saturate-75"
            loading="eager"
            width={1200}
            height={675}
          />
        </div>

        <div
          className="absolute inset-0 z-10"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-white"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white bg-black sm:h-10 sm:w-10">
            <div className="flex gap-1">
              <span className="h-3 w-px bg-white/80" />
              <span className="h-3 w-px bg-white/80" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between p-4 sm:p-6">
          <span className="editorial-label rounded-none bg-black/75 px-3 py-2 backdrop-blur-sm">
            Before
          </span>
          <span className="editorial-label rounded-none bg-black/75 px-3 py-2 backdrop-blur-sm">
            After
          </span>
        </div>
      </div>
      <p className="type-caption text-center font-sans font-medium uppercase text-white/60">
        {label}
      </p>
    </div>
  );
}

export function BeforeAfterShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = beforeAfter[activeIndex];

  return (
    <Section variant="muted" id="transformations">
      <SectionHeading
        eyebrow="Transformations"
        title="Before & after"
        description="Drag to compare real detailing results."
        align="center"
      />
      <MotionSection>
        <CompareSlider
          key={current.id}
          before={current.before}
          after={current.after}
          label={current.label}
        />

        {beforeAfter.length > 1 && (
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            {beforeAfter.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "type-caption border px-4 py-2 font-sans font-medium uppercase transition-colors sm:px-5 sm:py-2.5",
                  i === activeIndex
                    ? "border-white bg-white text-black"
                    : "border-white/20 text-white/40 hover:border-white/40 hover:text-white",
                )}
              >
                {item.label.split("&")[0].trim()}
              </button>
            ))}
          </div>
        )}
      </MotionSection>
    </Section>
  );
}
