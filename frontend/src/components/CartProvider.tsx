import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { addItem, itemKey, validItem, type CartItem } from "@/lib/cart";
const storageKey = "ak-wraps-cart-v1";
const CartContext = createContext<{
  items: CartItem[]; add: (item: CartItem) => void;
  quantity: (key: string, value: number) => void; remove: (key: string) => void;
} | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || "[]"); return Array.isArray(saved) ? saved.filter(validItem).reduce(addItem, [] as CartItem[]) : []; }
    catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(items)); } catch { /* Shopping still works when storage is unavailable. */ } }, [items]);
  return <CartContext.Provider value={{ items, add: item => setItems(old => addItem(old, item)),
    quantity: (key, value) => { if (Number.isInteger(value) && value >= 1 && value <= 99) setItems(old => old.map(i => itemKey(i) === key ? { ...i, quantity: value } : i)); },
    remove: key => setItems(old => old.filter(i => itemKey(i) !== key)),
  }}>{children}</CartContext.Provider>;
}
export function useCart() { const cart = useContext(CartContext); if (!cart) throw new Error("Cart provider missing"); return cart; }
export function CartLink({ floating = false }: { floating?: boolean }) {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  if (floating && !count) return null;
  return <Link to="/cart" className={`${floating ? "fixed bottom-5 right-5 z-40 shadow-xl" : ""} inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black px-5 py-3 text-sm text-accent`} aria-label={`View cart, ${count} items`}><ShoppingBag size={18} />Cart ({count})</Link>;
}
