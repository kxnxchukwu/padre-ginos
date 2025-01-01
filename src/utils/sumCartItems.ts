import { CartItemType } from "../../types";

export function sumCartItems(items: CartItemType): number {
  if (!items.length) return 0;
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}
