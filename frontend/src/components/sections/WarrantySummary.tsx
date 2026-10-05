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
  if (compact) return <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm text-white/65">{warranties.map(item => <span key={item.title}><strong className="font-medium text-white">{item.duration}</strong> · {item.title}: {item.coverage.toLowerCase()}</span>)}<Link className="text-accent underline underline-offset-4" to="/services#warranty">Warranty details</Link></div>;
  return <section ref={section} id="warranty" className="container-padding mx-auto max-w-7xl scroll-mt-28 py-12 sm:py-16"><p className="type-label text-accent">Standing behind the finish</p><h2 className="type-section mt-4 text-white">Warranty coverage</h2><div className="mt-8 grid gap-5 sm:grid-cols-2">{warranties.map(item => <article key={item.title} className="rounded-lg border border-white/15 bg-white/[0.03] p-6"><p className="text-3xl font-semibold text-white">{item.duration}</p><h3 className="mt-3 text-xl text-white">{item.title}</h3><p className="mt-3 text-white/65">{item.description}</p><p className="mt-3 text-sm text-accent">{item.coverage}</p></article>)}</div><p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/60">Contact us to review the written terms, exclusions and care requirements for your chosen installation before booking. If you have a concern about completed work, send your vehicle details and a description so we can assess it.</p><Link to="/contact#booking-form" className="mt-4 inline-flex min-h-11 items-center text-accent underline">Discuss your coverage</Link></section>;
}
