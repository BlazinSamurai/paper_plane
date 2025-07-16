import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

function Mapbox() {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmxhemluc2FtdXJhaSIsImEiOiJjbWNjeGVydWEwY2JqMm5wdzBwdzJ2MWp4In0.0GPdhT1B86gmslyZgEB-sg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      zoom: 0, // starting zoom
      center: [-74.5, 40], // starting position [lng, lat]
      projection: "globe",
    });

    new mapboxgl.Marker()
      .setLngLat([12.554729, 55.70651])
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([12.65147, 55.608166])
      .addTo(mapRef.current);

    mapRef.current.on("style.load", () => {
      mapRef.current.setFog({});
    });

    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      const zoom = mapRef.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = mapRef.current.getCenter();
        center.lng -= distancePerSecond;
        mapRef.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    mapRef.current.on("mousedown", () => {
      userInteracting = true;
    });
    mapRef.current.on("mouseup", () => {
      userInteracting = false;
      spinGlobe();
    });
    mapRef.current.on("dragend", () => {
      userInteracting = false;
      spinGlobe();
    });
    mapRef.current.on("pitchend", () => {
      userInteracting = false;
      spinGlobe();
    });
    mapRef.current.on("rotateend", () => {
      userInteracting = false;
      spinGlobe();
    });
    mapRef.current.on("moveend", () => {
      spinGlobe();
    });

    spinGlobe();

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div
      style={{ height: "300px", width: "400px", margin: "0 auto 0" }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
}

export default Mapbox;
