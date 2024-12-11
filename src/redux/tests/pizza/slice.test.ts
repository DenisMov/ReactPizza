import { configureStore } from "@reduxjs/toolkit";

import pizzaReducer, { setItems } from "../../pizza/slice";
import { Status } from "../../pizza/types";
import { fetchPizzas } from "../../pizza/asyncActions";

const mockStore = configureStore({
  reducer: { pizzas: pizzaReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

describe("Pizza Slice tests", () => {
  it("should handle setItems correctly", () => {
    const initialState = {
      items: [],
      status: Status.LOADING,
    };

    const newState = pizzaReducer(
      initialState,
      setItems([
        {
          id: "1",
          name: "Маргарита",
          price: 10,
          imageUrl: "url",
          type: 1,
          size: 30,
          count: 1,
        },
      ])
    );

    expect(newState.items).toEqual([
      {
        id: "1",
        name: "Маргарита",
        price: 10,
        imageUrl: "url",
        type: 1,
        size: 30,
        count: 1,
      },
    ]);
    expect(newState.status).toBe(Status.LOADING);
  });

  it("should handle fetchPizzas.pending", () => {
    const initialState = {
      items: [],
      status: Status.LOADING,
    };

    const pendingAction = fetchPizzas.pending("requestId", {
      search: "Маргарита",
      currentPage: "1",
      sort: "price_desc",
      category: "someCategory",
    });

    const newState = pizzaReducer(initialState, pendingAction);
    expect(newState.status).toBe(Status.LOADING);
    expect(newState.items).toEqual([]);
  });

  it("should handle fetchPizzas.fulfilled", () => {
    const initialState = {
      items: [],
      status: Status.LOADING,
    };

    const fulfilledAction = {
      type: fetchPizzas.fulfilled.type,
      payload: [
        {
          id: "1",
          name: "Маргарита",
          price: 10,
          imageUrl: "url",
          type: 1,
          size: 30,
          count: 1,
        },
      ],
    };

    const newState = pizzaReducer(initialState, fulfilledAction);
    expect(newState.items).toEqual([
      {
        id: "1",
        name: "Маргарита",
        price: 10,
        imageUrl: "url",
        type: 1,
        size: 30,
        count: 1,
      },
    ]);
    expect(newState.status).toBe(Status.SUCCESS);
  });

  it("should handle fetchPizzas.rejected", () => {
    const initialState = {
      items: [],
      status: Status.LOADING,
    };

    const rejectedAction = {
      type: fetchPizzas.rejected.type,
      error: { message: "Error message" },
    };

    const newState = pizzaReducer(initialState, rejectedAction);
    expect(newState.status).toBe(Status.ERROR);
    expect(newState.items).toEqual([]);
  });
});
