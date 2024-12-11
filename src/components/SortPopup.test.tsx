import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import SortPopup, { sortItems } from "./SortPopup";
import { setSort } from "../redux/filter/slice";

const mockStore = configureStore([]);

describe("SortPopup Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      filter: {
        sort: sortItems[0],
      },
    });
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <SortPopup value={sortItems[0]} />
      </Provider>
    );

  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByText(/Сортування за:/i)).toBeInTheDocument();
    expect(screen.getByText(sortItems[0].name)).toBeInTheDocument();
  });

  it("opens and closes popup on click", () => {
    renderComponent();
    const sortLabel = screen.getByText(sortItems[0].name);
    fireEvent.click(sortLabel);
    expect(screen.getByRole("list")).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("displays all sort items", () => {
    const { container } = renderComponent();
    fireEvent.click(screen.getByText(sortItems[0].name));

    const listItems = container.querySelectorAll(".sort__popup li");
    expect(listItems).toHaveLength(sortItems.length);
    sortItems.forEach((item, index) => {
      expect(listItems[index]).toHaveTextContent(item.name);
    });
  });

  it("highlights the active sort item", () => {
    renderComponent();
    fireEvent.click(screen.getByText(sortItems[0].name));

    const activeItems = screen
      .getAllByText(sortItems[0].name)
      .filter((item) => item.classList.contains("active"));
    expect(activeItems).toHaveLength(1);
  });

  it("dispatches setSort action on item click", () => {
    renderComponent();
    fireEvent.click(screen.getByText(sortItems[0].name));
    const secondSortItem = screen.getByText(sortItems[1].name);
    fireEvent.click(secondSortItem);
    expect(store.dispatch).toHaveBeenCalledWith(setSort(sortItems[1]));
  });

  it("closes popup after selecting an item", () => {
    renderComponent();
    fireEvent.click(screen.getByText(sortItems[0].name));
    fireEvent.click(screen.getByText(sortItems[1].name));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
