import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import SignupModal from "../SignupModal/SignupModal";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [userData] = useState({
    userName: "",
    profilePic: "",
    email: "",
  });

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openSignupModal = () => {
    setActiveModal("signup");
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
          <Route path="/" element={<Main></Main>} />
          <Route
            path="/signup"
            element={<SignupModal isOpen={activeModal}></SignupModal>}
          />
          <Route path="/login" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
