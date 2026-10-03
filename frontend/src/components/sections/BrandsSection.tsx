import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/brand-logo";
import { vehicleBrands, additionalBrands } from "@/content/brands";
import projects from "@/content/vehicle-projects.json";

export function BrandsSection() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#vehicle-brands") return;
    const frame = requestAnimationFrame(() => document.getElementById("vehicle-brands")?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  const [showMoreBrands, setShowMoreBrands] = useState(false);

  return (
    <Section id="vehicle-brands" variant="default" className="scroll-mt-[var(--navbar-offset)] !py-10 sm:!py-14">
      <SectionHeading titleMuted="Your Trusted" titleBold="Vehicle Specialists" className="mb-4 sm:mb-4 md:mb-4 lg:mb-4" />
      <p className="mt-0 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
        Real vehicles. Individual attention. Explore our work by brand, from colour changes and protection to custom finishing touches.
      </p>
      <div role="group" aria-label="Choose a vehicle brand" className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
        {vehicleBrands.map(brand => (
          <Link key={brand.id} to={`/gallery/brands/${brand.id}`}
            className={`group flex min-h-28 flex-col items-center justify-center gap-2 px-4 py-3 transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-accent bg-black text-white/60 hover:bg-[#10191c] hover:text-white`}>
            <div className="flex h-20 w-full items-center justify-center gap-1">
              <BrandLogo src={brand.logo} name={brand.name} originalColors={!["range-rover", "mercedes-amg", "dodge"].includes(brand.id)}
                className={brand.id === "mercedes-amg" ? "h-20 w-40 max-w-full scale-150 sm:h-20" : brand.secondaryLogo ? "h-20 w-[45%] max-w-[110px] sm:h-20" : "h-20 w-40 max-w-full sm:h-20"} />
              {brand.secondaryLogo && <BrandLogo src={brand.secondaryLogo} name={brand.id === "dodge" ? "Chrysler" : "AMG"}
                originalColors={brand.id === "dodge"} className="h-20 w-[45%] max-w-[110px] sm:h-20" />}
            </div>
            {brand.logo && <span className="text-xs font-medium tracking-wide">{brand.name}</span>}
            <span className="text-[10px] uppercase tracking-[0.18em]">{projects.filter(p => p.brand === brand.id).length} {projects.filter(p => p.brand === brand.id).length === 1 ? "project" : "projects"}</span>
          </Link>
        ))}
      </div>
      <button type="button" onClick={() => setShowMoreBrands(!showMoreBrands)} aria-expanded={showMoreBrands} aria-controls="additional-brands"
        className="mt-3 rounded px-1 py-2 text-sm text-white/65 underline decoration-accent/50 underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
        {showMoreBrands ? "Hide other brands −" : "Explore other brands +"}
      </button>
      {showMoreBrands && <div id="additional-brands" role="group" aria-label="Other vehicle brands" className="mt-3 flex flex-wrap gap-2">
        {additionalBrands.map(brand => <Link key={brand.id} to={`/gallery/brands/${brand.id}`}
          className={`rounded-full border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent border-white/15 text-white/65 hover:border-accent/60`}>{brand.name}</Link>)}
      </div>}
    </Section>
  );
}
