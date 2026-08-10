export const site = {
  name: "AK Wraps & Customs",
  nameShort: "AK WRAPS",
  nameSub: "& Customs",
  tagline: "Every vehicle leaves with our signature finish.",
  heroBadge: "PREMIER IN GREATER VANCOUVER",
  heroTitle: "Premier Auto Protection & Customization in Greater Vancouver",
  /**
   * The hero headline as explicit display lines. Each line gets its own mask
   * row in the reveal animation, so keep them short — this is the wrap, not a
   * suggestion. `heroTitle` above stays the flat string used for page metadata.
   */
  heroTitleLines: ["Premier auto protection.", "Surgical detail."],
  /** Index of the line rendered in the brand accent. */
  heroTitleAccentLine: 1,
  heroSubtitle:
    "From daily drivers to exotics, every vehicle leaves with our signature.",
  phone: "(236) 412-5010",
  email: "ak.wraps.customs@gmail.com",
  address: "6165 BC-17A, Delta, BC V4K 0B2",
  hours: "Mon–Sat 1 PM – 2 AM · Sun 1 PM – 12 AM",
  // Social profiles. Any entry left as "#" is automatically hidden in the UI
  // (see isLiveUrl). Replace with the real profile URLs before launch.
  instagram: "https://www.instagram.com/akwrapscustoms/",
  facebook: "#",
  tiktok: "https://www.tiktok.com/@akwrapscustoms",
  serviceAreas: [
    "Surrey",
    "Delta",
    "Vancouver",
    "Richmond",
    "Burnaby",
    "Coquitlam",
    "Langley",
    "Greater Vancouver Area",
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=6165+BC-17A,+Delta,+BC+V4K+0B2&hl=en&z=14&output=embed",
  socialHandle: "akwrapscustoms",

  /**
   * Aggregate Google rating shown over the hero. VERIFY THESE AGAINST THE LIVE
   * GOOGLE BUSINESS PROFILE BEFORE LAUNCH and refresh them periodically — they
   * are a public factual claim about the business.
   */
  googleRating: {
    score: 4.9,
    count: 38,
    url: "https://www.google.com/search?q=AK+Wraps+%26+Customs+Delta+BC+reviews",
  },
} as const;

export const navigation = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/gallery" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];
