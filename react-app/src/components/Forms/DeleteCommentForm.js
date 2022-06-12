import React from "react";
import { useDispatch } from "react-redux";
import { deleteAComment } from "../../store/post";

function DeleteCommentForm({ comment, setShowModal }) {
  const dispatch = useDispatch();

  const deleteComment = (e) => {
    e.preventDefault();
    const payload = {
      commentId: comment.id,
    };

    dispatch(deleteAComment(payload));
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
