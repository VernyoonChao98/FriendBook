import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "../Forms/EditCommentForm";

function EditCommentModal({ socket, setShowMenu, post, comment }) {
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
        Edit comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm
            socket={socket}
            setShowMenu={setShowMenu}
            post={post}
            comment={comment}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditCommentModal;
