import type { InstagramPost } from "@/types/instagram";
import { site } from "@/config/site";
import wrap from "@/assets/optimized/wrap.webp";
import corvette from "@/assets/optimized/corvette.webp";
import ceramic from "@/assets/optimized/ceramic.webp";
import chrome from "@/assets/optimized/chrome.webp";
import gtr from "@/assets/optimized/gtr.webp";
import ppf from "@/assets/optimized/ppf.webp";

/** Curated shop photos shown when the live Instagram feed is unavailable. */
export const instagramFallbackPosts: InstagramPost[] = [
  {
    id: "fallback-wrap",
    caption: "Full colour-change vinyl wrap with ceramic sealing — finished in-house at our Delta studio.",
    mediaType: "IMAGE",
    imageUrl: wrap,
    permalink: site.instagram,
    timestamp: "",
  },
  {
    id: "fallback-ppf",
    caption: "Full-front paint protection film on a Corvette — clear coverage, factory gloss preserved.",
    mediaType: "IMAGE",
    imageUrl: corvette,
    permalink: site.instagram,
    timestamp: "",
  },
  {
    id: "fallback-ceramic",
    caption: "Multi-stage paint correction followed by ceramic coating for deep gloss and lasting protection.",
    mediaType: "IMAGE",
    imageUrl: ceramic,
    permalink: site.instagram,
    timestamp: "",
  },
  {
    id: "fallback-chrome",
    caption: "Chrome delete package — gloss black trim for a sharper, more aggressive profile.",
    mediaType: "IMAGE",
    imageUrl: chrome,
    permalink: site.instagram,
    timestamp: "",
  },
  {
    id: "fallback-gtr",
    caption: "Ceramic coating and detail on a performance build — mirror finish, hydrophobic protection.",
    mediaType: "IMAGE",
    imageUrl: gtr,
    permalink: site.instagram,
    timestamp: "",
  },
  {
    id: "fallback-ppf-body",
    caption: "Full-body clear PPF — invisible protection against stone chips and road debris.",
    mediaType: "IMAGE",
    imageUrl: ppf,
    permalink: site.instagram,
    timestamp: "",
  },
];
