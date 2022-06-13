import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditUserProfileForm from "../Forms/EditUserProfileForm";

function EditUserProfileModal({ socket }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="edit__profile__button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        Edit Profile
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserProfileForm socket={socket} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default EditUserProfileModal;
