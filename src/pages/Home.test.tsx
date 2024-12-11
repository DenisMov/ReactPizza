import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Home from "./Home";
import pizzaReducer from "../redux/pizza/slice";
import filterReducer from "../redux/filter/slice";

jest.mock("../components/Categories", () => ({
  __esModule: true,
  default: ({ onClickCategory }: any) => (
    <button onClick={() => onClickCategory(1)}>Category</button>
  ),
}));

jest.mock("../components/SortPopup", () => ({
  __esModule: true,
  default: () => <div>SortPopup Component</div>,
}));

jest.mock("../components/Pagination/Pagination", () => ({
  __esModule: true,
  default: ({ onChangePage }: any) => (
    <button onClick={() => onChangePage(2)}>Next Page</button>
  ),
}));

jest.mock("../components/PizzaBlock/PizzaBlock", () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid="pizza-block">{name}</div>
  ),
}));

jest.mock("../components/PizzaBlock/Skeleton", () => ({
  __esModule: true,
  default: () => <div>Loading Skeleton</div>,
}));

const preloadedState = {
  pizza: {
    items: [
      { id: 1, name: "Піца Мюнхенська" },
      { id: 2, name: "Піца Хамон" },
    ],
    status: "success",
  },
  filter: {
    categoryId: 0,
    sort: { name: "популярністю", sortProperty: "rating" },
    currentPage: 1,
    searchValue: "",
  },
};

const renderHome = (state: any = preloadedState) => {
  const store = configureStore({
    reducer: { pizza: pizzaReducer, filter: filterReducer },
    preloadedState: state,
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

describe("Home component", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it("renders Categories and SortPopup components", () => {
    renderHome();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("SortPopup Component")).toBeInTheDocument();
  });

  it("displays loading skeletons while pizzas are loading", () => {
    renderHome({
      ...preloadedState,
      pizza: { items: [], status: "loading" },
    });
    expect(screen.getAllByText("Loading Skeleton").length).toBeGreaterThan(0);
  });

  it("handles pagination click", () => {
    renderHome();
    fireEvent.click(screen.getByText("Next Page"));
    expect(screen.getByText("Next Page")).toBeInTheDocument();
  });

  it("handles category click", () => {
    renderHome();
    fireEvent.click(screen.getByText("Category"));
    expect(screen.getByText("Category")).toBeInTheDocument();
  });
});
