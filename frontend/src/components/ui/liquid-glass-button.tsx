import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { liquidGlassShadow } from "@/components/ui/glass-filter";

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-charcoal hover:scale-105 duration-300",
        gold: "bg-transparent text-charcoal hover:scale-105 duration-300",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-white/30 bg-white/10 hover:bg-white/20",
        ghost: "hover:bg-white/10",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 text-xs gap-1.5 px-4",
        lg: "h-10 px-6",
        xl: "h-11 px-7 text-sm",
        nav: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "nav",
    },
  },
);

function LiquidGlassLayers() {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-full",
          liquidGlassShadow,
          "transition-all",
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full border border-white/30 bg-white/15 backdrop-blur-xl"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
    </>
  );
}

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean;
  }) {
  const classes = cn(
    "relative inline-flex items-center justify-center font-semibold",
    liquidbuttonVariants({ variant, size, className }),
  );

  if (asChild) {
    return (
      <span className={cn("relative inline-flex", className)}>
        <LiquidGlassLayers />
        <Slot data-slot="button" className={cn(classes, "relative z-10")} {...props}>
          {children}
        </Slot>
      </span>
    );
  }

  return (
    <button
      type="button"
      data-slot="button"
      className={classes}
      {...props}
    >
      <LiquidGlassLayers />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

type ColorVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze";

interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant;
}

const colorVariants: Record<
  ColorVariant,
  {
    outer: string;
    inner: string;
    button: string;
    textColor: string;
    textShadow: string;
  }
> = {
  default: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button: "bg-gradient-to-b from-[#B9B9B9] to-[#969696]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  primary: {
    outer: "bg-gradient-to-b from-[#16425b] to-[#2f6690]",
    inner: "bg-gradient-to-b from-gold via-beige to-cream",
    button: "bg-gradient-to-b from-gold to-[#245a7d]",
    textColor: "text-primary-foreground",
    textShadow: "[text-shadow:_0_-1px_0_rgb(22_66_91_/_40%)]",
  },
  success: {
    outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner: "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    button: "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner: "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    button: "bg-gradient-to-b from-[#F08D8F] to-[#A45253]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
  gold: {
    outer: "bg-gradient-to-b from-[#16425b] to-[#2f6690]",
    inner: "bg-gradient-to-b from-[#f3f4f2] via-[#3a7ca5] to-[#81c3d7]",
    button: "bg-gradient-to-b from-gold to-[#245a7d]",
    textColor: "text-primary-foreground",
    textShadow: "[text-shadow:_0_-1px_0_rgb(22_66_91_/_30%)]",
  },
  bronze: {
    outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]",
    inner: "bg-gradient-to-b from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]",
    button: "bg-gradient-to-b from-[#FFE3C9] to-[#A36F3D]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]",
  },
};

const metalButtonVariants = (
  variant: ColorVariant = "default",
  isPressed: boolean,
  isHovered: boolean,
  isTouchDevice: boolean,
) => {
  const colors = colorVariants[variant];
  const transitionStyle = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

  return {
    wrapper: cn(
      "relative inline-flex transform-gpu rounded-full p-[1.25px] will-change-transform",
      colors.outer,
    ),
    wrapperStyle: {
      transform: isPressed
        ? "translateY(2.5px) scale(0.99)"
        : "translateY(0) scale(1)",
      boxShadow: isPressed
        ? "0 1px 2px rgba(0, 0, 0, 0.15)"
        : isHovered && !isTouchDevice
          ? "0 4px 12px rgba(0, 0, 0, 0.12)"
          : "0 3px 8px rgba(0, 0, 0, 0.08)",
      transition: transitionStyle,
      transformOrigin: "center center",
    },
    inner: cn(
      "absolute inset-[1px] transform-gpu rounded-full will-change-transform",
      colors.inner,
    ),
    innerStyle: {
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none",
    },
    button: cn(
      "relative z-10 m-[1px] inline-flex h-10 transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded-full px-5 py-2 text-sm leading-none font-semibold will-change-transform outline-none",
      colors.button,
      colors.textColor,
      colors.textShadow,
    ),
    buttonStyle: {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none",
    },
  };
};

const ShineEffect = ({ isPressed }: { isPressed: boolean }) => (
  <div
    className={cn(
      "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300 rounded-full",
      isPressed ? "opacity-20" : "opacity-0",
    )}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
  </div>
);

export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ children, className, variant = "gold", ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);

    React.useEffect(() => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
    }, []);

    const variants = metalButtonVariants(
      variant,
      isPressed,
      isHovered,
      isTouchDevice,
    );

    return (
      <div className={variants.wrapper} style={variants.wrapperStyle}>
        <div className={variants.inner} style={variants.innerStyle} />
        <button
          ref={ref}
          className={cn(variants.button, className)}
          style={variants.buttonStyle}
          {...props}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => {
            setIsPressed(false);
            setIsHovered(false);
          }}
          onMouseEnter={() => {
            if (!isTouchDevice) setIsHovered(true);
          }}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          onTouchCancel={() => setIsPressed(false)}
        >
          <ShineEffect isPressed={isPressed} />
          {children}
          {isHovered && !isPressed && !isTouchDevice && (
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/5" />
          )}
        </button>
      </div>
    );
  },
);
MetalButton.displayName = "MetalButton";

export { LiquidButton, liquidbuttonVariants };
