import { HeroSection } from "@/components/hero/HeroSection";
import { Section } from "@/components/ui/Section";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { site } from "@/config/site";
import { usePageMeta } from "@/hooks/use-page-meta";

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalContent {
  title: string;
  description: string;
  badge: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

function LegalPage({ content }: { content: LegalContent }) {
  usePageMeta({ title: content.title, description: content.description });

  return (
    <>
      <HeroSection
        page="legal"
        title={content.title}
        description={content.description}
        badge={content.badge}
      />
      <Section>
        <MotionReveal variant="fade">
          <article className="mx-auto max-w-3xl">
            <p className="type-label text-white/40">
              Last updated: {content.updated}
            </p>
            <p className="type-small mt-6 font-light leading-relaxed text-muted-foreground">
              {content.intro}
            </p>
            {content.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="type-card font-bold uppercase text-white">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="type-small mt-4 font-light leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </MotionReveal>
      </Section>
    </>
  );
}

const privacyContent: LegalContent = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your information.",
  badge: "Legal",
  updated: "June 2026",
  intro: `${site.name} ("we", "us") respects your privacy. This policy explains what information we collect when you use our website or contact us, and how we use it. By using this site you agree to the practices described here.`,
  sections: [
    {
      heading: "Information we collect",
      body: [
        "When you submit our contact or quote form, we collect the details you provide — typically your name, email, phone number, vehicle information, and message. We only collect what you choose to share with us.",
        "Like most websites, our hosting and analytics providers may automatically record limited technical data such as your browser type, device, and general location for security and performance purposes.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "We use your information solely to respond to your enquiry, prepare quotes, schedule appointments, and provide our services. We do not sell your personal information to third parties.",
      ],
    },
    {
      heading: "Third-party services",
      body: [
        "Contact form submissions are processed through a secure third-party form service that forwards your message to our inbox. Embedded maps are provided by Google. These providers handle data under their own privacy policies.",
      ],
    },
    {
      heading: "Data retention & your rights",
      body: [
        "We keep enquiry information only as long as needed to serve you and meet our records obligations. You may request access to, correction of, or deletion of your personal information at any time.",
      ],
    },
    {
      heading: "Contact us",
      body: [
        `For any privacy questions or requests, email us at ${site.email} or call ${site.phone}.`,
      ],
    },
  ],
};

const termsContent: LegalContent = {
  title: "Terms & Conditions",
  description: "The terms that govern use of our website and services.",
  badge: "Legal",
  updated: "June 2026",
  intro: `These terms govern your use of the ${site.name} website. Please read them carefully. If you do not agree, please do not use this site.`,
  sections: [
    {
      heading: "Use of this website",
      body: [
        "The content on this website is provided for general information about our services. We strive for accuracy but make no warranty that all information is complete or current. Pricing shown is a starting estimate and is not a binding quote.",
      ],
    },
    {
      heading: "Quotes & services",
      body: [
        "Final pricing depends on your vehicle's size, condition, and the complexity of the work. A confirmed quote is provided only after we assess your vehicle. Bookings, deposits, and workmanship are subject to the service agreement provided at the time of booking.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "All branding, text, imagery, and design on this website are the property of their respective owners and may not be reproduced without permission.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, we are not liable for any indirect or incidental damages arising from use of this website. Our services are covered separately by the warranty and agreement provided with each job.",
      ],
    },
    {
      heading: "Contact us",
      body: [
        `Questions about these terms? Email ${site.email} or call ${site.phone}.`,
      ],
    },
  ],
};

export function PrivacyPage() {
  return <LegalPage content={privacyContent} />;
}

export function TermsPage() {
  return <LegalPage content={termsContent} />;
}
