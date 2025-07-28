import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { signUp, login } from "../../utils/auth";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../Login/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openSignupModal = () => {
    setActiveModal("signup");
  };

  const handleLoginSubmit = (email, password) => {
    // If username or password empty, return without sending a request.
    if (!email || !password) {
      return;
    }

    console.log("Inside handleLoginSubmit from app.jsx.");
    login({ email, password })
      .then((data) => {
        console.log(`login data:${data}.`);
      })
      .catch(console.error);
  };

  const handleSignupSubmit = (userName, profilePic, email, password) => {
    signUp({ userName, profilePic, email, password })
      .then((user) => {
        console.log(user);
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <div className="page_content">
        <Header
          isOpen={activeModal}
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
          closeActiveModal={closeActiveModal}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <SignupModal
                isOpen={activeModal}
                signupHandler={handleSignupSubmit}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginModal
                isOpen={activeModal}
                loginHandler={handleLoginSubmit}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
