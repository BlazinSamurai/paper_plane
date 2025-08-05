import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { signUp, login, getUserInfo } from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";
import {
  CurrentUserContext,
  CurrentUserProvider,
} from "../../Context/CurrentUserContext";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../Login/LoginModal";
import HomePage from "../HomePage/HomePage";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";

function AppContent() {
  const [activeRoute, setActiveRoute] = useState("");
  const { currentUser, isLoggedIn, setCurrentUser, setIsLoggedIn } =
    useContext(CurrentUserContext);

  const navigate = useNavigate();

  const handleRouteChange = (newRoute) => {
    setActiveRoute(newRoute);
  };

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
  const handleLoginSubmit = (email, password) => {
    if (!email || !password) {
      return;
    }

    login({ email, password })
      .then((data) => {
        getUserInfo(data.token)
          .then((info) => {
            setCurrentUser(info);
            setToken(data.token);
            setIsLoggedIn(true);
            navigate("/homepage");
          })
          .catch(console.error);
      })
      .catch(console.error);
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
        <Header
          openHomePageRoute={isLoggedIn}
          openLoginRoute={openLoginRoute}
          openSignupRoute={openSignupRoute}
          closeActiveRoute={closeActiveRoute}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <SignupModal
                isOpen={activeRoute}
                signupHandler={handleSignupSubmit}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginModal
                isOpen={activeRoute}
                loginHandler={handleLoginSubmit}
              />
            }
          />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          {/* Need to add ,path="*", to catch-all route. */}
        </Routes>
      </div>
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
