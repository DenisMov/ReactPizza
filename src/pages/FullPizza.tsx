import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem, CartItem, selectCartItemById } from "../redux";

const typeNames = ["тонке", "традиційне"];
const sizes = [26, 30, 40];

const FullPizza: React.FC = () => {
  const isMounted = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [activeIndexType, setActiveIndexType] = useState(0);
  const [activeIndexSize, setActiveIndexSize] = useState(0);

  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();

  const onClickAdd = () => {
    if (!pizza) return;
    const item: CartItem = {
      id: id!,
      name: pizza?.name,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeIndexType],
      size: sizes[activeIndexSize],
      count: 0,
    };
    console.log(item);
    dispatch(addItem(item));
  };

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6665b6f7d122c2868e418276.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Помилка при отриманні піцци");
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="cart__product-card">
      <div className="cart__product-image">
        <img src={pizza.imageUrl} alt={pizza.name} />
      </div>
      <div className="cart__product-info">
        <h2>{pizza.name}</h2>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
          adipisci suscipit deserunt minus fugiat nam iste, modi blanditiis
          maxime aspernatur a veritatis esse vitae facere quod facilis accusamus
          doloribus atque.
        </p>
      </div>

      <div className="cart__back">
        <h4 className="price">{pizza.price} грн.</h4>
        <Link to="/">
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавити</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
