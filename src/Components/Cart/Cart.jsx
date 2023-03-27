import "./Cart.css";

import React from "react";

const Cart = ({ cart }) => {
  //   const { cart } = props;
  //   console.log(cart);
  let totalPrice = 0;
  let totalPriceShipping = 0;
  for (const product of cart) {
    totalPrice = totalPrice + product.price;
    totalPriceShipping = totalPriceShipping + product.shipping;
  }
  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalPriceShipping + tax;
  return (
    <div className="cart">
      <h4>Order summary</h4>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Shipping: ${totalPriceShipping}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <h6>Grand totalPrice: ${grandTotal.toFixed(2)} </h6>
    </div>
  );
};

export default Cart;
