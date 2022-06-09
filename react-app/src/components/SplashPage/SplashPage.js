import React from "react";
import LoginForm from "../auth/LoginForm";
import SignUpModal from "../auth/SignUpModal";

function SplashPage() {
  return (
    <div className="splashpage__wrapper">
      <div>
        <div className="splashpage__main__content">
          <div className="splashpage__text__container">
            <span className="friendbook__logo">friendbook</span>
            <span className="splashpage__text">
              Connect with friends and the world around you on Friendbook.
            </span>
          </div>
          <div className="splashpage__forms__container">
            <LoginForm />
            <SignUpModal />
          </div>
        </div>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default SplashPage;
