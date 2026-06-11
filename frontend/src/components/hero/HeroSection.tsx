import { HeroLanding } from "@/components/ui/hero-1";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { routes } from "@/config/routes";
import type { PageHeroKey } from "@/config/hero-gradients";

const homeCallToActions = [
  { text: "Explore Services", href: routes.services, variant: "ghost" as const },
];

const pageHeroImages: Record<PageHeroKey, string> = {
  about: images.pageHeroAbout,
  services: images.pageHeroServices,
  gallery: images.pageHeroGallery,
  contact: images.pageHeroContact,
};

interface HomeHeroProps {
  page?: "home";
  title?: string;
  description?: string;
  badge?: string;
}

interface PageHeroProps {
  page: PageHeroKey;
  title: string;
  description: string;
  badge?: string;
}

type HeroSectionProps = HomeHeroProps | PageHeroProps;

function isPageHero(props: HeroSectionProps): props is PageHeroProps {
  return "page" in props && props.page !== undefined && props.page !== "home";
}

const videoSrc = `${import.meta.env.BASE_URL}videos/DarkenedAkwraps.mp4`;

export function HeroSection(props: HeroSectionProps) {
  const isPage = isPageHero(props);
  const title =
    props.title ?? (isPage ? "" : site.heroTitle);
  const description =
    props.description ?? (isPage ? "" : site.heroSubtitle);
  const badge = props.badge ?? (isPage ? undefined : site.heroBadge);

  return (
    <HeroLanding
      title={title}
      description={description}
      badge={badge}
      backgroundImage={isPage ? pageHeroImages[props.page] : images.heroSupra}
      backgroundImageFallback={isPage ? undefined : images.heroSupraFallback}
      backgroundVideo={isPage ? undefined : videoSrc}
      videoPoster={images.heroSupra}
      callToActions={isPage ? undefined : homeCallToActions}
      titleSize={isPage ? "medium" : "large"}
      compact={isPage}
      align={isPage ? "center" : "bottom"}
    />
  );
}
