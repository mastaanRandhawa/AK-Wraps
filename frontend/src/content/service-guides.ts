import guides from "./search-pages.json";

interface ServiceGuide {
  slug: string;
  title: string;
  description: string;
  intro: string;
  category?: string;
  sections: { title: string; text: string; id?: string; destination?: string }[];
  faq: { question: string; answer: string }[];
}

const pages: ServiceGuide[] = guides;
export default pages;
