import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAPost } from "../../store/post";

function CreatePostForm({ socket, setShowModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  let roomUrl = window.location.pathname;

  const createPost = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = [];

    if (roomUrl === "/home") {
      roomUrl = `/profile/${user.id}`;
    }

    if (!content.length || content.trim().length === 0) {
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
      user_id: user.id,
      content,
      roomUrl,
    };

    await dispatch(createAPost(payload));

    await socket.emit("createPost", payload);
    await socket.emit("createPostHome", payload);

    setShowModal(false);
  };

  return (
    <div>
      <form className="create__post__wrapper" onSubmit={createPost}>
        <div className="create__post__header__container">
          <div className="create__post__header">Create Post</div>
          <button
            className="close__modal"
            onClick={() => {
              setShowModal(false);
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
          wrap="soft"
          maxLength={1001}
          placeholder="Whats on your mind?"
        />
        {errors.map((error, ind) => (
          <div className="home__comment__errors" key={ind}>
            {error}
          </div>
        ))}
        <button className="create__post__text__button" onClick={createPost}>
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
