import type { CartItem } from "./cart";

export type OrderStatus = "Processing" | "Shipped" | "Delivered";
// რეალური გადახდის მეთოდები ამ პროექტში არ გამოიყენება; PaymentMethod საჭირო არ არის.

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
}
export interface Order {
  id: number; // Date.now() განთავსებისას
  number: string; // "10X-00001" - რიგითი, 5 ციფრი
  items: CartItem[];
  shipping: ShippingInfo;
  status?: OrderStatus;
  // შეკვეთა იქმნება ლოკალურად; ბარათის მონაცემები/გადახდის მეთოდი არ არსებობს
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  placedAt: string; // new Date().toISOString()
}
