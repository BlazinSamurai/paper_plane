import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./SideBar.css";

import logo from "../../images/blue_pp_icon.svg";
import defaultUserIcon from "../../images/default_user_icon.jpg";

function SideBar({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  console.log("currentUser inside 'SideBar.jsx': ", currentUser);
  return (
    <div className="sidebar">
      <div className="sidebar__display-info">
        <div className="sidebar__logo-container">
          <img src={logo} alt="Logo" className={"sidebar__logo-icon"} />
          <h1 className={"sidebar__logo-name"}>Paper Plane</h1>
        </div>
        <img
          className="sidebar__display-info-avatar"
          //Need to fix this logic later
          //You can pass in a URL that doesn't provide a image but that doesn't
          //result in a 'false' value so default icon is not used and goes
          //straight to "alt"
          // src={
          //   currentUser.profilePic ? currentUser.profilePic : defaultUserIcon
          // }
          // src={defaultUserIcon}
          src={currentUser.tempPic ? currentUser.tempPic : defaultUserIcon}
          alt={"User Icon"}
        />
        <p className="sidebar__display-info-username">
          {" "}
          {currentUser.tempName}
        </p>
      </div>
      <button onClick={onLogout} className="sidebar__logout-btn">
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
