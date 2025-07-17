import { Navigate, useLocation } from "react-router-dom";

// New prop - anonymous. This prop will be used to indicate routes
// that can be visited anonymously (i.e., without authorization).
function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  // Invoke the useLocation hook and access the value of the
  // 'from' property from its state object. If there is no 'from'
  // property we default to "/".
  const location = useLocation();
  const from = location.state?.from || "/";

  // If the user is logged in we redirect them away from our
  // anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    // If user isn't logged in, return a Navigate component
    // that sends the user to /login.
    // To keep the router history clean, we added "replace", this will
    // avoid extra redirects after the user clicks the Back button in a browser
    // While redirecting to /login we set the location objects
    // state.from property to store the current location value.
    // This allows us to redirect them appropriately after they
    // log in.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
