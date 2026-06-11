import { BrandLogo } from "@/components/ui/brand-logo";
import { Marquee } from "@/components/ui/marquee";
import type { Partner } from "@/content/brands";
import { cn } from "@/lib/utils";

interface PartnerMarqueeProps {
  partners: Partner[];
  title?: string;
  className?: string;
  speed?: number;
}

export function PartnerMarquee({
  partners,
  title = "Partners",
  className,
  speed = 28,
}: PartnerMarqueeProps) {
  return (
    <div className={cn("relative", className)}>
      <p className="type-label mb-10 text-center sm:mb-12">{title}</p>

      <Marquee duration={speed} className="py-2 fade-edge-x">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="group flex shrink-0 items-center px-3 sm:px-5"
          >
            <BrandLogo
              src={partner.logo}
              name={partner.name}
              interactive
              className="h-10 max-w-[160px] sm:h-12 sm:max-w-[180px] md:h-14 md:max-w-[200px]"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
