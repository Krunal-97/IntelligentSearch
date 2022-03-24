import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

export class Navbar extends Component {
  state = { clicked: false };
  clickHandler = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <nav className="navbar-items">
        <Link to="/" className="nav-links nav-logo">
          <span className="navbar-logo">
            IntelligentSearch <i className="fa-brands fa-searchengin"></i>
          </span>
        </Link>

        <div className="menu-icon" onClick={this.clickHandler}>
          <i
            className={
              this.state.clicked ? "fa-solid fa-xmark" : "fa-solid fa-bars"
            }
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
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
          <li className="nav-item">
            <Link to="/Search" className="nav-links">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/log-in" className="nav-links">
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sign-up" className="nav-links">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
