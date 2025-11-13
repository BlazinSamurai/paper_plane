// script.js
let map3d;
let infoWindow;
let marker;
let placeDetailsElement;
let placeDetailsRequest;

async function initMap() {
  // Import necessary libraries
  const { Map3DElement, MapMode } = await google.maps.importLibrary("maps3d");
  const { InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  await google.maps.importLibrary("places");

  // Get references to the place details elements
  placeDetailsElement = document.querySelector("gmp-place-details-compact");
  placeDetailsRequest = document.querySelector(
    "gmp-place-details-place-request"
  );

  // Create the 3D map
  map3d = new Map3DElement({
    center: { lat: 37.7749, lng: -122.4194, altitude: 1000 },
    tilt: 67.5,
    heading: 45,
    mode: MapMode.HYBRID,
    mapId: "DEMO_MAP_ID",
  });

  // Append the map to the container
  document.getElementById("map").appendChild(map3d);

  // Create an InfoWindow to display place details
  infoWindow = new InfoWindow({
    content: placeDetailsElement,
    disableAutoPan: true,
    headerDisabled: true,
  });

  // Create a marker that will be placed on the clicked POI
  marker = new AdvancedMarkerElement({
    map: map3d.innerMap, // Attach marker to the inner 2D map for compatibility
  });

  // Add a listener for clicks on places on the 3D map
  map3d.addEventListener("placeClick", (event) => {
    if (event.placeId) {
      event.stop(); // Prevent the default info window from showing
      showPlaceDetails(event.placeId, event.latLng);
    }
  });

  // Close the info window when the map is clicked (not on a POI)
  map3d.addEventListener("click", () => {
    infoWindow.close();
    marker.position = null;
  });
}

function showPlaceDetails(placeId, position) {
  // Hide previous marker
  marker.position = null;

  // Update the place details request with the new place ID
  placeDetailsRequest.place = placeId;

  // Position the marker at the clicked location
  marker.position = position;

  // Open the info window anchored to the marker
  infoWindow.open({
    map: map3d.innerMap,
    anchor: marker,
  });
}

// initMap();
export { initMap };
