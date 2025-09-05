import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  loginHandler,
  openLoginRoute,
  openSignupRoute,
  closeActiveRoute,
}) => {
  const [value, setValue] = useState("");

  const [password, setPassword] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginHandler(value, password);
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      openLoginRoute={openLoginRoute}
      openSignupRoute={openSignupRoute}
      closeActiveRoute={closeActiveRoute}
      sideBarTitle="Welcome Back"
      sideBarText="Traveler!"
      formTitle="Login"
      buttonText="Submit"
      onSubmit={handleLoginSubmit}
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
          value={value}
          onChange={handleValueChange}
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
