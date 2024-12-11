import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import Cart from "./Cart";
import { clearItems } from "../redux/cart/slice";

const mockStore = configureStore([]);
const initialStateEmpty = {
  cart: { items: [], totalPrice: 0 },
};
const initialStateWithItems = {
  cart: {
    items: [
      { id: 0, name: "Піца Мюнхенська", count: 2, price: 310 },
      { id: 1, name: "Піца Хамон", count: 1, price: 245 },
    ],
    totalPrice: 865,
  },
};

describe("Cart component", () => {
  it("renders empty cart when no items", () => {
    const store = mockStore(initialStateEmpty);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/корзина пуста/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Скоріше за все, ви ще не замовили піццу/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/перейти на головну сторінку/i)
    ).toBeInTheDocument();
  });

  it("renders cart with items", () => {
    const store = mockStore(initialStateWithItems);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/корзина/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Всього піц: 3 шт."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Сума замовлення: 865 грн."
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/Піца Мюнхенська/i)).toBeInTheDocument();
    expect(screen.getByText(/Піца Хамон/i)).toBeInTheDocument();
  });

  it("calls clearItems action on clear button click", () => {
    const store = mockStore(initialStateWithItems);
    store.dispatch = jest.fn();

    jest.spyOn(window, "confirm").mockImplementation(() => true);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/очистити корзину/i));

    expect(store.dispatch).toHaveBeenCalledWith(clearItems());

    jest.restoreAllMocks();
  });
});
