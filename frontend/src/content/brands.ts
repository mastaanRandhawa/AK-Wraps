export interface Brand {
  id: string;
  name: string;
  logo: string;
  secondaryLogo?: string;
}

export const vehicleBrands: Brand[] = [
  { id: "bmw", name: "BMW", logo: "/brands/bmw.png" },
  { id: "mercedes-amg", name: "Mercedes-Benz & AMG", logo: "/brands/mercedes-amg.png" },
  { id: "ferrari", name: "Ferrari", logo: "/brands/ferrari.png" },
  { id: "lamborghini", name: "Lamborghini", logo: "/brands/lamborghini.png" },
  { id: "chevrolet", name: "Chevrolet", logo: "/brands/corvette.png" },
  { id: "dodge", name: "Dodge & Chrysler", logo: "/brands/hellcat.png" },
  { id: "lexus", name: "Lexus", logo: "/brands/lexus.png" },
  { id: "range-rover", name: "Range Rover", logo: "/brands/range-rover.svg" },
];

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const partnerBrands: Partner[] = [
  { id: "gtechniq", name: "Gtechniq", logo: "/brands/gtechniq.svg" },
  { id: "monster-energy", name: "Monster Energy", logo: "/brands/monster-energy.webp" },
  { id: "verlano", name: "Verleno", logo: "/brands/verleno.png" },
  { id: "avery-dennison", name: "Avery Dennison", logo: "/brands/avery-dennison.png" },
  { id: "kkvinyl", name: "KKVinyl", logo: "/brands/kkvinyl.svg" },
  { id: "mercedes-benz-surrey", name: "Mercedes-Benz Surrey", logo: "/brands/mercedes-benz-surrey.webp" },
  { id: "auto-west-bmw", name: "Auto West BMW", logo: "/brands/auto-west-bmw.webp" },
  { id: "ak-performance", name: "AK Performance", logo: "/brands/ak-performance.jpg" },
  { id: "ak-gloss-go", name: "AK Gloss & Go Detailing", logo: "/brands/ak-gloss-go.jpg" },
  { id: "rcc", name: "RCC", logo: "/brands/rcc.jpg" },
  { id: "starlight-autoz", name: "Starlight Autoz", logo: "/brands/starlight-autoz.jpg" },
  { id: "inozetek", name: "Inozetek", logo: "/brands/inozetek.svg" },
];

export const additionalBrands = [
  { id: "audi", name: "Audi" }, { id: "bentley", name: "Bentley" },
  { id: "cadillac", name: "Cadillac" }, { id: "ford", name: "Ford" },
  { id: "gmc", name: "GMC" }, { id: "infiniti", name: "Infiniti" },
  { id: "jeep", name: "Jeep" }, { id: "porsche", name: "Porsche" },
  { id: "rolls-royce", name: "Rolls-Royce" }, { id: "subaru", name: "Subaru" },
  { id: "tesla", name: "Tesla" }, { id: "toyota", name: "Toyota" },
  { id: "volkswagen", name: "Volkswagen" }, { id: "commercial", name: "Commercial" },
];
