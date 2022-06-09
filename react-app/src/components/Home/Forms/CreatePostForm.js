import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAPost, editAPost, deleteAPost } from "../../../store/post";

function CreatePostForm({ setShowModal }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const user = useSelector((state) => state.session.user);

  const createPost = (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      content,
    };

    dispatch(createAPost(payload));
    setShowModal(false);
  };

  const editPost = (e, postId) => {
    e.preventDefault();
    const payload = {
      postId,
      content,
    };

    dispatch(editAPost(payload));
  };

  const deletePost = (e, postId) => {
    e.preventDefault();
    const payload = {
      postId,
    };
    dispatch(deleteAPost(payload));
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          required
        />
        <button onClick={createPost}>Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;
