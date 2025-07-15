import { useState } from "react";
import paperPlane from "../../assets/blue_pp_icon.png";

import "./App.css";

import Header from "../Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page_content">
        <Header></Header>
      </div>
    </div>
  );
}

export default App;
