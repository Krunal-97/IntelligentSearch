import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");
  const userName = sessionStorage.getItem("userName");

  const clickHandler = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="navbar-items">
      <Link to="/" className="nav-links nav-logo">
        <span className="navbar-logo">
          IntelligentSearch <i className="fa-brands fa-searchengin"></i>
        </span>
      </Link>

      <div className="menu-icon" onClick={clickHandler}>
        <i className={clicked ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-links">
            About
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/Search" className="nav-links">
            Search
          </Link>
        </li> */}

        {token && token != "" ? (
          <li className="nav-item">
            <Link to="/log-out" className="nav-links">
              Log Out
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/log-in" className="nav-links">
              Log In
            </Link>
          </li>
        )}

        <li className="nav-item">
          <Link to="/sign-up" className="nav-links">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
