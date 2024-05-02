import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { CartReducer, productReducer } from "./Reducers";

const Cart = createContext();

// faker.seed(99);

const CartContext = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    inStock: faker.datatype.number({ min: 0, max: 20 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.datatype.number({ min: 1, max: 5 }),
  }));

  const [state, dispatch] = useReducer(CartReducer, {
    product: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

const Context = () => {
  return <div></div>;
};

export default CartContext;

export const CartState = () => {
  return useContext(Cart);
};
