import React, { useEffect, useState } from "react";
import { API_URL } from "../../api/API_URL";
import axios from "axios";
import "../../App.css";
import { useAppContext } from "../../Context/appContext";
const CardList = () => {
  const [cardList, setCardList] = useState([]);

  const { product, addToStore, removeFromStore } = useAppContext();
  console.log("here", product);
  console.log(Array.isArray(product));

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setCardList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const storeChecker = (id) => {
    const boolean = product.some((card) => card.id === id);
    return boolean;
  };

  return (
    <div className="cardList">
      {cardList.map((card) => (
        <div key={card.id} className="card">
          <img src={card.image_url} alt={"dsfsf"} />
          <h2>{card.category}</h2>
          {storeChecker(card.id) ? (
            <button onClick={() => removeFromStore(card.id)}>
              remove from store
            </button>
          ) : (
            <button onClick={() => addToStore(card)}>add to store</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardList;
