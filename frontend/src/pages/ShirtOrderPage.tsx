import { PurchaseOptions } from "@/components/PurchaseOptions";
import { CartLink } from "@/components/CartProvider";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { shirtDesigns } from "@/components/sections/MerchandiseSection";
import { usePageMeta } from "@/hooks/use-page-meta";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ShirtOrderPage() {
  const { shirtId } = useParams();
  const number = Number(shirtId);
  if (!Number.isInteger(number) || number < 1 || number > 4) return <NotFoundPage />;
  return <ShirtOrder key={number} number={number} />;
}
function ShirtOrder({number}: {number:number}) {
  const design = shirtDesigns[number - 1];

  const [active,setActive] = useState(0);
  const gallery = useRef<HTMLDivElement>(null);
  const slides = ["Back", "Front", "Side angle", "Front & back", "Front artwork", "Back artwork"];
  const galleryFiles = number === 1
    ? ["", "lamborghini-front-render.png", "lamborghini-side-render.png", "lamborghini-pair-render.png", "lamborghini-front-artwork.png", "lamborghini-back-artwork.png"]
    : number === 4
    ? ["", "porsche-front-render.png", "porsche-side-render.png", "porsche-pair-render.png", "porsche-front-artwork.png", "porsche-back-artwork.png"]
    : number === 3
    ? ["", "amg-front-render.png", "amg-side-render.png", "amg-pair-render.png", "amg-front-artwork.png", "amg-back-artwork.png"]
    : ["", "ferrari-front-render.png", "ferrari-side-render-v2.png", "ferrari-pair-render.png", "ferrari-f12-front.png", "ferrari-f12-back.png"];
  usePageMeta({title:`${design.name} T-shirt`,description:`Explore the AK Wraps ${design.name} limited edition T-shirt. Sizes XS through XXXL.`, noIndex:true});
  function go(index:number) {
    const next = (index + slides.length) % slides.length;
    gallery.current?.children[next]?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});
  }
  return <main className="container-padding mx-auto max-w-6xl pb-20 text-white" style={{paddingTop:"calc(var(--navbar-offset) + 2rem)"}}>
    <div className="flex items-center justify-between gap-3"><Link to="/merchandise" className="text-sm text-accent">← All merchandise</Link><CartLink /></div>
    <div className="mt-8 grid gap-10 md:grid-cols-2">
      <section aria-label="Shirt image gallery" className="min-w-0">
        <div ref={gallery} tabIndex={0} onKeyDown={e=>{if(e.key === "ArrowRight" || e.key === "ArrowLeft"){e.preventDefault();go(active + (e.key === "ArrowRight" ? 1 : -1));}}} onScroll={e=>setActive(Math.round(e.currentTarget.scrollLeft/e.currentTarget.clientWidth))} className="flex snap-x snap-mandatory overflow-x-auto rounded-xl border border-white/10 bg-black" style={{scrollbarWidth:"none"}}>
          {slides.map((slide,index)=><figure key={slide} className="w-full shrink-0 snap-start p-4"><div className={`flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg ${index === 0 || index >= 4 ? "bg-black" : "bg-[#ededed]"}`}>
            {index===0 ? <div className="relative w-full overflow-hidden" style={{aspectRatio:`${design.width}/${design.height}`}}><img className="absolute max-w-none" src={`${import.meta.env.BASE_URL}merchandise/${number === 1 || number === 3 ? "shirt-collection-clean.png" : "shirt-collection.png"}`} alt={`${design.name} T-shirt back`} style={{width:`${941/design.width*100}%`,left:`${-design.x/design.width*100}%`,top:`${-design.y/design.height*100}%`}}/></div> : <img className={`h-full w-full object-contain ${index > 0 && index < 4 ? "mix-blend-multiply" : ""}`} src={`${import.meta.env.BASE_URL}merchandise/${galleryFiles[index]}`} alt={`${design.name} ${slide.toLowerCase()}`}/>}
          </div><figcaption className="mt-3 text-center text-sm text-white/60">{slide}</figcaption></figure>)}
        </div>
        {slides.length>1 && <div className="mt-4 flex items-center justify-between"><button className="h-11 px-4" aria-label="Previous shirt image" onClick={()=>go(active-1)}>←</button><p className="text-sm text-white/60">Swipe to explore · {active+1} / {slides.length}</p><button className="h-11 px-4" aria-label="Next shirt image" onClick={()=>go(active+1)}>→</button></div>}
        <p className="mt-4 text-sm text-white/40">{slides.length > 1 ? "Product mockups show the front, side angle and paired views. Original print artwork is included for a closer look." : "Front and side-view photos are coming soon."}</p>
      </section>
      <section><p className="type-label text-accent">Limited Edition Collection</p><h1 className="mt-4 text-3xl font-semibold">{design.name}</h1><p className="mt-3 text-white/50">Shirt {String(number).padStart(2,"0")} · Black</p>
        <p className="mt-6 flex gap-4 items-center"><del className="text-xl text-white/40"><span className="sr-only">Original price </span>$60.00</del><span className="text-3xl font-semibold text-accent"><span className="sr-only">Discounted price </span>$39.99</span></p>
        <PurchaseOptions productId={number} />
      </section>
    </div>
  </main>;
}






