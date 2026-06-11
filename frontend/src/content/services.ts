import { images } from "./images";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  imageFallback?: string;
  tagline?: string;
}

export const featuredServices: Service[] = [
  {
    id: "vinyl-wraps",
    title: "Vinyl Wraps",
    tagline: "Bold colour, flawless finish",
    description:
      "Full and partial vinyl wraps in gloss, satin, matte, and specialty finishes — colour changes without repainting.",
    price: "Starting from — contact for quote",
    image: images.wrappedCar,
    imageFallback: images.vehicleWrap,
  },
  {
    id: "ppf",
    title: "Paint Protection Film",
    tagline: "Invisible armor for your paint",
    description:
      "Self-healing clear film shields against rock chips, scratches, and road debris on high-impact areas or full body.",
    price: "Starting from — contact for quote",
    image: images.ppfInstall,
    imageFallback: images.exteriorDetail,
  },
  {
    id: "coloured-ppf",
    title: "Coloured PPF",
    tagline: "Colour and protection combined",
    description:
      "Premium coloured paint protection film that changes your vehicle's look while guarding against chips and UV damage.",
    price: "Starting from — contact for quote",
    image: images.afterWrap,
    imageFallback: images.wrappedCar,
  },
  {
    id: "window-tints",
    title: "Window Tints",
    tagline: "Privacy, comfort, and UV defense",
    description:
      "Precision-cut ceramic and carbon window films for heat rejection, glare reduction, and a clean, factory-finished look.",
    price: "Starting from — contact for quote",
    image: images.interiorDetail,
    imageFallback: images.ceramicCoating,
  },
  {
    id: "ceramic-paint-correction",
    title: "Ceramic Coating & Paint Correction",
    tagline: "Flawless paint, lasting gloss",
    description:
      "Multi-stage paint correction followed by ceramic coating for deep shine, hydrophobic protection, and easier maintenance.",
    price: "Quote required",
    image: images.ceramicCoating,
    imageFallback: images.paintCorrection,
  },
  {
    id: "wide-body-fabrication",
    title: "Wide Body Kits & Custom Fabrication",
    tagline: "Aggressive stance, built in-house",
    description:
      "Wide body kit fitting, custom panel fabrication, and structural modifications executed entirely at our Delta studio.",
    price: "Quote required",
    image: images.customWheels,
    imageFallback: images.shopExterior,
  },
  {
    id: "custom-paint-matching",
    title: "Custom Paint Matching",
    tagline: "Seamless colour, every time",
    description:
      "Factory-accurate and custom colour matching for repairs, accents, and one-off finishes that blend perfectly with your vehicle.",
    price: "Quote required",
    image: images.paintCorrection,
    imageFallback: images.chromeDelete,
  },
];

export const serviceCategories = [
  {
    title: "Vinyl Wraps",
    items: [
      "Full Colour Change",
      "Partial & Accent Wraps",
      "Gloss, Satin & Matte Finishes",
      "Chrome Delete",
      "Commercial & Fleet Branding",
    ],
  },
  {
    title: "Paint Protection Film",
    items: [
      "Full Front Coverage",
      "Full Body PPF",
      "Track & High-Impact Packages",
      "Self-Healing Clear Film",
      "Stealth & Satin Finishes",
    ],
  },
  {
    title: "Coloured PPF",
    items: [
      "Solid Colour Films",
      "Colour-Shift Options",
      "Accent & Panel Coverage",
      "Chip & Scratch Protection",
      "UV-Resistant Finishes",
    ],
  },
  {
    title: "Window Tints",
    items: [
      "Ceramic Window Film",
      "Heat & UV Rejection",
      "Privacy Tint Packages",
      "Windshield Tint Strips",
      "Precision Computer-Cut Fit",
    ],
  },
  {
    title: "Ceramic Coating & Paint Correction",
    items: [
      "Single & Multi-Stage Correction",
      "Swirl & Scratch Removal",
      "Ceramic Paint Coating",
      "Wheel & Glass Coating",
      "Gloss Enhancement",
    ],
  },
  {
    title: "Wide Body Kits & Custom Fabrication",
    items: [
      "Wide Body Kit Installation",
      "Custom Panel Fabrication",
      "Bumper & Fender Modification",
      "Fitment & Alignment",
      "Structural Reinforcement",
    ],
  },
  {
    title: "Custom Paint Matching",
    items: [
      "Factory Colour Matching",
      "Custom Mix Formulas",
      "Panel & Accent Painting",
      "Blend & Feather Techniques",
      "Clear Coat & Finish Work",
    ],
  },
];

export const pricing = [
  { service: "Vinyl Wraps", price: "Starting from — contact us" },
  { service: "Paint Protection Film", price: "Starting from — contact us" },
  { service: "Coloured PPF", price: "Starting from — contact us" },
  { service: "Window Tints", price: "Starting from — contact us" },
  {
    service: "Ceramic Coating & Paint Correction",
    price: "Quote required",
  },
  {
    service: "Wide Body Kits & Custom Fabrication",
    price: "Quote required",
  },
  { service: "Custom Paint Matching", price: "Quote required" },
];

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Fill out our contact form or call us at (236) 412-5010. We'll discuss your vehicle, goals, and provide a detailed estimate based on your specific project.",
  },
  {
    question: "How long does a wrap or coating take?",
    answer:
      "Turnaround depends on the service and vehicle. Window tints and smaller jobs may take a day; full wraps, PPF, and wide body work typically require several days to a week. We'll give you a timeline with your quote.",
  },
  {
    question: "What products and brands do you use?",
    answer:
      "We use premium industry-leading products from trusted partners including 3M, XPEL, Ceramic Pro, and Gtechniq for lasting quality and warranty-backed results.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Surrey, Delta, Vancouver, Richmond, Burnaby, Coquitlam, Langley, and the Greater Vancouver area from our shop at 6165 BC-17A in Delta, BC.",
  },
];

export const serviceOptions = featuredServices.map((s) => s.title);
