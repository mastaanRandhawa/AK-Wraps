import { Link } from "react-router-dom";
import { useCart } from "@/components/CartProvider";
import { itemKey, money, products, subtotal } from "@/lib/cart";
import { usePageMeta } from "@/hooks/use-page-meta";
export function CartPage({ checkout = false }: { checkout?: boolean }) {
  const { items, quantity, remove } = useCart();
  usePageMeta({ title: checkout ? "Checkout" : "Your cart", description: "Review your AK Wraps merchandise order.", noIndex: true });
  return <div className="container-padding mx-auto max-w-5xl pb-24 text-white" style={{paddingTop:"calc(var(--navbar-offset) + 2rem)"}}>
    <Link to="/merchandise" className="text-accent">← Continue shopping</Link><h1 className="mt-8 text-4xl font-semibold">{checkout ? "Checkout" : "Your cart"}</h1>
    {!items.length ? <div className="mt-8 rounded-xl border border-white/15 p-8"><p>Your cart is empty.</p><Link to="/merchandise" className="mt-4 inline-block text-accent">Explore the collection →</Link></div> : <>
      <ul className="mt-8 space-y-4">{items.map(item => { const product = products[item.productId-1]; const key = itemKey(item); return <li key={key} className="flex flex-wrap items-center justify-between gap-5 rounded-xl border border-white/15 p-5">
        <div className="min-w-0 flex-1"><Link className="text-lg font-semibold" to={`/merchandise/${item.productId}`}>{product.name}</Link><p className="mt-1 text-white/60">{money(product.cents)} {item.productId === 5 ? "per collection" : "each"}</p>
          {item.sizes.map((size,index) => <p key={index} className="mt-1 text-sm text-white/60">{item.productId === 5 ? `${products[index].name}: ` : "Size: "}{size}</p>)}
        </div><div><label className="text-sm">Quantity<select className="ml-3 rounded border border-white/25 bg-black px-3 py-2" value={item.quantity} onChange={event => quantity(key,Number(event.target.value))}>{Array.from({length:99},(_,i)=><option key={i+1}>{i+1}</option>)}</select></label><p className="mt-3 text-right font-semibold">{money(product.cents * item.quantity)}</p><button onClick={() => remove(key)} className="mt-3 w-full text-right text-sm text-white/60 underline" aria-label={`Remove ${product.name}, ${item.sizes.join(', ')}`}>Remove</button></div>
      </li>; })}</ul>
      <section className="mt-8 rounded-xl border border-accent/30 p-6"><h2 className="text-xl font-semibold">Order summary</h2><div className="mt-5 flex justify-between"><span>Merchandise subtotal</span><strong>{money(subtotal(items))}</strong></div><p className="mt-3 text-sm text-white/60">Shipping and applicable taxes are not included.</p>
        {checkout ? <><p className="mt-6 text-white/70">Online payments are not open yet. Your cart is saved on this device; no order has been placed or charged.</p><button disabled className="mt-5 w-full rounded-full bg-white/10 px-6 py-3 text-white/50">Payment coming soon</button><Link to="/cart" className="mt-4 inline-block text-accent">← Back to cart</Link></> : <Link to="/checkout" className="mt-6 block rounded-full bg-accent px-6 py-3 text-center font-semibold text-black">Continue to checkout</Link>}
      </section>
    </>}
  </div>;
}
