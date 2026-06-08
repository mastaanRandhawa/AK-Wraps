import { images } from "./images";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  tagline?: string;
}

export const featuredServices: Service[] = [
  {
    id: "exterior-detailing",
    title: "Exterior Detailing",
    tagline: "Showroom shine, restored",
    description:
      "Hand wash, clay bar, polish, and protection for a flawless exterior finish.",
    price: "Starting from — contact for quote",
    image: images.exteriorDetail,
  },
  {
    id: "interior-detailing",
    title: "Interior Detailing",
    tagline: "Refined comfort inside",
    description:
      "Deep cleaning, leather care, and odor elimination for a pristine cabin.",
    price: "Starting from — contact for quote",
    image: images.interiorDetail,
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    tagline: "Flawless paint, restored depth",
    description:
      "Multi-stage polishing removes swirls and scratches for mirror-like clarity.",
    price: "Starting from — contact for quote",
    image: images.paintCorrection,
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    tagline: "Lasting gloss & protection",
    description:
      "Hydrophobic, UV-resistant coating that delivers deep shine and easier maintenance.",
    price: "Starting from — contact for quote",
    image: images.ceramicCoating,
  },
  {
    id: "ppf",
    title: "Paint Protection Film",
    tagline: "Invisible armor for your paint",
    description:
      "Self-healing film shields against rock chips, scratches, and road debris.",
    price: "Starting from — contact for quote",
    image: images.ppfInstall,
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    tagline: "Clarity you can see",
    description:
      "Restore yellowed, oxidized headlights for improved visibility and appearance.",
    price: "Starting from — contact for quote",
    image: images.headlightRestore,
  },
];

export const serviceCategories = [
  {
    title: "Exterior Detailing",
    items: [
      "Hand Wash & Dry",
      "Clay Bar Treatment",
      "Paint Decontamination",
      "Wheel & Tire Detail",
      "Trim Restoration",
    ],
  },
  {
    title: "Interior Detailing",
    items: [
      "Deep Vacuum & Shampoo",
      "Leather Conditioning",
      "Dashboard & Trim Care",
      "Odor Elimination",
      "Glass & Mirror Polish",
    ],
  },
  {
    title: "Paint Correction",
    items: [
      "Single-Stage Polish",
      "Multi-Stage Correction",
      "Swirl Removal",
      "Scratch Reduction",
      "Gloss Enhancement",
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
    title: "Paint Protection Film",
    items: [
      "Full Front Coverage",
      "Partial Coverage",
      "Track Package",
      "Self-Healing Film",
    ],
  },
  {
    title: "Headlight Restoration",
    items: [
      "Oxidation Removal",
      "UV Sealant Application",
      "Clarity Restoration",
      "Long-Term Protection",
    ],
  },
];

export const pricing = [
  { service: "Exterior Detailing", price: "Starting from — contact us" },
  { service: "Interior Detailing", price: "Starting from — contact us" },
  { service: "Ceramic Coating", price: "Starting from — contact us" },
  { service: "Paint Protection Film", price: "Starting from — contact us" },
  { service: "Paint Correction", price: "Quote required" },
  { service: "Headlight Restoration", price: "Starting from — contact us" },
];

export const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Fill out our contact form or call us at (236) 412-5010. We'll discuss your vehicle, goals, and provide a detailed estimate based on your specific project.",
  },
  {
    question: "How long does a detail or coating take?",
    answer:
      "Turnaround depends on the service and vehicle condition. Basic detailing takes 4–8 hours; paint correction and ceramic coating typically require 1–3 days. We'll give you a timeline with your quote.",
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
