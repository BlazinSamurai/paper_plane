//This is the Home Page
import { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./HomePage.css";

import SideBar from "../SideBar/SideBar";
import TripSection from "../TripSection/TripSection";
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
  const [googleTripModal, setGoogleTripModal] = useState(false);
  const [createTripModal, setCreateTripModal] = useState(false);
  const [destinationGiven, setDestinationGiven] = useState("");
  const [tempKey, setTempKey] = useState("");

  // Use the custom hook to manage the state
  const [calendarView, setCalendarView] = useLocalStorageState(
    "calendarView",
    false
  );

  // useRef to hold the map instance or the map container element
  const mapRef = useRef(null);

  function handleCreateTripClick() {
    setCreateTripModal(true);
  }

  function handleMapClicks() {
    mapRef.current.addEventListener("dblclick", () => {
      const mapElement = document.getElementById("gmp-map-3d").firstChild;

      const mapElementShadow = mapElement.querySelector("gmp-popover");

      const newKey = mapElementShadow.getAttribute("position-anchor");

      setTempKey(newKey);
      const spanShadow = mapElementShadow.querySelector("span");
      setDestinationGiven(spanShadow.ariaLabel);
      setGoogleTripModal(true);
    });
  }

  const handleNewTripSubmit = (
    e,
    destination,
    tripName,
    startDate,
    endDate
  ) => {
    addNewTrip(e, destination, tripName, startDate, endDate);
    setCreateTripModal(false);
    setGoogleTripModal(false);
  };

  useEffect(() => {
    async function initMap() {
      const { Map3DElement } = await google.maps.importLibrary("maps3d");
      const map = new Map3DElement({
        center: { lat: 11.5238, lng: -10, altitude: 573 },
        mapId: "DEMO_MAP_ID",
        heading: 0,
        range: 30000000,
        mode: "HYBRID",
        gestureHandling: "COOPERATIVE",
      });

      mapRef.current.append(map);
    }
    initMap();
    handleMapClicks();
  }, []);

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
                onClick={handleCreateTripClick}
                type="button"
                className="home-page__create-btn"
              >
                Click here
              </button>
              {createTripModal ? (
                <NewTrip
                  isOpen="newTrip"
                  handleTripModal={setCreateTripModal}
                  closeActiveRoute={closeActiveRoute}
                  handleNewTripSubmit={handleNewTripSubmit}
                  destinationNameGiven={""}
                />
              ) : (
                googleTripModal && (
                  <NewTrip
                    isOpen="newTrip"
                    handleTripModal={setGoogleTripModal}
                    closeActiveRoute={closeActiveRoute}
                    handleNewTripSubmit={handleNewTripSubmit}
                    destinationNameGiven={destinationGiven}
                  />
                )
              )}
            </div>
            <p className="home-page__text">or</p>
            <div className="home-page__googleMap-group">
              <h3 className="home-page__globe-title">
                Explore the Globe, and click a destination!
              </h3>
              <div className="home-page__googleMap">
                <div
                  id="gmp-map-3d"
                  ref={mapRef}
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* The map will be appended here by the useEffect hook */}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default HomePage;
