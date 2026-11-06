import { AuthProvider, CartProvider, ThemeProvider } from "@/context";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
