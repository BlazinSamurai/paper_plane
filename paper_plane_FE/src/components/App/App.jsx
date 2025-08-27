import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setToken } from "../../utils/token";
import {
  CurrentUserContext,
  CurrentUserProvider,
} from "../../Context/CurrentUserContext";

import "./App.css";

import Main from "../Main/Main";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../Login/LoginModal";
import HomePage from "../HomePage/HomePage";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";

function AppContent() {
  const [activeRoute, setActiveRoute] = useState("");
  const [tempUser, setTempUser] = useState({
    tempName: "",
    tempPic: "",
    tempEmail: "",
    tempPW: "",
  });
  const { isLoggedIn, setCurrentUser, setIsLoggedIn } =
    useContext(CurrentUserContext);

  const navigate = useNavigate();

  const closeActiveRoute = () => {
    setActiveRoute("");
  };

  const openLoginRoute = () => {
    setActiveRoute("login");
  };

  const openSignupRoute = () => {
    setActiveRoute("signup");
  };

  // First time User login in handler
  const handleLoginSubmit = (value, password) => {
    if (!value || !password) {
      return;
    }

    // logic for backend
    // login({ email, password })
    //   .then((data) => {
    //     getUserInfo(data.token)
    //       .then((info) => {
    //         setCurrentUser(info);
    //         setToken(data.token);
    //         setIsLoggedIn(true);
    //         navigate("/homepage");
    //       })
    //       .catch(console.error);
    //   })
    //   .catch(console.error);

    if (value === tempUser.tempEmail || value === tempUser.tempName) {
      if (password === tempUser.tempPW) {
        setCurrentUser(tempUser);
        setIsLoggedIn(true);
        navigate("/homepage");
      } else {
        alert("Incorrect: Password or Email.");
      }
    } else {
      alert("Incorrect: Password or Email.");
    }
  };

  // Return user login handler
  // FOR BACKEND USE
  // const handleLogin = (token, user) => {
  //   setCurrentUser(user);
  //   setToken(token);
  //   setIsLoggedIn(true);
  //   navigate("/homepage");
  // };

  const handleSignupSubmit = (userName, profilePic, email, password) => {
    // Used to implement a backend
    // signUp({ userName, profilePic, email, password })
    //   .then((user) => {
    //     setCurrentUser(user);
    //     setIsLoggedIn(true);
    //     navigate("/homepage");
    //   })
    //   .catch(console.error);

    setTempUser({
      tempName: userName,
      tempPic: profilePic,
      tempEmail: email,
      tempPW: password,
    });
    setCurrentUser(tempUser);
    setIsLoggedIn(true);
    navigate("/homepage");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    console.log(tempUser);
    setCurrentUser(tempUser);
  }, [tempUser]);

  // checks if there is a user logged in
  // useEffect(() => {
  //   const jwt = getToken();

  //   if (!jwt) {
  //     setCurrentUser(null);
  //     setIsLoggedIn(false);
  //     return;
  //   } else {
  //     getUserInfo(jwt)
  //       .then((data) => {
  //         handleLogin(jwt, data);
  //       })
  //       .catch(console.error);
  //   }
  // }, []);

  return (
    <div className="page">
      <div className="page_content">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                openLoginRoute={openLoginRoute}
                openSignupRoute={openSignupRoute}
                closeActiveRoute={closeActiveRoute}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupModal
                isOpen={activeRoute}
                signupHandler={handleSignupSubmit}
                openLoginRoute={openLoginRoute}
                openSignupRoute={openSignupRoute}
                closeActiveRoute={closeActiveRoute}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginModal
                isOpen={activeRoute}
                loginHandler={handleLoginSubmit}
                openLoginRoute={openLoginRoute}
                openSignupRoute={openSignupRoute}
                closeActiveRoute={closeActiveRoute}
              />
            }
          />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomePage
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  closeActiveRoute={closeActiveRoute}
                />
              </ProtectedRoute>
            }
          />
          {/* Need to add ,path="*", to catch-all route. */}
        </Routes>
      </div>
      {/* Cant put this here, trust bro 
      <NewTrip isOpen={activeRoute} closeActiveRoute={closeActiveRoute} /> */}
    </div>
  );
}

// Wrap the entire App component
function App() {
  return (
    <CurrentUserProvider>
      <AppContent />
    </CurrentUserProvider>
  );
}

export default App;
