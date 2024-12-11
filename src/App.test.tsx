import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import cartReducer from "./redux/cart/slice";

jest.mock("./pages/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/Cart", () => () => <div>Cart Page</div>);
jest.mock("./pages/FullPizza", () => () => <div>FullPizza Page</div>);
jest.mock("./pages/NotFound", () => () => <div>NotFound Page</div>);

describe("App component", () => {
  const renderWithRouterAndRedux = (route: string) => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    window.history.pushState({}, "Test page", route);

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders Home page on default route", async () => {
    renderWithRouterAndRedux("/");
    await waitFor(() =>
      expect(screen.getByText("Home Page")).toBeInTheDocument()
    );
  });

  it("renders Cart page on /cart route", async () => {
    renderWithRouterAndRedux("/cart");
    await waitFor(() =>
      expect(screen.getByText("Cart Page")).toBeInTheDocument()
    );
  });

  it("renders FullPizza page on /pizza/:id route", async () => {
    renderWithRouterAndRedux("/pizza/1");
    await waitFor(() =>
      expect(screen.getByText("FullPizza Page")).toBeInTheDocument()
    );
  });

  it("renders NotFound page on unknown route", async () => {
    renderWithRouterAndRedux("/unknown");
    await waitFor(() =>
      expect(screen.getByText("NotFound Page")).toBeInTheDocument()
    );
  });
});
