//This is the Home Page
import { useState } from "react";

import "./HomePage.css";

import SideBar from "../SideBar/SideBar";
import Mapbox from "../../utils/mapBoxApi";

import NewTrip from "../NewTripModal/NewTripModal";

function HomePage({ isLoggedIn, onLogout, closeActiveRoute }) {
  const [tripModal, setTripModal] = useState(false);

  function openTripModal() {
    setTripModal(true);
  }

  return (
    <div className="home-page">
      <div className="home-page__container">
        <section className="home-page__sidebar">
          <SideBar onLogout={onLogout}></SideBar>
        </section>
        <div className="home-page__divider"></div>
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
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
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
      </div>
    </div>
  );
}

export default HomePage;
