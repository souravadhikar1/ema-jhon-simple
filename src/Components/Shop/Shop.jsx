import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";

import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  //  pagination starts from
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { totalProductCount } = useLoaderData();
  // const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(totalProductCount / itemsPerPage);

  // const itemsToShow = [];
  // for (let i = startIndex; i < endIndex; i++) {
  //   itemsToShow.push(<li key={i}>Item {i + 1}</li>);
  // }

  const pageNumbers = [...Array(totalPages).keys()];

  /**
   * Done: First count total data
   *2.Decide on the items per page >TODO
   * 3.Done:totalPages;
   *4.Done
   * */

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );

      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch(`http://localhost:5000/productsByIds`, {})
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        // step-1 get id
        for (const id in storedCart) {
          // get product from products state by using id
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            // step-3 : add quantity
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step-4---- add the added product to the saved  cart
            savedCart.push(addedProduct);
          }
        }
        // step 5 : saved the cartn
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    let newCart = [];
    //if product doesnt exist in the cart , then set  quantity =1
    // if exist update quantity by 1
    const exist = cart.find((pd) => pd._id == product._id);
    if (!exist) {
      newCart = [...cart, product];
    } else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exist];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  const options = [5, 10, 15, 20];
  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }

  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>

        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="review-link" to={"/orders"}>
              <button className="review-btn">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* pagination */}
      <div className="pagination">
        <p>Current Page:{currentPage}</p>
        <p>{currentPage}</p>
        {pageNumbers.map((number) => (
          <button
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "selected" : ""}
            key={number}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
