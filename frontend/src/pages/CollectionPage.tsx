import { Link } from "react-router-dom";
import { PurchaseOptions } from "@/components/PurchaseOptions";
import { CartLink } from "@/components/CartProvider";
import { products } from "@/lib/cart";
import { usePageMeta } from "@/hooks/use-page-meta";
export function CollectionPage() {
  usePageMeta({ title: "Full T-shirt Collection", description: "All four AK Wraps shirts for $129.99. Choose a size for each design.", noIndex: true });
  return <div className="container-padding mx-auto max-w-6xl pb-20 text-white" style={{paddingTop:"calc(var(--navbar-offset) + 2rem)"}}>
    <div className="flex items-center justify-between"><Link to="/merchandise" className="text-accent">← All merchandise</Link><CartLink /></div>
    <div className="mt-8 grid gap-10 md:grid-cols-2"><img src={`${import.meta.env.BASE_URL}merchandise/shirt-collection-clean.webp`} alt="The full four-shirt AK Wraps collection" className="w-full rounded-xl" />
      <section><p className="type-label text-accent">Limited Edition Collection</p><h1 className="mt-4 text-3xl font-semibold">Full Collection</h1><p className="mt-3 text-white/60">One of each design. Four black shirts, one collection.</p>
        <p className="mt-6 flex items-center gap-4"><del className="text-xl text-white/40">$240.00</del><strong className="text-3xl text-accent">$129.99</strong></p>
        <p className="mt-3 text-sm text-white/60">Save $29.97 compared with buying all four at their current individual prices.</p>
        <ul className="mt-5 space-y-2">{products.slice(0,4).map(p => <li key={p.id}><Link className="text-accent underline underline-offset-4" to={`/merchandise/${p.id}`}>{p.name}</Link></li>)}</ul>
        <PurchaseOptions productId={5} />
      </section></div>
  </div>;
}
