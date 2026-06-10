import { Link } from "react-router-dom";
import { InstagramCarousel } from "@/components/sections/InstagramCarousel";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export function GalleryPreview() {
  return (
    <>
      <InstagramCarousel id="gallery" limit={6} />
      <div className="mx-auto -mt-6 max-w-6xl px-5 pb-16 text-center sm:px-8 sm:pb-20 lg:px-12">
        <Button variant="secondary" size="lg" asChild>
          <Link to={routes.gallery}>View Full Gallery</Link>
        </Button>
      </div>
    </>
  );
}
