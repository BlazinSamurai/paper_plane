import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../assets/blue_pp_icon.png";

function Header() {
  return (
    <header className="header">
      <div className="header-nav-bar">
        <div className="header-nav-bar__logo-container">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="header-nav-bar__icon" />
            <h1 className="header-nav-bar__name">Paper Plane</h1>
          </Link>
        </div>
        <div className="header-nav-bar__account-container">
          <Link to={"/login"}>
            <h2 className="header-nav-bar__login">Login</h2>
          </Link>
          <Link to={"/signup"}>
            <h2 className="header-nav-bar__signUp">Free Sign up!</h2>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
