import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAPost, editAPost, deleteAPost } from "../../../store/post";

function EditPostForm({ post, setShowModal }) {
  const dispatch = useDispatch();

  const [content, setContent] = useState(post.content);

  const editPost = (e) => {
    e.preventDefault();
    const payload = {
      postId: post.id,
      content,
    };

    dispatch(editAPost(payload));
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={editPost}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          required
        />
        <button onClick={editPost}>Post</button>
      </form>
    </div>
  );
}

export default EditPostForm;
