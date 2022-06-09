import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAPost } from "../../../store/post";

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
