import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../images/blue_pp_icon.svg";

function Header({ openLoginRoute, openSignupRoute, closeActiveRoute }) {
  return (
    <header className="header">
      <Link to={"/"}>
        <button onClick={closeActiveRoute} type="button">
          {" "}
          <div className="header-navbar__logo-container">
            <img src={logo} alt="Logo" className="header-navbar__icon" />
            <h1 className="header-navbar__name">Paper Plane</h1>
          </div>
        </button>
      </Link>
      <div className="header-navbar__account-container">
        <Link to={"/login"}>
          <button
            onClick={openLoginRoute}
            type="button"
            className="header__login-btn"
          >
            <h2 className="header-navbar__login">Login</h2>
          </button>
        </Link>
        <Link to={"/signup"}>
          <button
            onClick={openSignupRoute}
            type="button"
            className="header__signup-btn"
          >
            <h2 className="header-navbar__signup">Free Sign up!</h2>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
