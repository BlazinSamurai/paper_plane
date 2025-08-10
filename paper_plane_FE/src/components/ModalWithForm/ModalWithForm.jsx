import React, { useState, useEffect } from "react";

import cloudBG from "../../images/Clouds/singleMCloud.svg";
import closeIcon from "../../images/close_icon.png";

import "./ModalWithForm.css";

import Header from "../Header/Header";

function ModalWithForm({
  isOpen,
  openLoginRoute,
  openSignupRoute,
  handleTripModal,
  closeActiveRoute,
  isLoggedIn,
  onLogout,
  sideBarTitle,
  sideBarText,
  formTitle,
  children,
  buttonText,
  onSubmit,
}) {
  const [route, setRoute] = useState(isOpen);
  const [newTrip, setNewTrip] = useState(Boolean);
  // variable is called 'userSign' because a user can "signin" or "signup"
  // and sign is short hand for both
  const [userSign, setUserSign] = useState(Boolean);
  const [visibility, setVisibility] = useState(true);

  function handleClosePopup() {
    setRoute("");
    setNewTrip(false);
    setUserSign(false);
    setVisibility(false);
    handleTripModal(false);
  }

  // delete later
  const doNothing = (e) => {
    e.preventDefault();
    console.log("Do Nothing!");
  };

  useEffect(() => {
    if (route === "login" || route === "signup") {
      setNewTrip(false);
      setUserSign(true);
      setVisibility(true);
      return;
    }
    if (route === "newTrip") {
      setNewTrip(true);
      setUserSign(false);
      setVisibility(true);
      return;
    }
    if (route === "" || isOpen === "") {
      setNewTrip(false);
      setUserSign(false);
      setVisibility(false);
      return;
    }
  }, [route]);

  return (
    <div className={visibility ? "" : "modal__hidden"}>
      {userSign ? (
        <div className="modal__whole-page">
          <Header
            openLoginRoute={openLoginRoute}
            openSignupRoute={openSignupRoute}
            closeActiveRoute={closeActiveRoute}
          ></Header>
          <div className="modal__background-gradient">
            <img
              src={cloudBG}
              alt="Cloud Background"
              className="modal__background-image"
            />
            <div className="modal__backdrop"></div>
            <div className="modal__form-container">
              <div className="modal__sideBar">
                <h2 className="modal__sideBar-title">{sideBarTitle}</h2>
                <div
                  className={`${
                    route === "signup" && "modal__sideBar-text-signup"
                  } ${route === "login" && "modal__sideBar-text-login"}`}
                >
                  {sideBarText}
                </div>
              </div>
              <div className="modal__divider"></div>
              <form onSubmit={onSubmit} className="modal__form">
                <h2 className="modal__form-title">{formTitle}</h2>
                <div className="modal__form-body">{children}</div>
                <button type="submit" className="modal__form-button">
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {newTrip ? (
        <div className="modal__popup">
          {/* Waiting to get approve of project so far so work
              on backend for new trip submission. */}
          <form onSubmit={doNothing} className="modal__popup-form">
            <div className="modal__popup-header-container">
              <button
                onClick={handleClosePopup}
                type="button"
                className="modal__popup-close-btn"
              />
              <h2 className="modal__popup-title">{formTitle}</h2>
            </div>
            <div className="modal__popup-body">{children}</div>
            <button type="submit" className="modal__popup-button">
              {buttonText}
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default ModalWithForm;
