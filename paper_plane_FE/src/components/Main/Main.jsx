//This is the Landing Page
import "./Main.css";

import React, { useEffect, useRef } from "react";

import Header from "../Header/Header";
import Steps from "../Steps/Steps";

function Main({
  openLoginRoute,
  openSignupRoute,
  closeActiveRoute,
  isLoggedIn,
}) {
  // useRef to hold the map instance or the map container element
  const mapRef = useRef(null);

  useEffect(() => {
    // This function will run only once after the initial render
    async function initMap() {
      // Check if the map has already been initialized or if the
      // container exists
      if (mapRef.current && !mapRef.current.hasChildNodes()) {
        // Ensure it's not already populated
        console.log("Map 'not' populated?");
        const { Map3DElement } = await google.maps.importLibrary("maps3d");
        const map = new Map3DElement({
          center: { lat: 11.5238, lng: -10, altitude: 573 },

          heading: 0,
          range: 30000000,
          mode: "HYBRID",
          gestureHandling: "COOPERATIVE",
        });
        // Append the map to the ref's current DOM node
        mapRef.current.append(map);
      }
    }

    initMap();

    // Optional: Cleanup function if you need to remove the map when the component unmounts
    // return () => {
    //   if (mapRef.current) {
    //     // Remove any children (the map element) when the component unmounts
    //     while (mapRef.current.firstChild) {
    //       mapRef.current.removeChild(mapRef.current.firstChild);
    //     }
    //   }
    // };
  }, []);

  return (
    <main className="main">
      <Header
        openLoginRoute={openLoginRoute}
        openSignupRoute={openSignupRoute}
        closeActiveRoute={closeActiveRoute}
      ></Header>
      <h2 className="main__title">Plan your next trip &</h2>
      <h2 className="main__title main__title-white">EXPLORE THE GLOBE</h2>

      <div
        id="gmp-map-3d"
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        {/* The map will be appended here by the useEffect hook */}
      </div>
      <Steps></Steps>
    </main>
  );
}

export default Main;
