import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import PizzaBlock from "./PizzaBlock";

const mockStore = configureStore([]);

describe("PizzaBlock component", () => {
  const pizzaData = {
    id: 0,
    name: "Піца Мюнхенська",
    imageUrl:
      "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
    price: 310,
    sizes: [26, 30, 40],
    types: [0, 1],
  };

  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
    });
  });

  it("render PizzaBlock with data", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PizzaBlock {...pizzaData} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Піца Мюнхенська/i)).toBeInTheDocument();
    expect(screen.getByText(/310 грн./i)).toBeInTheDocument();
    const image = screen.getByAltText(/Pizza/i);
    expect(image).toHaveAttribute("src", pizzaData.imageUrl);
  });

  it("added pizza to the cart", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PizzaBlock {...pizzaData} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Добавити/i));

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: "cart/addItem",
        payload: {
          id: "0",
          name: "Піца Мюнхенська",
          price: 310,
          imageUrl: pizzaData.imageUrl,
          type: "Тонке",
          size: 26,
          count: 0,
        },
      },
    ]);
  });

  it("active changing type and size", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PizzaBlock {...pizzaData} />
        </MemoryRouter>
      </Provider>
    );

    const typeItems = screen.getAllByRole("listitem");
    expect(typeItems[0]).toHaveTextContent("Тонке");
    expect(typeItems[0]).toHaveClass("active");

    const sizeItems = screen.getAllByText(/см./i);
    expect(sizeItems[0]).toHaveTextContent("26 см.");
    expect(sizeItems[1]).toHaveTextContent("30 см.");
    expect(sizeItems[2]).toHaveTextContent("40 см.");
    fireEvent.click(sizeItems[1]);
    expect(sizeItems[1]).toHaveClass("active");
  });
  it("renders correctly with missing data", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PizzaBlock
            name="Unknown Pizza"
            price={0}
            id={0}
            imageUrl={""}
            sizes={[]}
            types={[]}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Unknown Pizza/i)).toBeInTheDocument();
    expect(screen.getByText(/0 грн./i)).toBeInTheDocument();
  });
});
