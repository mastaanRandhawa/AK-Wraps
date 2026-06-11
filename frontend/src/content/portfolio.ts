import { images } from "./images";

export interface PortfolioBuild {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  image: string;
  services: string[];
}

export const portfolioBuilds: PortfolioBuild[] = [
  {
    id: "lambo-ppf",
    title: "Aventador",
    brand: "Lamborghini",
    brandLogo: "/brands/lamborghini.svg",
    image: images.wrappedCar,
    services: ["Full Clear PPF", "Ceramic Coating", "Tint"],
  },
  {
    id: "bmw-m",
    title: "M4 Competition",
    brand: "BMW",
    brandLogo: "/brands/bmw.svg",
    image: images.exteriorDetail,
    services: ["PPF", "Paint Correction", "Ceramic"],
  },
  {
    id: "porsche-gt",
    title: "911 GT3",
    brand: "Porsche",
    brandLogo: "/brands/porsche.svg",
    image: images.ceramicCoating,
    services: ["Full Vinyl Color Change", "PPF", "Ceramic"],
  },
  {
    id: "mercedes-amg",
    title: "AMG GT",
    brand: "Mercedes",
    brandLogo: "/brands/bmw.svg",
    image: images.ppfInstall,
    services: ["Track Package PPF", "Ceramic Coating"],
  },
  {
    id: "ford-mustang",
    title: "Mustang GT",
    brand: "Ford",
    brandLogo: "/brands/ford.svg",
    image: images.customWheels,
    services: ["Full Wrap", "Chrome Delete", "Tint"],
  },
  {
    id: "toyota-supra",
    title: "GR Supra",
    brand: "Toyota",
    brandLogo: "/brands/toyota.svg",
    image: images.heroSupra,
    services: ["PPF", "Ceramic Coating", "Detail"],
  },
];
