//This is the Landing Page
import "./Main.css";

import React, { useEffect, useRef, useState } from "react";

import Header from "../Header/Header";
import Steps from "../Steps/Steps";
import Footer from "../Footer/Footer";

import cloudBodyXS from "../../images/Clouds/xsmallCloudBody.svg";
import cloudBodyS from "../../images/Clouds/smallCloudBody.svg";
import cloudBodyL from "../../images/Clouds/cloudBody.svg";
import mediumCloud from "../../images/Clouds/singleMCloud.svg";
import largeCloud from "../../images/Clouds/singleLCloud.svg";

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
    return () => {
      if (mapRef.current) {
        // Remove any children (the map element) when the component unmounts
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild);
        }
      }
    };
  }, []);

  // ____________________________________________________________________________
  const [isVisible, setIsVisible] = useState(false);
  const thresholds = [];
  const [opacity, setOpacity] = useState(thresholds.at[1]);
  const imgRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        console.log(entry.intersectionRatio);
        if (entry.isIntersecting) {
          console.log("VIEWING!!!!!!!!!!!!");
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    const observerOptions = {
      // The element that is used as the
      // viewport for checking visibility of the target.
      root: null,
      // Margin around nested scroll containers that
      // takes the same values/has same default as rootMargin
      rootMargin: "0px",
      // Either a single number or an array of numbers which
      // indicate at what percentage of the target's visibility
      // the observer's callback should be executed
      // callback executes when 10% of the target is visible
      // threshold: 0.1,
      threshold: 0.5,
      // threshold: buildThresholdList(),
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // doesn't read users viewpoint
    // function buildThresholdList() {
    //   const numSteps = 20;

    //   for (let i = 1.0; i <= numSteps; i++) {
    //     const ratio = i / numSteps;
    //     console.log(ratio);
    //     thresholds.push(ratio);
    //     setOpacity(ratio);
    //   }

    //   thresholds.push(0);
    //   return thresholds;
    // }

    const currentRef = imgRef.current;

    if (currentRef) {
      // One observer has one set of thresholds
      // and one root, but can watch multiple
      // target elements for visibility changes
      // in keeping with those.
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
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
      {/* <div id="cloudContainer" className="main__cloud-container"> */}
      {/* <img src={cloudBodyL} alt="" className="main__cloud-one" /> */}
      <div style={{ height: "2000px" }}></div>
      <img
        ref={imgRef}
        src={mediumCloud}
        alt=""
        id="cloud2"
        // className="main__cloud-two"
        style={{
          // "there" opacity setting
          // The image starts hidden (opacity 0) and smoothly transitions
          // to visible (opacity 1)
          opacity: isVisible ? 1 : 0,
          // MY opacity setting
          // opacity: opacity,
          transition: "opacity 0.5s ease-in-out",
          // position: "absolute",
          // bottom: "300px",
          // left: "150px",
          // Optional: ensure image takes up space even when hidden
          // display: "block",
          // width: "100%",
          // height: "auto",
        }}
      />
      <div style={{ height: "100vh" }}></div>
      {/* <img src={cloudBodyS} alt="" className="main__cloud-three" /> */}
      {/* </div> */}
      {/* <Steps></Steps> */}
      {/* <div */}
      {/* id="gmp-map-3d" */}
      {/* ref={mapRef} */}
      {/* style={{ height: "100%", width: "100%" }} */}
      {/* > */}
      {/* The map will be appended here by the useEffect hook */}
      {/* </div> */}
      <Footer></Footer>
    </main>
  );
}

export default Main;
