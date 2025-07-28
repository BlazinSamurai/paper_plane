import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SignupModal = ({ isOpen, signupHandler }) => {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
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
    signupHandler(userName, profilePic, email, password);
  };

  //   console.log(`isOpen from signUpModal: ${isOpen}.`);

  return (
    <ModalWithForm
      isOpen={isOpen}
      sideBarTitle="Welcome Traveler!"
      sideBarText="SIGN UP for FREE!"
      formTitle="Create an account"
      buttonText="Create Account"
      onSubmit={handleSignupSubmit}
    >
      <label htmlFor="signup_userName">
        <input
          type="text"
          className="modal__form-body-input"
          minLength="1"
          maxLength="20"
          id="signup_userName"
          placeholder="UserName"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
      </label>
      <label htmlFor="signup_email">
        <input
          name="email"
          type="email"
          className="modal__form-body-input"
          minLength="1"
          id="signup_email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="signup_password">
        <input
          name="password"
          type="password"
          className="modal__form-body-input"
          minLength="8"
          max="20"
          id="signup_password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label htmlFor="signup_profilePic">
        <input
          name="profilePic"
          type="url"
          className="modal__form-body-input"
          minLength="1"
          id="signup_profilePic"
          placeholder="Profile Pic"
          value={profilePic}
          onChange={handleProfilePicChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default SignupModal;
