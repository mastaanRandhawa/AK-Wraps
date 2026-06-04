import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { whyChooseUs } from "@/content/whyChooseUs";

export function StatsSection() {
  return (
    <Section id="why-us">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="The AK Wraps difference"
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((item, index) => (
          <MotionSection
            key={item.title}
            delay={index * 100}
            className="rounded-2xl bg-cerulean px-8 py-12 text-center shadow-sm transition-transform duration-300 hover:scale-[1.02]"
          >
            <h3 className="font-serif text-xl font-medium text-primary-foreground md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
              {item.description}
            </p>
          </MotionSection>
        ))}
      </div>
    </Section>
  );
}
