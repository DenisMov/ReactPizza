import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useDispatch } from "react-redux";

import CartItemBlock from "./CartItem";
import { removeItem, minusItem } from "../redux/cart/slice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

const mockProps = {
  id: "1",
  name: "Піца Мюнхенська",
  count: 2,
  price: 310,
  type: "традиційне",
  size: 30,
  imageUrl: "https://example.com/pizza.png",
};

describe("CartItemBlock Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders correctly with pizza data", () => {
    render(<CartItemBlock {...mockProps} />);

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

  test("calls dispatch with removeItem when clicking remove button", () => {
    render(<CartItemBlock {...mockProps} />);

    const removeButton = screen.getByRole("button", { name: "remove" });

    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeItem(mockProps.id));
  });

  test("calls dispatch with minusItem when clicking minus button", async () => {
    render(<CartItemBlock {...mockProps} />);

    const minusButton = screen.getByRole("button", { name: /minus/i });

    fireEvent.click(minusButton);

    expect(mockDispatch).toHaveBeenCalledWith(minusItem(mockProps.id));
  });

  test("disables minus button when count is 1", () => {
    render(<CartItemBlock {...mockProps} count={1} />);

    const minusButton = screen.getByRole("button", { name: /minus/i });

    expect(minusButton).toBeDisabled();
  });
});
