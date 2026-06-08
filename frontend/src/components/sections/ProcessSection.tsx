import { MotionSection } from "@/components/ui/motion-section";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Our Process"
        title="Five steps to perfection"
        description="From inspection to final delivery — no detail overlooked."
        align="center"
      />
      <div className="mx-auto max-w-3xl">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === processSteps.length - 1;

          return (
            <MotionSection key={step.id} delay={index * 80}>
              <div className="grid grid-cols-[3rem_1fr] gap-8 sm:grid-cols-[4rem_1fr] sm:gap-12">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/15 bg-surface">
                    <Icon className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                  </div>
                  {!isLast && (
                    <div className="mt-4 w-px flex-1 bg-white/10" aria-hidden="true" />
                  )}
                </div>
                <div className={cn("pb-16 sm:pb-20", isLast && "pb-0")}>
                  <p className="editorial-label mb-4">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-subsection font-sans font-semibold uppercase text-white">
                    {step.title}
                  </h3>
                  <p className="type-body-sm mt-3 max-w-md font-light text-white/45 sm:mt-4">
                    {step.description}
                  </p>
                </div>
              </div>
            </MotionSection>
          );
        })}
      </div>
    </Section>
  );
}
