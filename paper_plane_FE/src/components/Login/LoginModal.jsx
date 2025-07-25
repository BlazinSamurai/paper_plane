import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, handleLogin }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Might need to combine these two???
  const handleUserNameChange = (e) => {
    setUserName(e.targert.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    handleSignup(userName, email, password);
  };
  return (
    // <ModalWithForm isOpen={isOpen} title="Login">
    <ModalWithForm
      isOpen={isOpen}
      sideBarTitle="Welcome Back"
      sideBarText="Traveler!"
      formTitle="Login"
      buttonText="Submit"
    >
      <label htmlFor="login_username-email">
        <input
          type="text"
          className="modal__form-body-input"
          minLength="1"
          max="20"
          id="login_username-email"
          placeholder="Username or Email"
          // not sure if I can put two here
          value={userName}
          onChange={handleUserNameChange}
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
    </ModalWithForm>
  );
};

export default LoginModal;
