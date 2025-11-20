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
  const [openTripModal, setOpenTripModal] = useState("");
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

  // function handleCreateTripModal() {
  //   setCreateTripModal(true);
  // }

  //   const sayHello = () => {
  //   console.log("hello");
  //   setCreateTripModal(true);
  // };

  function handleCreateTripClick() {
    setCreateTripModal(true);
  }

  function handleMapClicks() {
    mapRef.current.addEventListener("dblclick", (event) => {
      // console.log(mapRef.current);
      const mapElement = document.getElementById("gmp-map-3d").firstChild;
      // console.log(mapElement);
      const mapElementShadow = mapElement.querySelector("gmp-popover");
      // console.log(mapElementShadow);
      const newKey = mapElementShadow.getAttribute("position-anchor");
      // console.log(newKey);
      setTempKey(newKey);
      const spanShadow = mapElementShadow.querySelector("span");
      // console.log(spanShadow);
      // console.log(spanShadow.ariaLabel);
      setDestinationGiven(spanShadow.ariaLabel);
      setGoogleTripModal(true);
    });
  }

  // function handleOpenTripModal(modal) {
  // console.log(googleTripModal, createTripModal);
  // console.log(openTripModal);
  // if (modal === "create") {
  //   setCreateTripModal(true);
  // }
  // else if (createTripModal) {
  //   setOpenTripModal("create");
  // else {
  //   setCreateTripModal(false);
  //   setOpenTripModal("");
  // }
  // console.log(modal);
  // }

  const handleNewTripSubmit = (
    e,
    destination,
    tripName,
    startDate,
    endDate
  ) => {
    addNewTrip(e, destination, tripName, startDate, endDate);
    // setOpenTripModal("");
  };

  // Original Code for adding a 3D Map in Javascript
  // but some reason creates 6 maps
  // async function initMap() {
  //   const { Map3DElement } = await google.maps.importLibrary("maps3d");
  //   const map = new Map3DElement({
  //     center: { lat: 11.5238, lng: -10, altitude: 573 },
  //     mapId: "DEMO_MAP_ID",
  //     heading: 0,
  //     range: 30000000,
  //     mode: "HYBRID",
  //     gestureHandling: "COOPERATIVE",
  //   });
  //   document.body.append(map);
  // }
  // initMap();

  //__________________ DOM manipulation stuff____________________________/
  // const newDivContPlaceDetails = document.createElement("div");
  // newDivContPlaceDetails.classList.add("widget-container");
  // newDivContPlaceDetails.setAttribute(
  //   "slot",
  //   "control-inline-start-block-start"
  // );
  // newGmpMap3d.appendChild(newDivContPlaceDetails);
  // console.log(document.getElementById("gmp-map-3d").firstChild);

  // _________________________________________________________________________
  // _________________________________________________________________________
  // First ATTEMPT. Works and styled, but 3D map doesn't have advance markers
  // _________________________________________________________________________
  // _________________________________________________________________________

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

  // _________________________________________________________________________
  // _________________________________________________________________________
  // Second ATTEMPT, Works, but uses a 2D map and needs to be styled
  // _________________________________________________________________________
  // _________________________________________________________________________

  // Use querySelector to select elements for interaction.
  // const map = document.querySelector("gmp-map");
  // const placeDetails = document.querySelector("gmp-place-details");
  // const placeDetailsRequest = document.querySelector(
  //   "gmp-place-details-place-request"
  // );
  // const marker = document.querySelector("gmp-advanced-marker");
  // let center = { lat: 47.759737, lng: -122.250632 };
  // async function initMap() {
  //   // Request needed libraries.
  //   await google.maps.importLibrary("maps");
  //   await google.maps.importLibrary("marker");
  //   await google.maps.importLibrary("places");
  //   // Hides "Map" or "Satellite" view. True = visible, false = hiden
  //   map.innerMap.setOptions({ mapTypeControl: true });
  //   // Function to update map and marker based on place details
  //   const updateMapAndMarker = () => {
  //     if (placeDetails.place && placeDetails.place.location) {
  //       let adjustedCenter = offsetLatLngRight(
  //         placeDetails.place.location,
  //         -0.005
  //       );
  //       map.innerMap.panTo(adjustedCenter);
  //       map.innerMap.setZoom(16); // Set zoom after panning if needed
  //       marker.position = placeDetails.place.location;
  //       marker.collisionBehavior =
  //         google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL;
  //       marker.style.display = "block";
  //     }
  //   };
  //   // Set up map once widget is loaded.
  //   placeDetails.addEventListener("gmp-load", (event) => {
  //     updateMapAndMarker();
  //   });
  //   // Add an event listener to handle clicks.
  //   map.innerMap.addListener("click", async (event) => {
  //     marker.position = null;
  //     event.stop();
  //     if (event.placeId) {
  //       // Fire when the user clicks a POI.
  //       placeDetailsRequest.place = event.placeId;
  //       updateMapAndMarker();
  //     } else {
  //       // Fire when the user clicks the map (not on a POI).
  //       console.log("No place was selected.");
  //       marker.style.display = "none";
  //     }
  //   });
  // }
  // // Helper function to offset marker placement for better visual appearance.
  // function offsetLatLngRight(latLng, longitudeOffset) {
  //   const newLng = latLng.lng() + longitudeOffset;
  //   return new google.maps.LatLng(latLng.lat(), newLng);
  // }
  // initMap();

  // async function initMap() {
  //   const { Map3DElement } = await google.maps.importLibrary("maps3d");
  //   const map = new Map3DElement({
  //     center: { lat: 11.5238, lng: -10, altitude: 573 },
  //     mapId: "DEMO_MAP_ID",
  //     heading: 0,
  //     range: 30000000,
  //     mode: "HYBRID",
  //     gestureHandling: "COOPERATIVE",
  //   });

  //   mapRef.current.append(map);
  //   // console.log(mapRef.current);
  //   // handleMapClicks();
  // }

  // console.log(createTripModal);
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
                // onClick handler causing a lot of issues.
                // Looks like click handler get stuck inside
                // infinity loop when passed 'sayHello()'
                // but is fine when passed 'sayHello'
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
              {/* // setCreateTripModal(false)
                // <NewTrip
                //   isOpen="newTrip"
                //   handleTripModal={setGoogleTripModal}
                //   closeActiveRoute={closeActiveRoute}
                //   handleNewTripSubmit={handleNewTripSubmit}
                //   destinationNameGiven={destinationGiven}
                // />
              // )} */}
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
