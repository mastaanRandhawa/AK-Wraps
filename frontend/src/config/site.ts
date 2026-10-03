export const site = {
  name: "AK Wraps & Customs",
  nameShort: "AK WRAPS",
  nameSub: "& Customs",
  tagline: "Every vehicle leaves with our signature finish.",
  heroBadge: "PREMIER IN GREATER VANCOUVER",
  heroTitle: "Premium Auto Protection & Customization in Greater Vancouver",
  /**
   * The hero headline as explicit display lines. Each line gets its own mask
   * row in the reveal animation, so keep them short — this is the wrap, not a
   * suggestion. `heroTitle` above stays the flat string used for page metadata.
   */
  heroTitleLines: ["Premium auto protection.", "Surgical precision."],
  /** Index of the line rendered in the brand accent. */
  heroTitleAccentLine: 1,
  heroSubtitle:
    "From daily drivers to exotics, every vehicle leaves with our signature.",
  phone: "(236) 412-5010",
  email: "ak.wraps.customs@gmail.com",
  address: "6165 BC-17A, Delta, BC V4K 0B2",
  hours: "Monday–Sunday · 12 PM – 10 PM",
  // Social profiles. Any entry left as "#" is automatically hidden in the UI
  // (see isLiveUrl). Replace with the real profile URLs before launch.
  instagram: "https://www.instagram.com/akwrapscustoms/",
  facebook: "#",
  tiktok: "https://www.tiktok.com/@akwrapscustoms",
  serviceAreas: [
  "Delta",
  "Surrey",
  "Richmond",
  "White Rock",
  "Burnaby",
  "Vancouver",
  "Langley",
  "Abbotsford",
  "New Westminster",
  "Coquitlam"
],
  mapEmbedUrl:
    "https://www.google.com/maps?q=6165+BC-17A,+Delta,+BC+V4K+0B2&hl=en&z=14&output=embed",
  socialHandle: "akwrapscustoms",

  // Verified snapshot, not an automatic feed.
  googleRating: {
    score: 4.9,
    count: 60,
    url: "https://www.google.com/maps/place/AK+Wraps%26Customs+LTD/data=!4m2!3m1!1s0x0:0x65414b2aced3af57",
  },
} as const;

export const navigation = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/gallery" },
  { name: "Merchandise", href: "/merchandise" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

