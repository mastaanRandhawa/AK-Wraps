export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The full wrap on my Tesla exceeded expectations. Flawless install and the color is exactly what I wanted. Highly recommend AK Wraps.",
    author: "Marcus Chen",
    role: "Vehicle Wrap Client",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Had PPF and ceramic coating done on my truck. The team was professional, kept me updated, and the finish is incredible.",
    author: "Sarah Mitchell",
    role: "PPF & Ceramic Coating Client",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Chrome delete and starlight headliner transformed my car completely. Attention to detail is unmatched — worth every penny.",
    author: "David Okonkwo",
    role: "Customization Client",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Paint correction brought my car back to showroom condition. Fair pricing, great communication, and outstanding results.",
    author: "Jennifer Walsh",
    role: "Paint Correction Client",
    rating: 5,
  },
];
