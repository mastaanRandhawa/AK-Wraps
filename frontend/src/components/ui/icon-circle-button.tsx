import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconCircleButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
  active?: boolean;
}

export function IconCircleButton({
  icon: Icon,
  label,
  onClick,
  className,
  active = false,
}: IconCircleButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-full border transition-all duration-300",
        active
          ? "border-white/40 bg-white/5 text-white"
          : "border-white/20 text-white/40 hover:border-white/40 hover:text-white",
        className,
      )}
      aria-label={label}
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </motion.button>
  );
}
