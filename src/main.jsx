import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./Components/Shop/Shop";
import Home from "./Components/Layout/Home";
import Orders from "./Components/Orders/Orders";
import Inventory from "./Components/Inventory/Inventory";
import Login from "./Components/LogIn/Login";
import cartProductsLoader from "./loaders/cartProductsLOaders";
import Checkout from "./Components/Checkout/Checkout";
import SignUp from "./Components/SignUp/SignUp";
import AuthProvider from "./Components/providers/AuthProvider";
import PrivateRoute from "./Components/Routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "orders",
        element: <Orders></Orders>,
        loader: cartProductsLoader,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>,
          </PrivateRoute>
        ),
      },
      {
        path: "inventory",
        element: <Inventory></Inventory>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
