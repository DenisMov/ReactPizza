import { CartItem, CartSliceState } from "../../cart/types";

const mockCartItem: CartItem = {
  id: "1",
  name: "Піца Мюнхенська",
  price: 310,
  imageUrl:
    "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
  type: "тонке",
  size: 30,
  count: 2,
};

describe("Cart Slice Types", () => {
  it("should correctly define a CartItem", () => {
    expect(mockCartItem).toEqual({
      id: "1",
      name: "Піца Мюнхенська",
      price: 310,
      imageUrl:
        "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
      type: "тонке",
      size: 30,
      count: 2,
    });
  });

  it("should correctly define a CartSliceState", () => {
    const state: CartSliceState = {
      totalPrice: 620,
      items: [mockCartItem],
    };

    expect(state).toEqual({
      totalPrice: 620,
      items: [mockCartItem],
    });
  });
});
