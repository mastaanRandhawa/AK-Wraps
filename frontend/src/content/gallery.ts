import baCeramicBefore from "@/assets/optimized/ba-ceramic-before.webp";
import baCeramicAfter from "@/assets/optimized/ba-ceramic-after.webp";
import baWrapBefore from "@/assets/optimized/ba-wrap-before.webp";
import baWrapAfter from "@/assets/optimized/ba-wrap-after.webp";

export interface BeforeAfterItem {
  id: string;
  before: string;
  after: string;
  label: string;
}

export const beforeAfter: BeforeAfterItem[] = [
  {
    id: "ceramic-coating",
    before: baCeramicBefore,
    after: baCeramicAfter,
    label: "Paint Correction & Ceramic Coating",
  },
  {
    id: "colour-wrap",
    before: baWrapBefore,
    after: baWrapAfter,
    label: "Full Vehicle Wrap Transformation",
  },
];
