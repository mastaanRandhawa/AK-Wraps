import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "type-body-sm flex min-h-[120px] w-full rounded-none border border-white/15 bg-transparent px-4 py-3 font-sans text-white transition-colors placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
