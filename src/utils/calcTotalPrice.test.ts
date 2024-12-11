import { calcTotalPrice } from "./calcTotalPrice";
import { CartItem } from "../redux/cart/types";

describe("calcTotalPrice", () => {
  it("returns 0 for an empty array", () => {
    const items: CartItem[] = [];
    const result = calcTotalPrice(items);
    expect(result).toBe(0);
  });

  it("calculates total price for multiple items", () => {
    const items: CartItem[] = [
      {
        id: "0",
        name: "Піца Мюнхенська",
        price: 310,
        count: 2,
        imageUrl:
          "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
        type: "тонке",
        size: 26,
      },
      {
        id: "1",
        name: "Піца Хамон",
        price: 245,
        count: 3,
        imageUrl:
          "https://adriano.com.ua/wp-content/uploads/2024/03/%D0%A5%D0%B0%D0%BC%D0%BE%D0%BD-238x238.png",
        type: "традиційне",
        size: 40,
      },
    ];
    const result = calcTotalPrice(items);
    expect(result).toBe(1355);
  });

  it("handles items with count of 0", () => {
    const items: CartItem[] = [
      {
        id: "0",
        name: "Піца Мюнхенська",
        price: 310,
        count: 0,
        imageUrl:
          "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
        type: "тонке",
        size: 26,
      },
      {
        id: "1",
        name: "Піца Хамон",
        price: 245,
        count: 1,
        imageUrl:
          "https://adriano.com.ua/wp-content/uploads/2024/03/%D0%A5%D0%B0%D0%BC%D0%BE%D0%BD-238x238.png",
        type: "традиційне",
        size: 40,
      },
    ];
    const result = calcTotalPrice(items);
    expect(result).toBe(245);
  });
});
