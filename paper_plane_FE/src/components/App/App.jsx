import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setToken, getToken } from "../../utils/token";
import {
  signUp,
  loginViaUsername,
  loginViaEmail,
  getUserInfo,
} from "../../utils/auth";
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

    if (emailRegex.test(value)) {
      // Input is likely an email
      loginViaEmail({ value, password })
        .then((data) => {
          getUserInfo(data.token)
            .then((info) => {
              setCurrentUser(info);
              setToken(data.token);
              setIsLoggedIn(true);
              navigate("/homepage");
            })
            .catch(console.error("Incorrect: Email or Password."));
        })
        .catch(console.error("Incorrect: Email and Password combination."));
    } else {
      // Input is likely a username
      loginViaUsername({ value, password })
        .then((data) => {
          getUserInfo(data.token)
            .then((info) => {
              setCurrentUser(info);
              setToken(data.token);
              setIsLoggedIn(true);
              navigate("/homepage");
            })
            .catch(console.error("Incorrect: Username or Password."));
        })
        .catch(console.error("Incorrect: Username and Password combination."));
    }
  };

  // Return user login handler
  const handleLogin = (token, user) => {
    setCurrentUser(user);
    setToken(token);
    setIsLoggedIn(true);
    navigate("/homepage");
  };

  const handleSignupSubmit = (userName, profilePic, email, password) => {
    signUp({ userName, profilePic, email, password })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/homepage");
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setToken(null);
    navigate("/");
  };

  // checks if there is a user logged in
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    } else {
      getUserInfo(jwt)
        .then((data) => {
          handleLogin(jwt, data);
        })
        .catch(console.error);
    }
  }, []);

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
