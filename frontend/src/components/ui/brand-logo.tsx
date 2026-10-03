import { cn } from "@/lib/utils";

interface BrandLogoProps {
  src: string;
  name: string;
  className?: string;
  interactive?: boolean;
  originalColors?: boolean;
}

export function BrandLogo({
  src,
  name,
  className,
  interactive = false,
  originalColors = false,
}: BrandLogoProps) {
  if (!src) {
    return <span className={cn("inline-flex items-center justify-center text-center font-display text-sm font-semibold uppercase tracking-widest text-white/70", className)}>{name}</span>;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const logoPath = src.startsWith("/") ? `${base}${src}` : src;

  return (
    <img
      src={logoPath}
      alt={name}
      className={cn(
        "h-8 w-auto max-w-[120px] object-contain sm:h-10",
        !originalColors && "brightness-0 invert",
        interactive
          ? "opacity-40 transition-opacity duration-700 group-hover:opacity-100"
          : originalColors ? "opacity-100" : "opacity-80",
        className,
      )}
      loading="lazy"
    />
  );
}
