import React from "react";
import "./ReveiwItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { _id, img, name, price, quantity } = product;

  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details">
        <p className="product-title">{name}</p>
        <p>
          Price: <span className="dif-hub">${price}</span>
        </p>
        <p>
          Order Quantity: <span className="dif-hub">{quantity}</span>
        </p>
      </div>
      <button onClick={() => handleRemoveFromCart(_id)} className="btn-delete">
        <FontAwesomeIcon className="icon-style" icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;
