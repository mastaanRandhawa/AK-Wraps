import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";
import { BrandLogo } from "@/components/ui/brand-logo";
import type { PortfolioBuild } from "@/content/portfolio";
import { cn } from "@/lib/utils";

interface PortfolioLightboxProps {
  builds: PortfolioBuild[];
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PortfolioLightbox({
  builds,
  activeIndex,
  open,
  onClose,
  onNavigate,
}: PortfolioLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const build = builds[activeIndex];
  const hasMultiple = builds.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + builds.length) % builds.length);
  }, [activeIndex, builds.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % builds.length);
  }, [activeIndex, builds.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, goPrev, goNext, hasMultiple]);

  return (
    <AnimatePresence>
      {open && build && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${build.brand} ${build.title} project details`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close project viewer"
          />

          <motion.div
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-md border border-white/15 bg-black shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface sm:aspect-[16/10]">
              <SafeImage
                key={build.id}
                src={build.image}
                fallback={build.imageFallback}
                alt={`${build.brand} ${build.title}`}
                className="h-full w-full object-cover"
                loading="eager"
              />

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/80 sm:right-4 sm:top-4"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/80 sm:left-4"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/80 sm:right-4"
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            <div className="overflow-y-auto p-5 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  {build.brandLogo && (
                    <BrandLogo
                      src={build.brandLogo}
                      name={build.brand}
                      className="mb-3 h-5 sm:h-6"
                    />
                  )}
                  <h2 className="type-section font-display font-medium text-white">
                    {build.brand} {build.title}
                  </h2>
                </div>
                <span className="type-label rounded-pill border border-white/20 bg-white/5 px-3 py-1.5 text-white/70">
                  {build.category}
                </span>
              </div>

              {build.description && (
                <p className="type-body mt-4 max-w-2xl font-light text-white/60">
                  {build.description}
                </p>
              )}

              {build.services.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {build.services.map((service) => (
                    <li
                      key={service}
                      className={cn(
                        "type-caption flex items-center gap-1.5 rounded-pill border border-white/15",
                        "bg-white/5 px-3 py-1.5 font-medium uppercase tracking-wider text-white/75",
                      )}
                    >
                      <span className="accent-dot" />
                      {service}
                    </li>
                  ))}
                </ul>
              )}

              {hasMultiple && (
                <p className="type-caption mt-6 text-center text-white/35">
                  {activeIndex + 1} of {builds.length}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
