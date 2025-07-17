import React, { useState, useEffect } from "react";

import "./ModalWithForm.css";

function ModalWithForm({ isOpen, title }) {
  const [modal, setModal] = useState("");
  // This const is used to check if the login or signup modal are opened
  const [newTrip, setNewTrip] = useState("");

  useEffect(() => {
    if (isOpen === "signUp" || "login") {
      setNewTrip(false);
    }
  });

  // Dependency array: effect re-runs when isOpen changes
  useEffect(() => {
    setModal(isOpen);
  }, [isOpen]);

  console.log(`isOpen from modalWForm: ${modal}.`);
  return (
    <div>
      {!newTrip ? (
        <div className="modal__background">
          <h2 className="modal__title">{title}</h2>
        </div>
      ) : (
        <div className="modal"></div>
      )}
    </div>
  );
}
export default ModalWithForm;
