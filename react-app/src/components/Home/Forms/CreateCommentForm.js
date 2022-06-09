import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  createAPost,
  editAPost,
  deleteAPost,
  createAComment,
  editAComment,
  deleteAComment,
} from "../../../store/post";

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
      <form onSubmit={createComment}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          required
        />
      </form>
      <span>Press Enter to post a comment.</span>
    </div>
  );
}

export default CreateCommentForm;
