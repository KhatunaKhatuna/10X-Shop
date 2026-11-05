import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";
import type { Product } from "@/types";
import { STORAGE_KEYS, discountedPrice, setInLocalStorage } from "@/utils";
import {
  CartContext,
  cartReducer,
  initCartState,
  type CartContextType,
  type PromoResult,
} from "./CartContext";

const VALID_PROMO_CODE = "10X10";
const PROMO_DISCOUNT_PERCENT = 10;
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING_COST = 10;

/**
 * Provides shopping cart state, derived metrics (totals, counts),
 * and mutation handlers to the entire application.
 * Synchronizes cart state to localStorage automatically.
 */
export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, undefined, initCartState);

  // Synchronize cart state changes to localStorage
  useEffect(() => {
    setInLocalStorage(STORAGE_KEYS.CART, state);
  }, [state]);

  // Derived metrics
  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(() => {
    const rawSubtotal = state.items.reduce((sum, item) => {
      const unitPrice = discountedPrice(item.price, item.discountPercentage);
      return sum + unitPrice * item.quantity;
    }, 0);
    return Math.round(rawSubtotal * 100) / 100;
  }, [state.items]);

  const discount = useMemo(() => {
    if (state.promoCode === VALID_PROMO_CODE) {
      return Math.round(subtotal * (PROMO_DISCOUNT_PERCENT / 100) * 100) / 100;
    }
    return 0;
  }, [state.promoCode, subtotal]);

  const shipping = useMemo(() => {
    if (state.items.length === 0) {
      return 0;
    }
    const discountedSubtotal = subtotal - discount;
    return discountedSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_COST;
  }, [state.items.length, subtotal, discount]);

  const total = useMemo(() => {
    if (state.items.length === 0) {
      return 0;
    }
    return Math.max(
      0,
      Math.round((subtotal - discount + shipping) * 100) / 100,
    );
  }, [state.items.length, subtotal, discount, shipping]);

  // Action handlers
  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", product, qty: quantity });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "SET_QTY", productId, qty: quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const applyPromo = useCallback((code: string): PromoResult => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      return { success: false, message: "Please enter a promo code." };
    }
    if (normalized !== VALID_PROMO_CODE) {
      return { success: false, message: "Invalid promo code." };
    }
    dispatch({ type: "APPLY_PROMO", code: normalized });
    return {
      success: true,
      message: `Promo code ${VALID_PROMO_CODE} applied! 10% discount added.`,
    };
  }, []);

  const removePromo = useCallback(() => {
    dispatch({ type: "REMOVE_PROMO" });
  }, []);

  const value: CartContextType = useMemo(
    () => ({
      items: state.items,
      promoCode: state.promoCode ?? null,
      totalItems,
      subtotal,
      discount,
      shipping,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyPromo,
      removePromo,
    }),
    [
      state.items,
      state.promoCode,
      totalItems,
      subtotal,
      discount,
      shipping,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyPromo,
      removePromo,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
