import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza
        name="Margherita"
        toppings={["tomato", "mozzarella"]}
        image="/public/pizzas/big_meat.webp"
      />
      <Pizza
        name="Pepperoni"
        toppings="pepperoni"
        image={"/public/pizzas/pepperoni.webp"}
      />
      <Pizza
        name="Hawaiian"
        toppings={["ham", "pineapple"]}
        image={"/public/pizzas/hawaiian.webp"}
      />
    </div>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
