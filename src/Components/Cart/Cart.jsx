import "./Cart.css";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart, handleClearCart, children }) => {
  //   const { cart } = props;
  //   console.log(cart);
  let totalPrice = 0;
  let totalPriceShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    // if (product.quantity === 0) {
    //   product.quantity = 1;
    // }
    // product.quantity = product.quantity || 1;
    totalPrice = totalPrice + product.price * product.quantity;
    totalPriceShipping = totalPriceShipping + product.shipping;
    quantity = quantity + product.quantity;
  }
  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalPriceShipping + tax;
  return (
    <div className="cart">
      <h4>Order summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Shipping: ${totalPriceShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand totalPrice: ${grandTotal.toFixed(2)} </h6>
      <button onClick={handleClearCart} className="clear-cart">
        <span> Clear Cart</span>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      {children}
    </div>
  );
};

export default Cart;
