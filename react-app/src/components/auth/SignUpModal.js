import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="create_button" onClick={() => setShowModal(true)}>
        Create new account
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
