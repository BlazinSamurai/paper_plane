//This is the Landing Page
import "./Main.css";

import { useContext } from "react";

import Header from "../Header/Header";
import Mapbox from "../../utils/mapBoxApi";

function Main({ openLoginRoute, openSignupRoute, closeActiveRoute }) {
  return (
    <main className="main">
      <Header
        openLoginRoute={openLoginRoute}
        openSignupRoute={openSignupRoute}
        closeActiveRoute={closeActiveRoute}
      ></Header>
      <h2 className="main__title">Take your travel plans from</h2>
      <h2 className="main__title main__title-white">TEXT TO TAKEOFF</h2>
      <div className="main__cloud"></div>
      <Mapbox></Mapbox>
    </main>
  );
}

export default Main;
