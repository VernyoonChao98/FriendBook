import React from 'react'
import {
  getAllPosts,
  createAPost,
  editAPost,
  deleteAPost,
  createAComment,
  editAComment,
  deleteAComment,
} from "../../../store/post";

function CreateCommentForm() {

  const createComment = (e, postId) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      post_id: postId,
      content: "hard Comment",
    };

    dispatch(createAComment(payload));
  };
  
  return (
    <div>CreateCommentForm</div>
  )
}

export default CreateCommentForm
