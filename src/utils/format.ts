/**
 * Formats a numeric price into a localized USD currency string.
 * Uses the browser's native Intl.NumberFormat API.
 * Example: 1299.9 -> "$1,299.90"
 *
 * @param amount - The numeric price amount
 * @returns Formatted currency string
 */
export const formatPrice = (amount: number): string => {
  // Number.isFinite already checks for NaN, +Infinity, and -Infinity (returns false for all three)
  if (!Number.isFinite(amount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculates the discounted price given the original price and discount percentage.
 * Formula per PRD: price * (1 - discountPercentage / 100)
 * Uses Math.round to 2 decimal places to eliminate IEEE 754 floating-point inaccuracies.
 * Example: discountedPrice(100, 15) -> 85
 *
 * @param price - The original product price
 * @param discountPercentage - The discount percentage (e.g. 15.4 for 15.4%)
 * @returns The final discounted price as a number
 */
export const discountedPrice = (
  price: number,
  discountPercentage = 0
): number => {
  if (price <= 0) return 0;
  if (discountPercentage <= 0) return price;
  if (discountPercentage >= 100) return 0;

  const finalPrice = price * (1 - discountPercentage / 100);
  return Math.round(finalPrice * 100) / 100;
};

/**
 * Formats a rating number to 1 decimal place.
 * Example: 4.678 -> "4.7"
 *
 * @param rating - The numeric rating
 * @returns Formatted rating string
 */
export const formatRating = (rating: number): string => {
  // Number.isFinite safely guards against NaN and infinite values
  if (!Number.isFinite(rating)) {
    return "0.0";
  }
  return rating.toFixed(1);
};
