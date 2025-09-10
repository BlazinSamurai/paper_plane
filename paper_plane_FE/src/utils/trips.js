import { baseUrl, request } from "../utils/auth";

function createTrip(info, token) {
  return request(`${baseUrl}/createTrip`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      destination: info.destination,
      tripName: info.tripName,
      startDate: info.startDate,
      endDate: info.endDate,
    }),
  });
}

function getTrips(info) {
  return request(`${baseUrl}/trips`, {
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export { createTrip, getTrips };
