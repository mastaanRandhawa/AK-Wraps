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
          className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain p-3 sm:flex sm:items-center sm:justify-center sm:p-6"
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
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close project viewer"
          />

          <motion.div
            className="relative z-10 mx-auto my-2 w-full max-w-5xl overflow-y-auto overscroll-contain rounded-md border border-white/15 bg-black shadow-2xl scroll-smooth sm:my-auto sm:max-h-[92vh]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/90 px-3 py-3 backdrop-blur-sm sm:px-4">
              {hasMultiple ? (
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition-colors hover:border-white/50 hover:bg-black/80"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
              ) : (
                <span className="h-10 w-10" aria-hidden="true" />
              )}

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition-colors hover:border-white/50 hover:bg-black/80"
                aria-label="Close"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>

              {hasMultiple ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition-colors hover:border-white/50 hover:bg-black/80"
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              ) : (
                <span className="h-10 w-10" aria-hidden="true" />
              )}
            </div>

            <div className="portfolio-lightbox-media">
              <SafeImage
                key={build.id}
                src={build.image}
                fallback={build.imageFallback}
                alt={`${build.brand} ${build.title}`}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>

            <div className="p-4 sm:p-6">
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
                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
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
                <p className="type-caption mt-4 text-center text-white/35 sm:mt-5">
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
