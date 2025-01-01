const Pizza = (props) => {
  const { name, toppings } = props;
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("ul", {}, [
      React.createElement("li", {}, toppings[0]),
      React.createElement("li", {}, toppings[1]),
      React.createElement("li", {}, toppings[2]),
    ]),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's!"),
    React.createElement(Pizza, {
      name: "Cheese Pizza",
      toppings: ["Cheese", "Tomato Base", "Goat Cheese"],
    }),
    React.createElement(Pizza, {
      name: "Pepperoni Pizza",
      toppings: ["Cheese", "Tomato Base", "Pepperoni"],
    }),
    React.createElement(Pizza, {
      name: "Hawaiian Pizza",
      toppings: ["Cheese", "Tomato Base", "Pineapple"],
    }),
    React.createElement(Pizza, {
      name: "Veggie Pizza",
      toppings: ["Cheese", "Tomato Base", "Mushrooms"],
    }),
    React.createElement(Pizza, {
      name: "Americano Pizza",
      toppings: ["French Fries", "Tomato Base", "Bacon and Hot Dogs"],
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
