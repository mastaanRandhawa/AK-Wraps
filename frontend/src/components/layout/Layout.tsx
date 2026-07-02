import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const location = useLocation();
  const prefersMotion = usePrefersMotion();

  // Reset scroll to the top on route change (in-page hash links keep their target).
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <a
        href="#main-content"
        className="sr-only z-[200] rounded-md bg-accent px-4 py-2 font-sans text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {prefersMotion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE_PREMIUM }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}
