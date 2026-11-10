import { WarrantySummary } from "@/components/sections/WarrantySummary";
import { ServicePageLinks } from "@/pages/SearchPage";
import { HeroSection } from "@/components/hero/HeroSection";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingStrip } from "@/components/sections/PricingStrip";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  featuredServices,

  pricing,
  faqs,
} from "@/content/services";
import { usePageMeta } from "@/hooks/use-page-meta";

import servicePages from "@/content/service-guides";

const guides: Record<string, string> = {
  "vinyl-wraps": "/services/car-wraps/",
  ppf: "/services/paint-protection-film/",
  "window-tints": "/services/window-tint/",
  "ceramic-paint-correction": "/services/ceramic-coating/",
};

export function ServicesPage() {
  usePageMeta({
    title: "Services",
    description:
      "Vinyl wraps, paint protection film, window tint, ceramic coating, wide body kits, and custom paint matching in Delta, BC.",
  });

  return (
    <>
      <HeroSection
        page="services"
        title="Our Services"
        badge="What We Do"
        className="services-index-hero"
      />

      <section id="services" aria-label="Browse our ten services" className="container-padding mx-auto max-w-7xl relative z-10 -mt-4 scroll-mt-28 pb-6 sm:-mt-6">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5">
          {featuredServices.map((service, index) => (
            <li key={service.id} className="min-w-0">
              <Link to={guides[service.id] ?? `/services/${service.id}/`}
                className="group relative isolate flex h-full min-h-56 flex-col justify-end overflow-hidden rounded-xl border border-[#276071] bg-[#060d12] p-3 text-white transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-72 sm:p-6 lg:min-h-80">
                <img src={service.image} alt="" loading={index < 2 ? "eager" : "lazy"} className="absolute inset-0 -z-20 size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"/>
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,8,13,.15)_0%,rgba(2,8,13,.12)_23%,rgba(2,8,13,.9)_62%,#02080d_100%)]"/>
                <span className="mb-auto self-start rounded-sm border border-white/20 bg-black/85 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">Service {String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-8 text-xl font-bold leading-tight sm:text-3xl">{service.title}</h2>
                <p className="mt-1 text-sm leading-snug text-white/85">{service.tagline}</p>
                <span className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-xs font-semibold text-accent sm:text-sm">
                  Explore service <ArrowUpRight aria-hidden="true" size={16}/>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ServicePageLinks />
      </section>

      <Section variant="default">
        <SectionHeading
          eyebrow="Categories"
          title="Everything we offer"
          align="center"
        />
        <MotionReveal>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.filter(page => page.category).map((cat) => (
              <div
                key={cat.title}
                className="bg-black p-[var(--spacing-card-padding)]"
              >
                <h3 className="type-card font-bold uppercase text-white">
                  <Link to={`/services/${cat.slug}/`}>{cat.category}</Link>
                </h3>
                <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {cat.sections.filter(item => item.id).map((item) => (
                    <li key={item.id} className="type-small font-light text-muted-foreground">
                      <Link className="underline decoration-accent/40 underline-offset-4 hover:text-accent" to={item.destination ? `/services/${item.destination}/` : `/services/${cat.slug}/#${item.id}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MotionReveal>
      </Section>

      <Section variant="muted" fullWidth>
        <div className="mx-auto max-w-7xl container-padding">
          <SectionHeading
            eyebrow="Pricing"
            title="A quote built around your vehicle"
            description="Your chosen material, covered panels, paint condition and installation details shape the estimate. Confirm preparation, timing and product-specific warranty terms before booking."
            align="center"
          />
          <PricingStrip items={pricing} />
        </div>
      </Section>

      <WarrantySummary />
      <Section>
        <SectionHeading eyebrow="FAQ" title="Common questions" align="center" />
        <MotionReveal>
          <Accordion type="single" collapsible className="mx-auto max-w-xl">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionReveal>
      </Section>
    </>
  );
}

