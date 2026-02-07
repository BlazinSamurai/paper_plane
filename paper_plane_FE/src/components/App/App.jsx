import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { setToken, getToken } from "../../utils/token";
import { signUp, loginViaUsername, loginViaEmail, getUserInfo } from "../../utils/auth";
import { createTrip, getTrips } from "../../utils/trips";
import { CurrentUserContext, CurrentUserProvider } from "../../Context/CurrentUserContext";

import "./App.css";

import Main from "../Main/Main";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../Login/LoginModal";
import HomePage from "../HomePage/HomePage";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";

function AppContent() {
  const [activeRoute, setActiveRoute] = useState("");
  const [tempTrip, setTempTrip] = useState([]);
  const { isLoggedIn, setCurrentUser, setIsLoggedIn } = useContext(CurrentUserContext);
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
      .catch((err) => {
        if (err.code === 409) {
          console.error("Email or Username already exists.");
        }
      });
  };

  const handleLogout = () => {
    navigate("/");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setToken(null);
  };

  const addNewTrip = (e, destination, tripName, startDate, endDate) => {
    e.preventDefault();
    const jwt = getToken();

    createTrip({ destination, tripName, startDate, endDate }, jwt)
      .then((newTripInfo) => {
        setTempTrip([newTripInfo, ...tempTrip]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // checks if there is a user logged in
  useEffect(() => {
    const jwt = getToken();

    if (jwt) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setToken(null);
      return navigate("/");
    } else {
      getUserInfo(jwt)
        .then((data) => {
          handleLogin(jwt, data);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    getTrips()
      .then((data) => {
        setTempTrip([...data]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page_content">
        <Routes>
          <Route path="/" element={<Main openLoginRoute={openLoginRoute} openSignupRoute={openSignupRoute} closeActiveRoute={closeActiveRoute} isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<SignupModal isOpen={activeRoute} signupHandler={handleSignupSubmit} openLoginRoute={openLoginRoute} openSignupRoute={openSignupRoute} closeActiveRoute={closeActiveRoute} />} />
          <Route path="/login" element={<LoginModal isOpen={activeRoute} loginHandler={handleLoginSubmit} openLoginRoute={openLoginRoute} openSignupRoute={openSignupRoute} closeActiveRoute={closeActiveRoute} />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} closeActiveRoute={closeActiveRoute} addNewTrip={addNewTrip} itinerary={tempTrip} />
              </ProtectedRoute>
            }
          />
          <Route
            // path="*" often acts as a catch-all route.
            // This means that it will match any URL that
            // doesn't match any other defined routes
            path="*"
            element={
              // condition ? expressionIfTrue : expressionIfFalse
              isLoggedIn ? <Navigate to="/homepage" /> : <Navigate to="/" />
            }
          />
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
