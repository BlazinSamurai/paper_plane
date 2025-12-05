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
  const thresholds = [];
  const titleRefOne = useRef(null);
  const titleRefTwo = useRef(null);
  const titleRefThree = useRef(null);
  const mCloudRefThree = useRef(null);
  const mCloudRefFour = useRef(null);
  const mCloudRefFive = useRef(null);
  const mCloudRefSix = useRef(null);
  const mCloudRefTen = useRef(null);
  const mCloudRefThirteen = useRef(null);
  const sCloudRefFive = useRef(null);
  const sCloudRefEight = useRef(null);
  const sCloudRefNine = useRef(null);

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
    const medThree = mCloudRefThree.current;
    const medFour = mCloudRefFour.current;
    const medFive = mCloudRefFive.current;
    const medSix = mCloudRefSix.current;
    const medTen = mCloudRefTen.current;
    const medThirteen = mCloudRefThirteen.current;
    const smallFive = sCloudRefFive.current;
    const smallEight = sCloudRefEight.current;
    const smallNine = sCloudRefNine.current;

    if (
      titleOne ||
      titleTwo ||
      titleRefThree ||
      medThree ||
      medFour ||
      medFive ||
      medSix ||
      medTen ||
      medThirteen ||
      smallFive ||
      smallEight ||
      smallNine
    ) {
      observer.observe(titleOne);
      observer.observe(titleTwo);
      observer.observe(titleThree);
      observer.observe(medThree);
      observer.observe(medFour);
      observer.observe(medFive);
      observer.observe(medSix);
      observer.observe(medTen);
      observer.observe(medThirteen);
      observer.observe(smallFive);
      observer.observe(smallEight);
      observer.observe(smallNine);
    }

    return () => {
      if (medThree) {
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
      <h2 ref={titleRefOne} className="main__title main__title-white">
        Welcome Travelers!
      </h2>

      {/* Start of clouds container */}
      <div id="cloudContainer" className="main__cloud-container">
        {/* The id are named from when the element code was added and not
            where the particular elements are placed on the page. */}
        <img
          src={mediumCloud}
          id="mCloud"
          style={{
            width: "99%",
            opacity: "40%",
            position: "absolute",
            left: -550,
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudtwo"
          style={{
            position: "absolute",
            width: "80%",
            opacity: "50%",
            top: 150,
            zIndex: 103,
          }}
        />
        <img
          src={smallCloud}
          id="sCloud"
          style={{
            position: "absolute",
            width: "100%",
            opacity: "40%",
            top: 50,
            zIndex: 103,
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudthree"
          ref={mCloudRefThree}
          style={{
            transition: "opacity 0.5s ease-in-out",
            position: "absolute",
            top: 200,
            width: "70%",
            rotate: "180deg",
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudFour"
          ref={mCloudRefFour}
          style={{
            transition: "opacity 0.4s ease-in-out",
            position: "absolute",
            width: "90%",
            top: 450,
            right: -100,
          }}
        />
        <img
          src={smallCloud}
          id="sCloudTwo"
          style={{
            position: "absolute",
            width: "70%",
            top: -100,
            right: -550,
            zIndex: 110,
          }}
        />
        <img
          src={smallCloud}
          id="sCloudThree"
          style={{
            position: "absolute",
            zIndex: 103,
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudFive"
          ref={mCloudRefFive}
          style={{
            transition: "opacity 0.5s ease-in-out",
            position: "absolute",
            width: "90%",
            top: 600,
            left: -500,
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudSix"
          ref={mCloudRefSix}
          style={{
            transition: "opacity 1.0s ease-in-out",
            position: "absolute",
            width: "100%",
            top: 650,
            left: -500,
          }}
        />
        <img
          src={smallCloud}
          id="sCloudFour"
          style={{
            position: "absolute",
            width: "100%",
            opacity: "25%",
            top: 650,
            left: 200,
            rotate: "180deg",
            zIndex: 120,
          }}
        />
        <img
          src={smallCloud}
          id="sCloudFive"
          ref={sCloudRefFive}
          style={{
            position: "absolute",
            transition: "opacity 0.5s ease-in-out",
            width: "80%",
            opacity: "55%",
            top: 650,
            left: 600,
            zIndex: 130,
          }}
        />
        <h2
          ref={titleRefTwo}
          className="main__title main__title-white main__title-globe"
        >
          Start explore the world
        </h2>
        <img
          src={smallCloud}
          id="sCloudSix"
          style={{
            position: "absolute",
            width: "90%",
            opacity: "25%",
            top: 920,
            right: 800,
            rotate: "180deg",
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudSeven"
          style={{
            position: "absolute",
            width: "100%",
            top: 980,
            right: 600,
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudEight"
          style={{
            position: "absolute",
            width: "115%",
            opacity: "50%",
            top: 1100,
            left: 1100,
            rotate: "180deg",
          }}
        />
        <img
          src={smallCloud}
          id="sCloudSeven"
          style={{
            position: "absolute",
            width: "90%",
            opacity: "25%",
            top: 1100,
            rotate: "180deg",
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudNine"
          style={{
            position: "absolute",
            width: "115%",
            opacity: "50%",
            top: 1400,
            rotate: "180deg",
            zIndex: 140,
          }}
        />
        <img
          src={smallCloud}
          id="sCloudEight"
          ref={sCloudRefEight}
          style={{
            transition: "opacity 0.5s ease-in-out",
            position: "absolute",
            width: "55%",
            top: 1200,
            right: 110,
          }}
        />
        <h2
          ref={titleRefThree}
          className="main__title main__title-white main__title-started"
        >
          To get started . . .
        </h2>
        <img
          src={mediumCloud}
          id="mCloudTen"
          ref={mCloudRefTen}
          style={{
            transition: "opacity 0.5s ease-in-out",
            position: "absolute",
            width: "60%",
            top: 1400,
          }}
        />
        <img
          src={mediumCloud}
          id="mCloudEleven"
          style={{
            position: "absolute",
            width: "90%",
            opacity: "25%",
            top: 1450,
            left: -300,
          }}
        />
      </div>
      {/* End of clouds container */}

      <img
        src={mediumCloud}
        id="mCloudTwelve"
        style={{
          position: "absolute",
          width: "100%",
          opacity: "60%",
          top: 2000,
          right: -300,
          zIndex: 180,
        }}
      />
      <img
        src={smallCloud}
        id="sCloudNine"
        ref={sCloudRefNine}
        style={{
          transition: "opacity 0.5s ease-in-out",
          position: "absolute",
          width: "75%",
          top: 1900,
          left: -100,
          rotate: "180deg",
          zIndex: 180,
        }}
      />
      <img
        src={mediumCloud}
        id="mCloudThirteen"
        ref={mCloudRefThirteen}
        style={{
          transition: "opacity 0.5s ease-in-out",
          position: "absolute",
          width: "65%",
          top: 2100,
          zIndex: 180,
          left: 500,
        }}
      />
      <img
        src={smallCloud}
        id="sCloudTen"
        style={{
          position: "absolute",
          width: "75%",
          opacity: "70%",
          top: 2000,
          left: -800,
          zIndex: 100,
        }}
      />

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
