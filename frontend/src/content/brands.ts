export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export const vehicleBrands: Brand[] = [
  { id: "lamborghini", name: "Lamborghini", logo: "/brands/lamborghini.svg" },
  { id: "bmw", name: "BMW", logo: "/brands/bmw.svg" },
  { id: "bugatti", name: "Bugatti", logo: "/brands/bugatti.svg" },
  { id: "mclaren", name: "McLaren", logo: "/brands/mclaren.svg" },
  { id: "porsche", name: "Porsche", logo: "/brands/porsche.svg" },
  { id: "ferrari", name: "Ferrari", logo: "/brands/ferrari.svg" },
  { id: "ford", name: "Ford", logo: "/brands/ford.svg" },
  { id: "toyota", name: "Toyota", logo: "/brands/toyota.svg" },
];

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const partnerBrands: Partner[] = [
  { id: "3m", name: "3M", logo: "/brands/3m.svg" },
  { id: "xpel", name: "XPEL", logo: "/brands/xpel.svg" },
  { id: "ceramic-pro", name: "Ceramic Pro", logo: "/brands/ceramic-pro.svg" },
  { id: "gtechniq", name: "Gtechniq", logo: "/brands/gtechniq.svg" },
];
