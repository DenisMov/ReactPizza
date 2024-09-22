import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();

  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

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
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <div className="cart__product-card">
        <img src={pizza.imageUrl} alt="#" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} грн.</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
          adipisci suscipit deserunt minus fugiat nam iste, modi blanditiis
          maxime aspernatur a veritatis esse vitae facere quod facilis accusamus
          doloribus atque.
        </p>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
