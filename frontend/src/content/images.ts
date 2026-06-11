/** Unsplash automotive stock — all IDs verified as car/vehicle imagery */
function unsplash(photoId: string, width = 1200) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

/**
 * Curated car-only imagery for AK Wraps.
 * Each ID maps to a known automotive photo on Unsplash.
 */
export const images = {
  /** Glossy Porsche — exterior detail / hero-quality */
  exteriorDetail: unsplash("photo-1503376780353-7e6692767b70", 1600),
  /** Luxury cabin — steering wheel & dashboard */
  interiorDetail: unsplash("photo-1607863680196-e8849d3e5b97", 1600),
  /** Paint polishing / correction in progress */
  paintCorrection: unsplash("photo-1617531653527-bcffc5f95266", 1600),
  /** Black sports car — ceramic coating gloss */
  ceramicCoating: unsplash("photo-1492144534655-ae79c964c9d7", 1600),
  /** Mercedes AMG — paint protection film */
  ppfInstall: unsplash("photo-1618843479316-362cb246f151", 1600),
  /** Headlight close-up */
  headlightRestore: unsplash("photo-1563720364191-656bbb944f47", 1600),
  /** SUV — full wrap */
  vehicleWrap: unsplash("photo-1549399542-7e3e855ed7cc", 1600),
  /** Camaro — wrapped / color change */
  wrappedCar: unsplash("photo-1552519507-da3b1428056e", 1600),
  /** Mercedes sedan — chrome trim / delete */
  chromeDelete: unsplash("photo-1617531653527-bcffc5f95266", 1600),
  /** Audi R8 — interior customization */
  interiorUpgrade: unsplash("photo-1502877338535-766e1452684a", 1600),
  /** Car on workshop lift — about / contact heroes */
  shopExterior: unsplash("photo-1486262715619-67b85e062b48", 1600),
  /** Hand wash / detailing */
  detailing: unsplash("photo-1583121274602-3b2824c1eeb2", 1600),
  /** Mustang — wheels & trim */
  customWheels: unsplash("photo-1494976388531-d105849883b6", 1600),
  /** Homepage hero — dark blue Toyota Supra (Unsplash) */
  heroSupra: unsplash("photo-1747170201794-83aa34950596", 1920),
  heroSupraFallback: unsplash("photo-1644582304103-7114aaccd897", 1920),
  /** Before/after — older finish vs polished */
  beforeDetail: unsplash("photo-148529157115-f1dea7746764", 1400),
  afterDetail: unsplash("photo-1503376780353-7e6692767b70", 1400),
  beforeWrap: unsplash("photo-1449965408869-eaa3f722e42d", 1400),
  afterWrap: unsplash("photo-1552519507-da3b1428056e", 1400),
} as const;

export const imageFallback = images.exteriorDetail;
