import { store } from "./store";
import cartReducer from "./cart/slice";
import filterReducer from "./filter/slice";
import pizzaReducer from "./pizza/slice";

describe("Redux Store tests", () => {
  it("should have the initial state set properly", () => {
    const initialState = store.getState();

    expect(initialState.cart).toEqual(cartReducer(undefined, { type: "" }));
    expect(initialState.filter).toEqual(filterReducer(undefined, { type: "" }));
    expect(initialState.pizza).toEqual(pizzaReducer(undefined, { type: "" }));
  });

  it("should allow dispatching actions", () => {
    const mockAction = {
      type: "cart/addItem",
      payload: {
        id: "1",
        name: "Pizza",
        price: 10,
        count: 1,
      },
    };

    const initialState = store.getState();

    store.dispatch(mockAction);

    const newState = store.getState();
    expect(newState.cart.items).toContainEqual(mockAction.payload);
  });
});
