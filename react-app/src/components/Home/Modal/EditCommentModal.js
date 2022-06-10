import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "../Forms/EditCommentForm";

function EditCommentModal({ setShowMenu, comment }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm
            setShowMenu={setShowMenu}
            comment={comment}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditCommentModal;
