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
    title: "Consultation & inspection",
    description:
      "We discuss your goals, assess paint condition and agree on materials, covered areas and a vehicle-specific scope.",
    icon: ClipboardCheck,
  },
  {
    id: "preparation",
    title: "Preparation",
    description:
      "Cleaning and surface preparation are planned for the chosen service. Existing film, repairs and paint condition inform the work required.",
    icon: Droplets,
  },
  {
    id: "correction",
    title: "Finish preparation",
    description:
      "Where paint correction is included, we assess which defects can be improved safely. Film and coating do not repair damaged paint.",
    icon: Sparkles,
  },
  {
    id: "protection",
    title: "Installation",
    description:
      "Your chosen wrap, film or coating is applied to the agreed areas, with attention to the finish and details of your vehicle.",
    icon: Shield,
  },
  {
    id: "delivery",
    title: "Final Delivery",
    description:
      "We inspect the completed work and discuss product-specific care at collection. Ask us about curing, maintenance and the warranty for your installation.",
    icon: Truck,
  },
];
