import { images } from "./images";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export const featuredServices: Service[] = [
  {
    id: "vehicle-wraps",
    title: "Vehicle Wraps",
    description:
      "Full wraps, partial wraps, color changes, and custom designs that transform your vehicle.",
    price: "Starting from — contact for quote",
    image: images.vehicleWrap,
  },
  {
    id: "ppf",
    title: "Paint Protection Film (PPF)",
    description:
      "Invisible protection against rock chips, scratches, and road debris for long-lasting paint.",
    price: "Starting from — contact for quote",
    image: images.ppfInstall,
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    description:
      "Hydrophobic, UV-resistant protection that delivers a deep gloss and easier maintenance.",
    price: "Starting from — contact for quote",
    image: images.ceramicCoating,
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    description:
      "Swirl mark removal, scratch reduction, and paint restoration for a flawless finish.",
    price: "Starting from — contact for quote",
    image: images.paintCorrection,
  },
  {
    id: "chrome-delete",
    title: "Chrome Delete",
    description:
      "Modern blackout styling for window trim, badges, and accents with a sleek custom look.",
    price: "Starting from — contact for quote",
    image: images.chromeDelete,
  },
  {
    id: "interior-upgrades",
    title: "Interior Upgrades",
    description:
      "Starlight headliners, ambient lighting, and personalized interior enhancements.",
    price: "Starting from — contact for quote",
    image: images.interiorUpgrade,
  },
];

export const serviceCategories = [
  {
    title: "Vehicle Wraps",
    items: [
      "Full Wraps",
      "Partial Wraps",
      "Color Changes",
      "Commercial Wraps",
      "Custom Designs",
    ],
  },
  {
    title: "Paint Protection Film",
    items: [
      "Full Front Coverage",
      "Partial Coverage",
      "Track Package",
      "Self-Healing Film",
    ],
  },
  {
    title: "Ceramic Coating",
    items: [
      "Paint Coating",
      "Wheel Coating",
      "Glass Coating",
      "Interior Protection",
    ],
  },
  {
    title: "Paint Correction",
    items: [
      "Single-Stage Polish",
      "Multi-Stage Correction",
      "Swirl Removal",
      "Scratch Reduction",
    ],
  },
  {
    title: "Chrome Delete",
    items: [
      "Window Trim",
      "Badge Blackout",
      "Grille Accents",
      "Custom Styling",
    ],
  },
  {
    title: "Interior Customization",
    items: [
      "Starlight Headliners",
      "Ambient Lighting",
      "Trim Upgrades",
      "Personalization",
    ],
  },
];

export const pricing = [
  { service: "Vehicle Wraps", price: "Quote required" },
  { service: "Ceramic Coating", price: "Starting from — contact us" },
  { service: "Paint Protection Film", price: "Starting from — contact us" },
  { service: "Chrome Delete", price: "Starting from — contact us" },
];

export const faqs = [
  {
    question: "How do I get a quote?",
    answer:
      "Fill out our contact form or call us at (236) 412-5010. We'll discuss your vehicle, goals, and provide a detailed estimate based on your specific project.",
  },
  {
    question: "How long does a wrap or coating take?",
    answer:
      "Turnaround depends on the service and vehicle size. Most wraps take 3–5 days; ceramic coating and PPF typically require 1–3 days. We'll give you a timeline with your quote.",
  },
  {
    question: "What materials and brands do you use?",
    answer:
      "We use premium industry-leading products from trusted partners including 3M, XPEL, Ceramic Pro, and Avery Dennison for lasting quality and warranty-backed results.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Surrey, Delta, Vancouver, Richmond, Burnaby, Coquitlam, Langley, and the Greater Vancouver area from our shop at 6165 BC-17A in Delta, BC.",
  },
];

export const serviceOptions = featuredServices.map((s) => s.title);
