// Real builds completed in-house at AK Wraps. Photos are the shop's own work,
// labelled by the service performed. Update titles/descriptions any time with
// specific vehicle makes/models — see scripts/optimize-photos.mjs for the
// source-photo → file mapping.
import wrap from "@/assets/optimized/wrap.webp";
import corvette from "@/assets/optimized/corvette.webp";
import ppf from "@/assets/optimized/ppf.webp";
import ceramic from "@/assets/optimized/ceramic.webp";
import gtr from "@/assets/optimized/gtr.webp";
import chrome from "@/assets/optimized/chrome.webp";
import interior from "@/assets/optimized/interior.webp";
import wheels from "@/assets/optimized/wheels.webp";

export interface PortfolioBuild {
  id: string;
  title: string;
  brand?: string;
  brandLogo?: string;
  image: string;
  imageFallback?: string;
  category: string;
  description?: string;
  services: string[];
}

export const portfolioBuilds: PortfolioBuild[] = [
  {
    id: "color-change-wrap",
    title: "Color Change Wrap",
    image: wrap,
    category: "Vehicle Wraps",
    description:
      "Full vinyl colour change with ceramic sealing and tint for a clean, head-turning finish.",
    services: ["Full Vinyl Wrap", "Ceramic", "Tint"],
  },
  {
    id: "corvette-ppf",
    title: "Full-Front PPF",
    image: corvette,
    category: "Paint Protection Film",
    description:
      "Clear paint protection film across the high-impact front end, finished with a ceramic top coat.",
    services: ["Front PPF", "Ceramic Coating"],
  },
  {
    id: "gloss-ppf",
    title: "Gloss PPF Package",
    image: ppf,
    category: "Paint Protection Film",
    description:
      "Full-body clear PPF to guard the factory paint against stone chips and swirls without changing the finish.",
    services: ["Full Body PPF", "Ceramic"],
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    image: ceramic,
    category: "Ceramic Coating",
    description:
      "Multi-stage paint correction followed by a multi-layer ceramic coating for deep gloss and hydrophobic protection.",
    services: ["Paint Correction", "Ceramic Coating"],
  },
  {
    id: "ceramic-detail",
    title: "Ceramic & Detail",
    image: gtr,
    category: "Ceramic Coating",
    description:
      "Full exterior detail with ceramic coating and ceramic window tint for lasting protection and mirror gloss.",
    services: ["Ceramic Coating", "Tint", "Detail"],
  },
  {
    id: "chrome-delete",
    title: "Chrome Delete",
    image: chrome,
    category: "Chrome Delete",
    description:
      "Blackout package — chrome trim wrapped to a gloss black finish for a sharper, more aggressive look.",
    services: ["Chrome Delete", "Tint"],
  },
  {
    id: "interior-ambient",
    title: "Interior Ambient Lighting",
    image: interior,
    category: "Interior Customization",
    description:
      "Custom ambient lighting integrated into the doors and cabin for a premium, personalised interior.",
    services: ["Ambient Lighting", "Interior Detail"],
  },
  {
    id: "wheel-refinish",
    title: "Wheel Refinishing",
    image: wheels,
    category: "Wheels & Trim",
    description:
      "Wheel refinishing and trim detailing to complete the build and keep every surface looking factory-fresh.",
    services: ["Wheel Refinish", "Trim Detail"],
  },
];

export const portfolioCategories = [
  "All",
  ...Array.from(new Set(portfolioBuilds.map((b) => b.category))),
];
