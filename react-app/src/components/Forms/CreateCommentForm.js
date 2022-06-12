import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAComment } from "../../store/post";

function CreateCommentForm({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const createComment = (e) => {
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
      user_id: user.id,
      post_id: post.id,
      content,
    };

    dispatch(createAComment(payload));
    setContent("");
  };

  return (
    <div>
      <form className="home__create__comment__form" onSubmit={createComment}>
        <img
          className="home__create__comment__avatar"
          src={user.avatar_url}
          alt="createCommentAvatar"
        />
        <input
          className="home__create__comment__input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Write a comment..."
        />
      </form>
      <span className="home__create__comment__press">
        Press Enter to post a comment.
      </span>
      {errors.map((error, ind) => (
        <div className="home__comment__errors" key={ind}>
          {error}
        </div>
      ))}
    </div>
  );
}

export default CreateCommentForm;
