import { render } from "vitest-browser-react";
import { expect, it, describe } from "vitest";
import Header from "../components/Header";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import { CartContext } from "../contexts";
import { CartItem, CartItemType } from "../../types";

const SAMPLE_CART_ITEM: CartItem = {
  price: 12.25,
  size: "M",
  pizza: {
    id: "1",
    name: "Pizza of the Day",
    description: "cheese, pepperoni, mushrooms",
    sizes: { S: 10.15, M: 12.25, L: 14.5 },
    image: "https://picsum.photos/200/300",
    category: "Meat",
  },
};

const SAMPLE_CART: CartItemType = [
  SAMPLE_CART_ITEM,
  SAMPLE_CART_ITEM,
  SAMPLE_CART_ITEM,
];

describe("Header Component Browser Tests", () => {
  it("correctly renders a header with a zero cart count", async () => {
    const rootRoute = createRootRoute({
      component: () => (
        <CartContext.Provider value={[[], () => {}]}>
          <Header />
        </CartContext.Provider>
      ),
    });

    const router = createRouter({ routeTree: rootRoute });
    const screen = render(<RouterProvider router={router}></RouterProvider>);

    const itemsInCart = await screen.getByTestId("cart-number");

    await expect.element(itemsInCart).toBeInTheDocument();
    await expect.element(itemsInCart).toHaveTextContent("0");
  });

  it("correctly renders a header with a three cart count", async () => {
    const rootRoute = createRootRoute({
      component: () => (
        <CartContext.Provider value={[SAMPLE_CART, () => {}]}>
          <Header />
        </CartContext.Provider>
      ),
    });

    const router = createRouter({ routeTree: rootRoute });
    const screen = render(<RouterProvider router={router}></RouterProvider>);

    const itemsInCart = await screen.getByTestId("cart-number");

    await expect.element(itemsInCart).toBeInTheDocument();
    await expect.element(itemsInCart).toHaveTextContent("3");
  });
});
