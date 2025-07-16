import { useState } from "react";

import "./App.css";

import Header from "../Header/Header";
import Mapbox from "../../utils/mapBoxApi";

function App() {
  return (
    <div className="page">
      <div className="page_content">
        <Header></Header>
        <Mapbox></Mapbox>
      </div>
    </div>
  );
}

export default App;
