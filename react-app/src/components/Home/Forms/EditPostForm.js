import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAPost } from "../../../store/post";

function EditPostForm({ setShowMenu, post, setShowModal }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(post.content);
  const [errors, setErrors] = useState([]);

  const editPost = (e) => {
    e.preventDefault();

    setErrors([]);
    const validationErrors = [];

    if (!content.length) {
      validationErrors.push("Post can not be Empty!");
    }

    if (content.length > 1000) {
      validationErrors.push("Post exceeds character limit 1000.");
    }

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      postId: post.id,
      content,
    };

    dispatch(editAPost(payload));
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
      <form className="create__post__wrapper" onSubmit={editPost}>
        <div className="create__post__header__container">
          <div className="create__post__header">Edit Post</div>
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
        <button className="create__post__text__button" onClick={editPost}>
          Post
        </button>
      </form>
    </div>
  );
}

export default EditPostForm;
