import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPostForm from "../Forms/EditPostForm";

function EditPostModal({ setShowMenu, post }) {
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
        Edit post
      </button>
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
