/** Image CDN helper — Pexels allows hotlinking; works on GitHub Pages */
function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Unsplash — reliable fallback when Pexels/local assets fail */
function unsplash(photoId: string, width = 1200) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

function localImage(name: string) {
  return `${import.meta.env.BASE_URL}images/${name}`;
}

/** Automotive / vehicle customization stock photos. */
export const images = {
  vehicleWrap: pexels(3802510, 1600),
  ppfInstall: pexels(1149137, 1600),
  ceramicCoating: pexels(170811, 1600),
  paintCorrection: pexels(3807277, 1600),
  chromeDelete: pexels(112460, 1600),
  interiorUpgrade: pexels(3807278, 1600),
  shopExterior: pexels(4489720, 1600),
  wrappedCar: pexels(2445547, 1600),
  detailing: pexels(1592933, 1600),
  customWheels: pexels(3722119, 1600),
  exteriorDetail: pexels(210019, 1600),
  interiorDetail: pexels(116675, 1600),
  headlightRestore: pexels(2449458, 1600),
  /** Hero — local supra when present, else Unsplash sports car */
  heroSupra: localImage("supra.jpg"),
  heroSupraFallback: unsplash("photo-1605559424843-9e4f228af1f2", 1920),
  /** Before/after slider — distinct pairs that load reliably */
  beforeDetail: unsplash("photo-1619403983204-67ab5ce4c73a", 1400),
  afterDetail: unsplash("photo-1503376780353-7e6692767b70", 1400),
  beforeWrap: unsplash("photo-1552519507-da3b1428056e", 1400),
  afterWrap: unsplash("photo-1549399542-7e3e855ed7cc", 1400),
} as const;

export const imageFallback = images.heroSupraFallback;
