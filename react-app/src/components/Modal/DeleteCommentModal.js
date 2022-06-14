import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteCommentForm from "../Forms/DeleteCommentForm";

function DeleteCommentModal({ post, socket, comment }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        className="menu__post__button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        Delete comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentForm
            socket={socket}
            post={post}
            comment={comment}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default DeleteCommentModal;
