//This is the Home Page
import "./HomePage.css";

import SideBar from "../SideBar/SideBar";

function HomePage({ onLogout }) {
  return (
    <div className="home-page">
      <div className="home-page__container">
        <section className="home-page__sidebar">
          <SideBar onLogout={onLogout}></SideBar>
        </section>
        <section className="home-page__trip-creation">
          <h3>Welcome to the Home Page</h3>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
