//This is the Landing Page
import "./Main.css";

import React, { useEffect, useRef, useState } from "react";

import Header from "../Header/Header";
import Steps from "../Steps/Steps";
import Footer from "../Footer/Footer";

import smallCloud from "../../images/Clouds/singleSCloud.svg";
import mediumCloud from "../../images/Clouds/singleMCloud.svg";

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
        // Append the map to the node
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
  const thresholds = [];
  const titleRefOne = useRef(null);
  const titleRefTwo = useRef(null);
  const titleRefThree = useRef(null);
  const cloudRefThree = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // interface tells you how much of the target element is currently
        // visible within the root's intersection ratio, as a value between
        // 0.0 and 1.0
        // console.log(entry.intersectionRatio);

        // interface is a Boolean value which is true if the target element
        // intersects with the intersection observer's root
        //You can see if the target currently intersects the root by looking
        // at the entry's isIntersecting propert
        // if (entry.isIntersecting) {
        //   setIsVisible(true);
        // } else {
        //   setIsVisible(false);
        // }

        // set the opacity to the intersectionRatio
        entry.target.style.opacity = entry.intersectionRatio;
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
      // the observer's callback should be executed.
      // array of numbers of target visibility
      threshold: buildThresholdList(),
      // callback executes when 10% of the target is visible
      // threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    function buildThresholdList() {
      const numSteps = 20;

      for (let i = 1.0; i <= numSteps; i++) {
        const ratio = i / numSteps;
        thresholds.push(ratio);
      }

      thresholds.push(0);
      return thresholds;
    }

    const titleOne = titleRefOne.current;
    const titleTwo = titleRefTwo.current;
    const titleThree = titleRefThree.current;
    const cloudThree = cloudRefThree.current;

    if (titleOne || titleTwo || titleRefThree || cloudThree) {
      observer.observe(titleOne);
      observer.observe(titleTwo);
      observer.observe(titleThree);
      observer.observe(cloudThree);
    }

    return () => {
      if (titleOne || titleTwo || titleThree || cloudThree) {
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
      <h2 ref={titleRefOne} className="main__title main__title-welcome">
        Welcome Travelers!
      </h2>

      <div id="cloudContainer" className="main__cloud-container">
        {/* The id are named from when the element code was added and not
            where the particular elements are placed on the page. */}
        <img src={mediumCloud} id="cloud1" className=" main__cloud-1" />
        <img
          src={mediumCloud}
          id="cloud2"
          className="main__cloud-animation main__cloud-2"
        />
        <img
          src={smallCloud}
          ref={cloudRefThree}
          id="cloud3"
          className=" main__cloud-3"
        />
        <img
          src={mediumCloud}
          id="cloud4"
          className="main__cloud-animation main__cloud-4"
        />
        <img src={mediumCloud} id="cloud5" className="main__cloud-5" />
        <img src={smallCloud} id="cloud6" className="main__cloud-6" />
        <img src={smallCloud} id="cloud7" className="main__cloud-7" />
        <img src={mediumCloud} id="cloud8" className="main__cloud-8" />
        <img src={mediumCloud} id="cloud9" className="main__cloud-9" />
        <img src={smallCloud} id="cloud10" className="main__cloud-10" />
        <img src={smallCloud} id="cloud11" className="main__cloud-11" />
        <h2 ref={titleRefTwo} className="main__title">
          Start explore the world
        </h2>
        <img src={smallCloud} id="cloud12" className="main__cloud-12" />
        <img src={mediumCloud} id="cloud13" className="main__cloud-13" />
        <img src={mediumCloud} id="cloud14" className="main__cloud-14" />
        <img src={smallCloud} id="cloud15" className="main__cloud-15" />
        <img src={mediumCloud} id="cloud16" className="main__cloud-16" />
        <img src={smallCloud} id="cloud17" className="main__cloud-17" />
        <img src={mediumCloud} id="cloud18" className="main__cloud-18" />
        <img src={mediumCloud} id="cloud19" className="main__cloud-19" />
        <h2 ref={titleRefThree} className="main__title">
          Lets get started . . .
        </h2>
        <img src={mediumCloud} id="cloud20" className="main__cloud-20" />
        <img src={smallCloud} id="cloud21" className="main__cloud-21" />
        <img src={mediumCloud} id="cloud22" className="main__cloud-22" />
        <img src={smallCloud} id="cloud23" className="main__cloud-23" />
      </div>

      <Steps></Steps>

      {/* GLOBE SECTION */}
      <div
        id="gmp-map-3d"
        ref={mapRef}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* The map will be appended here by the useEffect hook */}
      </div>

      <Footer></Footer>
    </main>
  );
}

export default Main;
