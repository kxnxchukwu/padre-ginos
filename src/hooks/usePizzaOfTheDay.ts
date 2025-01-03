import { useEffect, useState } from "react";
import { PizzaType } from "../../types";
const apiUrl = import.meta.env.VITE_API_URL;

export default function usePizzaOfTheDay(): PizzaType | null {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState<PizzaType | null>(null);

  async function fetchPizzaOfTheDay(): Promise<void> {
    const response = await fetch(`${apiUrl}/api/pizza-of-the-day`);
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
