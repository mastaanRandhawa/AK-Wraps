import { CartLink } from "@/components/CartProvider";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const shirts = [1, 2, 3, 4, 5];
export const shirtDesigns = [
  { name: "Lamborghini Aventador SVJ", x: 475, y: 550, width: 435, height: 435 },
  { name: "Ferrari F12 Berlinetta", x: 30, y: 1010, width: 435, height: 515 },
  { name: "Mercedes-AMG GT", x: 25, y: 530, width: 435, height: 435 },
  { name: "Porsche 911 GT3 RS", x: 480, y: 1020, width: 435, height: 515 },
];
function ShirtPreview({number, duplicate = false}: {number: number; duplicate?: boolean}) {
  if (number === 5) return <Link to="/merchandise/5" tabIndex={duplicate ? -1 : undefined} className="block w-64 shrink-0 rounded-xl border border-accent/40 bg-white/[0.03] p-4 text-center sm:w-72">
<div className="flex h-64 items-center justify-center overflow-hidden rounded-lg bg-black"><img src={import.meta.env.BASE_URL + "merchandise/shirt-collection-clean.webp"} alt="All four AK Wraps shirts" loading="lazy" className="h-full w-full object-contain" /></div>
<h3 className="mt-5 text-lg font-semibold text-white">Full Collection</h3><p className="mt-2 text-sm text-white/45">All four shirts · Choose your sizes</p><p className="mt-3 flex items-center justify-center gap-3"><del className="text-base text-white/45">$240.00</del><span className="text-xl font-semibold text-accent">$129.99</span></p></Link>;
  const design = shirtDesigns[number - 1];
  return <Link to={`/merchandise/${number}`} tabIndex={duplicate ? -1 : undefined} className="block focus-visible:outline-2 focus-visible:outline-accent w-64 shrink-0 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center sm:w-72">
    <div className="flex h-64 items-center justify-center overflow-hidden rounded-lg bg-black">
      <img src={`${import.meta.env.BASE_URL}merchandise/shirt-${number}-back.webp`} alt={`${design.name} black T-shirt, back view with printed AK Wraps design`} width={design.width} height={design.height} loading="lazy" decoding="async" className="h-full w-full object-contain" />
    </div>
    <h3 className="mt-5 text-lg font-semibold text-white">{design.name}</h3>
        <p className="mt-2 text-sm text-white/45">Shirt {number.toString().padStart(2, "0")}</p>
    <p className="mt-3 flex items-center justify-center gap-3">
      <span className="sr-only">Original price</span><del className="text-base text-white/45">$60.00</del>
      <span className="sr-only">Discounted price</span><span className="text-xl font-semibold text-accent">$39.99</span>
    </p>
  </Link>;
}
export function MerchandiseSection({full = false}: {full?: boolean}) {
  const [paused, setPaused] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const resumeAt = useRef(0);
  const touching = useRef(false);
  const delay = () => { resumeAt.current = performance.now() + 3500; };
  useEffect(() => {
    const el = viewport.current;
    if (!el || paused || full || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0, previous = performance.now(), visible = false, position = el.scrollLeft;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(el);
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 50); previous = now;
      if (visible && !document.hidden && !touching.current && now > resumeAt.current && !el.matches(":focus-visible") && !el.querySelector(":focus-visible")) {
        const group = el.firstElementChild?.firstElementChild as HTMLElement | null;
        const width = group?.offsetWidth ?? 0;
        if (width) { position = (position + elapsed * 0.035) % width; el.scrollLeft = position; }
      }
      else { position = el.scrollLeft; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused, full]);
  return <section id="merchandise" className="overflow-hidden bg-black py-14 sm:py-20" aria-labelledby="merchandise-title">
    <div className="container-padding mx-auto mb-8 flex max-w-7xl flex-wrap items-end justify-between gap-5"><div><p className="type-label text-accent">AK Wraps & Customs</p>{full ? <h1 id="merchandise-title" className="type-section mt-3 text-white">Merchandise</h1> : <h2 id="merchandise-title" className="type-section mt-3 text-white">Merchandise</h2>}<p className="mt-4 text-sm text-white/50">Limited Edition Collection</p></div><CartLink />{!full && <div className="flex items-center gap-5"><Link to="/merchandise" className="text-sm text-accent">View merchandise →</Link><button onClick={() => setPaused(!paused)} aria-pressed={paused} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">{paused ? "Resume" : "Pause"}</button></div>}</div>
    {full ? <div className="container-padding mx-auto flex max-w-7xl flex-wrap justify-center gap-6">{shirts.map(n => <ShirtPreview key={n} number={n}/>)}</div> : <div ref={viewport} className="merchandise-window" role="region" aria-label="Shirt collection. Swipe to browse." tabIndex={0} onTouchStart={() => { touching.current = true; }} onTouchEnd={() => { touching.current = false; delay(); }} onTouchCancel={() => { touching.current = false; delay(); }} onPointerDown={delay} onWheel={delay} onKeyDown={delay}><div className="merchandise-track">{[0,1].map(copy => <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 gap-6 pr-6">{shirts.map(n => <ShirtPreview key={n} number={n} duplicate={copy === 1}/>)}</div>)}</div></div>}
  </section>;
}









