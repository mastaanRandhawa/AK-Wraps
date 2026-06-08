import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import type { CSSProperties } from "react";

interface MarqueeProduct {
  id: string;
  title: string;
  image: string;
}

interface ProductMarqueeProps {
  products: MarqueeProduct[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  /** split = top/bottom bands; full = three rows including center behind content */
  layout?: "split" | "full";
}

function MarqueeTrack({
  products,
  duration,
  reverse,
}: {
  products: MarqueeProduct[];
  duration: number;
  reverse?: boolean;
}) {
  const track = [...products, ...products];

  return (
    <div
      className={cn(
        "flex w-max shrink-0 items-stretch gap-5 sm:gap-6 motion-reduce:animate-none",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
      style={
        {
          "--marquee-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      {track.map((product, i) => (
        <div
          key={`${product.id}-${i}`}
          className="relative h-28 w-40 shrink-0 overflow-hidden border border-white/10 sm:h-36 sm:w-52 md:h-40 md:w-60"
        >
          <SafeImage
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover opacity-75 grayscale-[15%]"
            loading="lazy"
            width={224}
            height={144}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
            <p className="type-caption truncate font-sans font-medium uppercase text-white/75">
              {product.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductMarquee({
  products,
  className,
  duration = 70,
  reverse = false,
  layout = "split",
}: ProductMarqueeProps) {
  if (products.length === 0) return null;

  if (layout === "full") {
    const midProducts = [...products.slice(2), ...products.slice(0, 2)];

    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 overflow-hidden",
          className,
        )}
        aria-hidden="true"
      >
        <div className="flex h-full flex-col justify-center gap-5 py-4 sm:gap-7 sm:py-6">
          <MarqueeTrack
            products={products}
            duration={duration}
            reverse={reverse}
          />
          <MarqueeTrack
            products={midProducts}
            duration={duration + 14}
            reverse={!reverse}
          />
          <MarqueeTrack
            products={[...products].reverse()}
            duration={duration + 28}
            reverse={reverse}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-8 bottom-8 z-0 flex flex-col justify-between gap-10 overflow-hidden sm:top-12 sm:bottom-12 sm:gap-14",
        className,
      )}
      aria-hidden="true"
    >
      <MarqueeTrack products={products} duration={duration} reverse={reverse} />
      <MarqueeTrack
        products={[...products].reverse()}
        duration={duration + 18}
        reverse={!reverse}
      />
    </div>
  );
}
