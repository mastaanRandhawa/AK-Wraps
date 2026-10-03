export const shirtSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
export const products = [
  { id: 1, name: "Lamborghini Aventador SVJ", cents: 3999 },
  { id: 2, name: "Ferrari F12 Berlinetta", cents: 3999 },
  { id: 3, name: "Mercedes-AMG GT", cents: 3999 },
  { id: 4, name: "Porsche 911 GT3 RS", cents: 3999 },
  { id: 5, name: "Full Collection", cents: 12999 },
];
export type CartItem = { productId: number; sizes: string[]; quantity: number };
export const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
export const itemKey = (item: CartItem) => `${item.productId}:${item.sizes.join(",")}`;
export function validItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CartItem;
  return products.some(p => p.id === item.productId) && Array.isArray(item.sizes)
    && item.sizes.length === (item.productId === 5 ? 4 : 1)
    && item.sizes.every(s => shirtSizes.includes(s))
    && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99;
}
export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  if (!validItem(item)) return items;
  const key = itemKey(item);
  return items.some(i => itemKey(i) === key)
    ? items.map(i => itemKey(i) === key ? { ...i, quantity: Math.min(99, i.quantity + item.quantity) } : i)
    : [...items, item];
}
export const subtotal = (items: CartItem[]) => items.reduce((sum, item) => sum + products.find(p => p.id === item.productId)!.cents * item.quantity, 0);
