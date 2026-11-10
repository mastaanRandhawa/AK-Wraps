import { useState } from "react";
import { Link } from "react-router-dom";
import { Layers, ShieldCheck, Sparkles, Shield, ThermometerSun, Umbrella, Eye, Droplets, Car, PanelsTopLeft, Diamond, ScanLine, Flashlight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCta } from "./ContactCta";

import { JarvisBooking } from "@/components/hero/JarvisBooking";
import { F12Coverage } from "./F12Coverage";
import offer from "@/content/ppf-offer.json";
import about from "@/content/about.json";
import { Award } from "lucide-react";

const treatments = [
  { icon: Sparkles, title: "Paint preparation & polishing", text: "We clean and decontaminate the paint, then polish the finish before fitting the film. Existing chips or paint repairs are reviewed when we assess your vehicle." },
  { icon: ShieldCheck, title: "Full-body self-healing PPF", text: "A clear film follows the contours of the painted panels and helps guard against stone chips and road debris. Its top layer can recover from light surface marks with warmth." },
  { icon: Layers, title: "Gtechniq ceramic coating", text: "A ceramic topcoat over the film adds gloss and helps water bead, making routine washing easier." },
];
const money = (price: number) => "$" + price.toLocaleString("en-CA");
const addOns = [
  { name: "Interior PPF", icon: PanelsTopLeft, description: "Clear film helps keep frequently touched interior surfaces free of scuffs.", areas: ["Gloss trim and console panels", "Cup-holder surrounds and door sills", "Compatible display surfaces"] },
  { name: "Exterior accent trim PPF", icon: Diamond, description: "Protect the small exterior details that pick up marks from washing and daily driving.", areas: ["Window surrounds and pillars", "Grille accents", "Gloss-black and chrome trim"] },
  { name: "Windshield PPF", icon: ScanLine, description: "Clear windshield protection film adds a replaceable layer to the outside of the glass to help reduce road wear.", areas: ["Exterior windshield surface", "Film fit and care for your vehicle"] },
  { name: "Headlight PPF", icon: Flashlight, description: "Clear film helps protect exposed headlight lenses from fine scratches and road grit.", areas: ["Headlight lens faces", "Coverage fitted to the lamp shape"] },
  { name: "Ceramic window tinting", icon: Sun, description: "Ceramic window film helps reduce solar heat in the cabin and UV exposure that can fade upholstery and interior trim.", areas: ["Side and rear window options", "Shade selection for your vehicle"] },
];
const comparisonRows = [
  ["Rock chips & road debris", "—", "✓", "✓"],
  ["Scratches & swirl marks", "Light", "✓ Self-healing", "✓ Self-healing"],
  ["Hydrophobic, easy cleaning", "✓", "Limited", "✓"],
  ["Deep gloss & clarity", "✓", "Good", "✓"],
  ["UV, stains & chemicals", "✓", "✓", "✓"],
  ["Polished paint underneath", "Varies", "Varies", "✓ Included"],
];

const filmBenefits = [
  { icon: Shield, title: "A buffer against gravel", text: "When a tyre kicks up loose grit, the film takes the first hit. That extra layer helps reduce small chips on exposed paint, especially across the bumper and hood." },
  { icon: ThermometerSun, title: "Fine marks soften with warmth", text: "Warmth can help faint wash swirls in the film’s topcoat fade. A deeper cut that breaks through the film needs an inspection." },
  { icon: Umbrella, title: "UV & Stain Resistance", text: "The film helps shield covered paint from UV exposure and everyday contaminants. Rinse off sap, insects and bird droppings promptly to keep the surface clear." },
  { icon: Eye, title: "Your paint colour stays on show", text: "Clear film lets the original colour and metallic flake show through, even across a large panel like the hood." },
  { icon: Droplets, title: "Easier wash days", text: "We apply Gtechniq ceramic coating over the film. Water beads on the coated surface, helping loosen road grime when you rinse the car." },
  { icon: Car, title: "Preserve the finish for resale", text: "A front bumper with fewer stone chips can make a better impression at trade-in. Film helps preserve the condition buyers can see when they walk around your car." },
];
const enquire = "I would like a quote for the " + money(offer.special) + " full-body PPF promotion with Gtechniq ceramic coating.";

