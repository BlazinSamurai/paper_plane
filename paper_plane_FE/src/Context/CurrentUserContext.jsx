import React, { useState } from "react";

const CurrentUserContext = React.createContext({});

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setCurrentUser, setIsLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, CurrentUserProvider };
