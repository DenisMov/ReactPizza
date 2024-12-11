import { CartItem } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  try {
    const data = localStorage.getItem("cart");
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
      items: items as CartItem[],
      totalPrice,
    };
  } catch (error) {
    return {
      items: [] as CartItem[],
      totalPrice: 0,
    };
  }
};
