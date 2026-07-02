// Real shop photos, optimized to WebP and bundled by Vite (see
// scripts/optimize-photos.mjs). These are used for everything rendered on the
// site so we don't depend on external stock URLs that can rot.
import heroAbout from "@/assets/optimized/hero-about.webp";
import heroServices from "@/assets/optimized/hero-services.webp";
import heroShop from "@/assets/optimized/hero-shop.webp";
import heroContact from "@/assets/optimized/hero-contact.webp";
import svcVinyl from "@/assets/optimized/svc-vinyl.webp";
import svcPpf from "@/assets/optimized/svc-ppf.webp";
import svcColoured from "@/assets/optimized/svc-coloured.webp";
import svcTint from "@/assets/optimized/svc-tint.webp";
import svcCeramic from "@/assets/optimized/svc-ceramic.webp";
import svcWidebody from "@/assets/optimized/svc-widebody.webp";
import svcPaintmatch from "@/assets/optimized/svc-paintmatch.webp";

export const images = {
  /** Homepage hero — video poster (bundled shop photo) */
  heroSupra: heroShop,
  heroSupraFallback: heroAbout,

  /** Section & overlay backgrounds (shown blurred / heavily overlaid) */
  menuOverlayBg: heroShop,
  serviceCarouselBg: svcWidebody,
  contactCtaBg: heroContact,
  testimonialsBg: svcVinyl,

  /** Page heroes */
  pageHeroAbout: heroAbout,
  pageHeroServices: heroServices,
  pageHeroGallery: heroShop,
  pageHeroContact: heroContact,
  pageHeroLegal: heroAbout,

  /** Service cards — primary + fallback both resolve to bundled photos */
  serviceVinylWrap: svcVinyl,
  serviceVinylWrapFallback: svcVinyl,
  servicePpf: svcPpf,
  servicePpfFallback: svcPpf,
  serviceColouredPpf: svcColoured,
  serviceColouredPpfFallback: svcColoured,
  serviceTint: svcTint,
  serviceTintFallback: svcTint,
  serviceCeramic: svcCeramic,
  serviceCeramicFallback: svcCeramic,
  serviceWideBody: svcWidebody,
  serviceWideBodyFallback: svcWidebody,
  servicePaintMatch: svcPaintmatch,
  servicePaintMatchFallback: svcPaintmatch,
} as const;

export const imageFallback = svcPpf;
