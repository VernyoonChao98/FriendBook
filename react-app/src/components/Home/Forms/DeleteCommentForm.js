import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAComment } from "../../../store/post";

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
    <div>
      <div>Confirm Delete Comment?</div>
      <button onClick={deleteComment}>Confirm</button>
    </div>
  );
}

export default DeleteCommentForm;
