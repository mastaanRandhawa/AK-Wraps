/** Image CDN helper — Pexels allows hotlinking; works on GitHub Pages */
function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Automotive / vehicle customization stock photos. */
export const images = {
  vehicleWrap: pexels(3802510, 1200),
  ppfInstall: pexels(1149137, 1200),
  ceramicCoating: pexels(170811, 1200),
  paintCorrection: pexels(3807277, 1200),
  chromeDelete: pexels(112460, 1200),
  interiorUpgrade: pexels(3807278, 1200),
  shopExterior: pexels(4489720, 1200),
  wrappedCar: pexels(2445547, 1200),
  detailing: pexels(1592933, 1200),
  customWheels: pexels(3722119, 1200),
} as const;

export const imageFallback = images.vehicleWrap;
