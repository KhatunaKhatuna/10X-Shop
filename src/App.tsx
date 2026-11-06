import { ErrorBoundary } from "@/components/common";
import { AuthProvider, CartProvider, ThemeProvider } from "@/context";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
