import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateCommentForm from "../Forms/CreateCommentForm";

function CreateCommentModal({ post }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCommentForm post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default CreateCommentModal;
