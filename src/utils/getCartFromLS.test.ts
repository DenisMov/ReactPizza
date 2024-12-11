import { getCartFromLS } from "./getCartFromLS";
import { calcTotalPrice } from "./calcTotalPrice";
import { CartItem } from "../redux/cart/types";

jest.mock("./calcTotalPrice");

describe("getCartFromLS", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("returns empty items and 0 totalPrice when localStorage is empty", () => {
    (calcTotalPrice as jest.Mock).mockReturnValue(0);
    const result = getCartFromLS();

    expect(result).toEqual({
      items: [],
      totalPrice: 0,
    });
  });

  it("returns parsed items and totalPrice from localStorage", () => {
    const mockItems: CartItem[] = [
      {
        id: "1",
        name: "Піца Мюнхенська",
        price: 310,
        count: 2,
        imageUrl: "https://example.com/pizza.png",
        type: "тонке",
        size: 26,
      },
      {
        id: "2",
        name: "Піца Хамон",
        price: 245,
        count: 1,
        imageUrl: "https://example.com/pizza2.png",
        type: "традиційне",
        size: 40,
      },
    ];

    const mockTotalPrice = 865;

    localStorage.setItem("cart", JSON.stringify(mockItems));

    (calcTotalPrice as jest.Mock).mockReturnValue(mockTotalPrice);

    const result = getCartFromLS();

    expect(result).toEqual({
      items: mockItems,
      totalPrice: mockTotalPrice,
    });

    expect(calcTotalPrice).toHaveBeenCalledWith(mockItems);
  });

  it("handles invalid JSON in localStorage gracefully", () => {
    localStorage.setItem("cart", "{invalidJson}");

    const result = getCartFromLS();

    expect(result).toEqual({
      items: [],
      totalPrice: 0,
    });
  });
});
