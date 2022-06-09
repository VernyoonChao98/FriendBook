import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreatePostForm from "../Forms/CreatePostForm";

function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>CREATE A POST</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default CreatePostModal;
