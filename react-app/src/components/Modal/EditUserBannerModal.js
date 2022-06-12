import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditUserBannerForm from "../Forms/EditUserBannerForm";

function EditUserBannerModal({ socket }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        Edit Cover Photo
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUserBannerForm socket={socket} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default EditUserBannerModal;
