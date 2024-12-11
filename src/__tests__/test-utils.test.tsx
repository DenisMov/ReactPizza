import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { screen } from "@testing-library/react";

import { renderWithStore } from "./test-utils";
import cartReducer from "../redux/cart/slice";

const Cart = () => {
  return (
    <div>
      <h1>Shopping Cart</h1>
    </div>
  );
};

describe("renderWithStore utility and components", () => {
  test("renders component with store", () => {
    const initialState = {
      cart: {
        items: [],
      },
    };

    renderWithStore(<Cart />, initialState);

    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
  });

  test("updates store state correctly", () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
    });

    renderWithStore(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const newItem = {
      id: 0,
      imageUrl: "https://pizza.png",
      name: "Піца Мюнхенська",
      types: [0, 1],
      sizes: [26, 30, 40],
      price: 310,
      category: 0,
      rating: 4,
    };

    store.dispatch({ type: "cart/addItem", payload: newItem });

    expect(store.getState().cart.items).toEqual([
      {
        ...newItem,
        count: 1,
      },
    ]);
  });
});
