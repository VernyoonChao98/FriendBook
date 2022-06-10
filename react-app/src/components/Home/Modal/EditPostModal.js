import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPostForm from "../Forms/EditPostForm";

function EditPostModal({ setShowMenu, post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button className="menu__post__button" onClick={() => setShowModal(true)}>Edit post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm
            setShowMenu={setShowMenu}
            post={post}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditPostModal;
