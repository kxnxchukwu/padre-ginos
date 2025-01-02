import { ReactElement, useDebugValue } from "react";
import usePizzaOfTheDay from "../hooks/usePizzaOfTheDay";
import { getIntl } from "../utils/intlUtil";

export default function PizzaOfTheDay(): ReactElement {
  const intl = getIntl();
  const pizzaOfTheDay = usePizzaOfTheDay();
  useDebugValue(
    pizzaOfTheDay
      ? `Pizza of the day: ${pizzaOfTheDay.id} ${pizzaOfTheDay.name}`
      : "Loading...",
  );

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>;
  }

  const { name, description, sizes, image } = pizzaOfTheDay;

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <p className="pizza-of-the-day-price">From {intl.format(sizes.S)}</p>
        </div>
        <img className="pizza-of-the-day-image" src={image} alt={name} />
      </div>
    </div>
  );
}
