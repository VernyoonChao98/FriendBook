import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeletePostForm from "../Forms/DeletePostForm";

function DeletePostModal({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button className="menu__post__button" onClick={() => setShowModal(true)}>
        Delete post
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePostForm post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default DeletePostModal;
