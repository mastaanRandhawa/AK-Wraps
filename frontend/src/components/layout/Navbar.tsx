import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navigation, site } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useSmartNavbar } from "@/hooks/use-smart-navbar";
import { Button } from "@/components/ui/button";

function isActivePath(pathname: string, href: string) {
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-navbar-zone
      data-nav-background="dark"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out will-change-transform",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
      aria-hidden={!isVisible}
    >
      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-none relative mx-auto flex h-[var(--navbar-offset)] max-w-[100vw] items-center justify-between gap-4 border-b px-5 transition-colors duration-200 sm:gap-6 sm:px-8 lg:px-12",
          scrolled || open
            ? "border-white/10 bg-black/95"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          to={routes.home}
          className="type-brand pointer-events-auto shrink-0 font-serif font-medium tracking-tight text-white transition-opacity hover:opacity-70"
          tabIndex={isVisible ? undefined : -1}
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const active = isActivePath(location.pathname, item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                tabIndex={isVisible ? undefined : -1}
                className={cn(
                  "type-nav pointer-events-auto font-sans font-medium uppercase transition-colors duration-200",
                  active ? "text-white" : "text-white/45 hover:text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
          <Button
            variant="default"
            size="sm"
            className="pointer-events-auto"
            asChild
          >
            <Link to={routes.contact} tabIndex={isVisible ? undefined : -1}>
              Book Now
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/70 md:hidden"
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
              className="pointer-events-auto fixed inset-0 z-40 bg-black/80 md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="pointer-events-auto absolute inset-x-0 top-full z-50 border-b border-white/10 bg-black p-6 md:hidden">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const active = isActivePath(location.pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "type-nav px-2 py-4 font-sans font-medium uppercase transition-colors",
                        active
                          ? "text-white"
                          : "text-white/50 hover:text-white",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <Button variant="default" className="mt-6 w-full" asChild>
                <Link to={routes.contact} onClick={() => setOpen(false)}>
                  Book Appointment
                </Link>
              </Button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
