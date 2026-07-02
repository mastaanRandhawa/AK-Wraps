import { Link } from "react-router-dom";
import { NAVBAR_OFFSET } from "@/config/layout";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";

export function NotFoundPage() {
  usePageMeta({
    title: "Page Not Found",
    description: "The page you are looking for does not exist on AK Wraps & Customs.",
  });

  return (
    <section
      className="relative flex min-h-[80vh] flex-col items-center justify-center bg-black px-5 text-center"
      style={{ paddingTop: NAVBAR_OFFSET }}
    >
      <p className="type-label text-accent">Error 404</p>
      <h1 className="type-page mt-4 font-bold text-white">Page not found</h1>
      <p className="type-small mt-4 max-w-md font-light text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on the road.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link to={routes.home}>Back to home</Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link to={routes.gallery}>View our work</Link>
        </Button>
      </div>
    </section>
  );
}
