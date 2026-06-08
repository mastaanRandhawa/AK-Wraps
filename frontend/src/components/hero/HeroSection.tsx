import { HeroLanding } from "@/components/ui/hero-1";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { routes } from "@/config/routes";
import { useHeroBackgroundMode } from "@/hooks/use-hero-background-mode";
import type { PageHeroKey } from "@/config/hero-gradients";

const homeCallToActions = [
  { text: "Book Appointment", href: routes.contact, variant: "primary" as const },
  { text: "View Services", href: routes.services, variant: "secondary" as const },
];

const pageHeroImages: Record<PageHeroKey, string> = {
  about: images.shopExterior,
  services: images.exteriorDetail,
  gallery: images.wrappedCar,
  contact: images.detailing,
};

interface HomeHeroProps {
  page?: "home";
  title?: string;
  description?: string;
}

interface PageHeroProps {
  page: PageHeroKey;
  title: string;
  description: string;
}

type HeroSectionProps = HomeHeroProps | PageHeroProps;

function isPageHero(props: HeroSectionProps): props is PageHeroProps {
  return (
    "page" in props &&
    props.page !== undefined &&
    props.page !== "home"
  );
}

export function HeroSection(props: HeroSectionProps) {
  const isPage = isPageHero(props);
  const homeBackgroundMode = useHeroBackgroundMode();
  const title =
    props.title ??
    (isPage ? "" : "The Finish Your Vehicle Deserves");
  const description =
    props.description ??
    (isPage ? "" : site.tagline);

  const useBeamsOnHome = !isPage && homeBackgroundMode === "beams";

  return (
    <HeroLanding
      title={title}
      description={description}
      shaderBackground={useBeamsOnHome}
      backgroundImage={
        isPage
          ? pageHeroImages[props.page]
          : useBeamsOnHome
            ? undefined
            : images.heroSupra
      }
      backgroundImageFallback={
        isPage ? undefined : images.heroSupraFallback
      }
      backgroundImageClassName={
        isPage ? undefined : "object-[70%_center] opacity-70 grayscale"
      }
      shaderFallbackImage={!isPage ? images.heroSupra : undefined}
      shaderFallbackImageClassName="object-[70%_center] opacity-70 grayscale"
      callToActions={isPage ? undefined : homeCallToActions}
      titleSize={isPage ? "medium" : "large"}
      compact={isPage}
      showScrollIndicator={!isPage}
    />
  );
}
