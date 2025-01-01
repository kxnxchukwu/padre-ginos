export type PizzaSizes = {
  S: number;
  M: number;
  L: number;
};

export type PizzaType = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  sizes: PizzaSizes;
};

export type PizzaTypes = PizzaType[];

export type CartItem = {
  pizza: PizzaType;
  size: keyof PizzaSizes;
  price: number;
};

export type CartItemType = CartItem[];
