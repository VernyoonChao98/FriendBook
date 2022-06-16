import React from "react";
import LoginForm from "../auth/LoginForm";
import SignUpModal from "../auth/SignUpModal";
import { ExternalLink } from "react-external-link";

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
      <footer className="footer">
        {/* <ExternalLink href="https://www.linkedin.com/in/vernyoon-chao-783494123/">
          Portfolio
        </ExternalLink> */}
        <ExternalLink
          className="external_link"
          href="https://www.linkedin.com/in/vernyoon-chao-783494123/"
        >
          <div className="linkedIn"></div>
          LinkedIn
        </ExternalLink>
        <ExternalLink
          className="external_link"
          href="https://github.com/VernyoonChao98"
        >
          <div className="github"></div>
          Github
        </ExternalLink>
        <ExternalLink
          className="external_link"
          href="https://github.com/VernyoonChao98/FriendBook"
        >
          <div className="github"></div>
          Project Repo
        </ExternalLink>
      </footer>
    </div>
  );
}

export default SplashPage;
