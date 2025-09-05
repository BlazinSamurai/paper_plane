//This is the Landing Page
import "./Main.css";

import Header from "../Header/Header";
import Mapbox from "../../utils/mapBoxApi";
import Steps from "../Steps/Steps";

function Main({
  openLoginRoute,
  openSignupRoute,
  closeActiveRoute,
  isLoggedIn,
}) {
  return (
    <main className="main">
      <Header
        openLoginRoute={openLoginRoute}
        openSignupRoute={openSignupRoute}
        closeActiveRoute={closeActiveRoute}
      ></Header>
      <h2 className="main__title">Plan your next trip &</h2>
      <h2 className="main__title main__title-white">EXPLORE THE GLOBE</h2>
      {/* <div className="main__cloud"></div> */}
      <Mapbox isLoggedIn={isLoggedIn}></Mapbox>
      <Steps></Steps>
    </main>
  );
}

export default Main;
