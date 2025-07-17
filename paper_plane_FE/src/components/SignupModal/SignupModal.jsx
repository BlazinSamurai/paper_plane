import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SignupModal = ({ isOpen, handleSignup }) => {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.targert.value);
  };
  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    handleSignup(userName, profilePic, email, password);
  };

  //   console.log(`isOpen from signUpModal: ${isOpen}.`);

  return (
    <ModalWithForm isOpen={isOpen} title="Create an account">
      <label htmlFor="Create_UserName" className="modal__label">
        Hello
      </label>
    </ModalWithForm>
  );
};

export default SignupModal;
