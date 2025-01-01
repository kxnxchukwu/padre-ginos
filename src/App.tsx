import { createRoot } from "react-dom/client";
import Order from "./Order";
import { StrictMode } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";

const App = () => {
  return (
    <StrictMode>
      <div>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </div>
    </StrictMode>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
