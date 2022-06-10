import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAComment } from "../../../store/post";

function CreateCommentForm({ post }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.session.user);

  const createComment = (e) => {
    e.preventDefault();
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
          required
          placeholder="Write a comment..."
        />
      </form>
      <span className="home__create__comment__press">Press Enter to post a comment.</span>
    </div>
  );
}

export default CreateCommentForm;
