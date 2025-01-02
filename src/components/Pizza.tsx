import { ReactElement } from "react";

export interface PizzaProps {
  name: string;
  toppings: string | string[];
  image?: string;
}

export const DEFAULT_IMG_SRC: string = "https://picsum.photos/200/300";

export default function Pizza({
  name,
  toppings,
  image,
}: PizzaProps): ReactElement {
  return (
    <div className="pizza">
      <h1>{name}</h1>
      <ul>
        {Array.isArray(toppings) ? (
          toppings.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>{toppings}</li>
        )}
      </ul>
      <img src={image ? image : DEFAULT_IMG_SRC} alt={name} />
    </div>
  );
}
