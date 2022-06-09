import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPostForm from "../Forms/EditPostForm";

function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default EditPostModal;
