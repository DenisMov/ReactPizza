import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import CartItemBlock from "./CartItem";

const meta: Meta<typeof CartItemBlock> = {
  title: "Components/CartItemBlock",
  component: CartItemBlock,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CartItemBlock>;

export const Default: Story = {
  args: {
    id: "1",
    name: "Піца Мюнхенська",
    type: "тонке",
    size: 30,
    count: 1,
    price: 250,
    imageUrl:
      "https://adriano.com.ua/wp-content/uploads/2022/08/%D0%9C%D1%8E%D0%BD%D1%85%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-238x238.png",
    onClickPlus: () => console.log("Plus clicked"),
    onClickMinus: () => console.log("Minus clicked"),
    onClickRemove: () => console.log("Remove clicked"),
  },
};
