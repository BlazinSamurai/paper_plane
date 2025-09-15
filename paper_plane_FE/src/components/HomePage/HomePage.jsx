//This is the Home Page
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./HomePage.css";

import SideBar from "../SideBar/SideBar";
import TripSection from "../TripSection/TripSection";
import Mapbox from "../../utils/mapBoxApi";

import NewTrip from "../NewTripModal/NewTripModal";

// A custom hook to sync state with localStorage
function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function HomePage({
  isLoggedIn,
  onLogout,
  closeActiveRoute,
  addNewTrip,
  itinerary,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [tripModal, setTripModal] = useState(false);
  // Use the custom hook to manage the state
  const [calendarView, setCalendarView] = useLocalStorageState(
    "calendarView",
    false
  );

  function openTripModal() {
    setTripModal(true);
  }

  const handleNewTripSubmit = (
    e,
    destination,
    tripName,
    startDate,
    endDate
  ) => {
    addNewTrip(e, destination, tripName, startDate, endDate);
    setTripModal(false);
  };

  return (
    <div className="home-page">
      <div className="home-page__container">
        <section className="home-page__sidebar">
          <SideBar
            itinerary={itinerary}
            onLogout={onLogout}
            calendarView={calendarView}
            setCalendarView={setCalendarView}
          ></SideBar>
        </section>
        <div className="home-page__divider"></div>
        {(calendarView && (
          <ul className="home-page__trips-section">
            <h3 className="home-page__itinerary-title">Itinerary: </h3>
            {itinerary.map((trip) => {
              const isOwn = currentUser
                ? trip.owner === currentUser._id
                : false;
              {
                return (
                  isOwn && <TripSection trip={trip} itineraryView={true} />
                );
              }
            })}
          </ul>
        )) || (
          <section className="home-page__trip-creation">
            <div className="home-page__search-bar-group">
              <h3 className="home-page__create-title">Create a Trip!</h3>
              <button
                onClick={openTripModal}
                type="button"
                className="home-page__create-btn"
              >
                Click here
              </button>
              {tripModal ? (
                <NewTrip
                  isOpen="newTrip"
                  handleTripModal={setTripModal}
                  closeActiveRoute={closeActiveRoute}
                  handleNewTripSubmit={handleNewTripSubmit}
                />
              ) : (
                ""
              )}
            </div>
            <p className="home-page__text">or</p>
            <div className="home-page__mapbox-group">
              <h3 className="home-page__globe-title">
                Explore the Globe, and click a destination!
              </h3>
              <div className="home-page__mapbox">
                <Mapbox isLoggedIn={isLoggedIn}></Mapbox>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default HomePage;
