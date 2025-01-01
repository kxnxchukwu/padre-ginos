import { ReactElement } from "react";

export interface PizzaProps {
  name: string;
  toppings: string | string[];
  image: string;
}

export default function Pizza({
  name,
  toppings,
  image,
}: PizzaProps): ReactElement {
  return (
    <div className="pizza">
      <h2>{name}</h2>
      <ul>
        {Array.isArray(toppings) ? (
          toppings.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>{toppings}</li>
        )}
      </ul>
      <img src={image} alt={name} />
    </div>
  );
}
