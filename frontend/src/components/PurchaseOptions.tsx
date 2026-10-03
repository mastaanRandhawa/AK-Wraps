import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/components/CartProvider";
import { products, shirtSizes, money } from "@/lib/cart";
export function PurchaseOptions({ productId }: { productId: number }) {
  const product = products[productId - 1];
  const bundle = productId === 5;
  const [sizes, setSizes] = useState<string[]>(Array(bundle ? 4 : 1).fill(""));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useCart();
  return <form className="mt-8" onSubmit={event => { event.preventDefault(); if (sizes.every(s => shirtSizes.includes(s))) { cart.add({ productId, sizes: [...sizes], quantity }); setAdded(true); } }}>
    {sizes.map((size, index) => <label key={index} className="mb-4 block text-sm">{bundle ? products[index].name : "Choose your size"}
      <select required value={size} onChange={event => { setSizes(old => old.map((s, i) => i === index ? event.target.value : s)); setAdded(false); }} className="mt-2 block w-full rounded-lg border border-white/25 bg-black px-4 py-3 text-white">
        <option value="">Select size</option>{shirtSizes.map(s => <option key={s}>{s}</option>)}
      </select></label>)}
    <label className="block text-sm">{bundle ? "Number of collections" : "Quantity"}<select value={quantity} onChange={event => { setQuantity(Number(event.target.value)); setAdded(false); }} className="mt-2 block rounded-lg border border-white/25 bg-black px-4 py-3">{Array.from({length: 10}, (_, i) => <option key={i + 1}>{i + 1}</option>)}</select></label>
    <div className="mt-6 flex justify-between border-t border-white/15 pt-5"><span>Item subtotal</span><strong>{money(product.cents * quantity)}</strong></div>
    <button className="mt-5 w-full rounded-full bg-accent px-6 py-3 font-semibold text-black" type="submit">Add to cart</button>
    <p role="status" className="mt-3 text-sm text-accent">{added ? "Added to your cart." : ""}</p>
    <Link to="/cart" className="mt-2 block text-center text-sm text-accent underline underline-offset-4">View cart & checkout</Link>
  </form>;
}
