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

export function ServicesPage() {
  return (
    <>
      <HeroSection
        page="services"
        title="Our Services"
        description="Premium detailing, paint correction, ceramic coating, and paint protection."
      />

      <Section variant="elevated">
        <SectionHeading
          eyebrow="Categories"
          title="Everything we offer"
          align="center"
        />
        <MotionSection>
          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <div
                key={cat.title}
                className="bg-black px-5 py-8 sm:px-8 sm:py-12"
              >
                <h3 className="type-caption font-sans font-semibold uppercase text-white">
                  {cat.title}
                </h3>
                <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="type-body-sm font-light text-white/45">
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

      <Section variant="muted">
        <SectionHeading
          eyebrow="Pricing"
          title="Starting prices"
          description="Final pricing depends on vehicle size, condition, and complexity."
          align="center"
        />
        <MotionSection>
          <div className="mx-auto max-w-xl overflow-x-auto border border-white/15">
            <table className="w-full min-w-[280px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="type-caption px-5 py-4 font-sans font-medium uppercase text-white sm:px-8 sm:py-5">
                    Service
                  </th>
                  <th className="type-caption px-5 py-4 text-right font-sans font-medium uppercase text-white sm:px-8 sm:py-5">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row) => (
                  <tr
                    key={row.service}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="type-body-sm px-5 py-4 font-light text-white/70 sm:px-8 sm:py-5">{row.service}</td>
                    <td className="type-body-sm px-5 py-4 text-right font-light text-white/45 sm:px-8 sm:py-5">
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
          <Accordion type="single" collapsible className="mx-auto max-w-xl">
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
