import "./Steps.css";

import stepOnePic from "../../images/signup_route.png";
import stepTwoPic from "../../images/home_page.png";
import stepThreePic from "../../images/create_new_trip_modal.png";

function Steps() {
  return (
    <div className="steps">
      <h4 className="steps__title">Steps: </h4>
      <div className="steps__container">
        <div className="step__one-container">
          <p className="step__one-title">1. Create Account</p>
          <div className="step__one-backdrop">
            <img
              src={stepOnePic}
              alt="Step One in Picture Form"
              className="step__one-img"
            />
          </div>
        </div>
        <div className="step__two-container">
          <p className="step__two-title">2. Pick A Destination</p>
          <div className="step__two-backdrop">
            <img
              src={stepTwoPic}
              alt="Step Two in Pictuer Form"
              className="step__two-img"
            />
          </div>
        </div>
        <div className="step__three-container">
          <p className="step__three-title">3. Create A Trip</p>
          <div className="step__three-backdrop">
            <img
              src={stepThreePic}
              alt="Step Three in Picture Form"
              className="step__three-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
