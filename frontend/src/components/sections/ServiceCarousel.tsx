import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconCircleButton } from "@/components/ui/icon-circle-button";
import { MediaCard } from "@/components/ui/media-card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SafeImage } from "@/components/ui/safe-image";
import { PartnerMarquee } from "@/components/ui/partner-marquee";
import { partnerBrands } from "@/content/brands";
import { images } from "@/content/images";
import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

interface ServiceCarouselProps {
  services: Service[];
  showPartners?: boolean;
}

export function ServiceCarousel({
  services,
  showPartners = true,
}: ServiceCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [scrollActiveIndexState, setScrollActiveIndexState] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const featured = services;

  const scrollToIndex = useCallback((index: number) => {
    const card = cardRefs.current[index];
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setHoveredIndex(null);
      scrollToIndex(index);
    },
    [scrollToIndex],
  );

  const navigate = useCallback(
    (direction: "left" | "right") => {
      const current =
        selectedIndex ?? hoveredIndex ?? scrollActiveIndexState;
      const next =
        direction === "left"
          ? (current - 1 + featured.length) % featured.length
          : (current + 1) % featured.length;
      handleSelect(next);
    },
    [featured.length, handleSelect, hoveredIndex, scrollActiveIndexState, selectedIndex],
  );

  const updateActiveFromScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setScrollActiveIndexState(closest);
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollEndTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(updateActiveFromScroll, 120);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(scrollEndTimer);
      el.removeEventListener("scroll", onScroll);
    };
  }, [updateActiveFromScroll]);

  const getIsActive = (index: number) => {
    if (selectedIndex !== null) return selectedIndex === index;
    if (hoveredIndex !== null) return hoveredIndex === index;
    return scrollActiveIndexState === index;
  };

  return (
    <Section variant="elevated" id="services" fullWidth className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
      >
        <SafeImage
          src={images.serviceCarouselBg}
          alt=""
          className="h-full w-full object-cover blur-2xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl container-padding">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <SectionHeading
            eyebrow="AK Wraps & Customs"
            title="Our Services"
            description="Wraps, protection, tint, coatings, and custom fabrication — all performed in-house at our Delta studio."
            className="flex-1 min-w-0"
          />
          <div className="mb-[var(--spacing-heading-gap)] hidden shrink-0 gap-3 sm:flex">
            <IconCircleButton
              icon={ChevronLeft}
              label="Previous services"
              onClick={() => navigate("left")}
            />
            <IconCircleButton
              icon={ChevronRight}
              label="Next services"
              onClick={() => navigate("right")}
            />
          </div>
        </div>

        <div className="fade-edge-x -mx-[var(--spacing-container-x)] overflow-hidden">
          <div
            ref={scrollRef}
            className="carousel-snap flex flex-nowrap gap-[var(--spacing-grid-gap)] overflow-x-auto scroll-smooth px-[var(--spacing-container-x)] pb-2 pt-1 overscroll-x-contain [-webkit-overflow-scrolling:touch]"
          >
            {featured.map((service, index) => (
              <MediaCard
                key={service.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                variant="service"
                image={service.image}
                imageFallback={service.imageFallback}
                alt={service.title}
                label={`SERVICE ${String(index + 1).padStart(2, "0")}`}
                title={service.title}
                description={service.tagline ?? service.description}
                isActive={getIsActive(index)}
                onSelect={() => handleSelect(index)}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>

        <p className="type-caption mt-4 text-center text-white/35 sm:hidden">
          Swipe to browse services
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 sm:mt-8">
          {featured.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleSelect(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                getIsActive(index)
                  ? "w-7 bg-accent shadow-[0_0_8px_rgba(227,6,19,0.6)]"
                  : "w-2 bg-white/20 hover:bg-white/35",
              )}
              aria-label={`Go to ${service.title}`}
            />
          ))}
        </div>

        {showPartners && (
          <div className="mt-20 pt-16 sm:mt-28 sm:pt-20">
            <div className="fade-divider mx-auto mb-16 max-w-5xl sm:mb-20" />
            <PartnerMarquee partners={partnerBrands} />
          </div>
        )}
      </div>
    </Section>
  );
}
