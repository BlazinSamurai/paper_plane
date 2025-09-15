import { useState, useEffect } from "react";

import cloudBG from "../../images/Clouds/singleMCloud.svg";

import "./ModalWithForm.css";

import Header from "../Header/Header";

function ModalWithForm({
  isOpen,
  openLoginRoute,
  openSignupRoute,
  handleTripModal,
  closeActiveRoute,
  sideBarTitle,
  sideBarText,
  formTitle,
  children,
  buttonText,
  onSubmit,
}) {
  const [route, setRoute] = useState(isOpen);
  const [newTrip, setNewTrip] = useState(Boolean);
  // variable is called 'userSign' because a user
  // can "signin" or "signup" and the word sign is
  // in both word so sign will be used to be short
  // hand for signin and signup
  const [userSign, setUserSign] = useState(Boolean);

  function handleClosePopup() {
    setRoute("");
    setNewTrip(false);
    setUserSign(false);
    handleTripModal(false);
  }

  useEffect(() => {
    if (route === "login" || route === "signup") {
      setNewTrip(false);
      setUserSign(true);
      return;
    }
    if (route === "newTrip") {
      setNewTrip(true);
      setUserSign(false);
      return;
    }
  }, [route]);

  return (
    <div>
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
          <form onSubmit={onSubmit} className="modal__popup-form">
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
