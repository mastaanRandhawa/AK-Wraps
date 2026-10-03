import { CartProvider, CartLink } from "@/components/CartProvider";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/app/router";
import { getRouterBasename } from "@/config/routes";

export default function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <CartProvider><AppRouter /><CartLink floating /></CartProvider>
    </BrowserRouter>
  );
}
