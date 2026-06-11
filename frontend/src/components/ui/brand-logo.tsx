import { cn } from "@/lib/utils";

interface BrandLogoProps {
  src: string;
  name: string;
  className?: string;
  interactive?: boolean;
}

export function BrandLogo({
  src,
  name,
  className,
  interactive = false,
}: BrandLogoProps) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const logoPath = src.startsWith("/") ? `${base}${src}` : src;

  return (
    <img
      src={logoPath}
      alt={name}
      className={cn(
        "h-8 w-auto max-w-[120px] object-contain brightness-0 invert sm:h-10",
        interactive
          ? "opacity-40 transition-opacity duration-700 group-hover:opacity-100"
          : "opacity-80",
        className,
      )}
      loading="lazy"
    />
  );
}
