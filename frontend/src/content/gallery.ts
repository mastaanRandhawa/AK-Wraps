import { images } from "./images";

export const galleryImages = [
  {
    id: "1",
    src: images.wrappedCar,
    alt: "Full vehicle wrap color change",
    category: "Vehicle Wraps",
    span: "large" as const,
  },
  {
    id: "2",
    src: images.ppfInstall,
    alt: "Paint protection film installation",
    category: "Paint Protection Film",
    span: "small" as const,
  },
  {
    id: "3",
    src: images.ceramicCoating,
    alt: "Ceramic coating gloss finish",
    category: "Ceramic Coating",
    span: "small" as const,
  },
  {
    id: "4",
    src: images.chromeDelete,
    alt: "Chrome delete blackout trim",
    category: "Chrome Delete",
    span: "medium" as const,
  },
  {
    id: "5",
    src: images.interiorUpgrade,
    alt: "Interior ambient lighting upgrade",
    category: "Interior Customization",
    span: "small" as const,
  },
  {
    id: "6",
    src: images.customWheels,
    alt: "Custom wheels and trim detail",
    category: "Wheels and Trim",
    span: "large" as const,
  },
];

export const beforeAfter = [
  {
    id: "ba1",
    before: images.paintCorrection,
    after: images.detailing,
    label: "Paint Correction & Ceramic Coating",
  },
  {
    id: "ba2",
    before: images.vehicleWrap,
    after: images.wrappedCar,
    label: "Full Vehicle Wrap Transformation",
  },
];

export const stats = [
  { label: "Years of Experience", value: "10+" },
  { label: "Vehicles Completed", value: "500+" },
  { label: "Services Offered", value: "6+" },
];
