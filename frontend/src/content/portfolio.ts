import projects from "./vehicle-projects.json";
import captionServices from "./project-services.json";
import { vehicleBrands, additionalBrands } from "./brands";

export interface PortfolioBuild {
  id: string;
  title: string;
  brand?: string;
  brandLogo?: string;
  image: string;
  imageFallback?: string;
  category: string;
  categories: string[];
  description?: string;
  services: string[];
  sourceUrl?: string;
}

const serviceMap: Record<string, string[]> = captionServices;
export const featuredProjectIds = ["DZqr-WAmsiw", "DJ-i4Cjvz3B"];
const serviceCategories: [string, RegExp][] = [
  ["Vehicle Wraps", /wrap|livery|decal|pinstrip|banner/i],
  ["Paint Protection Film", /\bPPF\b/i],
  ["Ceramic Coating", /coating/i],
  ["Window & Light Tint", /tint|smoked/i],
  ["Chrome Delete", /chrome delete|debadg|black badges/i],
  ["Interior & Lighting", /interior|headliner|lighting|underglow|LED|tweeter/i],
  ["Bodywork & Carbon", /bodywork|collision|repair|carbon|paint matching|hood|bumper|diffuser|splitter|aero|fabrication/i],
  ["Wheels & Calipers", /wheel|caliper/i],
  ["Performance", /tuning|downpipe|exhaust/i],
  ["Detailing", /detailing|correction|cleaning|clay bar/i],
];

// Caption-reviewed shop projects from July 3, 2024 onward. Photography-only
// collaborations are excluded; repeat service visits remain separate projects.
export const portfolioBuilds: PortfolioBuild[] = projects
  .filter(project => project.id !== "DcZKQQkj_fP")
  .map(project => {
    const services = serviceMap[project.id] ?? [];
    const categories = serviceCategories.filter(([,pattern]) => services.some(s => pattern.test(s))).map(([name]) => name);
    if (!categories.length) categories.push("Custom Projects");
    const brand = [...vehicleBrands, ...additionalBrands].find(b => b.id === project.brand);
    const title = project.id === "DJ-i4Cjvz3B" ? "300 Hellcat" : project.title;
    return {
      id: project.id, title,
      brand: project.id === "DJ-i4Cjvz3B" ? "Chrysler" : brand?.name,
      image: project.image, categories, category: categories[0],
      description: project.id === "DZqr-WAmsiw" ? "2015 Ferrari F12 Berlinetta, prepared for Goldrush Rally."
        : project.id === "DJ-i4Cjvz3B" ? "Custom Chrysler 300 Hellcat swap, finished in satin pearl white with bespoke bodywork and forged carbon details."
        : services.length ? services.join(" · ") : "Project 55 — our CLS55 AMG shop vehicle. Services were not specified in this post.",
      services, sourceUrl: project.sourceUrl,
    };
  })
  .sort((a,b) => {
    const aRank = featuredProjectIds.indexOf(a.id);
    const bRank = featuredProjectIds.indexOf(b.id);
    return (aRank < 0 ? 2 : aRank) - (bRank < 0 ? 2 : bRank);
  });

export const portfolioCategories = ["All", ...serviceCategories.map(([name]) => name), "Custom Projects"];
