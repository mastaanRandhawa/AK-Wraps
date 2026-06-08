import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "type-body-sm flex h-11 w-full rounded-none border border-white/15 bg-transparent px-4 py-2 font-sans text-white transition-colors placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
