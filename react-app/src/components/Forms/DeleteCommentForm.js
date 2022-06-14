import React from "react";
import { useDispatch } from "react-redux";
import { deleteAComment } from "../../store/post";

function DeleteCommentForm({ socket, post, comment, setShowModal }) {
  const dispatch = useDispatch();

  let roomUrl = window.location.pathname;

  const deleteComment = async (e) => {
    e.preventDefault();

    if (roomUrl === "/home") {
      roomUrl = `/profile/${post.user.id}`;
    }

    const payload = {
      commentId: comment.id,
      roomUrl,
    };

    dispatch(deleteAComment(payload));

    await socket.emit("deleteComment", payload);
    await socket.emit("deleteCommentHome", payload);

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
        <div className="create__post__header">Confirm Deleting Comment?</div>
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
      <button className="create__post__text__button" onClick={deleteComment}>
        Confirm
      </button>
    </div>
  );
}

export default DeleteCommentForm;
