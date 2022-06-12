import React from "react";
import { useDispatch } from "react-redux";
import { deleteAPost } from "../../store/post";

function DeletePostForm({ post, setShowModal }) {
  const dispatch = useDispatch();

  const deletePost = (e) => {
    e.preventDefault();
    const payload = {
      postId: post.id,
    };
    dispatch(deleteAPost(payload));
    setShowModal(false);
  };

  return (
    <div>
      <div>Confirm Delete Post?</div>
      <button onClick={deletePost}>Confirm</button>
    </div>
  );
}

export default DeletePostForm;
