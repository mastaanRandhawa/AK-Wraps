import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";
import { usePrefersMotion } from "@/hooks/use-prefers-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const location = useLocation();
  const prefersMotion = usePrefersMotion();

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
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
