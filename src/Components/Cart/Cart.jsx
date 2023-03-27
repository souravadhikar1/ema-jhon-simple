import "./Cart.css";

import React from "react";

const Cart = ({ cart }) => {
  //   const { cart } = props;
  console.log(cart);
  let total = 0;
  for (const product of cart) {
    total = total + product.price;
  }
  return (
    <div className="cart">
      <h4>Order summary</h4>
      <p>Selected Items: {cart.length}</p>
      <p>Total Price: {total}</p>
      <p>Total Shipping:</p>
      <p>Tax:</p>
      <h6>Grand Total: </h6>
    </div>
  );
};

export default Cart;
