import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import warranties from "@/content/warranties.json";

export function WarrantySummary({ compact = false }: { compact?: boolean }) {
  const section = useRef<HTMLElement>(null);
  const { hash } = useLocation();
  useEffect(() => {
    if (compact || hash !== "#warranty") return;
    const frame = requestAnimationFrame(() => section.current?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [compact, hash]);
  if (compact) return <section className="mt-6" aria-label="Warranty coverage">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4">
      <h3 className="text-lg font-bold text-white">Warranty coverage</h3>
      <Link className="inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" to="/services#warranty">Warranty details →</Link>
    </div>
    <dl className="grid gap-2 sm:grid-cols-3">{warranties.map(item => (
      <div key={item.title} className="flex items-center justify-between gap-3 rounded-lg border border-accent/30 border-l-2 border-l-accent bg-gradient-to-r from-accent/10 to-black px-4 py-3 sm:flex-col sm:items-start">
        <dt className="font-semibold text-white">{item.title}<span className="block text-xs font-normal text-white/70">{item.coverage}</span></dt>
        <dd className="shrink-0 text-2xl font-bold text-accent">{item.duration}</dd>
      </div>
    ))}</dl>
  </section>;
  return <section ref={section} id="warranty" className="container-padding mx-auto max-w-7xl scroll-mt-28 py-12 sm:py-16"><p className="type-label text-accent">Standing behind the finish</p><h2 className="type-section mt-4 text-white">Warranty coverage</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{warranties.map(item => <article key={item.title} className="rounded-lg border border-white/15 bg-white/[0.03] p-6"><p className="text-3xl font-semibold text-white">{item.duration}</p><h3 className="mt-3 text-xl text-white">{item.title}</h3><p className="mt-3 text-white/65">{item.description}</p><p className="mt-3 text-sm text-accent">{item.coverage}</p></article>)}</div><p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/60">Contact us to review the written terms, exclusions and care requirements for your chosen installation before booking. If you have a concern about completed work, send your vehicle details and a description so we can assess it.</p><Link to="/contact#booking-form" className="mt-4 inline-flex min-h-11 items-center text-accent underline">Discuss your coverage</Link></section>;
}
