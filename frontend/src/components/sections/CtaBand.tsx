import { Link } from "react-router-dom";
import { MotionSection } from "@/components/ui/motion-section";
import { Section } from "@/components/ui/Section";

interface CtaBandProps {
  title?: string;
  description?: string;
}

export function CtaBand({
  title = "Ready to transform your vehicle?",
  description = "Request a quote today and book your vehicle consultation with AK Wraps & Customs.",
}: CtaBandProps) {
  return (
    <Section variant="gold">
      <MotionSection>
        <div className="text-center">
          <h2 className="font-serif text-4xl font-medium text-charcoal md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-charcoal/80 md:text-lg">
            {description}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:bg-charcoal/90"
          >
            Request a Quote
          </Link>
        </div>
      </MotionSection>
    </Section>
  );
}
