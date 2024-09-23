import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectCartItemById } from "../../redux/cart/selectors";
import { CartItem } from "../../redux/cart/types";
import { addItem } from "../../redux/cart/slice";

type PizzaBlockProps = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  imageUrl,
  price,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const [activeIndexType, setActiveIndexType] = useState(0);
  const [activeIndexSize, setActiveIndexSize] = useState(0);
  const typeNames = ["Тонке", "Традиційне"];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeIndexType],
      size: sizes[activeIndexSize],
      count: 0,
    };
    console.log(item);
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link key={id} to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId, id) => (
            <li
              key={id}
              onClick={() => setActiveIndexType(typeId)}
              className={activeIndexType === typeId ? "active" : ""}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, id) => (
            <li
              key={id}
              onClick={() => setActiveIndexSize(id)}
              className={activeIndexSize === id ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} грн.</div>
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
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
