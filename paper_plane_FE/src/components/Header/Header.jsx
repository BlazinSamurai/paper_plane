import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../images/blue_pp_icon.svg";

// Header becomes very D.R.Y with the commented lines being uncommented
function Header({ isOpen, openLoginModal, openSignupModal, closeActiveModal }) {
  return (
    // <header className={`${isOpen && "header__no-show"}` || "header"}>
    <header className={"header"}>
      <Link to={"/"}>
        <button onClick={closeActiveModal} type="button">
          {" "}
          {/* <div className={`${isOpen && "header__no-show"}` || "header-nav-bar__logo-container"}> */}
          <div className="header-nav-bar__logo-container">
            <img src={logo} alt="Logo" className="header-nav-bar__icon" />
            <h1 className="header-nav-bar__name">Paper Plane</h1>
          </div>
        </button>
      </Link>
      {/* <div
        className={
          `${isOpen && "header__no-show"}` ||
          "header-nav-bar__account-container"
        }
      > */}
      <div className="header-nav-bar__account-container">
        <Link to={"/login"}>
          <button
            onClick={openLoginModal}
            type="button"
            className="header__login-btn"
          >
            <h2 className="header-nav-bar__login">Login</h2>
          </button>
        </Link>
        <Link to={"/signup"}>
          <button
            onClick={openSignupModal}
            type="button"
            className="header__signup-btn"
          >
            <h2 className="header-nav-bar__signUp">Free Sign up!</h2>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
