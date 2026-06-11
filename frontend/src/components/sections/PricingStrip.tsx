import { MotionReveal } from "@/components/ui/motion-reveal";
import { cn } from "@/lib/utils";

interface PricingItem {
  service: string;
  price: string;
}

interface PricingStripProps {
  items: PricingItem[];
}

export function PricingStrip({ items }: PricingStripProps) {
  return (
    <MotionReveal variant="fade">
      <div className="fade-edge-x -mx-[var(--spacing-container-x)] overflow-hidden">
        <div className="carousel-snap flex flex-nowrap gap-4 overflow-x-auto scroll-smooth px-[var(--spacing-container-x)] pb-2 pt-1 overscroll-x-contain sm:gap-5">
          {items.map((row) => (
            <article
              key={row.service}
              className={cn(
                "group w-[min(78vw,280px)] shrink-0 snap-center rounded-md border border-white/10 bg-black p-6",
                "transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.03] sm:w-[300px] sm:p-7",
              )}
            >
              <span className="accent-dot" />
              <h3 className="type-card mt-5 font-bold uppercase tracking-wider text-white">
                {row.service}
              </h3>
              <p className="type-small mt-3 font-light leading-relaxed text-white/45">
                {row.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </MotionReveal>
  );
}
