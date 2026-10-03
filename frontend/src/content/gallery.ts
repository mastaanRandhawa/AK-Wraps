
export interface BeforeAfterItem {
  id: string;
  before: string;
  after: string;
  label: string;
  illustration?: boolean;
  note?: string;
  imagePosition?: string;
}

export const beforeAfter: BeforeAfterItem[] = [
  {
    id: "f12-paint-correction",
    before: "/transformations/f12-before.png",
    after: "/transformations/f12-after.png",
    label: "Paint Correction",
    illustration: true,
  },
  {
    id: "colour-wrap",
    before: "/transformations/e55-stock-before.png",
    after: "/projects/DHXITdUymsZ.jpg",
    label: "Full Vehicle Wrap Transformation",
    imagePosition: "center 72%",
    note: "Illustrative comparison: AI-generated stock silver before image; actual finished E55 photo after. Includes styling modifications beyond the wrap.",
  },
];
