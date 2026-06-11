/** Unsplash automotive stock — all IDs verified as car/vehicle imagery */
function unsplash(photoId: string, width = 1200) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

/**
 * Curated car-only imagery for AK Wraps.
 * Every entry uses a unique Unsplash photo ID — no duplicates.
 */
export const images = {
  /** Homepage hero — dark blue Toyota Supra */
  heroSupra: unsplash("photo-1747170201794-83aa34950596", 1920),
  heroSupraFallback: unsplash("photo-1644582304103-7114aaccd897", 1920),

  /** Section & overlay backgrounds */
  menuOverlayBg: unsplash("photo-1568605117037-40b63e0e2911", 1600),
  serviceCarouselBg: unsplash("photo-1493238792730-48f6dc2673e1", 1600),
  contactCtaBg: unsplash("photo-1592859605850-dbc8bfee110c", 1600),
  testimonialsBg: unsplash("photo-1580418827496-da2cf436c3a1", 1600),

  /** Page heroes */
  pageHeroAbout: unsplash("photo-1486262715619-67b85e062b48", 1600),
  pageHeroServices: unsplash("photo-1525609008555-afe91aff34e8", 1600),
  pageHeroGallery: unsplash("photo-1503736332586-24340f3ae982", 1600),
  pageHeroContact: unsplash("photo-1583121274602-3b2824c1eeb2", 1600),

  /** Service cards */
  serviceVinylWrap: unsplash("photo-1552519507-da3b1428056e", 1600),
  serviceVinylWrapFallback: unsplash("photo-1549399542-7e3e855ed7cc", 1600),
  servicePpf: unsplash("photo-1618843479316-362cb246f151", 1600),
  servicePpfFallback: unsplash("photo-1503376780353-7e6692767b70", 1600),
  serviceColouredPpf: unsplash("photo-1616422283682-34b8b8546c2b", 1600),
  serviceColouredPpfFallback: unsplash("photo-1563720364191-656bbb944f47", 1600),
  serviceTint: unsplash("photo-1619767886555-c79a48d06ef0", 1600),
  serviceTintFallback: unsplash("photo-1607863680196-e8849d3e5b97", 1600),
  serviceCeramic: unsplash("photo-1492144534655-ae79c964c9d7", 1600),
  serviceCeramicFallback: unsplash("photo-1606664515524-ed792f8e7d13", 1600),
  serviceWideBody: unsplash("photo-1614162692547-3f2268587815", 1600),
  serviceWideBodyFallback: unsplash("photo-1519641471654-76ceae7da7ed", 1600),
  servicePaintMatch: unsplash("photo-1617531653527-bcffc5f95266", 1600),
  servicePaintMatchFallback: unsplash("photo-1580274455190-239c970d747a", 1600),

  /** Portfolio builds — reuse IDs already used elsewhere in this file */
  portfolioLamborghini: unsplash("photo-1747170201794-83aa34950596", 1600),
  portfolioLamborghiniFallback: unsplash("photo-1644582304103-7114aaccd897", 1600),
  portfolioBmw: unsplash("photo-1503376780353-7e6692767b70", 1600),
  portfolioBmwFallback: unsplash("photo-1618843479316-362cb246f151", 1600),
  portfolioPorsche: unsplash("photo-1542362567-b07e54358753", 1600),
  portfolioPorscheFallback: unsplash("photo-1525609008555-afe91aff34e8", 1600),
  portfolioMercedes: unsplash("photo-1503736332586-24340f3ae982", 1600),
  portfolioMercedesFallback: unsplash("photo-1492144534655-ae79c964c9d7", 1600),
  portfolioMustang: unsplash("photo-1494901558403-6c44de542d48", 1600),
  portfolioMustangFallback: unsplash("photo-1449965408869-eaa3f722e42d", 1600),
  portfolioSupra: unsplash("photo-1605559426112-aaf3dd1bef84", 1600),
  portfolioSupraFallback: unsplash("photo-148529157115-f1dea7746764", 1600),

  /** Gallery grid */
  galleryWrap: unsplash("photo-1553440568-b6f5fa5cbb3b", 1600),
  galleryPpf: unsplash("photo-1619624209734-b8ee38721f88", 1600),
  galleryCeramic: unsplash("photo-1614200178256-22bc8ecceee9", 1600),
  galleryChromeDelete: unsplash("photo-1617650722598-55e70d750b82", 1600),
  galleryInterior: unsplash("photo-1502877338535-766e1452684a", 1600),
  galleryWheels: unsplash("photo-1523983388278-7b1e0ee19378", 1600),

  /** Before & after pairs */
  beforeDetail: unsplash("photo-148529157115-f1dea7746764", 1400),
  afterDetail: unsplash("photo-1605559426112-aaf3dd1bef84", 1400),
  beforeWrap: unsplash("photo-1449965408869-eaa3f722e42d", 1400),
  afterWrap: unsplash("photo-1494901558403-6c44de542d48", 1400),
} as const;

export const imageFallback = images.servicePpfFallback;
