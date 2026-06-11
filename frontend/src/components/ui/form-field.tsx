import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, htmlFor, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="type-label block text-white/70">
        {label}
      </label>
      {children}
    </div>
  );
}
