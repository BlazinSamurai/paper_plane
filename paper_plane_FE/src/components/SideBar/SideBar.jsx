import "./SideBar.css";

import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

function SideBar({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sideBar">
      <div className="sideBar__display-info">
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
      <button onClick="" className="sideBar__setting-btn">
        Settings
      </button>
    </div>
  );
}

export default SideBar;
