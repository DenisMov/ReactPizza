import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store"; // Переконайтеся, що шлях до store правильний
import CartItemBlock from "./CartItem";

// Створюємо mock-функції для пропсів
const onClickPlus = jest.fn();
const onClickMinus = jest.fn();
const onClickRemove = jest.fn();

// Mock-пропси для компонента
const mockProps = {
  id: "1",
  name: "Піца Мюнхенська",
  count: 2,
  price: 310,
  type: "традиційне",
  size: 30,
  imageUrl: "https://example.com/pizza.png",
  onClickPlus,
  onClickMinus,
  onClickRemove,
};

// Функція для обгортання компонента в Provider
const renderWithProvider = (component: JSX.Element) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("CartItemBlock Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with pizza data", () => {
    renderWithProvider(<CartItemBlock {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProps.type} тісто, ${mockProps.size} см.`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content) =>
          content.includes("грн.") &&
          content.includes(`${mockProps.price * mockProps.count}`)
      )
    ).toBeInTheDocument();
    expect(screen.getByText(mockProps.count.toString())).toBeInTheDocument();
  });

  test("calls onClickRemove when clicking remove button", () => {
    renderWithProvider(<CartItemBlock {...mockProps} />);

    const removeButton = screen.getByRole("button", { name: "remove" });
    fireEvent.click(removeButton);

    expect(onClickRemove).toHaveBeenCalledTimes(1);
  });

  test("calls onClickMinus when clicking minus button", () => {
    renderWithProvider(<CartItemBlock {...mockProps} />);

    const minusButton = screen.getByRole("button", { name: /minus/i });
    fireEvent.click(minusButton);

    expect(onClickMinus).toHaveBeenCalledTimes(1);
  });

  test("calls onClickPlus when clicking plus button", () => {
    renderWithProvider(<CartItemBlock {...mockProps} />);

    const plusButton = screen.getByRole("button", { name: /plus/i });
    fireEvent.click(plusButton);

    expect(onClickPlus).toHaveBeenCalledTimes(1);
  });

  test("disables minus button when count is 1", () => {
    renderWithProvider(<CartItemBlock {...mockProps} count={1} />);

    const minusButton = screen.getByRole("button", { name: /minus/i });
    expect(minusButton).toBeDisabled();
  });
});
