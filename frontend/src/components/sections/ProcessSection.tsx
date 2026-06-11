import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <Section variant="default" id="process">
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
            <MotionReveal key={step.id} delay={index * 80} variant="fadeUp">
              <div className="grid grid-cols-[3rem_1fr] gap-8 sm:grid-cols-[4rem_1fr] sm:gap-12">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-surface">
                    <Icon className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                  </div>
                  {!isLast && (
                    <div className="process-line mt-4 w-px flex-1" aria-hidden="true" />
                  )}
                </div>
                <div className={cn("pb-16 sm:pb-20", isLast && "pb-0")}>
                  <p className="type-label mb-4">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-card font-sans font-semibold uppercase text-white">
                    {step.title}
                  </h3>
                  <p className="type-small mt-3 max-w-md font-light text-muted-foreground sm:mt-4">
                    {step.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}
