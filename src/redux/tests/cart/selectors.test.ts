import { selectCart, selectCartItemById } from "../../cart/selectors";

describe("Cart Selectors", () => {
  const mockState = {
    cart: {
      items: [
        {
          id: "0",
          name: "Піца Мюнхенська",
          imageUrl:
            "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
          types: [0, 1],
          sizes: [26, 30, 40],
          price: 310,
          quantity: 2,
          category: 0,
          rating: 4,
        },
      ],
    },
  };

  it("should return the entire cart state", () => {
    const cart = selectCart(mockState as any);
    expect(cart).toEqual(mockState.cart);
  });

  it("should return a cart item by id", () => {
    const cartItem = selectCartItemById("0")(mockState as any);
    expect(cartItem).toEqual({
      id: "0",
      name: "Піца Мюнхенська",
      imageUrl:
        "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
      types: [0, 1],
      sizes: [26, 30, 40],
      price: 310,
      quantity: 2,
      category: 0,
      rating: 4,
    });
  });

  it("should return undefined if the cart item is not found", () => {
    const cartItem = selectCartItemById("1")(mockState as any);
    expect(cartItem).toBeUndefined();
  });
});
