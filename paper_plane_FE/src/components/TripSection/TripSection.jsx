import "./TripSection.css";

function TripSection({ trip, itineraryView }) {
  return (
    <div className="trips">
      <div
        className={`${
          itineraryView
            ? "trips__container trips__container_white"
            : "trips__container"
        }`}
      >
        <div className="trips__destination">{trip.destination}</div>
        <div className="trips__trip-name">{trip.tripName}</div>
        <div className="trips__start-date">{trip.startDate}</div>
        <div className="trips__end-date">{trip.endDate}</div>
      </div>
    </div>
  );
}

export default TripSection;
