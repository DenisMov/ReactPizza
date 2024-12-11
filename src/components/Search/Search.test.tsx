import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Search from "./Search";
import { setSearchValue } from "../../redux/filter/slice";
import { within } from "@testing-library/react";

const mockStore = configureStore([]);

describe("Search Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Пошук піцци...")).toBeInTheDocument();
  });

  it("allows text input and dispatches debounced action", () => {
    jest.useFakeTimers();

    renderComponent();
    const inputElement = screen.getByPlaceholderText("Пошук піцци...");

    fireEvent.change(inputElement, { target: { value: "М'ясна піцца" } });

    expect(inputElement).toHaveValue("М'ясна піцца");

    expect(store.dispatch).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(store.dispatch).toHaveBeenCalledWith(setSearchValue("М'ясна піцца"));
    jest.useRealTimers();
  });

  it("clears input value and dispatches action on clear icon click", () => {
    const { getByTestId, queryByTestId } = renderComponent();

    expect(queryByTestId("clear-icon")).toBeNull();

    const inputElement = getByTestId("search-input");
    fireEvent.change(inputElement, { target: { value: "Піцца" } });

    const clearButton = getByTestId("clear-icon");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);

    expect(inputElement).toHaveValue("");
    expect(queryByTestId("clear-icon")).toBeNull();
  });

  it("focuses input when clear button is clicked", () => {
    renderComponent();

    const inputElement = screen.getByTestId("search-input");

    fireEvent.change(inputElement, { target: { value: "Гостра піцца" } });

    const clearButton = screen.getByTestId("clear-icon");

    fireEvent.click(clearButton);

    expect(inputElement).toHaveFocus();
  });
});
