import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navigation, site } from "@/config/site";
import { routes } from "@/config/routes";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { useSmartNavbar } from "@/hooks/use-smart-navbar";

const menuNavigation = [
  { name: "Home", href: routes.home },
  ...navigation,
];

function isActivePath(pathname: string, href: string) {
  if (href === routes.home) {
    return pathname === routes.home;
  }
  if (href === routes.gallery) {
    return (
      pathname === routes.gallery || pathname.startsWith(`${routes.gallery}/`)
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function RedGridIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-grid grid-cols-3 gap-[3px]", className)}
      aria-hidden="true"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] w-[3px] rounded-full bg-accent sm:h-1 sm:w-1"
        />
      ))}
    </span>
  );
}

function MenuPillButton({
  onClick,
  label = "Menu",
  className,
  ...props
}: {
  onClick: () => void;
  label?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const isClose = label.toLowerCase() === "close";

  return (
    <button
      type="button"
      onClick={onClick}
      {...props}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-white/10 bg-surface-panel/80 px-3 py-2 backdrop-blur-sm transition-colors duration-300 hover:bg-surface-panel sm:gap-3 sm:px-5 sm:py-2.5",
        className,
      )}
    >
      <span className="type-nav font-bold uppercase tracking-[0.2em] text-white">
        {label}
      </span>
      {isClose ? (
        <span className="inline-flex h-4 w-4 items-center justify-center border border-accent">
          <X className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
        </span>
      ) : (
        <RedGridIcon />
      )}
    </button>
  );
}

function MenuOverlay({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              src={images.menuOverlayBg}
              alt=""
              className="h-full w-full scale-105 object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[40px]" />
          </div>

          <div className="relative z-10 mx-auto h-[var(--navbar-offset)] w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex h-full items-center justify-between">
              <Link
                to={routes.home}
                onClick={onClose}
                className="transition-opacity hover:opacity-80"
              >
                <Logo />
              </Link>
              <MenuPillButton onClick={onClose} label="Close" />
            </div>
          </div>

          <nav className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
            {menuNavigation.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "block py-1 text-center font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold uppercase leading-none tracking-tight transition-colors duration-300",
                      active ? "text-accent" : "text-white hover:text-white/80",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16">
            <p className="type-caption font-semibold uppercase tracking-[0.28em] text-white/45">
              // Business Inquiries //
            </p>
            <p className="type-body-sm mt-3 font-medium text-white">
              <a
                href={`tel:${site.phone.replace(/\D/g, "")}`}
                className="transition-colors hover:text-white/80"
              >
                {site.phone}
              </a>
            </p>
            <p className="type-body-sm mt-1 font-light text-white/65">
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isVisible = useSmartNavbar(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isVisible && open) setOpen(false);
  }, [isVisible, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        data-navbar-zone
        data-nav-background="dark"
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 transition-[transform,opacity,visibility] duration-300 ease-out will-change-transform",
          isVisible ? "translate-y-0" : "-translate-y-full",
          open && "invisible opacity-0",
        )}
        aria-hidden={!isVisible || open}
      >
        <nav
          aria-label="Main"
          className={cn(
            "pointer-events-none relative transition-colors duration-300",
            open
              ? "bg-transparent"
              : scrolled
                ? "bg-black/80 backdrop-blur-md"
                : "bg-transparent",
          )}
        >
          <div className="pointer-events-auto relative mx-auto flex h-[var(--navbar-offset)] w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link
              to={routes.home}
              className="shrink-0 transition-opacity hover:opacity-80"
              tabIndex={isVisible || open ? undefined : -1}
              aria-label={`${site.name} home`}
            >
              <Logo />
            </Link>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9">
              {navigation.map((item) => {
                const active = isActivePath(location.pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    tabIndex={isVisible ? undefined : -1}
                    className={cn(
                      "type-nav relative font-bold uppercase tracking-[0.18em] transition-colors duration-300",
                      active
                        ? "text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-accent after:transition-all"
                        : "text-white/70 hover:text-white",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <MenuPillButton
              onClick={() => setOpen(true)}
              label="Menu"
              className="ml-auto shrink-0"
              aria-label="Open menu"
              aria-expanded={open}
              tabIndex={isVisible && !open ? undefined : -1}
            />
          </div>
        </nav>
      </header>

      <MenuOverlay
        open={open}
        onClose={() => setOpen(false)}
        pathname={location.pathname}
      />
    </>
  );
}
