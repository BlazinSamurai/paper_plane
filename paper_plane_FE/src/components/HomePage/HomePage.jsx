//This is the Home Page
import "./HomePage.css";

function HomePage({ onLogout }) {
  return (
    <div className="homePage">
      <div className="homePage__container">
        <section className="homePage__sidebar"></section>
        <section className="homePage__tripCreation">
          <h3>Welcome to the Home Page</h3>
        </section>
        <button onClick={onLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default HomePage;
