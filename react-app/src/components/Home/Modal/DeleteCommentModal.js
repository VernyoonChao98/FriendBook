import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteCommentForm from "../Forms/DeleteCommentForm";

function DeleteCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>DELETE Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentForm comment={comment} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default DeleteCommentModal;
