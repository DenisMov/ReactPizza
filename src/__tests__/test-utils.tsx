import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../redux/cart/slice";

export function renderWithStore(ui: ReactNode, initialState = {}) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
}
