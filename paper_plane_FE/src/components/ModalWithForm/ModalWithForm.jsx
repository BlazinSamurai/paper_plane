import React, { useState, useEffect } from "react";

import cloudBG from "../../images/Clouds/singleMCloud.svg";

import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  sideBarTitle,
  sideBarText,
  formTitle,
  children,
  buttonText,
  onSubmit,
}) {
  const [modal, setModal] = useState(isOpen);
  // This const is used to check if the login or signup modal are
  // opened
  const [newTrip, setNewTrip] = useState(Boolean);

  useEffect(() => {
    if (modal === "signup" || "login") {
      setNewTrip(false);
    } else setNewTrip(true);
  }, [modal]);

  // console.log(`isOpen from modalWForm: ${modal}.`);
  // console.log(`newTrip: ${newTrip}.`);
  return (
    <div>
      {!newTrip ? (
        <div className="modal__whole-page">
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
                    modal === "signup" && "modal__sideBar-text-signup"
                  } ${modal === "login" && "modal__sideBar-text-login"}`}
                >
                  {sideBarText}
                </div>
              </div>
              <div className="modal__divider"></div>
              <form action="" className="modal__form">
                <h2 className="modal__form-title">{formTitle}</h2>
                <div className="modal__form-body">{children}</div>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="modal__form-button"
                >
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal__popup">
          <form className="modal__form">
            <h2 className="modal__form-title">{formTitle}</h2>
            <div className="modal__form-body">{children}</div>
          </form>
        </div>
      )}
    </div>
  );
}
export default ModalWithForm;
