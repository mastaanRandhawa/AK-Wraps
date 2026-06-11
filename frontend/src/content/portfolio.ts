import { images } from "./images";

export interface PortfolioBuild {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  image: string;
  imageFallback?: string;
  category: string;
  description?: string;
  services: string[];
}

export const portfolioBuilds: PortfolioBuild[] = [
  {
    id: "lambo-ppf",
    title: "Aventador",
    brand: "Lamborghini",
    brandLogo: "/brands/lamborghini.svg",
    image: images.portfolioLamborghini,
    imageFallback: images.portfolioLamborghiniFallback,
    category: "Paint Protection Film",
    description:
      "Full clear PPF with ceramic top coat and precision tint — track-ready protection without changing the factory finish.",
    services: ["Full Clear PPF", "Ceramic Coating", "Tint"],
  },
  {
    id: "bmw-m",
    title: "M4 Competition",
    brand: "BMW",
    brandLogo: "/brands/bmw.svg",
    image: images.portfolioBmw,
    imageFallback: images.portfolioBmwFallback,
    category: "Ceramic Coating",
    description:
      "Paint correction followed by multi-layer ceramic for a deep gloss and long-lasting hydrophobic protection.",
    services: ["PPF", "Paint Correction", "Ceramic"],
  },
  {
    id: "porsche-gt",
    title: "911 GT3",
    brand: "Porsche",
    brandLogo: "/brands/porsche.svg",
    image: images.portfolioPorsche,
    imageFallback: images.portfolioPorscheFallback,
    category: "Vehicle Wraps",
    description:
      "Full vinyl colour change with PPF on high-impact areas and ceramic sealing for a showroom-quality finish.",
    services: ["Full Vinyl Color Change", "PPF", "Ceramic"],
  },
  {
    id: "mercedes-amg",
    title: "AMG GT",
    brand: "Mercedes",
    brandLogo: "/brands/mercedes.svg",
    image: images.portfolioMercedes,
    imageFallback: images.portfolioMercedesFallback,
    category: "Paint Protection Film",
    description:
      "Track package PPF coverage with ceramic coating to guard against stone chips and road debris at speed.",
    services: ["Track Package PPF", "Ceramic Coating"],
  },
  {
    id: "ford-mustang",
    title: "Mustang GT",
    brand: "Ford",
    brandLogo: "/brands/ford.svg",
    image: images.portfolioMustang,
    imageFallback: images.portfolioMustangFallback,
    category: "Vehicle Wraps",
    description:
      "Complete colour-change wrap with chrome delete and ceramic window tint for a clean, aggressive street look.",
    services: ["Full Wrap", "Chrome Delete", "Tint"],
  },
  {
    id: "toyota-supra",
    title: "GR Supra",
    brand: "Toyota",
    brandLogo: "/brands/toyota.svg",
    image: images.portfolioSupra,
    imageFallback: images.portfolioSupraFallback,
    category: "Ceramic Coating",
    description:
      "Front-end PPF with full ceramic coating and a full detail — daily-driver protection with mirror gloss.",
    services: ["PPF", "Ceramic Coating", "Detail"],
  },
];

export const portfolioCategories = [
  "All",
  ...Array.from(new Set(portfolioBuilds.map((b) => b.category))),
];
