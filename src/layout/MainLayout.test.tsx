import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import MainLayout from "./MainLayout";
import { store } from "../redux/store";

jest.mock("../components/Header", () => () => (
  <div data-testid="header">Header</div>
));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: jest.fn(() => <div data-testid="outlet">Outlet Content</div>),
}));

describe("MainLayout", () => {
  it("renders Header and Outlet components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
