import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "type-small flex h-12 min-h-[44px] w-full rounded-sm border border-white/10 bg-black/40 px-4 py-2 font-sans text-white transition-colors focus-visible:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export { Select };
