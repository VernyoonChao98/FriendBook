import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "../Forms/EditCommentForm";

function EditCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm comment={comment} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default EditCommentModal;
