import React from "react";
import LoginForm from "../auth/LoginForm";
import SignUpModal from "../auth/SignUpModal";

function SplashPage() {
  return (
    <div>
      <div>
        <div>
          <span>Friendbook/logo</span>
          <span>
            Connect with friends and the world around you on FriendBook.
          </span>
        </div>
        <div>
          <LoginForm />
          <SignUpModal />
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
