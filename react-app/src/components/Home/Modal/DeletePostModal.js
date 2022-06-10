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
      <button onClick={() => setShowModal(true)}>DELETE A POST</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePostForm post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default DeletePostModal;
