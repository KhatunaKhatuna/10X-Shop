import type { Product, ProductsResponse } from "@/types";

const BASE_URL = "https://dummyjson.com";

/**
 * Fetches a paginated list of products from DummyJSON API.
 *
 * @param limit - Number of products to retrieve (default: 12 per PRD)
 * @param skip - Number of products to skip for pagination (default: 0)
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to ProductsResponse with products and pagination metadata
 */
export async function fetchProducts(
  limit = 12,
  skip = 0,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`,
    );
  }

  const data: ProductsResponse = await response.json();
  return data;
}

/**
 * Fetches a single product by its unique numeric ID.
 *
 * @param id - The product ID
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to the Product
 */
export async function fetchProductById(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  if (!id || id <= 0 || !Number.isInteger(id)) {
    throw new Error(`Invalid product ID: ${id}`);
  }

  const url = `${BASE_URL}/products/${id}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product: ${response.status} ${response.statusText}`,
    );
  }

  const data: Product = await response.json();
  return data;
}
