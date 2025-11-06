import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

//A common regex for basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupModal = ({
  isOpen,
  signupHandler,
  openLoginRoute,
  openSignupRoute,
  closeActiveRoute,
}) => {
  const [userName, setUserName] = useState("");
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [isProfilePicValid, setIsProfilePicValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [error, setError] = useState({
    input: "",
    inputErrorMessage: "",
  });
  // This is the overall modal validity useState
  const [isValid, setIsValid] = useState(false);

  const handleUserNameChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
    if (userNameValidation(e.target.value)) {
      setIsUserNameValid(true);
      setError({
        input: "",
        inputErrorMessage: "",
      });
    } else {
      setIsUserNameValid(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailValidation(e.target.value)) {
      setIsEmailValid(true);
      setError({
        input: "",
        inputErrorMessage: "",
      });
    } else {
      setIsEmailValid(false);
      setError({
        input: "email",
        inputErrorMessage: "Please enter a valid email.",
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordValidation(e.target.value)) {
      setIsPasswordValid(true);
      setError({
        input: "",
        inputErrorMessage: "",
      });
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.value);
    if (profilePicValidation(e.target.value)) {
      setIsProfilePicValid(true);
      setError({
        input: "",
        inputErrorMessage: "",
      });
    } else {
      setIsProfilePicValid(false);
    }
  };

  const userNameValidation = (value) => {
    const minLength = 8;
    const maxLength = 15;
    const hasLowerCase = /[a-z]/.test(value);
    const correctLength =
      value.length >= minLength && value.length <= maxLength;

    if (!correctLength) {
      setError({
        input: "username",
        inputErrorMessage: `Name must be 8-15 characters long. Current Length: ${value.length}.`,
      });
      return false;
    } else {
      if (!hasLowerCase) {
        setError({
          input: "username",
          inputErrorMessage: `Name must contain a lower case letter.`,
        });
        return false;
      }
    }
    return true;
  };

  const emailValidation = (value) => {
    return emailRegex.test(value);
  };

  const passwordValidation = (value) => {
    const minLength = 8;
    const maxLength = 15;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const correctLength =
      value.length >= minLength && value.length <= maxLength;
    const allowedChars = /^[A-Za-z\d]+$/.test(value);

    if (!allowedChars) {
      setError({
        input: "password",
        inputErrorMessage: `No special characters allowed.`,
      });
      return false;
    } else {
      if (!correctLength) {
        setError({
          input: "password",
          inputErrorMessage: `Password must be 8-15 characters long. Current Length: ${value.length}`,
        });
        return false;
      } else {
        if (!hasUpperCase) {
          setError({
            input: "password",
            inputErrorMessage:
              "Password must have at least 1 upper case letter.",
          });
          return false;
        } else {
          if (!hasNumber) {
            setError({
              input: "password",
              inputErrorMessage: "Password must have at least 1 number.",
            });
            return false;
          } else {
            if (!hasLowerCase) {
              setError({
                input: "password",
                inputErrorMessage:
                  "Password must have at least 1 lower case letter.",
              });
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  const profilePicValidation = (value) => {
    try {
      new URL(value);
      return true;
    } catch (e) {
      setError({
        input: "url",
        inputErrorMessage: "Please enter a valid URL.",
      });
      return false;
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    isValid && signupHandler(userName, profilePic, email, password);
  };

  useEffect(() => {
    console.log();
    if (
      isUserNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isProfilePicValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isUserNameValid, isEmailValid, isPasswordValid, isProfilePicValid]);
  return (
    <ModalWithForm
      isOpen={isOpen}
      openLoginRoute={openLoginRoute}
      openSignupRoute={openSignupRoute}
      closeActiveRoute={closeActiveRoute}
      sideBarTitle="Welcome Traveler!"
      sideBarText="SIGN UP for FREE!"
      formTitle="Create an account"
      buttonText="Create Account"
      onSubmit={handleSignupSubmit}
      isValid={isValid}
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
        {error.input === "username" && (
          <p className="modal__form-body-invalid-input">
            {error.inputErrorMessage}
          </p>
        )}
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
        {error.input === "email" && (
          <p className="modal__form-body-invalid-input">
            {error.inputErrorMessage}
          </p>
        )}
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
        {error.input === "password" && (
          <p className="modal__form-body-invalid-input">
            {error.inputErrorMessage}
          </p>
        )}
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
        {error.input === "url" && (
          <p className="modal__form-body-invalid-input">
            {error.inputErrorMessage}
          </p>
        )}
      </label>
    </ModalWithForm>
  );
};

export default SignupModal;
