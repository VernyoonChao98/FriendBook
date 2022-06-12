import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAComment } from "../../store/post";

function EditCommentForm({ setShowMenu, comment, setShowModal }) {
  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const editComment = (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = [];

    if (!content.length) {
      validationErrors.push("Comment can not be Empty!");
    }

    if (content.length > 1000) {
      validationErrors.push("Comment exceeds character limit 1000.");
    }

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      commentId: comment.id,
      content,
    };

    dispatch(editAComment(payload));
    setShowModal(false);
    setShowMenu(false);
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <form className="create__post__wrapper" onSubmit={editComment}>
        <div className="create__post__header__container">
          <div className="create__post__header">Edit Comment</div>
          <button
            className="close__modal"
            onClick={() => {
              setShowModal(false);
              setShowMenu(false);
            }}
          >
            X
          </button>
        </div>
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="create__post__text__area"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          rows={10}
          cols={35}
          required
          maxLength={1001}
          placeholder="Whats on your mind?"
        />
        {errors.map((error, ind) => (
          <div className="home__comment__errors" key={ind}>
            {error}
          </div>
        ))}
        <button className="create__post__text__button" onClick={editComment}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCommentForm;
