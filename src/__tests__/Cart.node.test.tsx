import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Cart, { CartProps } from "../components/Cart";
import { CartItemType } from "../../types";
import exp from "constants";

const EMPTY_CART: CartItemType = [];
const SAMPLE_CART: CartItemType = [
  {
    size: "M",
    price: 12.25,
    pizza: {
      id: "1",
      name: "Pizza of the Day",
      description: "cheese, pepperoni, mushrooms",
      sizes: { S: 10.15, M: 12.25, L: 14.5 },
      image: "https://picsum.photos/200/300",
      category: "Meat",
    },
  },
  {
    size: "S",
    price: 10.15,
    pizza: {
      id: "2",
      name: "Veggie Pizza",
      description: "cheese, mushrooms, bell peppers, olives",
      sizes: { S: 9.5, M: 11.75, L: 13.25 },
      image: "https://picsum.photos/200/300",
      category: "Vegetarian",
    },
  },
];
const EMPTY_CART_PROPS: CartProps = {
  items: EMPTY_CART,
  checkout: async () => {},
};
describe("Cart Component", () => {
  it("should render", () => {
    const { getByText } = render(<Cart {...EMPTY_CART_PROPS} />);
    expect(getByText("Cart")).toBeTruthy();
  });

  it("should match Snapshot with empty cart", () => {
    const { asFragment } = render(<Cart {...EMPTY_CART_PROPS} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="cart"
        >
          <h2>
            Cart
          </h2>
          <ul />
          <p>
            Total: €0.00
          </p>
          <button>
            Checkout
          </button>
        </div>
      </DocumentFragment>
    `);
  });

  it("should render the cart items", () => {
    const { getByText, asFragment } = render(
      <Cart items={SAMPLE_CART} checkout={async () => {}} />,
    );
    expect(getByText("Pizza of the Day")).toBeTruthy();
    expect(getByText("Veggie Pizza")).toBeTruthy();

    expect(asFragment()).toMatchSnapshot();
  });
});
