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
      aria-label={site.name}
    >
      <span
        className={cn(
          "type-brand-main uppercase text-white",
          size === "lg" && "text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] tracking-[0.28em]",
        )}
      >
        {site.nameShort}
      </span>
      <span
        className={cn(
          "mt-1.5 block h-[1.5px] bg-accent",
          size === "default" ? "w-[min(100%,5.5rem)] sm:w-[min(100%,6.75rem)]" : "w-[min(100%,8.5rem)]",
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
