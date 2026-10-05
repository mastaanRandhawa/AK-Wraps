import { lazy, Suspense } from "react";
const CartPage = lazy(() => import("@/pages/CartPage").then(m => ({default: m.CartPage})));
const CollectionPage = lazy(() => import("@/pages/CollectionPage").then(m => ({default: m.CollectionPage})));
const ShirtOrderPage = lazy(() => import("@/pages/ShirtOrderPage").then(m => ({default: m.ShirtOrderPage})));
const MerchandisePage = lazy(() => import("@/pages/MerchandisePage").then(m => ({default: m.MerchandisePage})));
const SearchPage = lazy(() => import("@/pages/SearchPage").then(m => ({default: m.SearchPage})));

import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageLoader } from "@/components/layout/PageLoader";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ServicesPage = lazy(() =>
  import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })),
);
const GalleryPage = lazy(() =>
  import("@/pages/GalleryPage").then((m) => ({ default: m.GalleryPage })),
);
const BrandAlbumPage = lazy(() => import("@/pages/BrandAlbumPage").then(m => ({ default: m.BrandAlbumPage })));
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const PrivacyPage = lazy(() =>
  import("@/pages/LegalPage").then((m) => ({ default: m.PrivacyPage })),
);
const TermsPage = lazy(() =>
  import("@/pages/LegalPage").then((m) => ({ default: m.TermsPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

const ProjectPage = lazy(() => import("@/pages/ProjectPage").then(m => ({default:m.ProjectPage})));

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="landingPage" element={<Navigate to="/" replace />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
<Route path="services/:serviceSlug" element={<SearchPage />} /><Route path="service-areas" element={<SearchPage />} />
          <Route path="projects/:projectSlug" element={<ProjectPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="gallery/brands/:brandId" element={<BrandAlbumPage />} />
          <Route path="merchandise" element={<MerchandisePage />} />
          <Route path="cart" element={<CartPage />} />
<Route path="checkout" element={<CartPage checkout />} />
<Route path="merchandise/5" element={<CollectionPage />} />
<Route path="merchandise/:shirtId" element={<ShirtOrderPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}



