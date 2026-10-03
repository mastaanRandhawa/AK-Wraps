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
      <p className="type-label mb-3 text-center sm:mb-4">{title}</p>

      <Marquee duration={speed} className="py-2 fade-edge-x">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="group flex h-24 w-48 shrink-0 flex-col items-center justify-center gap-2 px-4 sm:w-56 sm:px-5"
          >
            {partner.logo.endsWith(".jpg") ? (
              <span role="img" aria-label={partner.name}
                className="block h-24 w-32 bg-white opacity-80 transition-opacity group-hover:opacity-100"
                style={{
                  maskImage: `url(${import.meta.env.BASE_URL.replace(/\/$/, "")}${partner.logo})`,
                  maskMode: "luminance",
                  maskSize: "contain",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                }} />
            ) : <BrandLogo
              src={partner.logo}
              name={partner.name}
              interactive
              originalColors={partner.logo.endsWith(".jpg")}
              className={partner.logo.endsWith(".jpg")
                ? "h-24 w-32 max-w-[160px] object-contain mix-blend-screen grayscale brightness-150 opacity-80 sm:h-24 group-hover:opacity-100"
                : "h-10 max-w-[160px] opacity-75 sm:h-12 sm:max-w-[180px] md:h-14 md:max-w-[200px]"}
            />}
            {partner.id === "inozetek" && <span className="text-[10px] font-semibold tracking-[0.2em] text-white/75">INOZETEK</span>}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

