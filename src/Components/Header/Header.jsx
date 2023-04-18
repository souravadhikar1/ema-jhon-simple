import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then((result) => {})
      .catch((error) => console.log(error));
  };

  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">shop</Link>
        <Link to="/orders">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">login</Link>
        <Link to="/signup">Sign Up</Link>
        {user && (
          <span className="text-white">
            Welcome {user.email}{" "}
            <button onClick={handleLogout}> Sign Out</button>{" "}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
