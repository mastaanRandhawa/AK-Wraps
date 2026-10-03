import { Link, useParams } from "react-router-dom";
import pages from "@/content/search-pages.json";
import { HeroSection } from "@/components/hero/HeroSection";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "@/pages/NotFoundPage";
export function SearchPage() {
  const { serviceSlug } = useParams();
  const page = pages.find(p => p.slug === (serviceSlug ?? "service-areas"));
  return page ? <SearchContent page={page} /> : <NotFoundPage />;
}
function SearchContent({page}: {page: typeof pages[number]}) {
  usePageMeta({ title: page.title, description: page.description });
  return <><HeroSection page="services" title={page.title} description={page.intro} />
    <section className="container-padding mx-auto max-w-5xl py-16 text-white"><Link to="/services" className="text-accent">Explore all services</Link>
      <div className="mt-10 grid gap-10 sm:grid-cols-2">{page.sections.map(s => <article key={s.title}><h2 className="text-2xl font-semibold">{s.title}</h2><p className="mt-4 leading-relaxed text-white/65">{s.text}</p></article>)}</div>
      <h2 className="mt-14 text-2xl font-semibold">Your questions answered</h2>{page.faq.map(f => <article className="mt-6" key={f.question}><h3 className="text-lg font-semibold">{f.question}</h3><p className="mt-2 leading-relaxed text-white/65">{f.answer}</p></article>)}
      <div className="mt-10 flex flex-wrap gap-4"><Button asChild><Link to="/contact#booking-form">Book an appointment</Link></Button><Button asChild variant="secondary"><Link to="/gallery">See our work</Link></Button></div>
      <ServicePageLinks />
    </section></>;
}
export function ServicePageLinks() {
  return <nav aria-label="Service and location guides" className="mt-10 flex flex-wrap gap-x-6 gap-y-4">{pages.map(p => <Link className="text-sm text-accent underline underline-offset-4" key={p.slug} to={p.slug === "service-areas" ? "/service-areas" : `/services/${p.slug}`}>{p.title}</Link>)}</nav>;
}
