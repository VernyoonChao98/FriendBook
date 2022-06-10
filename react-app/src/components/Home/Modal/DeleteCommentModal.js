import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteCommentForm from "../Forms/DeleteCommentForm";

function DeleteCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button className="menu__post__button" onClick={() => setShowModal(true)}>
        Delete comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentForm comment={comment} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default DeleteCommentModal;
