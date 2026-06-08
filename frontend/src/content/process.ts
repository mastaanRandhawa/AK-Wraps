import {
  ClipboardCheck,
  Droplets,
  Shield,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    id: "inspection",
    title: "Inspection",
    description:
      "We assess paint condition, surface defects, and your goals to build a tailored treatment plan.",
    icon: ClipboardCheck,
  },
  {
    id: "preparation",
    title: "Preparation",
    description:
      "Thorough wash, decontamination, and masking ensure every surface is ready for precision work.",
    icon: Droplets,
  },
  {
    id: "correction",
    title: "Correction",
    description:
      "Swirls, scratches, and imperfections are carefully removed to restore depth and clarity.",
    icon: Sparkles,
  },
  {
    id: "protection",
    title: "Protection",
    description:
      "Ceramic coating, PPF, or sealants lock in the finish with long-lasting defense.",
    icon: Shield,
  },
  {
    id: "delivery",
    title: "Final Delivery",
    description:
      "A final inspection and walkthrough — your vehicle leaves with a showroom-worthy finish.",
    icon: Truck,
  },
];
