import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import CreatePostForm from "../Forms/CreatePostForm";

function CreatePostModal({ socket }) {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="create__post__container">
      <img
        className="home__avatar"
        src={user.avatar_url}
        alt="createPostAvatar"
      />
      <button onClick={() => setShowModal(true)}>What's on your mind?</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm socket={socket} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default CreatePostModal;
