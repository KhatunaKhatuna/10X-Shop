import type { Product } from "@/types";
import ProductCard from "./ProductCard";

export interface ProductGridProps {
  products: Product[];
  onAdd: (product: Product) => void;
  className?: string;
}

export default function ProductGrid({
  products,
  onAdd,
  className = "",
}: ProductGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6 lg:gap-8 ${className}`}
      data-testid="product-grid"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
