import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/app/router";
import { getRouterBasename } from "@/config/routes";

export default function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <AppRouter />
    </BrowserRouter>
  );
}
