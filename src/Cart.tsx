import { ReactElement } from "react";
import { CartItemType } from "../types";
import { getIntl } from "./utils/intlUtil";
import { sumCartItems } from "./utils/sumCartItems";

export interface CartProps {
  items: CartItemType;
  checkout: () => Promise<void>;
}

export default function Cart({ items, checkout }: CartProps): ReactElement {
  const intl = getIntl();
  const total = sumCartItems(items);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -{" "}
            <span className="type">{item.pizza.name}</span> -{" "}
            <span className="price">{intl.format(item.price)}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
