import React, { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const NewTrip = ({
  isOpen,
  handleTripModal,
  closeActiveRoute,
  isLoggedIn,
  onLogout,
}) => {
  const [destination, setDestination] = useState("");
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleTripModal={handleTripModal}
      closeActiveRoute={closeActiveRoute}
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
      formTitle="Create New Trip!"
      buttonText="Create Trip"
    >
      <label htmlFor="newTrip_destination">
        <input
          type="text"
          className="modal__form-body-input"
          minLength="1"
          max="20"
          id="newTrip_destination"
          placeholder="Destination"
          value={destination}
          onChange={handleDestinationChange}
          //   required
        />
      </label>
      <label htmlFor="newTrip_name">
        <input
          type="text"
          className="modal__form-body-input"
          minLength="1"
          max="20"
          id="newTrip_name"
          placeholder="Trip Name"
          value={tripName}
          onChange={handleTripNameChange}
        />
      </label>
      <div className="modal__popup-dates-container">
        <label htmlFor="newTrip_startDate">
          <input
            type="text"
            className="modal__form-body-input modal__form-body-date"
            minLength="1"
            max="20"
            id="newTrip_startDate"
            placeholder="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            // required
          />
        </label>
        <label htmlFor="newTrip_endDate">
          <input
            type="text"
            className="modal__form-body-input modal__form-body-date"
            minLength="1"
            max="20"
            id="newTrip_endDate"
            placeholder="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            // required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default NewTrip;
