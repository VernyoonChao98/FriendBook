import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAComment } from "../../../store/post";

function EditCommentForm({ setShowMenu, comment, setShowModal }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment.content);

  const editComment = (e) => {
    e.preventDefault();
    const payload = {
      commentId: comment.id,
      content,
    };

    dispatch(editAComment(payload));
    setShowModal(false);
    setShowMenu(false);
  };

  return (
    <div>
      <form onSubmit={editComment}>
        <input
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          required
        />
        <button onClick={editComment}>Post</button>
      </form>
    </div>
  );
}

export default EditCommentForm;
