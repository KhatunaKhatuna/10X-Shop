import { CartProvider, ThemeProvider } from "@/context";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
