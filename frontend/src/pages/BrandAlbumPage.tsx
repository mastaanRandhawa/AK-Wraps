import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { vehicleBrands, additionalBrands } from "@/content/brands";
import projects from "@/content/vehicle-projects.json";
import { usePageMeta } from "@/hooks/use-page-meta";

export function BrandAlbumPage() {
  const { brandId: selected } = useParams();
  const currentBrand = [...vehicleBrands, ...additionalBrands].find(b => b.id === selected);
  const filtered = projects.filter(p => p.brand === selected).sort((a,b) => Number(b.amg)-Number(a.amg));
  usePageMeta({ title: currentBrand ? currentBrand.name + " Album" : "Album not found", description: "Explore vehicle projects completed at AK Wraps & Customs." });
  if (!currentBrand) return <Section className="mt-[var(--navbar-offset)]"><h1 className="text-3xl">Album not found</h1><Link to="/#vehicle-brands" className="mt-6 inline-block text-accent">Back to brands</Link></Section>;
  return <Section className="mt-[var(--navbar-offset)]">
    <Link to="/#vehicle-brands" className="inline-block rounded py-2 text-sm text-accent focus-visible:outline-2 focus-visible:outline-accent">← Back to all brands</Link>
      <div id="vehicle-projects" className="mt-10 scroll-mt-32">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl font-semibold sm:text-5xl">{currentBrand.name} Album</h1>
          <p role="status" className="text-xs text-white/50">{filtered.length} {filtered.length === 1 ? "project" : "projects"} · July 2024 onward</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => <Fragment key={project.id}>
            {selected === "mercedes-amg" && (index === 0 || project.amg !== filtered[index - 1].amg) &&
              <h4 className="col-span-full mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{project.amg ? "AMG models" : "Mercedes-Benz models"}</h4>}
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: ${project.description}. View original Instagram post (opens in a new tab)`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] transition-colors hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-accent">
              <div className="aspect-[4/3] overflow-hidden bg-black">
                <img src={project.image} alt={project.title} loading="lazy" width={640} height={480}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold">{project.title}</h4>
                <p className="mt-2 min-h-10 text-sm leading-relaxed text-white/60">{project.description}</p>
                <span className="mt-5 inline-block text-xs font-medium uppercase tracking-widest text-accent">View on Instagram ↗</span>
              </div>
            </a>
          </Fragment>)}
        </div>
        <p className="mt-6 text-xs text-white/40">Projects from our Instagram archive, starting July 3, 2024. Some vehicles appear across multiple service visits.</p>
      </div>

  </Section>;
}
