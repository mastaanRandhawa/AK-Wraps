import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GlassFilter } from "@/components/ui/liquid-glass";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-black animate-page-enter">
      <GlassFilter />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
