import { HeroSection } from "@/components/hero/HeroSection";
import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  featuredServices,
  serviceCategories,
  pricing,
  faqs,
} from "@/content/services";
import { Car } from "lucide-react";

export function ServicesPage() {
  return (
    <>
      <HeroSection
        page="services"
        title="Our Services"
        description="Vehicle wraps, paint protection, ceramic coating, and premium automotive customization."
      />

      <Section>
        <SectionHeading
          eyebrow="Categories"
          title="Everything we offer"
          align="center"
        />
        <MotionSection>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-gray-soft bg-warm-white p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-blue-light/40">
                  <Car className="h-5 w-5 text-charcoal" />
                </div>
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {cat.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MotionSection>
      </Section>

      <ServiceCards services={featuredServices} />

      <Section variant="warm">
        <SectionHeading
          eyebrow="Pricing"
          title="Starting prices"
          description="Final pricing depends on vehicle size, condition, and project complexity."
          align="center"
        />
        <MotionSection>
          <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-cream shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-soft bg-beige/50">
                  <th className="px-6 py-4 font-serif text-lg font-medium text-charcoal">
                    Service
                  </th>
                  <th className="px-6 py-4 text-right font-serif text-lg font-medium text-charcoal">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row) => (
                  <tr
                    key={row.service}
                    className="border-b border-gray-soft/60 last:border-0"
                  >
                    <td className="px-6 py-4 text-charcoal">{row.service}</td>
                    <td className="px-6 py-4 text-right font-medium text-charcoal">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionSection>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Common questions" align="center" />
        <MotionSection>
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionSection>
      </Section>

      <CtaBand />
    </>
  );
}
