import { ReactElement, useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PizzaOfTheDay from "../components/PizzaOfTheDay";
import Header from "../components/Header";
import { CartContext } from "../contexts";
import { CartItemType } from "../../types";

const DevTools = (): ReactElement | null => {
  if (process.env.NODE_ENV === "development") {
    return (
      <>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  }
  return null;
};

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState<CartItemType>([]);
    return (
      <>
        <CartContext.Provider value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext.Provider>
        <DevTools />
      </>
    );
  },
});
