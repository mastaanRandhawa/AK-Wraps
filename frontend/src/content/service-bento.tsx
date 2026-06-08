import type { ReactNode } from "react";
import {
  CarFront,
  Sparkles,
  Shield,
  ShieldCheck,
  Sofa,
  Lightbulb,
} from "lucide-react";
import type { BentoItem } from "@/components/ui/bento-grid";
import type { Service } from "@/content/services";

const serviceIcons: Record<string, ReactNode> = {
  "exterior-detailing": (
    <CarFront className="h-4 w-4 text-white/70" strokeWidth={1.5} />
  ),
  "interior-detailing": (
    <Sofa className="h-4 w-4 text-white/70" strokeWidth={1.5} />
  ),
  "paint-correction": (
    <Sparkles className="h-4 w-4 text-white/70" strokeWidth={1.5} />
  ),
  "ceramic-coating": (
    <Shield className="h-4 w-4 text-white/70" strokeWidth={1.5} />
  ),
  ppf: <ShieldCheck className="h-4 w-4 text-white/70" strokeWidth={1.5} />,
  "headlight-restoration": (
    <Lightbulb className="h-4 w-4 text-white/70" strokeWidth={1.5} />
  ),
};

/** Bento layout spans for the six featured services */
const bentoLayout: Pick<BentoItem, "colSpan" | "hasPersistentHover">[] = [
  { colSpan: 2, hasPersistentHover: true },
  { colSpan: 1 },
  { colSpan: 1 },
  { colSpan: 2 },
  { colSpan: 1 },
  { colSpan: 1 },
];

function servicesToBentoItems(
  services: Service[],
  options?: { href?: string },
): BentoItem[] {
  return services.map((service, index) => {
    const layout = bentoLayout[index] ?? { colSpan: 1 as const };

    return {
      title: service.title,
      description: service.description,
      meta: service.tagline,
      icon: serviceIcons[service.id] ?? (
        <Sparkles className="h-4 w-4 text-white/70" strokeWidth={1.5} />
      ),
      status: "Premium",
      cta: "Learn more →",
      image: service.image,
      imageAlt: service.title,
      href: options?.href,
      ...layout,
    };
  });
}

export function getFeaturedBentoItems(
  services: Service[],
  cardHref?: string,
): BentoItem[] {
  return servicesToBentoItems(
    services,
    cardHref ? { href: cardHref } : undefined,
  );
}
