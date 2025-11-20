import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./SideBar.css";

import logo from "../../images/blue_pp_icon.svg";
import defaultUserIcon from "../../images/default_user_icon.jpg";
import calendar from "../../images/calendar.svg";
import earth from "../../images/earth.png";

import TripSection from "../TripSection/TripSection";

function SideBar({ itinerary, onLogout, calendarView, setCalendarView }) {
  const { currentUser } = useContext(CurrentUserContext);

  function displayCalendarView() {
    setCalendarView(true);
  }

  function displayCreateTripView() {
    setCalendarView(false);
  }

  // useEffect(() => {
  //   console.log(calendarView);
  // }, []);
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
          src={
            currentUser.profilePic ? currentUser.profilePic : defaultUserIcon
          }
          alt={"User Icon"}
        />
        <p className="sidebar__display-info-username">
          {" "}
          {currentUser.userName}
        </p>
        {!calendarView && (
          <ul className="sidebar__trips-section">
            {itinerary.map((trip) => {
              const isOwn = currentUser
                ? trip.owner === currentUser._id
                : false;
              {
                return (
                  isOwn && <TripSection trip={trip} itineraryView={false} />
                );
              }
            })}
          </ul>
        )}
      </div>
      <div className="sidebar__display-toggle-btn-container">
        <button onClick={displayCalendarView}>
          <img
            className="sidebar__calendar-button"
            src={calendar}
            alt="calendar icon"
          />
        </button>
        <button onClick={displayCreateTripView}>
          <img className="sidebar__earth-button" src={earth} alt="earth icon" />
        </button>
      </div>
      <button onClick={onLogout} className="sidebar__logout-btn">
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
