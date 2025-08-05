import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./SideBar.css";

import logo from "../../images/blue_pp_icon.svg";

function SideBar({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__display-info">
        <div className="sidebar__logo-container">
          <img src={logo} alt="Logo" className={"sidebar__logo-icon"} />
          <h1 className={"sidebar__logo-name"}>Paper Plane</h1>
        </div>
        <img
          className="sidebar__display-info_avatar"
          src={currentUser.profilePic}
          alt={"Pic"}
        />
        <p className="sidebar__display-info_username">
          {" "}
          {currentUser.userName}
        </p>
      </div>
      <button onClick={onLogout} className="sidebar__logout-btn">
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