export function PpfOverview({ faq, coverageOptions }: { coverageOptions: {id?: string; title:string; text:string}[]; faq: {question: string; answer: string}[] }) {
  const [extras, setExtras] = useState<string[]>([]);
  return <div className="ppf-page text-white">
    <JarvisBooking popupOnly delayMs={5000} initialService="Paint Protection Film" />
    <section className="relative isolate overflow-hidden">
      <img src="/projects/DZqr-WAmsiw.jpg" alt="" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/85 to-black/55" />
      <div className="container-padding mx-auto max-w-6xl pb-12" style={{paddingTop:"calc(var(--navbar-offset) + 2rem)"}}>
        <p className="type-label text-accent">Paint protection film package</p>
        <h1 className="mt-3 text-[clamp(2.6rem,7vw,6rem)] font-black uppercase leading-[0.97] tracking-tighter">Full-body PPF.<br/><span className="text-accent">Ultimate Defence.</span></h1>
        <p className="mt-6 max-w-xl leading-relaxed">Protect your vehicle’s finish against rock chips, scratches, and everyday road hazards with our premium <strong>self-healing Paint Protection Film (PPF)</strong>. Every installation includes professional paint polishing and a <strong>Gtechniq ceramic coating</strong> for enhanced gloss, durability, and protection, all backed by a <strong>10-year warranty</strong>.</p>
        <div className="my-6 flex flex-wrap items-center gap-4"><span className="text-sm uppercase">Regular price<br/><s className="text-xl">{money(offer.regular)}</s></span><span className="ppf-price-display"><span className="ppf-price-label">Starting at</span><strong className="ppf-price-number">{money(offer.special)}</strong><small> CAD</small></span><span className="rounded-full border border-accent px-3 py-1 text-sm">Save {money(offer.regular-offer.special)} CAD</span></div>
        <div className="flex flex-wrap gap-3"><Button asChild><a href="#booking-form">Request this PPF offer</a></Button><Button asChild variant="ghost"><a href="tel:2364125010">Call now</a></Button></div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">{["10-year PPF warranty","Self-healing film","Gtechniq ceramic coating","Professional installation"].map(x=><li key={x}><span className="text-accent">✓ </span>{x}</li>)}</ul>
        <a href={about.award.source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex max-w-full items-center gap-3 rounded-lg border border-accent/50 bg-black/70 px-4 py-3 text-white hover:border-accent focus-visible:outline-accent">
          <Award aria-hidden="true" className="size-7 shrink-0 text-accent"/>
          <span><strong className="block">Award-winning wrap installation quality</strong>
            <span className="block text-sm text-accent underline underline-offset-4">2026 Quality Business Award · Vehicle Wrapping ↗</span>
            <span className="mt-1 block text-sm text-white/80">AK Wraps is among the fewer than 1% of registered Canadian businesses that have earned a Quality Business Award.</span>
          </span>
        </a>
      </div>
    </section>
    <div className="container-padding mx-auto max-w-6xl py-14">
      <section><h2 className="type-section">Inside the package</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">{treatments.map(({icon: Icon,title,text}) =>
          <article key={title} className="ppf-panel rounded-lg border border-white/15 bg-white/[0.04] p-6"><Icon aria-hidden="true" className="mb-5 text-accent"/><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-white/70">{text}</p></article>)}</div>
      </section>
      <F12Coverage/>
      <section className="mt-8"><h2 className="text-2xl font-bold">Film and coverage options</h2><dl className="mt-4 grid gap-4 sm:grid-cols-2">{coverageOptions.map(option => <div key={option.id} id={option.id} className="scroll-mt-28"><dt className="font-bold">{option.title}</dt><dd className="mt-1 text-sm text-white/80">{option.text}</dd></div>)}</dl><Link className="mt-4 inline-block text-accent underline" to="/services/">Explore all services</Link></section>
      <section id="ppf-warranty" aria-labelledby="ppf-warranty-title" className="ppf-panel ppf-warranty mx-auto mt-12 max-w-[25rem] scroll-mt-28 rounded-[20px] border px-6 pb-8 pt-7 text-center">
        <div aria-hidden="true" className="ppf-warranty-type"><span className="block text-[6rem] leading-[.88] text-accent">10</span><span className="block text-2xl leading-none tracking-widest">Years</span></div>
        <p className="mt-9 text-xs font-black uppercase tracking-[.18em] text-accent">Peace of mind</p>
        <h2 id="ppf-warranty-title" className="ppf-warranty-type mt-1 text-[clamp(1.65rem,6.6vw,2rem)] leading-[1.08]">Backed by a 10-year<br/>warranty</h2>
        <p className="mt-5 text-base leading-[1.7]">Your film and its installation are covered for 10 years. Before booking, review the <Link className="underline decoration-accent underline-offset-4" to="/services#warranty">warranty details</Link> for your selected film, including care requirements and exclusions.</p>
        <Button asChild size="lg" className="mt-9 w-full rounded-md"><a href="#booking-form">Book now</a></Button>
      </section>
      <section id="ppf-benefits" className="mt-16 scroll-mt-28"><div className="mx-auto mb-8 max-w-3xl text-center"><p className="type-label text-accent">Film and coating guide</p><h2 className="mt-3 text-4xl font-bold uppercase leading-tight sm:text-5xl">Two layers over your paint</h2>
        <p className="mt-5 text-lg leading-relaxed text-white/80 sm:text-xl">Clear urethane film sits over your paint and helps absorb impacts from gravel and road debris. The Gtechniq ceramic coating goes over the film to add gloss and help water bead, so the surface is easier to wash.</p></div>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {filmBenefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="ppf-panel rounded-xl border border-accent/25 bg-surface p-4">
              <span className="mr-3 inline-grid size-8 align-middle place-items-center rounded-lg border border-accent/35 bg-accent/10 text-accent">
                <Icon aria-hidden="true" size={23}/>
              </span>
              <h3 className="inline align-middle text-lg font-bold">{title}</h3>
              <p className="mt-2 leading-snug text-white/75">{text}</p>
            </article>
          ))}
        </div>
        <div id="ppf-comparison" className="ppf-panel scroll-mt-28 overflow-x-auto rounded-xl border border-accent/20 bg-surface">
          <table aria-label="Paint protection package comparison" className="w-full min-w-[25rem] text-left text-sm leading-snug sm:text-base">
            <thead className="bg-accent/5 text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
              <tr>{["Protection against", "Ceramic only", "PPF only", "Full body + Package"].map(label => (
                <th key={label} scope="col" className="px-3 py-4">{label}</th>
              ))}</tr>
            </thead>
            <tbody>{comparisonRows.map(([label, ...values]) => (
              <tr key={label} className="border-t border-accent/20 last:bg-accent/5">
                <th scope="row" className="px-3 py-4 font-semibold">{label}</th>
                {values.map((value, i) => <td key={i} className={value.startsWith("✓") ? "px-3 py-4 font-bold text-accent" : "px-3 py-4 text-white/75"}>{value}</td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      <section id="ppf-pricing" aria-labelledby="ppf-price-title" className="mx-auto mt-16 max-w-2xl scroll-mt-28 text-center">
        <p className="type-label text-accent">Your investment</p>
        <h2 id="ppf-price-title" className="mt-2 text-3xl font-black uppercase sm:text-4xl">How much does car PPF cost?</h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/75">The full-body price below includes polishing, film and ceramic coating. Full front PPF and individual panels are quoted separately based on vehicle size and paint condition.</p>
        <dl className="ppf-panel mt-7 divide-y divide-accent/20 overflow-hidden rounded-2xl border border-accent/25 bg-surface text-left">
          {["Decontamination wash & full paint polishing", "Self-healing paint protection film installation", "Gtechniq ceramic coating", "10-year PPF warranty", "Optional films and ceramic window tint"].map((label, i) => (
            <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-6" key={label}>
              <dt className="font-semibold">{label}</dt>
              <dd className="max-w-[42%] shrink-0 text-right font-bold text-accent">{i === 4 ? "Quoted separately" : "Included"}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6"><dt>Regular package price</dt><dd><s className="font-semibold text-white/60">{money(offer.regular)}</s></dd></div>
          <div className="flex items-center justify-between gap-4 bg-accent/10 px-4 py-5 sm:px-6"><dt className="ppf-price-label">Starting at</dt><dd className="ppf-price-number text-3xl">{money(offer.special)}</dd></div>
        </dl>
        <Button asChild className="mt-6"><a href="#booking-form">Request a package quote</a></Button>
      </section>
      <section id="ppf-add-ons" className="mt-14 scroll-mt-28">
        <header className="mx-auto mb-4 max-w-2xl text-center">
          <p className="type-label text-accent">Optional add-ons</p>
          <h2 className="mt-3 text-3xl font-bold uppercase">Extend your coverage</h2>
          <p className="mt-4 leading-relaxed text-white/75">Choose the extras you’d like us to price with your full-body package. We’ll confirm fit, coverage and cost for your vehicle.</p>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {addOns.map(({name, icon: Icon, description, areas}) => {
            const selected = extras.includes(name);
            return <article key={name} className="ppf-panel flex flex-col rounded-2xl border border-accent/25 bg-surface p-4">
              <div className="flex items-start justify-between text-accent">
                <Icon aria-hidden="true" className="size-8 rounded-lg border border-accent/30 bg-accent/10 p-2"/>
                <span className="rounded-full border border-dashed border-accent/60 px-3 py-1 text-xs font-bold uppercase">Add-on</span>
              </div>
              <h3 className="mt-2 text-lg font-bold uppercase">{name}</h3>
              <p className="mt-1 leading-snug text-white/75">{description}</p>
              <ul className="my-2 space-y-1">{areas.map(area => <li key={area} className="flex gap-3"><span aria-hidden="true" className="font-bold text-accent">+</span>{area}</li>)}</ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-accent/25 pt-2">
                <span className="text-sm text-white/65">Quoted separately</span>
                <Button type="button" variant={selected ? "outline" : "default"} aria-label={name + " add-on"} aria-pressed={selected} onClick={() => setExtras(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name])}>{selected ? "Remove from quote" : "Add to my quote"}</Button>
              </div>
            </article>;
          })}
        </div>
      </section>
      <section id="ppf-process" className="mt-9 scroll-mt-28">
        <h2 className="text-3xl font-bold">From inspection to handover</h2>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            ["Check and clean the paint", "We inspect each panel, wash the body and lift away stubborn grit that could show through the film."],
            ["Machine-polish the finish", "We polish the paint to reduce haze and fine swirls before the clear film goes on."],
            ["Fit and finish each panel", "We shape the self-healing film to the bodywork, then check the edges and surface of each covered panel."],
            ["Apply the ceramic topcoat", "We apply Gtechniq ceramic coating over the film, allow it to cure and explain how to care for the finish at pickup."],
          ].map(([title, description], index) => (
            <li key={title} className="ppf-panel relative rounded-2xl border border-accent/25 bg-surface px-4 py-4">
              <span aria-hidden="true" className="absolute right-4 top-4 text-xl font-black tabular-nums text-accent/55">0{index + 1}</span>
              <h3 className="pr-9 text-base font-bold uppercase">{title}</h3>
              <p className="mt-1 leading-snug text-white/75">{description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
    <ContactCta variant="contact" offerMessage={enquire} offerExtras={extras}/>
    <div className="container-padding mx-auto max-w-6xl pb-14">
      <section id="ppf-faq" className="mt-14 scroll-mt-28"><h2 className="mb-5 text-3xl font-bold">Car paint protection film questions</h2>{faq.map(item=><details key={item.question} className="border-b border-white/15 py-4"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 max-w-3xl leading-relaxed text-white/70">{item.answer}</p></details>)}<p className="mt-5"><Link className="text-accent underline" to="/projects/ferrari-f12-berlinetta-wrap-ppf/">See a completed PPF job on our Ferrari F12</Link></p></section>
    </div>

  </div>;
}
