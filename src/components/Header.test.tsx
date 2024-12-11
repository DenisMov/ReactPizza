import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Header from "./Header";

const mockStore = configureStore([]);

jest.mock("./Search/Search", () => ({
  __esModule: true,
  default: () => <input placeholder="Пошук піцци..." />,
}));

describe("Header Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { id: 1, name: "Піца Хамон", count: 2, price: 100 },
          { id: 2, name: "Піца Тоскана", count: 1, price: 200 },
        ],
        totalPrice: 400,
      },
    });
  });

  const renderComponent = (initialPath: string = "/") =>
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

  it("renders the header with logo and title", () => {
    renderComponent();
    expect(screen.getByAltText("Pizza logo")).toBeInTheDocument();
    expect(screen.getByText(/Texas Pizza/i)).toBeInTheDocument();
    expect(
      screen.getByText(/найсмачніша піцца на дикому заході/i)
    ).toBeInTheDocument();
  });

  it("renders the cart with total price and item count", () => {
    renderComponent();
    expect(screen.getByText("400 грн")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders the search component if not on /cart or /pizza/:id routes", () => {
    renderComponent("/");
    expect(screen.getByPlaceholderText(/Пошук піцци.../i)).toBeInTheDocument();
  });

  it("does not render the search component on /cart route", () => {
    renderComponent("/cart");
    expect(
      screen.queryByPlaceholderText(/пошук піци/i)
    ).not.toBeInTheDocument();
  });

  it("stores cart items in localStorage on update", () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, "setItem");

    const renderWithStore = (items: any, totalPrice: number) => {
      store = mockStore({
        cart: { items, totalPrice },
      });

      return render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );
    };

    const initialItems = [
      { id: 1, name: "Піца Хамон", count: 2, price: 100 },
      { id: 2, name: "Піца Тоскана", count: 1, price: 200 },
    ];
    const { rerender } = renderWithStore(initialItems, 400);

    const updatedItems = [
      { id: 1, name: "Піца Хамон", count: 3, price: 150 },
      { id: 2, name: "Піца Тоскана", count: 1, price: 200 },
    ];
    rerender(
      <Provider
        store={mockStore({ cart: { items: updatedItems, totalPrice: 550 } })}
      >
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(localStorageSpy).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(updatedItems)
    );
  });

  it("renders the cart link correctly", () => {
    renderComponent();
    const cartLink = screen.getByRole("link", { name: /400 грн 3/i });
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("does not render the cart on /cart route", () => {
    renderComponent("/cart");
    expect(
      screen.queryByRole("link", { name: /cart/i })
    ).not.toBeInTheDocument();
  });
});
