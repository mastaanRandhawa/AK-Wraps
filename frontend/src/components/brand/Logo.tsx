import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Slightly larger variant for footer / menu overlay */
  size?: "default" | "lg";
}

export function Logo({ className, size = "default" }: LogoProps) {
  return (
    <div
      className={cn("inline-flex flex-col", className)}
      style={{ zoom: 1.5 }}
      aria-label={site.name}
    >
      <span
        className={cn(
          "relative block overflow-hidden aspect-[1248/104]",
          size === "lg" ? "w-[240px] sm:w-[280px]" : "w-[180px] sm:w-[220px]",
        )}
        aria-hidden="true"
      >
        <span
          className="absolute inset-0 block bg-white"
          style={{
            maskImage: 'url("/ak-wraps-original.png")',
            maskMode: "luminance",
            maskSize: "100% auto",
            maskPosition: "left top",
            maskRepeat: "no-repeat",
          }}
        />
      </span>
      <span
        className={cn(
          "mt-0.5 block h-[1.5px] w-full bg-accent",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "type-brand-script mt-1 text-white/90",
          size === "lg" && "text-[clamp(1.25rem,1rem+1vw,1.75rem)]",
        )}
      >
        {site.nameSub}
      </span>
    </div>
  );
}
