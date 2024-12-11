import cartReducer, {
  addItem,
  removeItem,
  minusItem,
  clearItems,
} from "../../cart/slice";
import { CartItem, CartSliceState } from "../../cart/types";

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const mockCartItem: CartItem = {
  id: "1",
  name: "Піца Мюнхенська",
  price: 310,
  imageUrl:
    "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
  type: "тонке",
  size: 30,
  count: 1,
};

describe("Cart Slice tests", () => {
  it("should handle addItem correctly", () => {
    const newState = cartReducer(initialState, addItem(mockCartItem));
    expect(newState.items).toEqual([{ ...mockCartItem, count: 1 }]);
    expect(newState.totalPrice).toBe(310);
  });

  it("should handle addItem correctly when item already exists", () => {
    const stateWithItem: CartSliceState = {
      totalPrice: 310,
      items: [mockCartItem],
    };

    const newState = cartReducer(stateWithItem, addItem(mockCartItem));
    expect(newState.items).toEqual([{ ...mockCartItem, count: 2 }]);
    expect(newState.totalPrice).toBe(620);
  });

  it("should handle minusItem correctly", () => {
    const stateWithItem: CartSliceState = {
      totalPrice: 310,
      items: [mockCartItem],
    };

    const newState = cartReducer(stateWithItem, minusItem("1"));
    expect(newState.items).toEqual([]);
    expect(newState.totalPrice).toBe(0);
  });

  it("should handle minusItem correctly when count reaches 0", () => {
    const stateWithItem: CartSliceState = {
      totalPrice: 310,
      items: [mockCartItem],
    };

    const newState = cartReducer(stateWithItem, minusItem("1"));
    expect(newState.items).toEqual([]);
    expect(newState.totalPrice).toBe(0);
  });

  it("should handle removeItem correctly", () => {
    const stateWithItem: CartSliceState = {
      totalPrice: 310,
      items: [mockCartItem],
    };

    const newState = cartReducer(stateWithItem, removeItem("1"));
    expect(newState.items).toEqual([]);
    expect(newState.totalPrice).toBe(0);
  });

  it("should handle clearItems correctly", () => {
    const stateWithItems: CartSliceState = {
      totalPrice: 620,
      items: [mockCartItem, { ...mockCartItem, id: "2", count: 1 }],
    };

    const newState = cartReducer(stateWithItems, clearItems());
    expect(newState.items).toEqual([]);
    expect(newState.totalPrice).toBe(0);
  });
});
