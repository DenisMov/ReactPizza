import React from "react";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>Корзина пуста 😕</h2>
          <p>
            Скоріше за все, ви ще не замовили піццу.
            <br />
            Для того щоб замовити піццу, спробуйте перейти на головну сторінку
          </p>
          <img src="/img/empty-cart.png" alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Повернутись назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
