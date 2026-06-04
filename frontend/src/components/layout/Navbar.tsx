import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useSmartNavbar } from "@/hooks/use-smart-navbar";
import { useNavbarBackground } from "@/hooks/use-navbar-background";

function isActivePath(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isVisible = useSmartNavbar(open);
  const surface = useNavbarBackground();
  const onDark = surface === "dark";

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

  return (
    <header
      data-navbar-zone
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-100 ease-out will-change-transform sm:px-4 sm:pt-4",
        isVisible ? "translate-y-0" : "-translate-y-[calc(100%+0.75rem)]",
      )}
      aria-hidden={!isVisible}
    >
      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-none relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 rounded-lg border bg-transparent px-4 transition-colors duration-[10ms] sm:h-[3.75rem] sm:px-5",
          onDark ? "border-white/35" : "border-charcoal/20",
        )}
      >
        <Link
          to={routes.home}
          className={cn(
            "pointer-events-auto shrink-0 font-serif text-lg font-semibold tracking-tight transition-colors duration-[10ms] sm:text-xl",
            onDark ? "text-warm-white" : "text-charcoal",
          )}
          tabIndex={isVisible ? undefined : -1}
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-3">
          {navigation.map((item) => {
            const active = isActivePath(location.pathname, item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                tabIndex={isVisible ? undefined : -1}
                className={cn(
                  "pointer-events-auto rounded-md px-3 py-2 text-sm font-medium transition-colors duration-[10ms]",
                  onDark
                    ? active
                      ? "bg-white/12 text-warm-white"
                      : "text-warm-white/85 hover:bg-white/8 hover:text-warm-white"
                    : active
                      ? "bg-charcoal/6 text-charcoal"
                      : "text-charcoal/75 hover:bg-charcoal/[0.04] hover:text-charcoal",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            to={routes.contact}
            tabIndex={isVisible ? undefined : -1}
            className="pointer-events-auto ml-1 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold/90"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-[10ms] md:hidden",
            onDark
              ? "text-warm-white hover:bg-white/10"
              : "text-charcoal hover:bg-charcoal/5",
          )}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          tabIndex={isVisible ? undefined : -1}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {open && (
          <>
            <button
              type="button"
              className="pointer-events-auto fixed inset-0 z-40 bg-charcoal/25 backdrop-blur-[1px] md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div
              className={cn(
                "pointer-events-auto absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 rounded-lg border p-2 shadow-lg md:hidden",
                onDark
                  ? "border-white/30 bg-charcoal/95"
                  : "border-charcoal/15 bg-cream/98",
              )}
            >
              {navigation.map((item) => {
                const active = isActivePath(location.pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      onDark
                        ? active
                          ? "bg-white/12 text-warm-white"
                          : "text-warm-white/90 hover:bg-white/8"
                        : active
                          ? "bg-charcoal/6 text-charcoal"
                          : "text-charcoal/80 hover:bg-charcoal/[0.04]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to={routes.contact}
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-gold px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Get a Quote
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
