import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: 1 | 2;
  hasPersistentHover?: boolean;
  image?: string;
  imageAlt?: string;
  href?: string;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

function BentoCard({ item }: { item: BentoItem }) {
  const cardClassName = cn(
    "group relative overflow-hidden transition-all duration-300",
    "border border-white/10 bg-black",
    "hover:shadow-[0_2px_12px_rgba(255,255,255,0.04)]",
    "hover:-translate-y-0.5 will-change-transform",
    item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
    {
      "shadow-[0_2px_12px_rgba(255,255,255,0.04)] -translate-y-0.5":
        item.hasPersistentHover,
    },
  );

  const inner = (
    <>
      {item.image && (
        <div
          className={cn(
            "relative overflow-hidden border-b border-white/10",
            item.colSpan === 2 ? "aspect-[21/9]" : "aspect-[16/10]",
          )}
        >
          <SafeImage
            src={item.image}
            alt={item.imageAlt ?? item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            width={800}
            height={450}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          item.hasPersistentHover && "opacity-100",
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
      </div>

      <div className="relative flex flex-col space-y-3 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-white/10 transition-all duration-300 group-hover:bg-white/15">
            {item.icon}
          </div>
          {item.status && (
            <span className="type-caption shrink-0 px-2 py-1 font-medium uppercase text-white/50 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white/70">
              {item.status}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="type-body font-medium tracking-tight text-white">
            {item.title}
            {item.meta && (
              <span className="type-body-sm ml-2 font-normal text-white/40">
                {item.meta}
              </span>
            )}
          </h3>
          <p className="type-body-sm leading-snug font-light text-white/50">
            {item.description}
          </p>
        </div>

        <div className="mt-1 flex items-end justify-between gap-3">
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="type-caption px-2 py-1 uppercase text-white/40 backdrop-blur-sm transition-all duration-200 group-hover:text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {item.cta && (
            <span className="shrink-0 text-xs text-white/40 opacity-0 transition-opacity group-hover:opacity-100">
              {item.cta}
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-white/10 to-transparent p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          item.hasPersistentHover && "opacity-100",
        )}
        aria-hidden="true"
      />
    </>
  );

  if (item.href) {
    const isExternal = item.href.startsWith("http");
    if (isExternal) {
      return (
        <a href={item.href} className={cn(cardClassName, "block")}>
          {inner}
        </a>
      );
    }
    return (
      <Link to={item.href} className={cn(cardClassName, "block")}>
        {inner}
      </Link>
    );
  }

  return <article className={cardClassName}>{inner}</article>;
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-3 md:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <BentoCard key={`${item.title}-${index}`} item={item} />
      ))}
    </div>
  );
}
