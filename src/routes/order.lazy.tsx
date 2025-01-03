import {
  ChangeEvent,
  ReactElement,
  useState,
  useEffect,
  useContext,
  FormEvent,
} from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../components/Pizza";
import type { PizzaTypes, PizzaType, PizzaSizes } from "../../types";
import Cart from "../components/Cart";
import { getIntl } from "../utils/intlUtil";
import { CartContext } from "../contexts";
const apiUrl = import.meta.env.VITE_API_URL;

type PizzaSize = keyof PizzaSizes;

export const Route = createLazyFileRoute("/order")({
  component: () => <Order />,
});

function Order(): ReactElement {
  const cartContext = useContext(CartContext);
  const intl = getIntl();
  const [pizzaTypes, setPizzaTypes] = useState<PizzaTypes>([]);
  const [pizzaType, setPizzaType] = useState<string>("pepperoni");
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = cartContext;

  let price, selectedPizza: PizzaType | undefined;

  if (!loading) {
    selectedPizza = pizzaTypes.find(
      (pizza) => pizza.id === pizzaType,
    ) as PizzaType;
    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  async function fetchPizzaTypes(): Promise<void> {
    const response = await fetch(`${apiUrl}/api/pizzas`);
    const data = await response.json();
    setPizzaTypes(data);
    setLoading(false);
  }

  async function checkout(): Promise<void> {
    setLoading(true);

    await fetch(`${apiUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    if (pizza) {
      setCart([
        ...cart,
        {
          pizza: selectedPizza as PizzaType,
          size: pizzaSize,
          price: pizza.sizes[pizzaSize],
        },
      ]);
    }
  };

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setPizzaType(event.target.value as string)
                }
                id="pizza-type"
                name="pizza-type"
                value={pizzaType}
              >
                {pizzaTypes.map((pizza) => {
                  return (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    type="radio"
                    id="pizza-s"
                    name="pizza-size"
                    value="S"
                    checked={pizzaSize === "S"}
                    onChange={() => setPizzaSize("S")}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    type="radio"
                    id="pizza-m"
                    name="pizza-size"
                    value="M"
                    checked={pizzaSize === "M"}
                    onChange={() => setPizzaSize("M")}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    type="radio"
                    id="pizza-l"
                    name="pizza-size"
                    value="L"
                    checked={pizzaSize === "L"}
                    onChange={() => setPizzaSize("L")}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <Pizza
                name={selectedPizza?.name as string}
                toppings={selectedPizza?.description as string}
                image={selectedPizza?.image as string}
              />
            )}
            <p>{price}</p>
          </div>
        </form>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Cart items={cart} checkout={checkout} />
      )}
    </div>
  );
}
