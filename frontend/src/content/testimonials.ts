export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  url?: string;
}

// Verified on Google on 2026-09-27. Static snapshot; automatic sync is not connected.
export const testimonials: Testimonial[] = [
  {
    "id": "viktor",
    "author": "Viktor Sliva",
    "quote": "Very good service, very good people, and very good work.",
    "role": "Google review excerpt",
    "rating": 5,
    "url": "https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s116130052575751824075!2s0x5485df005643909f:0x65414b2aced3af57"
  },
  {
    "id": "euro",
    "author": "Euro",
    "quote": "Great staff owner was extremely helpful and thorough.",
    "role": "Google review excerpt",
    "rating": 5,
    "url": "https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s100258281238538759798!2s0x5485df005643909f:0x65414b2aced3af57"
  },
  {
    "id": "satnam",
    "author": "Satnam",
    "quote": "Did my wrap and tints at a very good price and good quality.",
    "role": "Google review excerpt",
    "rating": 5,
    "url": "https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s118037856821138824918!2s0x5485df005643909f:0x65414b2aced3af57"
  }
];
