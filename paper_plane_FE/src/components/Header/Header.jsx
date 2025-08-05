import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

import logo from "../../images/blue_pp_icon.svg";

function Header({
  openHomePageRoute,
  openLoginRoute,
  openSignupRoute,
  closeActiveRoute,
}) {
  const [headerVisibility, setHeaderVisibility] = useState(Boolean);

  useEffect(() => {
    if (openHomePageRoute === false) {
      setHeaderVisibility(false);
    } else setHeaderVisibility(true);
  }, [openHomePageRoute]);

  return (
    <header className={"header"}>
      <Link to={"/"}>
        <button onClick={closeActiveRoute} type="button">
          {" "}
          <div className="header-nav-bar__logo-container">
            <img
              src={logo}
              alt="Logo"
              className={
                headerVisibility ? "header__no-show" : "header-nav-bar__icon"
              }
            />
            <h1
              className={
                headerVisibility ? "header__no-show" : "header-nav-bar__name"
              }
            >
              Paper Plane
            </h1>
          </div>
        </button>
      </Link>
      <div className="header-nav-bar__account-container">
        <Link to={"/login"}>
          <button
            onClick={openLoginRoute}
            type="button"
            className="header__login-btn"
          >
            <h2
              className={
                headerVisibility ? "header__no-show" : "header-nav-bar__login"
              }
            >
              Login
            </h2>
          </button>
        </Link>
        <Link to={"/signup"}>
          <button
            onClick={openSignupRoute}
            type="button"
            className="header__signup-btn"
          >
            <h2
              className={
                headerVisibility ? "header__no-show" : "header-nav-bar__signup"
              }
            >
              Free Sign up!
            </h2>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
