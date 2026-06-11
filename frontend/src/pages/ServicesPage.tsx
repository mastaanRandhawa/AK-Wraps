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
import { ServiceCarousel } from "@/components/sections/ServiceCarousel";
import {
  featuredServices,
  serviceCategories,
  pricing,
  faqs,
} from "@/content/services";

export function ServicesPage() {
  return (
    <>
      <HeroSection
        page="services"
        title="Our Services"
        description="Vinyl wraps, paint protection film, window tints, ceramic coating, and custom fabrication."
        badge="What We Do"
      />

      <ServiceCarousel services={featuredServices} showPartners={false} />

      <Section variant="default">
        <SectionHeading
          eyebrow="Categories"
          title="Everything we offer"
          align="center"
        />
        <MotionReveal>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-black p-[var(--spacing-card-padding)]"
              >
                <h3 className="type-card font-bold uppercase text-white">
                  {cat.title}
                </h3>
                <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="type-small font-light text-muted-foreground">
                      {item}
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
            title="Starting prices"
            description="Final pricing depends on vehicle size, condition, and complexity."
            align="center"
          />
          <PricingStrip items={pricing} />
        </div>
      </Section>

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
