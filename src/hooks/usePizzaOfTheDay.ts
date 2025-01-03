import { useEffect, useState } from "react";
import { PizzaType } from "../../types";

export default function usePizzaOfTheDay(): PizzaType | null {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState<PizzaType | null>(null);

  async function fetchPizzaOfTheDay(): Promise<void> {
    const response = await fetch("/api/pizza-of-the-day");
    const data = await response.json();
    if (!response.ok || !data || data.error) {
      setPizzaOfTheDay(null);
    }
    setPizzaOfTheDay(data);
  }

  useEffect(() => {
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
}
