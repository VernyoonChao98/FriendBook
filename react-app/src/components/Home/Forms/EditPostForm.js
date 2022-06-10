import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editAPost } from "../../../store/post";

function EditPostForm({ setShowMenu, post, setShowModal }) {
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
    setShowMenu(false);
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
