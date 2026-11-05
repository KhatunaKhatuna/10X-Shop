import { useContext } from "react";
import { CartContext, type CartContextType } from "@/context";

/**
 * Custom hook to safely consume the CartContext.
 * Throws an explicit error if used outside of a CartProvider.
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default useCart;

