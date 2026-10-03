import { MerchandiseSection } from "@/components/sections/MerchandiseSection";
import { usePageMeta } from "@/hooks/use-page-meta";
export function MerchandisePage() {
  usePageMeta({title:"Merchandise",description:"Explore AK Wraps & Customs limited edition shirts and the full four-shirt collection."});
  return <div style={{paddingTop:"var(--navbar-offset)"}}><MerchandiseSection full /></div>;
}
