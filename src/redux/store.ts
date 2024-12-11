import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cart from "./cart/slice";
import filter from "./filter/slice";
import pizza from "./pizza/slice";

export const store = configureStore({
  reducer: { filter, cart, pizza },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
