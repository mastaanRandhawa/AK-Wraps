import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassEffect } from "@/components/ui/liquid-glass";
import { site } from "@/config/site";
import { serviceOptions } from "@/content/services";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const selectClassName = cn(
  "type-body-sm flex h-11 w-full rounded-none border border-white/15 bg-transparent px-4 py-2 font-sans text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
);

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-24">
      <div>
        <p className="editorial-label mb-5 sm:mb-6">Contact</p>
        <h2 className="type-section font-serif font-medium text-white">
          Send us a message
        </h2>
        <p className="type-body-sm mt-4 max-w-sm font-light text-white/45">
          Tell us about your vehicle and we&apos;ll get back to you with a
          quote.
        </p>
        {submitted ? (
          <p className="mt-12 border border-white/15 px-6 py-5 text-sm text-white">
            Thank you. We&apos;ll be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <Input placeholder="Name" required name="name" />
            <Input type="email" placeholder="Email" required name="email" />
            <Input type="tel" placeholder="Phone number" name="phone" />
            <select
              name="service"
              required
              defaultValue=""
              className={selectClassName}
            >
              <option value="" disabled className="bg-black text-white">
                Service interested in
              </option>
              {serviceOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-black text-white"
                >
                  {option}
                </option>
              ))}
            </select>
            <Textarea
              placeholder="Tell us about your vehicle and project goals..."
              required
              name="message"
              rows={5}
            />
            <Button type="submit" size="lg">
              Send Message
            </Button>
          </form>
        )}
      </div>

      <GlassEffect className="px-6 py-8 sm:px-10 sm:py-12">
        <div className="space-y-10">
          <div className="flex gap-5">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
              strokeWidth={1.5}
            />
            <div>
              <p className="type-caption font-sans font-medium uppercase text-white">
                Visit
              </p>
              <p className="type-body-sm mt-2 font-light text-white/45">
                {site.address}
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <Phone
              className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
              strokeWidth={1.5}
            />
            <div>
              <p className="type-caption font-sans font-medium uppercase text-white">
                Call
              </p>
              <a
                href={`tel:${site.phone}`}
                className="type-body-sm mt-2 block font-light text-white/45 hover:text-white"
              >
                {site.phone}
              </a>
            </div>
          </div>
          <div className="flex gap-5">
            <Mail
              className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
              strokeWidth={1.5}
            />
            <div>
              <p className="type-caption font-sans font-medium uppercase text-white">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="type-body-sm mt-2 block font-light text-white/45 hover:text-white"
              >
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex gap-5">
            <Clock
              className="mt-0.5 h-4 w-4 shrink-0 text-white/40"
              strokeWidth={1.5}
            />
            <div>
              <p className="type-caption font-sans font-medium uppercase text-white">
                Hours
              </p>
              <p className="type-body-sm mt-2 font-light text-white/45">
                {site.hours}
              </p>
            </div>
          </div>
        </div>
      </GlassEffect>
    </div>
  );
}
