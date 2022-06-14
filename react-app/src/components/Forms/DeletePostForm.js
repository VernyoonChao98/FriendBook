import React from "react";
import { useDispatch } from "react-redux";
import { deleteAPost } from "../../store/post";

function DeletePostForm({ socket, post, setShowModal }) {
  const dispatch = useDispatch();

  let roomUrl = window.location.pathname;

  const deletePost = async (e) => {
    e.preventDefault();

    if (roomUrl === "/home") {
      roomUrl = `/profile/${post.user.id}`;
    }

    const payload = {
      postId: post.id,
      roomUrl,
    };

    await dispatch(deleteAPost(payload));

    await socket.emit("deletePost", payload);
    await socket.emit("deletePostHome", payload);

    setShowModal(false);
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="post__delete__container"
    >
      <div className="create__post__header__container">
        <div className="create__post__header">Confirm Deleting Post?</div>
        <button
          className="close__modal"
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
      </div>
      <div>Deleting will be permanent and can not be recovered. </div>
      <button className="create__post__text__button" onClick={deletePost}>
        Confirm
      </button>
    </div>
  );
}

export default DeletePostForm;
