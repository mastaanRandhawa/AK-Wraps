import { memo, useEffect, useState, type ImgHTMLAttributes } from "react";
import { imageFallback } from "@/content/images";
import { cn } from "@/lib/utils";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const SafeImage = memo(function SafeImage({
  src,
  fallback = imageFallback,
  className,
  alt = "",
  loading = "lazy",
  decoding = "async",
  onError,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallback);
    setHasError(false);
  }, [src, fallback]);

  const handleError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
      setHasError(true);
    }
    onError?.(e);
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      referrerPolicy="no-referrer"
      className={cn(
        "block max-w-full bg-beige object-cover",
        hasError && imgSrc === fallback && "opacity-90",
        className,
      )}
      onError={handleError}
    />
  );
});
