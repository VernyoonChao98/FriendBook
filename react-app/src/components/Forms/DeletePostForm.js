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
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="post__delete__container"
    >
      <div className="create__post__header__container">
        <div className="create__post__header">Confirm Deleting Post?</div>
        <button
          className="close__modal"
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
      </div>
      <div>Deleting will be permanent and can not be recovered. </div>
      <button className="create__post__text__button" onClick={deletePost}>
        Confirm
      </button>
    </div>
  );
}

export default DeletePostForm;
