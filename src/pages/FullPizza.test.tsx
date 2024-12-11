import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import FullPizza from "./FullPizza";
import cartReducer from "../redux/cart/slice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ id: "1" })),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

beforeAll(() => {
  window.alert = jest.fn();
  window.scrollTo = jest.fn();
});

describe("FullPizza component", () => {
  const setupStore = () =>
    configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

  it("renders loader when pizza data is not loaded", () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <FullPizza />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("fetches pizza data and renders it", async () => {
    const mockPizza = {
      imageUrl: "https://example.com/pizza.jpg",
      name: "Test Pizza",
      price: 300,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockPizza });

    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <FullPizza />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
    expect(screen.getByText("Test Pizza")).toBeInTheDocument();
    expect(screen.getByText("300 грн.")).toBeInTheDocument();
  });

  it("handles fetch error gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <FullPizza />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Помилка при отриманні піцци")
    );
  });

  it("handles API error and displays alert", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <FullPizza />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("Помилка при отриманні піцци")
    );
  });

  it("dispatches addItem action when 'Добавити' button is clicked", async () => {
    const mockPizza = {
      imageUrl: "https://example.com/pizza.jpg",
      name: "Test Pizza",
      price: 300,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockPizza });

    const store = setupStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FullPizza />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Pizza")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Добавити/i));

    const actions = store.getState().cart.items;
    expect(actions).toContainEqual({
      id: "1",
      name: "Test Pizza",
      price: 300,
      imageUrl: "https://example.com/pizza.jpg",
      type: "тонке",
      size: 26,
      count: 1,
    });
  });
  it("dispatches addItem action when 'Добавити' button is clicked", async () => {
    const mockPizza = {
      imageUrl: "https://example.com/pizza.jpg",
      name: "Test Pizza",
      price: 300,
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockPizza });

    const store = setupStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FullPizza />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Pizza")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Добавити/i));

    const actions = store.getState().cart.items;
    expect(actions).toContainEqual({
      id: "1",
      name: "Test Pizza",
      price: 300,
      imageUrl: "https://example.com/pizza.jpg",
      type: "тонке",
      size: 26,
      count: 1,
    });
  });
});
